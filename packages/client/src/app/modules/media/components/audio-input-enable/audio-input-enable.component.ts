import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { Observable, filter, map, shareReplay, switchMap, take, tap } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { AudioStreamActions, AudioStreamState, AudioStreamStatus } from '../../../../models/audio-stream.model';
import { selectAudioStream } from '../../../../selectors/audio-stream.selector';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-audio-input-enable',
  templateUrl: './audio-input-enable.component.html',
  styleUrls: ['./audio-input-enable.component.scss'],
})
export class AudioInputEnableComponent {
  public streamState$: Observable<AudioStreamState | undefined>;
  public vol$: Observable<number>;
  public connected: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>,
              private mediaService: MediaService) {
    this.streamState$ = this.store.pipe(select(selectAudioStream), shareReplay(1));
    
    this.vol$ = this.store.pipe(
      select(selectAudioStream),
      filter((state: AudioStreamState) => state.status === AudioStreamStatus.connected),
      switchMap((state: AudioStreamState) => this.mediaService.getVolumeForStream(state.id))
    );

    this.connected = toSignal(this.streamState$.pipe(map((state) => state?.status === AudioStreamStatus.connected)))
  }

  toggleState(): void {
    this.streamState$.pipe(
      filter((state) => !!state),
      take(1)
    ).subscribe((state: AudioStreamState | undefined) => {
      if (state!.status === AudioStreamStatus.connected) {
        this.store.dispatch(AudioStreamActions.disconnectStream({id: state!.id}))
      } else {
        this.store.dispatch(AudioStreamActions.connectStream({id: state!.id}))
      }
    })
  }
}
