import { Component, ElementRef, Input, Signal, ViewChild, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
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
  @ViewChild('errorIcon', {read: ElementRef}) errorIcon!: ElementRef;
  public streamState: Signal<AudioStreamState>;
  public vol: Signal<number | undefined>;
  public connected: Signal<boolean | undefined>;
  public disconnected: Signal<boolean | undefined>;
  public error: Signal<string | undefined>;

  constructor(private store: Store<AppState>,
              private mediaService: MediaService) {
    this.streamState = toSignal(this.store.pipe(select(selectAudioStream))) as Signal<AudioStreamState>;
    this.connected = computed(() => this.streamState().status === AudioStreamStatus.connected);
    this.disconnected = computed(() => this.streamState().status === AudioStreamStatus.disconnected);
    this.error = computed(() => this.streamState().error);
    this.vol = computed(() => this.connected() ? this.mediaService.getVolumeForStream(this.streamState().id)() : 0);
  }

  toggleState(): void {
    if (this.error()) {
      console.error(this.error());
      return;
    }
    if (this.connected()) {
      this.store.dispatch(AudioStreamActions.disconnectStream({id: this.streamState().id}))
    } else {
      this.store.dispatch(AudioStreamActions.connectStream({id: this.streamState().id}))
    }
  }
}
