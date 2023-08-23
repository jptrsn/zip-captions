import { Component, Input, WritableSignal, signal } from '@angular/core';
import { fadeOutOnLeaveAnimation, slideInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-join-code',
  templateUrl: './join-code.component.html',
  styleUrls: ['./join-code.component.scss'],
  animations: [
    slideInUpOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class JoinCodeComponent {
  @Input() joinCode?: string;
  public showToast: WritableSignal<boolean> = signal(false);

  showCopiedToClipboard(): void {
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 1500)
  }
}
