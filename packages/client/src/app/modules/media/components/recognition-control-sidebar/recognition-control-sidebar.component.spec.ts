import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognitionControlSidebarComponent } from './recognition-control-sidebar.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { FullScreenComponent } from '../full-screen/full-screen.component';
import { FlowDirectionComponent } from '../flow-direction/flow-direction.component';
import { DocumentPipComponent } from '../document-pip/document-pip.component';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../models/app.model';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { PeerService } from '../../../peer/services/peer.service';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';
import { DocumentPipService } from '../../../../services/document-pip/document-pip.service';
import { KeyboardShortcutsService } from '../../../../services/keyboard-shortcuts/keyboard-shortcuts.service';
import { RecognitionStatus } from '../../../../models/recognition.model';
import { defaultAppState } from '../../../../reducers/app.reducer';
import { TranslateService } from '@ngx-translate/core';

describe('RecognitionControlSidebarComponent', () => {
  let component: RecognitionControlSidebarComponent;
  let fixture: ComponentFixture<RecognitionControlSidebarComponent>;
  let store: MockStore<AppState>;
  let peerService: PeerService;
  let fullScreenService: FullScreenService;
  let documentPipService: DocumentPipService;
  let shortcutsService: KeyboardShortcutsService;
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        RecognitionControlSidebarComponent,
        FullScreenComponent,
        FlowDirectionComponent,
        DocumentPipComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(RecognitionControlSidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject<MockStore<AppState>>(MockStore);
    peerService = TestBed.inject(PeerService);
    fullScreenService = TestBed.inject(FullScreenService);
    documentPipService = TestBed.inject(DocumentPipService);
    shortcutsService = TestBed.inject(KeyboardShortcutsService);
    translate = TestBed.inject(TranslateService);
    translate.use('en');
    jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Start" in tooltip when disconnected', () => {
    store.setState({
      ...defaultAppState,
      recognition: { ...defaultAppState.recognition, status: RecognitionStatus.disconnected }
    });
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('data-tip')).toBe('Start (P)');
  });

  it('should display "Resume" in tooltip when paused', () => {
    store.setState({
      ...defaultAppState,
      recognition: { ...defaultAppState.recognition, status: RecognitionStatus.paused }
    });
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('data-tip')).toBe('Resume (P)');
  });

  it('should display "Pause" in tooltip when recognition is active', () => {
    store.setState({
      ...defaultAppState,
      recognition: { ...defaultAppState.recognition, status: RecognitionStatus.connected }
    });
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('data-tip')).toBe('Pause (P)');
  });

  it('should have translated aria-label on clear screen button', () => {
    const clearButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[data-testid="zc-recog-clear"]');
    expect(clearButton.getAttribute('aria-label')).toBe('Clear Screen');
  });

  it('should clear screen and broadcast empty results on clearScreen()', () => {
    peerService.liveText$.next('in progress text');
    peerService.textOutput$.next(['segment 1', 'segment 2']);

    component.clearScreen();

    expect(store.dispatch).toHaveBeenCalledWith(RecognitionActions.clear());
    expect(peerService.liveText$.value).toBe('');
    expect(peerService.textOutput$.value).toEqual([]);
  });

  it('should delegate clearScreen to shortcutsService', () => {
    jest.spyOn(shortcutsService, 'clearScreen');
    component.clearScreen();
    expect(shortcutsService.clearScreen).toHaveBeenCalled();
  });

  it('should delegate toggleRecognition to shortcutsService', () => {
    jest.spyOn(shortcutsService, 'toggleRecognition');
    component.toggleRecognition();
    expect(shortcutsService.toggleRecognition).toHaveBeenCalled();
  });

  it('should delegate text size adjustments to shortcutsService', () => {
    jest.spyOn(shortcutsService, 'increaseTextSize');
    jest.spyOn(shortcutsService, 'decreaseTextSize');

    component.increaseTextSize();
    expect(shortcutsService.increaseTextSize).toHaveBeenCalled();

    component.decreaseTextSize();
    expect(shortcutsService.decreaseTextSize).toHaveBeenCalled();
  });

  it('should delegate line height adjustments to shortcutsService', () => {
    jest.spyOn(shortcutsService, 'increaseLineHeight');
    jest.spyOn(shortcutsService, 'decreaseLineHeight');

    component.increaseLineHeight();
    expect(shortcutsService.increaseLineHeight).toHaveBeenCalled();

    component.decreaseLineHeight();
    expect(shortcutsService.decreaseLineHeight).toHaveBeenCalled();
  });

  it('should delegate history adjustments to shortcutsService', () => {
    jest.spyOn(shortcutsService, 'increaseRenderHistory');
    jest.spyOn(shortcutsService, 'decreaseRenderHistory');

    component.increaseRenderHistory();
    expect(shortcutsService.increaseRenderHistory).toHaveBeenCalled();

    component.decreaseRenderHistory();
    expect(shortcutsService.decreaseRenderHistory).toHaveBeenCalled();
  });

  it('should delegate text flow toggle to shortcutsService', () => {
    jest.spyOn(shortcutsService, 'toggleTextFlow');
    component.toggleTextFlow();
    expect(shortcutsService.toggleTextFlow).toHaveBeenCalled();
  });

  it('should delegate fullscreen toggle to shortcutsService when available', () => {
    fullScreenService.isAvailable = true;
    jest.spyOn(shortcutsService, 'toggleFullscreen');
    component.toggleFullscreen();
    expect(shortcutsService.toggleFullscreen).toHaveBeenCalled();
  });

  it('should delegate pip toggle to shortcutsService when supported', () => {
    Object.defineProperty(documentPipService, 'isSupported', { value: true, configurable: true });
    jest.spyOn(shortcutsService, 'togglePip');
    component.togglePip();
    expect(shortcutsService.togglePip).toHaveBeenCalled();
  });
});
