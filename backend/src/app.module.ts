// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MatchModule } from './modules/match/match.module';
import { ChatModule } from './modules/chat/chat.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { NotificationModule } from './modules/notification/notification.module';
import { VideoModule } from './modules/video/video.module';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    MatchModule,
    ChatModule,
    SubscriptionModule,
    NotificationModule,
    VideoModule,
    AdminModule,
  ],
})
export class AppModule {}