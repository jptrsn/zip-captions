import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionGateway } from './gateways/session.gateway';
import { CustomCacheInterceptor } from './interceptors/custom-cache.interceptor';
import { UserModule } from './modules/user/user.module';
import { CacheService } from './services/cache/cache.service';
import { PeerServerService } from './services/peer-server/peer-server.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    CacheModule.register({ttl: (60 * 60 * 1000), max: 500, isGlobal: true}),
    MongooseModule.forRoot(`${process.env.MONGO_DB_URL}`, {
      dbName: process.env.MONGO_DB_NAME,
      user: process.env.MONGO_DB_USER,
      pass: process.env.MONGO_DB_PASSWORD
    }),
    HttpModule,
    UserModule
  ],
  providers: [
    CacheService,
    PeerServerService,
    SessionGateway,
    { provide: APP_INTERCEPTOR, useClass: CustomCacheInterceptor },
    GoogleStrategy
  ],
  exports: []
})
export class AppModule {}
