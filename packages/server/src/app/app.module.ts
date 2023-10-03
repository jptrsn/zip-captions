import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionGateway } from './gateways/session.gateway';
import { CacheService } from './services/cache/cache.service';
import { PeerServerService } from './services/peer-server/peer-server.service';
import { AuthController } from '../auth/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CacheModule.register({ttl: (60 * 60 * 1000)}),
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService, 
    CacheService,
    PeerServerService, 
    SessionGateway, 
  ],
  exports: []
})
export class AppModule {}
