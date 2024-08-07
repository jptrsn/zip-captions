import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { SessionGateway } from './gateways/session.gateway';
import { CustomCacheInterceptor } from './interceptors/custom-cache.interceptor';
import { UserModule } from './modules/user/user.module';
import { CacheService } from './services/cache/cache.service';
import { PeerServerService } from './services/peer-server/peer-server.service';
import { ConfigModule } from '@nestjs/config';
import { SessionService } from './services/session/session.service';
import { SocketConnection, SocketConnectionSchema } from './models/socket-connection.model';
import { OwnerRoom, OwnerRoomSchema } from './models/owner-rooms.model';
import { BroadcastSession, BroadcastSessionSchema } from './models/broadcast-session.model';

function getDbConnectionData(): [string, MongooseModuleOptions] {
  // TODO: Make prod more consistent and remove custom environment handlers
  const isLocal = process.env.APP_ORIGIN.match('localhost')
  const isStaging = process.env.APP_ORIGIN.match('next');
    if (isLocal) {
      return [`mongodb://${process.env.MONGO_DB_URL}:${process.env.MONGO_DB_PORT}`, {auth: {username: process.env.MONGO_DB_USER, password: process.env.MONGO_DB_PASSWORD}, dbName: process.env.MONGO_DB_NAME, ssl: false}];
    } else if (isStaging) {
      console.log(process.env.MONGO_DB_URL)
      return [process.env.MONGO_DB_URL, { auth: {username: process.env.MONGO_DB_USER, password: process.env.MONGO_DB_PASSWORD}, dbName: process.env.MONGO_DB_NAME, retryWrites: true }]
    } else {
      const dbConnectionString = `mongodb://${process.env.MONGO_DB_URL}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}?ssl=true&replicaSet=globaldb`
      return [dbConnectionString, { auth: {username: process.env.MONGO_DB_USER, password: process.env.MONGO_DB_PASSWORD}, retryWrites: false}]
      
    }
}

@Module({
  imports: [
    CacheModule.register({ ttl: 60 * 60 * 1000, max: 500, isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
    MongooseModule.forRoot(...getDbConnectionData()),
    MongooseModule.forFeature([
      { name: SocketConnection.name, schema: SocketConnectionSchema },
      { name: OwnerRoom.name, schema: OwnerRoomSchema },
      { name: BroadcastSession.name, schema: BroadcastSessionSchema }
    ]),
    HttpModule,
    UserModule,
  ],
  providers: [
    CacheService,
    PeerServerService,
    SessionGateway,
    { provide: APP_INTERCEPTOR, useClass: CustomCacheInterceptor },
    SessionService,
  ],
  exports: [],
})
export class AppModule {}
