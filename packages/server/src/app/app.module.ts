import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionGateway } from './gateways/session.gateway';
import { CacheService } from './services/cache/cache.service';
import { PeerServerService } from './services/peer-server/peer-server.service';
import { GoogleApiService } from './services/google-api/google-api.service';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    AuthModule,
    CacheModule.register({ttl: (60 * 60 * 1000), max: 500, isGlobal: true}),
    MongooseModule.forRoot(`${process.env.MONGO_DB_URL}`, {
      dbName: process.env.MONGO_DB_NAME,
      user: process.env.MONGO_DB_USER,
      pass: process.env.MONGO_DB_PASSWORD
    }),
    UserModule,
    HttpModule
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
