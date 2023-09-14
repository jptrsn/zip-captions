import { Component, OnDestroy, OnInit, Signal, computed, effect } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { slideInRightOnEnterAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { RecognitionActions, RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionConnectedSelector, recognitionPausedSelector } from '../../../../selectors/recognition.selector';
import { RecognitionService } from '../../../media/services/recognition.service';
import { ObsConnectionService } from '../../../../services/obs-connection/obs-connection.service';

@Component({
  selector: 'app-stream-captions',
  templateUrl: './stream-captions.component.html',
  styleUrls: ['./stream-captions.component.scss'],
  animations: [
    slideInRightOnEnterAnimation(),
    slideOutRightOnLeaveAnimation()
  ]
})
export class StreamCaptionsComponent implements OnInit, OnDestroy {
  public recognitionConnected: Signal<boolean | undefined>;
  
  private recognitionPaused: Signal<boolean | undefined>;
  private liveText: Observable<string>;
  // private recognizedText: Observable<string[]>;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private store: Store<AppState>,
              private recognitionService: RecognitionService,
              private obs: ObsConnectionService) {
    this.recognitionConnected = toSignal(this.store.select(recognitionConnectedSelector));
    this.recognitionPaused = toSignal(this.store.select(recognitionPausedSelector));
    this.liveText = toObservable(computed(() => (this.recognitionConnected() || this.recognitionPaused()) ? this.recognitionService.getLiveOutput('stream')() : ''))
    // this.recognizedText = toObservable(computed(() => (this.recognitionConnected() || this.recognitionPaused()) ? this.recognitionService.getRecognizedText('stream')() : []));
  }

  ngOnInit(): void {
    this.liveText.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((live) => {
      if (live !== '') {
        this.obs.sendCaption(live);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.recognitionConnected()) {
      this.store.dispatch(RecognitionActions.disconnectRecognition({id: 'stream'}));
    }
    this.onDestroy$.next();
  }
}
