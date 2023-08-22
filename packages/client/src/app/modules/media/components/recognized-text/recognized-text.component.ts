import { Component, Input, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';
import { AppState } from '../../../../models/app.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionErrorSelector, selectRecognition } from '../../../../selectors/recognition.selector';
import { RecognitionService } from '../../services/recognition.service';

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
  @Input() connected!: Signal<boolean | undefined>;
  @Input() hasLiveResults!: Signal<boolean>;
  @Input() textOutput!: Signal<string[]>;
  @Input() error!: Signal<string | undefined>;

}
