import { Injectable } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressPeerServer } from 'peer';

@Injectable()
export class PeerServerService {
  enablePeerServer(app: NestExpressApplication): void {
    app.use(
      ExpressPeerServer(app.getHttpServer(), {
        path: 'peer-server',
      })
    )
  }
}
