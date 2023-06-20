import { ChangeItem, DataOptions, ServerDataService } from '@common/data/data.interface';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { Subject, SubscriptionLike, filter } from 'rxjs';

@Injectable()
export class DataService implements ServerDataService {
  private changeStream = new Subject<ChangeItem>();

  async get(options?: DataOptions): Promise<any> {
    const data = await fs.readFile(`../server/data/${options.table}.json`);

    return JSON.parse(data.toString());
  }

  async save(options?: DataOptions) {
    const data: any[] = await this.get(options);
    data.push({ dataId: data.length ?? 1, ...options.data });

    await fs.writeFile(`../server/data/${options.table}.json`, JSON.stringify(data));

    this.changeStream.next({
      changeType: 'create',
      table: options.table,
      data: [options.data],
    });
  }

  async remove(options: DataOptions): Promise<void> {
    const data: any[] = await this.get(options);
    data.splice(
      data.findIndex((item) => item.dataId === options.dataId),
      1
    );

    await fs.writeFile(`../server/data/${options.table}.json`, JSON.stringify(data));
  }

  subscribe(options: DataOptions<any>, next: (changeItem: ChangeItem) => void): SubscriptionLike {
    return this.changeStream
      .pipe(filter((changeItem: ChangeItem) => options.table === changeItem.table))
      .subscribe((changeItem: ChangeItem) => {
        next(changeItem);
      });
  }
}
