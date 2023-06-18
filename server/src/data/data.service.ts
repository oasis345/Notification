import { ChangeItem, DataOptions, ServerDataService } from '@common/data/data.interface';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { Subject, SubscriptionLike, filter } from 'rxjs';

@Injectable()
export class DataService implements ServerDataService {
  private changeStream = new Subject<ChangeItem>();

  async get(options?: DataOptions): Promise<any> {
    const data = await fs.readFile(`../server/data/${options.table}.json`);

    return data.toString();
  }

  async save(options?: DataOptions) {
    const data = await this.get(options);
    const parsedData = JSON.parse(data);

    parsedData.push(options.data);

    await fs.writeFile(`../server/data/${options.table}.json`, JSON.stringify(parsedData));

    this.changeStream.next({
      changeType: 'create',
      table: options.table,
      data: [options.data],
    });
  }

  subscribe(options: DataOptions<any>, next: (changeItem: ChangeItem) => void): SubscriptionLike {
    return this.changeStream
      .pipe(filter((changeItem: ChangeItem) => options.table === changeItem.table))
      .subscribe((changeItem: ChangeItem) => {
        next(changeItem);
      });
  }
}
