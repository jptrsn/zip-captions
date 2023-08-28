import { Component, Input, WritableSignal, signal } from '@angular/core';
import { fadeOutOnLeaveAnimation, slideInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-room-id',
  templateUrl: './room-id.component.html',
  styleUrls: ['./room-id.component.scss'],
  animations: [
    slideInUpOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class RoomIdComponent {
  @Input() roomId?: string;
  public showToast: WritableSignal<boolean> = signal(false);

  showCopiedToClipboard(): void {
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 1500)
  }
}
