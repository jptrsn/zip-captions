import { Component, OnDestroy, OnInit, Signal, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { slideInRightOnEnterAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { RecognitionActions } from '../../../../models/recognition.model';
import { recognitionConnectedSelector } from '../../../../selectors/recognition.selector';
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
  
  private liveText: Observable<string>;
  private recognizedText: Observable<string[]>;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private store: Store<AppState>,
              private recognitionService: RecognitionService,
              private peerService: PeerService) {
    this.recognitionConnected = toSignal(this.store.select(recognitionConnectedSelector));
    this.liveText = toObservable(computed(() => this.recognitionConnected() ? this.recognitionService.getLiveOutput('broadcast')() : ''))
    this.recognizedText = toObservable(computed(() => this.recognitionConnected() ? this.recognitionService.getRecognizedText('broadcast')() : []));
  }

  ngOnInit(): void {
    this.store.dispatch(RecognitionActions.connectRecognition({id: 'broadcast'}));
    this.liveText.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((live) => {
      this.peerService.broadcastData({ recognition: live, type: 'live' })
    });
    this.recognizedText.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((recognized) => {
      this.peerService.broadcastData({ recognition: recognized, type: 'segment'})
    })
  }

  ngOnDestroy(): void {
    if (this.recognitionConnected()) {
      this.store.dispatch(RecognitionActions.disconnectRecognition({id: 'broadcast'}));
    }
    this.onDestroy$.next();
  }
}
