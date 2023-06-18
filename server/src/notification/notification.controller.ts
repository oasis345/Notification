import { Controller, Delete, Get, Post, Req, Sse } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from '@common/auth/auth.interface';
import { DataOptions } from '@common/data/data.interface';

@Controller('api/notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Sse(':instanceId')
  subscribe(@Req() request: Request): Observable<MessageEvent> {
    const user: User = request.user as any;
    const { instanceId } = request.params;

    return new Observable((subscribe) => {
      const subscription = this.notificationService.subscribe(instanceId, user, (data) => {
        const event = { data } as MessageEvent;
        subscribe.next(event);
      });

      return subscription;
    });
  }

  @Delete(':instanceId')
  unsubscribe(@Req() request: Request): void {
    const { instanceId } = request.params;
    this.notificationService.unsubscribe(instanceId);
  }

  @Get(':instanceId/:table/:subscribeId')
  async subscribeData(@Req() request: Request<any>) {
    const { instanceId, subscribeId } = request.params;
    const options: DataOptions = { table: request.params.table };

    await this.notificationService.subscribeData(instanceId, subscribeId, options);
  }

  @Delete(':instanceId/:subscribeId')
  unsubscribeData(@Req() request: Request) {
    const { instanceId, subscribeId } = request.params;

    this.notificationService.unsubscribeData(instanceId, subscribeId);
  }
}
