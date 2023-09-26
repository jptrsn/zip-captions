import { Component, Input, Signal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { filter, of, switchMap } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { AudioStreamActions, AudioStreamState, AudioStreamStatus } from '../../../../models/audio-stream.model';
import { errorSelector, windowControlsOverlaySelector } from '../../../../selectors/app.selector';
import { selectAudioStream } from '../../../../selectors/audio-stream.selector';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-audio-input-enable',
  templateUrl: './audio-input-enable.component.html',
  styleUrls: ['./audio-input-enable.component.scss'],
})
export class AudioInputEnableComponent {
  public streamState: Signal<AudioStreamState>;
  public vol: Signal<number | undefined>;
  public connected: Signal<boolean | undefined>;
  public disconnected: Signal<boolean | undefined>;
  public error: Signal<string | undefined>;
  public small: Signal<boolean | undefined>;

  constructor(private store: Store<AppState>,
              private mediaService: MediaService,
              private translate: TranslateService) {
    this.streamState = toSignal(this.store.pipe(select(selectAudioStream))) as Signal<AudioStreamState>;
    this.connected = computed(() => this.streamState().status === AudioStreamStatus.connected);
    this.disconnected = computed(() => this.streamState().status === AudioStreamStatus.disconnected);
    console.log('constructor', this.streamState());
    const appError = toSignal(this.store.pipe(
      select(errorSelector),
      filter((err) => err !== 'ERRORS.liveTextMissing'),
      switchMap((error: string | undefined) => error ? this.translate.get(error) : of(undefined))
    ));
    this.error = computed(() => this.streamState().error || appError());
    this.vol = computed(() => this.connected() ? this.mediaService.getVolumeForStream(this.streamState().id)() : 0);

    this.small = toSignal(this.store.select(windowControlsOverlaySelector));
  }

  toggleState(): void {
    if (this.connected() || this.error()) {
      this.store.dispatch(AudioStreamActions.disconnectStream({id: this.streamState().id}))
    } else {
      this.store.dispatch(AudioStreamActions.connectStream({id: this.streamState().id}))
    }
  }
}
