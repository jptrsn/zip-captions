import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore } from '@ngrx/store/testing';
import { KeyboardShortcutsService } from './keyboard-shortcuts.service';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { AppState } from '../../models/app.model';
import { defaultAppState } from '../../reducers/app.reducer';
import { defaultSettingsState } from '../../reducers/settings.reducer';
import { AvailableTextSizes, DefaultKeyboardShortcuts, SettingsActions } from '../../modules/settings/models/settings.model';
import { RecognitionStatus } from '../../models/recognition.model';
import { RecognitionActions } from '../../actions/recogntion.actions';
import { FullScreenService } from '../full-screen/full-screen.service';
import { DocumentPipService } from '../document-pip/document-pip.service';
import { PeerService } from '../../modules/peer/services/peer.service';

describe('KeyboardShortcutsService', () => {
  let service: KeyboardShortcutsService;
  let store: MockStore<AppState>;
  let router: Router;
  let fullScreenService: FullScreenService;
  let documentPipService: DocumentPipService;
  let peerService: PeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: TestingModuleImports,
      providers: TestingModuleProviders,
    });
    service = TestBed.inject(KeyboardShortcutsService);
    store = TestBed.inject<MockStore<AppState>>(MockStore);
    router = TestBed.inject(Router);
    fullScreenService = TestBed.inject(FullScreenService);
    documentPipService = TestBed.inject(DocumentPipService);
    peerService = TestBed.inject(PeerService);
    jest.spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.shortcutsEnabled()).toBe(true);
    expect(service.shortcuts().togglePause).toBe('p');
    expect(service.shortcuts().clearScreen).toBe('c');
  });

  it('should identify editable targets', () => {
    const input = document.createElement('input');
    const textarea = document.createElement('textarea');
    const select = document.createElement('select');
    const div = document.createElement('div');
    const editableDiv = document.createElement('div');
    editableDiv.contentEditable = 'true';

    expect(service.isEditableTarget(input)).toBe(true);
    expect(service.isEditableTarget(textarea)).toBe(true);
    expect(service.isEditableTarget(select)).toBe(true);
    expect(service.isEditableTarget(editableDiv)).toBe(true);
    expect(service.isEditableTarget(div)).toBe(false);
    expect(service.isEditableTarget(null)).toBe(false);
  });

  it('should reject browser defaults and reserved keys', () => {
    expect(service.isReservedOrBrowserDefault({ key: 'p', ctrlKey: true, metaKey: false, altKey: false })).toBe(true);
    expect(service.isReservedOrBrowserDefault({ key: 'p', ctrlKey: false, metaKey: true, altKey: false })).toBe(true);
    expect(service.isReservedOrBrowserDefault({ key: 'p', ctrlKey: false, metaKey: false, altKey: true })).toBe(true);
    expect(service.isReservedOrBrowserDefault({ key: 'F5', ctrlKey: false, metaKey: false, altKey: false })).toBe(true);
    expect(service.isReservedOrBrowserDefault({ key: 'Tab', ctrlKey: false, metaKey: false, altKey: false })).toBe(true);
    expect(service.isReservedOrBrowserDefault({ key: 'Escape', ctrlKey: false, metaKey: false, altKey: false })).toBe(true);
    expect(service.isReservedOrBrowserDefault({ key: 'p', ctrlKey: false, metaKey: false, altKey: false })).toBe(false);
  });

  it('should match actions case-insensitively and treat "+" / "=" and "-" / "_" as equivalent', () => {
    const eventP = new KeyboardEvent('keydown', { key: 'p' });
    expect(service.getMatchingAction(eventP)).toBe('togglePause');

    const eventUpperP = new KeyboardEvent('keydown', { key: 'P' });
    expect(service.getMatchingAction(eventUpperP)).toBe('togglePause');

    const eventC = new KeyboardEvent('keydown', { key: 'c' });
    expect(service.getMatchingAction(eventC)).toBe('clearScreen');

    const eventPlus = new KeyboardEvent('keydown', { key: '+' });
    expect(service.getMatchingAction(eventPlus)).toBe('increaseTextSize');

    const eventEquals = new KeyboardEvent('keydown', { key: '=' });
    expect(service.getMatchingAction(eventEquals)).toBe('increaseTextSize');

    const eventMinus = new KeyboardEvent('keydown', { key: '-' });
    expect(service.getMatchingAction(eventMinus)).toBe('decreaseTextSize');

    const eventUnderscore = new KeyboardEvent('keydown', { key: '_' });
    expect(service.getMatchingAction(eventUnderscore)).toBe('decreaseTextSize');

    const eventPeriod = new KeyboardEvent('keydown', { key: '.' });
    expect(service.getMatchingAction(eventPeriod)).toBe('increaseHistory');

    const eventComma = new KeyboardEvent('keydown', { key: ',' });
    expect(service.getMatchingAction(eventComma)).toBe('decreaseHistory');
  });

  it('should reject disallowed routes including query strings and fragments in isAllowedRoute()', () => {
    const disallowedBaseRoutes = ['/settings', '/auth', '/about', '/terms', '/user'];
    for (const base of disallowedBaseRoutes) {
      for (const suffix of ['', '/subpath', '?tab=general', '#section', '?foo=1#bar']) {
        jest.spyOn(router, 'url', 'get').mockReturnValue(`${base}${suffix}`);
        expect(service.isAllowedRoute()).toBe(false);
      }
    }

    jest.spyOn(router, 'url', 'get').mockReturnValue('/');
    expect(service.isAllowedRoute()).toBe(true);

    jest.spyOn(router, 'url', 'get').mockReturnValue('/?lang=en#top');
    expect(service.isAllowedRoute()).toBe(true);
  });

  it('should return null from getMatchingAction() for defaultPrevented events and modifier keys', () => {
    const preventedEvent = new KeyboardEvent('keydown', { key: 'p', cancelable: true });
    preventedEvent.preventDefault();
    expect(service.getMatchingAction(preventedEvent)).toBeNull();

    expect(service.getMatchingAction(new KeyboardEvent('keydown', { key: 'p', ctrlKey: true }))).toBeNull();
    expect(service.getMatchingAction(new KeyboardEvent('keydown', { key: 'p', metaKey: true }))).toBeNull();
    expect(service.getMatchingAction(new KeyboardEvent('keydown', { key: 'p', altKey: true }))).toBeNull();
  });

  it('should return null when shortcuts are disabled', () => {
    store.setState({
      ...defaultAppState,
      settings: {
        ...defaultSettingsState,
        shortcutsEnabled: false
      }
    });
    const eventP = new KeyboardEvent('keydown', { key: 'p' });
    expect(service.getMatchingAction(eventP)).toBeNull();
  });

  it('should return null for repeated keydown on non-repeatable actions', () => {
    const repeatedPause = new KeyboardEvent('keydown', { key: 'p', repeat: true });
    expect(service.getMatchingAction(repeatedPause)).toBeNull();

    const repeatedClear = new KeyboardEvent('keydown', { key: 'c', repeat: true });
    expect(service.getMatchingAction(repeatedClear)).toBeNull();

    // Repeatable actions should still match
    const repeatedSize = new KeyboardEvent('keydown', { key: '=', repeat: true });
    expect(service.getMatchingAction(repeatedSize)).toBe('increaseTextSize');
  });

  it('should return null when focus is in editable element', () => {
    const input = document.createElement('input');
    const event = new KeyboardEvent('keydown', { key: 'p' });
    Object.defineProperty(event, 'target', { value: input });
    expect(service.getMatchingAction(event)).toBeNull();
  });

  it('should update matching action when shortcut is customized', () => {
    store.setState({
      ...defaultAppState,
      settings: {
        ...defaultSettingsState,
        shortcuts: {
          ...DefaultKeyboardShortcuts,
          togglePause: 'x'
        }
      }
    });
    const eventX = new KeyboardEvent('keydown', { key: 'x' });
    expect(service.getMatchingAction(eventX)).toBe('togglePause');

    const eventP = new KeyboardEvent('keydown', { key: 'p' });
    expect(service.getMatchingAction(eventP)).toBeNull();
  });

  it('should format shortcut displays', () => {
    expect(service.formatShortcut('togglePause')).toBe(' (P)');
    expect(service.formatShortcut('clearScreen')).toBe(' (C)');
    expect(service.formatShortcut('increaseTextSize')).toBe(' (+)');
    expect(service.formatPairShortcut('increaseTextSize', 'decreaseTextSize')).toBe(' (+ / -)');
  });

  it('should handle toggleRecognition across recognition states', () => {
    // Uninitialized / disconnected -> connects
    store.setState({
      ...defaultAppState,
      recognition: { ...defaultAppState.recognition, status: RecognitionStatus.uninitialized }
    });
    service.toggleRecognition();
    expect(store.dispatch).toHaveBeenCalledWith(RecognitionActions.connect({ id: 'default' }));

    // Connected -> pauses
    store.setState({
      ...defaultAppState,
      recognition: { ...defaultAppState.recognition, status: RecognitionStatus.connected }
    });
    service.toggleRecognition();
    expect(store.dispatch).toHaveBeenCalledWith(RecognitionActions.pause());

    // Paused -> resumes
    store.setState({
      ...defaultAppState,
      recognition: { ...defaultAppState.recognition, status: RecognitionStatus.paused }
    });
    service.toggleRecognition();
    expect(store.dispatch).toHaveBeenCalledWith(RecognitionActions.resume());
  });

  it('should clear screen and broadcast empty results on clearScreen()', () => {
    peerService.liveText$.next('in progress');
    peerService.textOutput$.next(['done']);

    service.clearScreen();

    expect(store.dispatch).toHaveBeenCalledWith(RecognitionActions.clear());
    expect(peerService.liveText$.value).toBe('');
    expect(peerService.textOutput$.value).toEqual([]);
  });

  it('should invoke the mapped handler method for each default shortcut key in handleKeyboardEvent(), call preventDefault(), and return true or false appropriately', () => {
    jest.spyOn(service, 'toggleRecognition');
    jest.spyOn(service, 'clearScreen');
    jest.spyOn(service, 'increaseTextSize');
    jest.spyOn(service, 'decreaseTextSize');
    jest.spyOn(service, 'increaseLineHeight');
    jest.spyOn(service, 'decreaseLineHeight');
    jest.spyOn(service, 'increaseRenderHistory');
    jest.spyOn(service, 'decreaseRenderHistory');
    jest.spyOn(service, 'toggleTextFlow');
    jest.spyOn(service, 'toggleFullscreen');
    jest.spyOn(service, 'togglePip');

    const eventP = new KeyboardEvent('keydown', { key: 'p', cancelable: true });
    const preventDefaultSpy = jest.spyOn(eventP, 'preventDefault');
    expect(service.handleKeyboardEvent(eventP)).toBe(true);
    expect(service.toggleRecognition).toHaveBeenCalled();
    expect(preventDefaultSpy).toHaveBeenCalled();

    expect(service.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'c', cancelable: true }))).toBe(true);
    expect(service.clearScreen).toHaveBeenCalled();

    expect(service.handleKeyboardEvent(new KeyboardEvent('keydown', { key: '=', cancelable: true }))).toBe(true);
    expect(service.increaseTextSize).toHaveBeenCalled();

    expect(service.handleKeyboardEvent(new KeyboardEvent('keydown', { key: '-', cancelable: true }))).toBe(true);
    expect(service.decreaseTextSize).toHaveBeenCalled();

    expect(service.handleKeyboardEvent(new KeyboardEvent('keydown', { key: ']', cancelable: true }))).toBe(true);
    expect(service.increaseLineHeight).toHaveBeenCalled();

    expect(service.handleKeyboardEvent(new KeyboardEvent('keydown', { key: '[', cancelable: true }))).toBe(true);
    expect(service.decreaseLineHeight).toHaveBeenCalled();

    expect(service.handleKeyboardEvent(new KeyboardEvent('keydown', { key: '.', cancelable: true }))).toBe(true);
    expect(service.increaseRenderHistory).toHaveBeenCalled();

    expect(service.handleKeyboardEvent(new KeyboardEvent('keydown', { key: ',', cancelable: true }))).toBe(true);
    expect(service.decreaseRenderHistory).toHaveBeenCalled();

    expect(service.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'd', cancelable: true }))).toBe(true);
    expect(service.toggleTextFlow).toHaveBeenCalled();

    expect(service.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'm', cancelable: true }))).toBe(true);
    expect(service.toggleFullscreen).toHaveBeenCalled();

    expect(service.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'i', cancelable: true }))).toBe(true);
    expect(service.togglePip).toHaveBeenCalled();

    const unmatchedEvent = new KeyboardEvent('keydown', { key: 'z', cancelable: true });
    const unmatchedPreventSpy = jest.spyOn(unmatchedEvent, 'preventDefault');
    expect(service.handleKeyboardEvent(unmatchedEvent)).toBe(false);
    expect(unmatchedPreventSpy).not.toHaveBeenCalled();
  });

  it('should enforce upper and lower bounds for increaseTextSize() and decreaseTextSize()', () => {
    const minSize = AvailableTextSizes[0];
    const secondSize = AvailableTextSizes[1];
    const secondLastSize = AvailableTextSizes[AvailableTextSizes.length - 2];
    const maxSize = AvailableTextSizes[AvailableTextSizes.length - 1];

    // At lower bound: decreaseTextSize should not dispatch, increaseTextSize should step up
    store.setState({
      ...defaultAppState,
      settings: { ...defaultSettingsState, textSize: minSize }
    });
    (store.dispatch as jest.Mock).mockClear();
    service.decreaseTextSize();
    expect(store.dispatch).not.toHaveBeenCalled();

    service.increaseTextSize();
    expect(store.dispatch).toHaveBeenCalledWith(SettingsActions.setTextSize({ size: secondSize }));

    // At upper bound: increaseTextSize should not dispatch, decreaseTextSize should step down
    store.setState({
      ...defaultAppState,
      settings: { ...defaultSettingsState, textSize: maxSize }
    });
    (store.dispatch as jest.Mock).mockClear();
    service.increaseTextSize();
    expect(store.dispatch).not.toHaveBeenCalled();

    service.decreaseTextSize();
    expect(store.dispatch).toHaveBeenCalledWith(SettingsActions.setTextSize({ size: secondLastSize }));
  });

  it('should enforce upper and lower bounds for increaseRenderHistory() and decreaseRenderHistory()', () => {
    // At lower bound (0): decreaseRenderHistory should not dispatch, increaseRenderHistory should dispatch 1
    store.setState({
      ...defaultAppState,
      settings: { ...defaultSettingsState, renderHistory: 0 }
    });
    (store.dispatch as jest.Mock).mockClear();
    service.decreaseRenderHistory();
    expect(store.dispatch).not.toHaveBeenCalled();

    service.increaseRenderHistory();
    expect(store.dispatch).toHaveBeenCalledWith(SettingsActions.setRenderHistory({ count: 1 }));

    // At upper bound (25): increaseRenderHistory should not dispatch, decreaseRenderHistory should dispatch 24
    store.setState({
      ...defaultAppState,
      settings: { ...defaultSettingsState, renderHistory: 25 }
    });
    (store.dispatch as jest.Mock).mockClear();
    service.increaseRenderHistory();
    expect(store.dispatch).not.toHaveBeenCalled();

    service.decreaseRenderHistory();
    expect(store.dispatch).toHaveBeenCalledWith(SettingsActions.setRenderHistory({ count: 24 }));
  });
});
