import { Component, Input, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectRecognition } from '../../../../selectors/recognition.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { RecognitionService } from '../../services/recognition.service';
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
  @Input() text!: Signal<string>;
}
