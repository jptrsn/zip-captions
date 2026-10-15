import { Injectable } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Server as HttpServer } from 'http';
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
        createWebSocketServer: (options) => this.createSignallingServer(options.server as HttpServer, options.path as string),
      })
    )
  }

  /**
   * A `ws` server given `{ server, path }` answers 400 to every upgrade that is not for its own path, which kills
   * socket.io's upgrade to a WebSocket on the same http server. So it takes only its path and leaves the rest alone.
   */
  private createSignallingServer(server: HttpServer, path: string): WebSocketServer {
    const wss = new WebSocketServer({
      noServer: true,
      verifyClient: (info: { req: { url?: string } }) => this.mayRegister(info.req.url),
    });
    server.on('upgrade', (req, socket, head) => {
      if (new URL(req.url ?? '', 'https://peerjs').pathname === path) {
        wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
      }
    });
    return wss;
  }

  /** The PeerJS client puts the id and the token it was given in the query of its signalling WebSocket URL */
  private mayRegister(url: string | undefined): boolean {
    const { searchParams } = new URL(url ?? '', 'https://peerjs');
    return this.peerIdentity.allowRegistration(searchParams.get('id'), searchParams.get('token'));
  }
}
