import { Component, computed, effect, ElementRef, Renderer2, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { filter, map, take } from 'rxjs';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';
import { RecognitionStatus } from '../../../../models/recognition.model';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { recognitionStatusSelector } from '../../../../selectors/recognition.selector';
import { AudioStreamState, AudioStreamStatus } from '../../../../models/audio-stream.model';
import { selectAudioStream } from '../../../../selectors/audio-stream.selector';
import { MediaService } from '../../../media/services/media.service';
import { selectIsBroadcasting } from '../../../../selectors/peer.selectors';

@Component({
  selector: 'app-end-broadcast',
  templateUrl: './end-broadcast.component.html',
  styleUrls: ['./end-broadcast.component.scss'],
})
export class EndBroadcastComponent {
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  @ViewChild('close', { read: ElementRef }) closeButton!: ElementRef;

  public isActive: Signal<boolean | undefined>;
  public vol: Signal<number | undefined>;

  constructor(private store: Store<AppState>,
              private renderer: Renderer2,
              private mediaService: MediaService) {
    this.isActive = toSignal(this.store.pipe(
      select(recognitionStatusSelector),
      map((status: RecognitionStatus) => status === RecognitionStatus.connected)
    ));
    const broadcasting = toSignal(this.store.pipe(select(selectIsBroadcasting)));
    const streamId = toSignal(this.mediaService.getMediaStream('default'));
    this.vol = computed(() => {
      const id = streamId()
      if (broadcasting() && id) {
        return this.mediaService.getVolumeForStream(id)()
      }
      return 0;
    });
  }

  confirmEndBroadcast(): void {
    this._openModal();
  }

  endBroadcast(): void {
    this.store.dispatch(RecognitionActions.disconnect({id: 'broadcast'}));
    this.store.select(recognitionStatusSelector).pipe(
      filter((status) => status === RecognitionStatus.disconnected),
      take(1)
    ).subscribe(() => {
      console.log('recognition ended, ending broadcast');
      this.store.dispatch(PeerActions.endBroadcast());
    })
    this._closeModal();
  }

  hideModal(): void {
    this._closeModal();
  }

  private _openModal(): void {
    this.renderer.setAttribute(this.modal.nativeElement, 'open', '')
  }

  private _closeModal(): void {
    this.closeButton.nativeElement.click();
  }
}
