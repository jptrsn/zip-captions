import { Component, HostListener, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { KeyboardShortcutsService } from '../../../../services/keyboard-shortcuts/keyboard-shortcuts.service';
import { DefaultKeyboardShortcuts, KeyboardShortcutsMap, SettingsActions, ShortcutActionId } from '../../models/settings.model';
import { selectShortcuts, selectShortcutsEnabled } from '../../../../selectors/settings.selector';

export interface ShortcutActionDefinition {
  id: ShortcutActionId;
  labelKey: string;
  descKey: string;
}

export const SHORTCUT_ACTION_LIST: ShortcutActionDefinition[] = [
  { id: 'togglePause', labelKey: 'SHORTCUTS.togglePause', descKey: 'SHORTCUTS.togglePauseDesc' },
  { id: 'clearScreen', labelKey: 'SHORTCUTS.clearScreen', descKey: 'SHORTCUTS.clearScreenDesc' },
  { id: 'increaseTextSize', labelKey: 'SHORTCUTS.increaseTextSize', descKey: 'SHORTCUTS.increaseTextSizeDesc' },
  { id: 'decreaseTextSize', labelKey: 'SHORTCUTS.decreaseTextSize', descKey: 'SHORTCUTS.decreaseTextSizeDesc' },
  { id: 'increaseLineHeight', labelKey: 'SHORTCUTS.increaseLineHeight', descKey: 'SHORTCUTS.increaseLineHeightDesc' },
  { id: 'decreaseLineHeight', labelKey: 'SHORTCUTS.decreaseLineHeight', descKey: 'SHORTCUTS.decreaseLineHeightDesc' },
  { id: 'increaseHistory', labelKey: 'SHORTCUTS.increaseHistory', descKey: 'SHORTCUTS.increaseHistoryDesc' },
  { id: 'decreaseHistory', labelKey: 'SHORTCUTS.decreaseHistory', descKey: 'SHORTCUTS.decreaseHistoryDesc' },
  { id: 'toggleFlow', labelKey: 'SHORTCUTS.toggleFlow', descKey: 'SHORTCUTS.toggleFlowDesc' },
  { id: 'toggleFullscreen', labelKey: 'SHORTCUTS.toggleFullscreen', descKey: 'SHORTCUTS.toggleFullscreenDesc' },
  { id: 'togglePip', labelKey: 'SHORTCUTS.togglePip', descKey: 'SHORTCUTS.togglePipDesc' },
];

@Component({
  selector: 'app-keyboard-shortcuts-settings',
  templateUrl: './keyboard-shortcuts-settings.component.html',
  styleUrls: ['./keyboard-shortcuts-settings.component.scss']
})
export class KeyboardShortcutsSettingsComponent {
  public shortcutsEnabled: Signal<boolean>;
  public shortcuts: Signal<KeyboardShortcutsMap>;
  public actionList = SHORTCUT_ACTION_LIST;
  public recordingActionId: ShortcutActionId | null = null;
  public errorMessage: string | null = null;

  constructor(private store: Store<AppState>,
              private shortcutsService: KeyboardShortcutsService) {
    this.shortcutsEnabled = toSignal(this.store.select(selectShortcutsEnabled), { initialValue: true });
    this.shortcuts = toSignal(this.store.select(selectShortcuts), { initialValue: DefaultKeyboardShortcuts });
  }

  toggleEnabled(enabled: boolean): void {
    this.store.dispatch(SettingsActions.setShortcutsEnabled({ enabled }));
  }

  startRecording(actionId: ShortcutActionId): void {
    this.recordingActionId = actionId;
    this.errorMessage = null;
  }

  cancelRecording(): void {
    this.recordingActionId = null;
    this.errorMessage = null;
  }

  resetToDefaults(): void {
    this.store.dispatch(SettingsActions.resetShortcuts());
    this.cancelRecording();
  }

  formatKey(key: string): string {
    return this.shortcutsService.formatKeyLabel(key);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.recordingActionId) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.cancelRecording();
      return;
    }

    if (this.shortcutsService.isReservedOrBrowserDefault(event)) {
      this.errorMessage = 'SHORTCUTS.invalidKey';
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const newKey = this.shortcutsService.normalizeKey(event.key);
    const currentShortcuts = { ...this.shortcuts() };
    const currentAction = this.recordingActionId;

    // Check if newKey is already used by another action
    const existingConflict = (Object.entries(currentShortcuts) as [ShortcutActionId, string][]).find(
      ([actionId, key]) => {
        if (actionId === currentAction) {
          return false;
        }
        const normalizedBound = this.shortcutsService.normalizeKey(key);
        const isEquivalentPlus = (normalizedBound === '=' && newKey === '+') || (normalizedBound === '+' && newKey === '=');
        const isEquivalentMinus = (normalizedBound === '-' && newKey === '_') || (normalizedBound === '_' && newKey === '-');
        return normalizedBound === newKey || isEquivalentPlus || isEquivalentMinus;
      }
    );

    if (existingConflict) {
      // Swap keys cleanly to prevent duplicate collision
      const [conflictActionId] = existingConflict;
      const previousKeyForCurrentAction = currentShortcuts[currentAction];
      currentShortcuts[conflictActionId] = previousKeyForCurrentAction;
      currentShortcuts[currentAction] = newKey;
      this.store.dispatch(SettingsActions.setShortcuts({ shortcuts: currentShortcuts }));
    } else {
      this.store.dispatch(SettingsActions.setShortcut({ actionId: currentAction, key: newKey }));
    }

    this.cancelRecording();
  }
}
