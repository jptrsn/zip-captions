import { Component, ElementRef, OnDestroy, OnInit, Signal, ViewChild, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { slideInRightOnEnterAnimation, slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { AppState } from '../../../../models/app.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionConnectedSelector, recognitionErrorSelector, recognitionIdSelector, recognitionPausedSelector, selectRecognition } from '../../../../selectors/recognition.selector';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';
import { RecognitionService } from '../../services/recognition.service';
import { selectTextFlow } from '../../../../selectors/settings.selector';
import { map } from 'rxjs';
import { TextFlow } from '../../../settings/models/settings.model';

@Component({
  selector: 'app-recognition-render',
  templateUrl: './recognition-render.component.html',
  styleUrls: ['./recognition-render.component.scss'],
  animations: [
    slideInRightOnEnterAnimation(),
    slideInUpOnEnterAnimation(),
    slideOutDownOnLeaveAnimation(),
    slideOutRightOnLeaveAnimation()
  ]
})
export class RecognitionRenderComponent implements OnInit, OnDestroy {

  public state: Signal<RecognitionState | undefined>;
  public connected: Signal<boolean | undefined>;
  public paused: Signal<boolean | undefined>;
  public liveText: Signal<string>;
  public textOutput: Signal<string[]>;
  public hasLiveResults: Signal<boolean>;
  public error: Signal<string | undefined>;
  public textFlowDown: Signal<boolean | undefined>;
  public sidebarVisible: boolean | undefined;

  @ViewChild('enable') sidebarCheckbox!: ElementRef<HTMLInputElement>;

  constructor(private store: Store<AppState>,
              private el: ElementRef,
              private fullScreen: FullScreenService,
              private recognitionService: RecognitionService) {
    this.state = toSignal(this.store.select(selectRecognition));
    this.connected = toSignal(this.store.select(recognitionConnectedSelector));
    this.paused = toSignal(this.store.select(recognitionPausedSelector));
    const id: Signal<string | undefined> = toSignal(this.store.select(recognitionIdSelector));
    this.liveText = computed(() => id() ? this.recognitionService.getLiveOutput(id() as string)() : '');
    this.textOutput = computed(() => id() ? this.recognitionService.getRecognizedText(id() as string)() : []);
    this.hasLiveResults = computed(() => {
      if (this.connected()) {
        if (this.liveText() == '' && this.textOutput().length === 0) {
          return false;
        }
        return true;
      }
      return this.state()?.status != RecognitionStatus.uninitialized;
    });
    this.error = toSignal(this.store.select(recognitionErrorSelector));
    this.textFlowDown = toSignal(this.store.pipe(
      select(selectTextFlow), 
      map((flow: TextFlow) => (flow === 'top-down'))));
    if (this.fullScreen.isAvailable) {
      effect(() => {
        if (this.fullScreen.isFullscreen()) {
          this.sidebarCheckbox.nativeElement.checked = false;
        }
      })
    }
  }

  ngOnInit(): void {
    if (this.fullScreen.isAvailable) {
      this.fullScreen.registerElement(this.el);
    }
  }

  ngOnDestroy(): void {
    if (this.fullScreen.isAvailable) {
      this.fullScreen.deregisterElement();
    }
  }
}
