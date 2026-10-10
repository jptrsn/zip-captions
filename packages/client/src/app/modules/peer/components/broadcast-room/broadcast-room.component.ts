import { Component, OnDestroy, OnInit, Signal, computed, effect } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { slideInRightOnEnterAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { RecognitionStatus } from '../../../../models/recognition.model';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { recognitionConnectedSelector, recognitionPausedSelector } from '../../../../selectors/recognition.selector';
import { dialectSelector, languageSelector } from '../../../../selectors/settings.selector';
import { RecognitionService } from '../../../media/services/recognition.service';
import { PeerService } from '../../services/peer.service';

@Component({
  selector: 'app-broadcast-room',
  templateUrl: './broadcast-room.component.html',
  styleUrls: ['./broadcast-room.component.scss'],
  animations: [
    slideInRightOnEnterAnimation(),
    slideOutRightOnLeaveAnimation()
  ]
})
export class BroadcastRoomComponent implements OnInit, OnDestroy {
  public recognitionConnected: Signal<boolean | undefined>;

  private recognitionPaused: Signal<boolean | undefined>;
  private sourceLanguage: Signal<string>;
  private liveText: Observable<string>;
  private recognizedText: Observable<string[]>;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>,
              private recognitionService: RecognitionService,
              private peerService: PeerService) {
    this.recognitionConnected = toSignal(this.store.select(recognitionConnectedSelector));
    this.recognitionPaused = toSignal(this.store.select(recognitionPausedSelector));

    const dialect = toSignal(this.store.select(dialectSelector));
    const lang = toSignal(this.store.select(languageSelector));
    this.sourceLanguage = computed(() => {
      const d = dialect();
      if (d && d !== 'unspecified') return d;
      return lang() || 'en';
    });

    this.liveText = toObservable(computed(() => (this.recognitionConnected() || this.recognitionPaused()) ? this.recognitionService.getLiveOutput()() : ''))
    this.recognizedText = toObservable(computed(() => (this.recognitionConnected() || this.recognitionPaused()) ? this.recognitionService.getRecognizedText()() : []));
    let isPaused = false;
    effect(() => {
      if (this.recognitionPaused()) {
        isPaused = true;
        console.log('broadcast paused');
        this.peerService.broadcastData({ type: 'status', status: RecognitionStatus.paused})
      } else if (isPaused) {
        console.log('broadcast resumed')
        this.peerService.broadcastData({ type: 'status', status: RecognitionStatus.connected})
        isPaused = false;
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(RecognitionActions.connect({id: 'broadcast'}));
    this.liveText.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((live) => {
      this.peerService.broadcastData({ recognition: live, type: 'live', lang: this.sourceLanguage() })
    });
    this.recognizedText.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((recognized) => {
      this.peerService.broadcastData({ recognition: recognized, type: 'segment', lang: this.sourceLanguage() })
    });
    toObservable(this.sourceLanguage).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((lang) => {
      this.peerService.broadcastData({ type: 'hostLanguage', lang });
    });
  }

  ngOnDestroy(): void {
    if (this.recognitionConnected()) {
      this.store.dispatch(RecognitionActions.disconnect({id: 'broadcast'}));
    }
    this.onDestroy$.next();
  }
}
