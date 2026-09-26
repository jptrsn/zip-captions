import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Signal, ViewChild, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { fadeInOnEnterAnimation, slideInRightOnEnterAnimation, slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { map } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { RecognitionState, RecognitionStatus } from '../../../../models/recognition.model';
import { windowControlsOverlaySelector } from '../../../../selectors/app.selector';
import { recognitionConnectedSelector, recognitionErrorSelector, recognitionIdSelector, recognitionPausedSelector, selectRecognition } from '../../../../selectors/recognition.selector';
import { selectRenderHistoryLength, selectTextFlow } from '../../../../selectors/settings.selector';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';
import { DocumentPipService } from '../../../../services/document-pip/document-pip.service';
import { TextFlow } from '../../../settings/models/settings.model';
import { RecognitionService } from '../../services/recognition.service';

@Component({
  selector: 'app-recognition-render',
  templateUrl: './recognition-render.component.html',
  styleUrls: ['./recognition-render.component.scss'],
  animations: [
    slideInRightOnEnterAnimation(),
    slideInUpOnEnterAnimation(),
    slideOutDownOnLeaveAnimation(),
    slideOutRightOnLeaveAnimation(),
    fadeInOnEnterAnimation(),
  ]
})
export class RecognitionRenderComponent implements OnInit, AfterViewInit, OnDestroy {

  public state: Signal<RecognitionState | undefined>;
  public connected: Signal<boolean | undefined>;
  public paused: Signal<boolean | undefined>;
  public liveText: Signal<string>;
  public textOutput: Signal<string[]>;
  public hasLiveResults: Signal<boolean>;
  public error: Signal<string | undefined>;
  public textFlowDown: Signal<boolean | undefined>;
  public windowControlsOverlay: Signal<boolean | undefined>;
  public renderHistory: Signal<number | undefined>;
  public isPipActive: Signal<boolean>;

  @ViewChild('enable') sidebarCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('captionContainer') captionContainer!: ElementRef<HTMLElement>;

  constructor(private store: Store<AppState>,
              private el: ElementRef,
              private fullScreen: FullScreenService,
              private documentPip: DocumentPipService,
              private recognitionService: RecognitionService) {
    this.isPipActive = this.documentPip.isPipActive;
    this.state = toSignal(this.store.select(selectRecognition));
    this.connected = toSignal(this.store.select(recognitionConnectedSelector));
    this.paused = toSignal(this.store.select(recognitionPausedSelector));
    const id: Signal<string | undefined> = toSignal(this.store.select(recognitionIdSelector));
    this.liveText = computed(() => id() ? this.recognitionService.getLiveOutput()() : '');
    this.textOutput = computed(() => id() ? this.recognitionService.getRecognizedText()() : []);
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

    if (this.documentPip.isSupported) {
      effect(() => {
        if (this.documentPip.isPipActive()) {
          this.sidebarCheckbox.nativeElement.checked = false;
        }
      })
    }

    this.windowControlsOverlay = toSignal(this.store.select(windowControlsOverlaySelector))
    this.renderHistory = toSignal(this.store.select(selectRenderHistoryLength))
  }

  ngOnInit(): void {
    if (this.fullScreen.isAvailable) {
      this.fullScreen.registerElement(this.el);
    }
  }

  ngAfterViewInit(): void {
    if (this.documentPip.isSupported && this.captionContainer) {
      this.documentPip.registerElement(this.captionContainer);
    }
  }

  ngOnDestroy(): void {
    if (this.fullScreen.isAvailable) {
      this.fullScreen.deregisterElement();
    }
    if (this.documentPip.isSupported) {
      this.documentPip.deregisterElement();
    }
  }

  exitPip(): void {
    this.documentPip.close();
  }
}
