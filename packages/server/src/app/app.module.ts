import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionGateway } from './gateways/session.gateway';
import { CacheService } from './services/cache/cache.service';
import { PeerServerService } from './services/peer-server/peer-server.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    CacheModule.register({ttl: (60 * 60 * 1000), max: 500, isGlobal: true}),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_DB_URL || '127.0.0.1'}:${process.env.MONGO_DB_PORT || '27017'}`, {
      dbName: process.env.MONGO_DB_NAME,
      user: process.env.MONGO_DB_USER,
      pass: process.env.MONGO_DB_PASSWORD
    }),
    UserModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    CacheService,
    PeerServerService,
    SessionGateway,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor }
  ],
  exports: []
})
export class AppModule {}
