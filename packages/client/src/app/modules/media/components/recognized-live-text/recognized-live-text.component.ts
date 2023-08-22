import { Component, Input, Signal } from '@angular/core';
import { fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-recognized-live-text',
  templateUrl: './recognized-live-text.component.html',
  styleUrls: ['./recognized-live-text.component.scss'],
  animations: [
    fadeOutOnLeaveAnimation()
  ]
})
export class RecognizedLiveTextComponent {
  @Input({ required: true}) text!: Signal<string>;
}
