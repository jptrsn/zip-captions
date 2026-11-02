import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyboardShortcutsSettingsComponent } from './keyboard-shortcuts-settings.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../models/app.model';
import { SettingsActions } from '../../../settings/models/settings.model';
import { selectShortcutsEnabled } from '../../../../selectors/settings.selector';
import { TranslateService } from '@ngx-translate/core';

describe('KeyboardShortcutsSettingsComponent', () => {
  let component: KeyboardShortcutsSettingsComponent;
  let fixture: ComponentFixture<KeyboardShortcutsSettingsComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [KeyboardShortcutsSettingsComponent],
      providers: TestingModuleProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(KeyboardShortcutsSettingsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject<MockStore<AppState>>(MockStore);
    jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setShortcutsEnabled when toggle is clicked', () => {
    component.toggleEnabled(false);
    expect(store.dispatch).toHaveBeenCalledWith(SettingsActions.setShortcutsEnabled({ enabled: false }));
  });

  it('should dispatch resetShortcuts when reset button is clicked', () => {
    component.resetToDefaults();
    expect(store.dispatch).toHaveBeenCalledWith(SettingsActions.resetShortcuts());
  });

  it('should record a new key and dispatch setShortcut', () => {
    component.startRecording('togglePause');
    expect(component.recordingActionId).toBe('togglePause');

    const event = new KeyboardEvent('keydown', { key: 'q', bubbles: true, cancelable: true });
    window.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(store.dispatch).toHaveBeenCalledWith(SettingsActions.setShortcut({ actionId: 'togglePause', key: 'q' }));
    expect(component.recordingActionId).toBeNull();
  });

  it('should cancel recording when Escape is pressed', () => {
    component.startRecording('clearScreen');
    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    window.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(component.recordingActionId).toBeNull();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should have translated aria-label on cancel recording button', () => {
    const translate = TestBed.inject(TranslateService);
    translate.use('en');
    component.startRecording('clearScreen');
    fixture.detectChanges();

    const cancelButton: HTMLButtonElement = fixture.nativeElement.querySelector('button.btn-circle');
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.getAttribute('aria-label')).toBe('Cancel');
  });

  it('should reject browser reserved keys without preventing default and show error', () => {
    component.startRecording('clearScreen');
    const event = new KeyboardEvent('keydown', { key: 'F5', bubbles: true, cancelable: true });
    window.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(component.errorMessage).toBe('SHORTCUTS.invalidKey');
    expect(component.recordingActionId).toBe('clearScreen');
  });

  it('should swap keys if pressed key is already used by another action', () => {
    component.startRecording('togglePause');
    // 'c' is currently bound to 'clearScreen'
    const event = new KeyboardEvent('keydown', { key: 'c', bubbles: true, cancelable: true });
    window.dispatchEvent(event);

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: SettingsActions.setShortcuts.type,
        shortcuts: expect.objectContaining({
          togglePause: 'c',
          clearScreen: 'p',
        })
      })
    );
  });

  it('should treat "=" and "+" and "-" and "_" as equivalent when checking for conflicts', () => {
    component.startRecording('togglePause');
    // '=' is currently bound to 'increaseTextSize' by default; pressing '+' should conflict with it
    const plusEvent = new KeyboardEvent('keydown', { key: '+', bubbles: true, cancelable: true });
    window.dispatchEvent(plusEvent);

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: SettingsActions.setShortcuts.type,
        shortcuts: expect.objectContaining({
          togglePause: '+',
          increaseTextSize: 'p',
        })
      })
    );

    component.startRecording('clearScreen');
    // '-' is currently bound to 'decreaseTextSize' by default; pressing '_' should conflict with it
    const underscoreEvent = new KeyboardEvent('keydown', { key: '_', bubbles: true, cancelable: true });
    window.dispatchEvent(underscoreEvent);

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: SettingsActions.setShortcuts.type,
        shortcuts: expect.objectContaining({
          clearScreen: '_',
          decreaseTextSize: 'c',
        })
      })
    );
  });

  it('should disable the reset and shortcut recording buttons when shortcuts are disabled', () => {
    store.overrideSelector(selectShortcutsEnabled, false);
    store.refreshState();
    fixture.detectChanges();

    const resetButton: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="zc-shortcuts-reset"]');
    expect(resetButton.disabled).toBe(true);

    const shortcutButtons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('[data-testid^="zc-shortcut-"]');
    expect(shortcutButtons.length).toBe(component.actionList.length);
    shortcutButtons.forEach((button) => {
      expect(button.disabled).toBe(true);
    });
  });
});
