import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DataModule,
    NotificationModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web'),
    }),
  ],
})
export class AppModule {}
