import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from 'modules/tg-auth/auth.module';
import { TaskModule } from 'modules/task/task.module';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';

@Module({
  imports: [
    AuthModule,
    TaskModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
