import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { SessionGateway } from './gateways/session.gateway';
import { CacheService } from './services/cache/cache.service';
import { PeerServerService } from './services/peer-server/peer-server.service';
import { HttpModule } from '@nestjs/axios'
import { GoogleStrategy } from './strategies/google.strategy';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register({ttl: (60 * 60 * 1000), max: 500, isGlobal: true}),
    MongooseModule.forRoot(`${process.env.MONGO_DB_URL}`, {
      dbName: process.env.MONGO_DB_NAME,
      user: process.env.MONGO_DB_USER,
      pass: process.env.MONGO_DB_PASSWORD
    }),
    HttpModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    CacheService,
    PeerServerService,
    SessionGateway,
    AppService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    GoogleStrategy
  ],
  exports: []
})
export class AppModule {}
