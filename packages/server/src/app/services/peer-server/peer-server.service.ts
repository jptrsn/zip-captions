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
      const parsed = this.parse(req.url);
      if (!parsed) {
        socket.destroy();
      } else if (parsed.pathname === path) {
        wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
      }
    });
    return wss;
  }

  /** The PeerJS client puts the id and the token it was given in the query of its signalling WebSocket URL */
  private mayRegister(url: string | undefined): boolean {
    const parsed = this.parse(url);
    return !!parsed && this.peerIdentity.allowRegistration(parsed.searchParams.get('id'), parsed.searchParams.get('token'));
  }

  /** A request target such as `//` is not a URL, and must not throw inside an event handler of the http server */
  private parse(url: string | undefined): URL | undefined {
    try {
      return new URL(url ?? '', 'https://peerjs');
    } catch {
      return undefined;
    }
  }
}
