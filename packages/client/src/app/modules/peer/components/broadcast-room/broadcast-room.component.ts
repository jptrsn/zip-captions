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
import { CaptionTranslationService } from '../../../../services/translator/caption-translation.service';
import { LivePayload, SegmentPayload, buildLivePayload, buildSegmentPayload, buildTranslatedWire } from '../../models/broadcast-payload';
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
  private sourceLanguage$: Observable<string>;
  private livePayload$: Observable<LivePayload>;
  private segmentPayload$: Observable<SegmentPayload>;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>,
              private captionTranslation: CaptionTranslationService,
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
    this.sourceLanguage$ = toObservable(this.sourceLanguage);

    // Viewers get the original text, and the translation too when this broadcaster is translating.
    // Only translations that really exist are sent; a pending or failed one is left out.
    const running = computed(() => !!(this.recognitionConnected() || this.recognitionPaused()));
    const offered = computed(() => this.captionTranslation.active() ? [this.captionTranslation.target()] : []);
    this.livePayload$ = toObservable(computed(() => buildLivePayload(
      running() ? this.captionTranslation.liveText() : '',
      this.sourceLanguage(),
      offered(),
      running() && this.captionTranslation.active() ? this.captionTranslation.translatedLive() : '')));
    this.segmentPayload$ = toObservable(computed(() => {
      const segments = running() ? this.captionTranslation.segments() : [];
      const target = this.captionTranslation.target();
      return buildSegmentPayload(
        segments,
        this.sourceLanguage(),
        offered(),
        offered().length ? buildTranslatedWire(segments, this.captionTranslation.translations(), target) : []);
    }));
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
    this.livePayload$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((payload) => {
      this.peerService.broadcastData(payload);
    });
    this.segmentPayload$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((payload) => {
      this.peerService.broadcastData(payload);
    });
    this.sourceLanguage$.pipe(
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
