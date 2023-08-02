import { Component } from '@angular/core';
import { PeerService } from '../../services/peer.service';

@Component({
  selector: 'app-broadcast-session',
  templateUrl: './broadcast-session.component.html',
  styleUrls: ['./broadcast-session.component.scss'],
})
export class BroadcastSessionComponent {
  constructor(private peer: PeerService) {}

  joinRoom() {
    this.peer.joinRoom({ room: this._generateRoomId() });
  }

  private _generateRoomId(): string {
    let outString = '';
    const outParts: string[] = [];
    const inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 3; i++) {
      outString = '';
      for (let j = 0; j < 4; j++) {
        outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
      }
      outParts.push(outString);
    }
    return outParts.join('-');
  }
}
