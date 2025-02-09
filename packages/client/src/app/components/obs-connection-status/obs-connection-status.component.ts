import { Component, ElementRef, Input, Renderer2, Signal, ViewChild, WritableSignal, signal } from '@angular/core';
import { ObsConnectionState } from '../../reducers/obs.reducer';
import { AppPlatform, AppState } from '../../models/app.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectObsConnected, selectObsStreamActive, selectObsWebsocketIp } from '../../selectors/obs.selectors';
import { Store, select } from '@ngrx/store';
import { ObsActions } from '../../actions/obs.actions';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RecognitionActions } from '../../actions/recogntion.actions';
import { recognitionActiveSelector } from '../../selectors/recognition.selector';
import { filter, map, startWith } from 'rxjs';
import { AudioStreamActions } from '../../models/audio-stream.model';
import { platformSelector } from '../../selectors/app.selector';

@Component({
  selector: 'app-obs-connection-status',
  templateUrl: './obs-connection-status.component.html',
  styleUrls: ['./obs-connection-status.component.scss'],
})
export class ObsConnectionStatusComponent {
  @Input() set small(value: boolean | undefined) {
    this.smallIcon.set(!!value);
  }
  @ViewChild('menu', {read: ElementRef}) menuElement!: ElementRef;
  public state: Signal<ObsConnectionState | undefined>;
  public streamingActive: Signal<boolean | undefined>;
  public socketIp: Signal<string | undefined>;
  public ConnectionStates = ObsConnectionState;
  public smallIcon: WritableSignal<boolean> = signal(false);
  public currentUrl: Signal<string | undefined>;
  public recognitionActive: Signal<boolean | undefined>;

  private isDesktop: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>,
              private router: Router,
              private renderer: Renderer2) {
    this.state = toSignal(this.store.select(selectObsConnected));
    this.streamingActive = toSignal(this.store.select(selectObsStreamActive));
    this.socketIp = toSignal(this.store.select(selectObsWebsocketIp));
    this.recognitionActive = toSignal(this.store.select(recognitionActiveSelector));
    this.isDesktop = toSignal(this.store.pipe(select(platformSelector), map((platform) => platform === AppPlatform.desktop)));
    this.currentUrl = toSignal(
      this.router.events.pipe(
        filter((ev) => ev instanceof NavigationEnd),
        map(() => this.router.url),
        startWith(this.router.url)
      )
    )
  }

  startRecognition(): void {
    this.router.navigate(['']).then(() =>
      {
        if (this.isDesktop()) {
          this.store.dispatch(AudioStreamActions.connectStream({ id: 'default'}));
        } else {
          this.store.dispatch(RecognitionActions.connect({ id: 'default' }))
        }
      }
    )
    this._closeMenu();
  }

  disconnect(): void {
    this.store.dispatch(ObsActions.disconnect());
    this._closeMenu();
  }

  reconnect(): void {
    this.store.dispatch(ObsActions.reconnect());
    this._closeMenu();
  }

  private _closeMenu(): void {
    if (this.menuElement?.nativeElement) {
      this.renderer.removeAttribute(this.menuElement.nativeElement, 'open')
    }
  }
}
