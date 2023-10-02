import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionGateway } from './gateways/session.gateway';
import { PeerServerService } from './services/peer-server/peer-server.service';
import { CacheService } from './services/cache/cache.service';

@Module({
  imports: [
    CacheModule.register({ttl: (60 * 60 * 1000)}),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService, 
    SessionGateway, 
    PeerServerService, 
    CacheService,
  ],
})
export class AppModule {}
