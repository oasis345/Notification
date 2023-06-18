import { NotifyItem, NotifyListener, WebNotificationService } from '@common/notification/notification.interface';
import { randomString } from '@common/common/helper';
import { registry } from '@common/registry';
import { makeObservable, observable } from 'mobx';

export class NotificationService implements WebNotificationService {
  constructor() {
    makeObservable(this, {
      activation: observable,
      disturbMode: observable,
      disturbStartTime: observable,
      disturbEndTime: observable,
    });
  }
  eventSource?: EventSource;

  listeners: NotifyListener[] = [];

  instanceId = randomString();

  activation = true;

  disturbMode = false;

  disturbStartTime? = new Date();

  disturbEndTime? = new Date();

  init() {
    this.eventSource?.close();

    const { dayjs } = registry;
    this.eventSource = new EventSource('/api/notification/' + this.instanceId);
    this.eventSource.onmessage = ({ data }) => {
      if (!this.activation) return;

      const notifyItem: NotifyItem = JSON.parse(data);

      if (this.disturbMode) {
        const startTime = dayjs(this.disturbStartTime, 'HH:mm');
        const endTime = dayjs(this.disturbEndTime, 'HH:mm');
        const sendTime = dayjs(notifyItem.sentDate, 'HH:mm');
        if (!sendTime.isBetween(startTime, endTime)) return;
      }

      const caption = `${notifyItem.from} sent ${dayjs(notifyItem.sentDate).format('lll')}`;

      if (notifyItem.type === 'notification') {
        new Notification(`${notifyItem.message}`, { body: caption });
      } else {
        registry.uiService.notify('새 글이 등록 됨!');

        const listeners = this.listeners.filter(
          (listener) =>
            listener.type == notifyItem.type &&
            (!listener.subscribeId || listener.subscribeId == notifyItem.subscribeId)
        );

        for (const listener of listeners) listener.execute(notifyItem);
      }
    };
  }

  addListener(listener: NotifyListener) {
    this.listeners.push(listener);
  }

  removeListener(subscribeId: string) {
    this.listeners.splice(
      this.listeners.findIndex((listener) => listener.subscribeId === subscribeId),
      1
    );
  }

  close() {
    this.eventSource?.close();
    registry.httpClient.request({ serviceName: 'notification/' + this.instanceId, method: 'delete' });
  }
}
