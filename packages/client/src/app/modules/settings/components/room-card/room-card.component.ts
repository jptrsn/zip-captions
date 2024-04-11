import { Component, Input } from '@angular/core';
import { UserRoom } from '../../../../reducers/user.reducer';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent {
  @Input({ required: true }) room!: UserRoom;
}
