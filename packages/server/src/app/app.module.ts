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

@Module({
  imports: [
    AuthModule,
    CacheModule.register({ttl: (60 * 60 * 1000), max: 500, isGlobal: true}),
    MongooseModule.forRoot('mongodb://127.0.0.1', {
      dbName: 'zipcaptions',
      user: 'db_user',
      pass: 'changeme'
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
