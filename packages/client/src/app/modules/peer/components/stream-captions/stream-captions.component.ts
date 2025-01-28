import { Component, OnDestroy, OnInit, Signal, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { slideInRightOnEnterAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { RecognitionActions } from '../../../../actions/recognition.actions';
import { recognitionConnectedSelector, recognitionPausedSelector } from '../../../../selectors/recognition.selector';
import { ObsConnectionService } from '../../../../services/obs-connection/obs-connection.service';
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
export class StreamCaptionsComponent implements OnInit, OnDestroy {

  public recognitionConnected: Signal<boolean | undefined>;
  public recognitionPaused: Signal<boolean | undefined>;
  public liveText: Signal<string>;

  private liveText$: Observable<string>;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private store: Store<AppState>,
              private recognitionService: RecognitionService,
              private obs: ObsConnectionService) {
    this.recognitionConnected = toSignal(this.store.select(recognitionConnectedSelector));
    this.recognitionPaused = toSignal(this.store.select(recognitionPausedSelector));
    this.liveText = computed(() => (this.recognitionConnected() || this.recognitionPaused()) ? this.recognitionService.getLiveOutput('stream')() : '')
    this.liveText$ = toObservable(this.liveText);
  }

  ngOnInit(): void {
    this.liveText$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((live) => {
      this.obs.sendCaption(live);
    });
  }

  ngOnDestroy(): void {
    if (this.recognitionConnected()) {
      this.store.dispatch(RecognitionActions.disconnect({id: 'stream'}));
    }
    this.onDestroy$.next();
  }
}
