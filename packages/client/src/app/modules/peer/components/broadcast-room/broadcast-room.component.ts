import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { slideInRightAnimation, slideInRightOnEnterAnimation, slideOutRightAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { AppState } from '../../../../models/app.model';
import { RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionStatusSelector } from '../../../../selectors/recognition.selector';

@Component({
  selector: 'app-broadcast-room',
  templateUrl: './broadcast-room.component.html',
  styleUrls: ['./broadcast-room.component.scss'],
  animations: [
    slideInRightOnEnterAnimation(),
    slideOutRightOnLeaveAnimation()
  ]
})
export class BroadcastRoomComponent {
  public recognitionStatus: Signal<RecognitionStatus>
  constructor(private store: Store<AppState>) {
    this.recognitionStatus = toSignal(this.store.select(recognitionStatusSelector)) as Signal<RecognitionStatus>;
  }
}
