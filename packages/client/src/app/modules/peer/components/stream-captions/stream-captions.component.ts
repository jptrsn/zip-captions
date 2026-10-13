import { Component, OnDestroy, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { slideInRightOnEnterAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { AppState } from '../../../../models/app.model';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { recognitionConnectedSelector, recognitionPausedSelector } from '../../../../selectors/recognition.selector';
import { RecognitionService } from '../../../media/services/recognition.service';

@Component({
  selector: 'app-stream-captions',
  templateUrl: './stream-captions.component.html',
  styleUrls: ['./stream-captions.component.scss'],
  animations: [
    slideInRightOnEnterAnimation(),
    slideOutRightOnLeaveAnimation()
  ]
})
export class StreamCaptionsComponent implements OnDestroy {

  public recognitionConnected: Signal<boolean | undefined>;
  public recognitionPaused: Signal<boolean | undefined>;
  public liveText: Signal<string>;

  constructor(private store: Store<AppState>,
              private recognitionService: RecognitionService) {
    this.recognitionConnected = toSignal(this.store.select(recognitionConnectedSelector));
    this.recognitionPaused = toSignal(this.store.select(recognitionPausedSelector));
    this.liveText = computed(() => (this.recognitionConnected() || this.recognitionPaused()) ? this.recognitionService.getLiveOutput()() : '')
  }

  ngOnDestroy(): void {
    if (this.recognitionConnected()) {
      this.store.dispatch(RecognitionActions.disconnect({id: 'stream'}));
    }
  }
}
