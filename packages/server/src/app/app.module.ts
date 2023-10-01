import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionGateway } from './gateways/session.gateway';
import { PeerServerService } from './services/peer-server/peer-server.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SessionGateway, PeerServerService],
})
export class AppModule {}
