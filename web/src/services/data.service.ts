import { ChangeItem, DataOptions, Dict, WebDataService } from '@common/data/data.interface';
import { SubscriptionLike } from 'rxjs';
import { registry } from '@common/registry';
import { randomString } from '@common/common/helper';

export class DataService implements WebDataService {
  private readonly DATA_API_URL: string = 'api/data';

  async get<T = Dict<any>>(options: DataOptions<T>): Promise<T> {
    const data = await registry.httpClient.request({
      method: 'get',
      url: `${this.DATA_API_URL}/${options.table}`,
      params: options,
    });

    return data;
  }

  async save<T = any>(options: DataOptions<T>): Promise<void> {
    const data = await registry.httpClient.request({
      method: 'post',
      url: `${this.DATA_API_URL}/${options.table}`,
      params: options,
      data: options.data,
    });

    return data;
  }

  async remove<T = any>(options: DataOptions<T>): Promise<void> {
    const data = await registry.httpClient.request({
      method: 'delete',
      url: `${this.DATA_API_URL}/${options.table}/dataId`,
      params: options,
    });

    return data;
  }

  async subscribe(options: DataOptions<any>, next: (changeItem: ChangeItem) => void): Promise<SubscriptionLike> {
    const { httpClient, notificationService } = registry;
    const subscribeId = randomString();

    notificationService.addListener({
      type: 'notify',
      subscribeId: subscribeId,
      execute: (notifyItem) => {
        const changeItem = notifyItem.message;
        next?.(changeItem);
      },
    });

    await httpClient.request({
      url: `api/notification/${notificationService.instanceId}/${options.table}/${subscribeId}`,
      method: 'get',
      params: options,
    });

    const subscription: SubscriptionLike = {
      closed: false,
      unsubscribe() {
        httpClient.request({
          url: `api/notification/${notificationService.instanceId}/${subscribeId}`,
          method: 'delete',
        });

        notificationService.removeListener(subscribeId);
      },
    };

    return subscription;
  }
}
