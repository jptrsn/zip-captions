import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room-id',
  templateUrl: './room-id.component.html',
  styleUrls: ['./room-id.component.scss'],
})
export class RoomIdComponent {
  @Input() roomId?: string;
}
