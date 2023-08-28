import { Component, Input, Signal, signal } from '@angular/core';
import { fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-recognized-text',
  templateUrl: './recognized-text.component.html',
  styleUrls: ['./recognized-text.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation(),
    fadeOutUpOnLeaveAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class RecognizedTextComponent {
  @Input({ required: true}) connected!: Signal<boolean | undefined>;
  @Input() hasLiveResults: Signal<boolean>;
  @Input({ required: true}) textOutput!: Signal<string[]>;
  @Input({ required: true}) error!: Signal<string | undefined>;
  @Input() hintText = 'HINTS.beginSpeaking';
  constructor() {
    this.hasLiveResults = signal(true);
  }
}
