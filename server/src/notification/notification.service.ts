import { Injectable } from '@nestjs/common';
import { DataOptions, Dict } from '@common/data/data.interface';
import { NotifyItem, ServerNotificationService } from '@common/notification/notification.interface';
import { Subject, Subscription, SubscriptionLike } from 'rxjs';
import { User } from '@common/auth/auth.interface';
import { DataService } from '../data/data.service';

class NotificationInstance {
  subject: Subject<NotifyItem> = new Subject();
  subscriptions: Dict<SubscriptionLike> = {};
  user: User;
}

@Injectable()
export class NotificationService implements ServerNotificationService {
  constructor(private dataService: DataService) {}

  private instances: Dict<NotificationInstance> = {};

  subscribe(instanceId: string, user: User, next: (item: NotifyItem) => void): Subscription {
    const instance = this.getInstance(instanceId);
    instance.user = user;

    return instance.subject.subscribe(next);
  }

  unsubscribe(instanceId: string) {
    const instance = this.instances[instanceId];

    if (instance) {
      instance.subject.unsubscribe();
      for (const subscription of Object.values(instance.subscriptions)) subscription.unsubscribe();

      delete this.instances[instanceId];
    }
  }

  async subscribeData(instanceId: string, subscribeId: string, options: DataOptions) {
    const instance = this.getInstance(instanceId);
    const subscription = await this.dataService.subscribe(options, (changeItem) => {
      const notifyItem: NotifyItem = {
        type: 'notify',
        message: changeItem,
        instanceId,
        subscribeId,
        sentDate: new Date(),
      };

      instance.subject.next(notifyItem);
    });

    instance.subscriptions[subscribeId] = subscription;
  }

  unsubscribeData(instanceId: string, subscribeId: string) {
    const instance = this.getInstance(instanceId);

    instance.subscriptions[subscribeId]?.unsubscribe();
    delete instance.subscriptions[subscribeId];
  }

  notify(item: Partial<NotifyItem>): void {
    throw new Error('Method not implemented.');
  }

  private getInstance(instanceId: string) {
    return (this.instances[instanceId] ??= new NotificationInstance());
  }
}
