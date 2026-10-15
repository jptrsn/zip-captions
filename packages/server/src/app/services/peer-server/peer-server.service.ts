import { Injectable } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressPeerServer } from 'peer';
import { WebSocketServer } from 'ws';
import { PeerIdentityService } from '../peer-identity/peer-identity.service';

@Injectable()
export class PeerServerService {
  constructor(private peerIdentity: PeerIdentityService) { }

  enablePeerServer(app: NestExpressApplication): void {
    app.use(
      ExpressPeerServer(app.getHttpServer(), {
        path: 'peer-server',
        // PeerJS gives an id to whoever asks first. The upgrade is checked before it gets that far.
        createWebSocketServer: (options) => new WebSocketServer({
          ...options,
          verifyClient: (info: { req: { url?: string } }) => this.mayRegister(info.req.url),
        }),
      })
    )
  }

  /** The PeerJS client puts the id and the token it was given in the query of its signalling WebSocket URL */
  private mayRegister(url: string | undefined): boolean {
    const { searchParams } = new URL(url ?? '', 'https://peerjs');
    return this.peerIdentity.allowRegistration(searchParams.get('id'), searchParams.get('token'));
  }
}
