import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app.model';
import { RecognitionStatus } from '../../models/recognition.model';
import {
  AvailableLineHeights,
  AvailableTextSizes,
  DefaultKeyboardShortcuts,
  KeyboardShortcutsMap,
  LineHeight,
  SettingsActions,
  ShortcutActionId,
  TextFlow,
  TextSize,
} from '../../modules/settings/models/settings.model';
import { RecognitionActions } from '../../actions/recogntion.actions';
import {
  selectLineHeight,
  selectRenderHistoryLength,
  selectShortcuts,
  selectShortcutsEnabled,
  selectTextFlow,
  selectTextSize,
} from '../../selectors/settings.selector';
import { recognitionStatusSelector } from '../../selectors/recognition.selector';
import { FullScreenService } from '../full-screen/full-screen.service';
import { DocumentPipService } from '../document-pip/document-pip.service';
import { isEditableTarget } from './editable-target';

export const RESERVED_BROWSER_KEYS: ReadonlySet<string> = new Set([
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'Tab',
  'Escape',
  'Enter',
  ' ',
  'Spacebar',
  'Backspace',
  'Delete',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ContextMenu',
  'Meta',
  'Control',
  'Alt',
  'Shift',
  'CapsLock',
  'NumLock',
  'ScrollLock',
  'Insert',
  'PrintScreen',
  'Pause',
  'Dead',
  'Unidentified',
]);

export const NON_REPEATABLE_ACTIONS: ReadonlySet<ShortcutActionId> = new Set([
  'togglePause',
  'clearScreen',
  'toggleFlow',
  'toggleFullscreen',
  'togglePip',
]);

export const CODE_TO_LABEL_MAP: Record<string, string> = {
  Equal: '+',
  Minus: '-',
  BracketRight: ']',
  BracketLeft: '[',
  Period: '.',
  Comma: ',',
  Slash: '/',
  Backquote: '`',
  Backslash: '\\',
  Semicolon: ';',
  Quote: "'",
};

export const KEY_TO_CODE_MAP: Record<string, string> = {
  'p': 'KeyP',
  'c': 'KeyC',
  '=': 'Equal',
  '+': 'Equal',
  '-': 'Minus',
  '_': 'Minus',
  ']': 'BracketRight',
  '[': 'BracketLeft',
  '.': 'Period',
  '>': 'Period',
  ',': 'Comma',
  '<': 'Comma',
  'd': 'KeyD',
  'm': 'KeyM',
  'i': 'KeyI',
};

@Injectable({
  providedIn: 'root'
})
export class KeyboardShortcutsService {
  public readonly shortcutsEnabled: Signal<boolean>;
  public readonly shortcuts: Signal<KeyboardShortcutsMap>;
  public readonly availableActions: WritableSignal<ReadonlySet<ShortcutActionId>> = signal(new Set());
  public readonly recordingShortcut: WritableSignal<boolean> = signal(false);

  public readonly recognitionStatus: Signal<RecognitionStatus | undefined>;
  public readonly textSize: Signal<TextSize | undefined>;
  public readonly lineHeight: Signal<LineHeight | undefined>;
  public readonly renderHistoryLength: Signal<number | undefined>;
  public readonly textFlow: Signal<TextFlow | undefined>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fullScreenService: FullScreenService,
    private documentPipService: DocumentPipService
  ) {
    const enabled = toSignal(this.store.select(selectShortcutsEnabled));
    const mapSignal = toSignal(this.store.select(selectShortcuts));

    this.shortcutsEnabled = computed(() => enabled() ?? true);
    this.shortcuts = computed(() => ({
      ...DefaultKeyboardShortcuts,
      ...(mapSignal() ?? {})
    }));

    this.recognitionStatus = toSignal(this.store.select(recognitionStatusSelector));
    this.textSize = toSignal(this.store.select(selectTextSize));
    this.lineHeight = toSignal(this.store.select(selectLineHeight));
    this.renderHistoryLength = toSignal(this.store.select(selectRenderHistoryLength));
    this.textFlow = toSignal(this.store.select(selectTextFlow));
  }

  public isAllowedRoute(): boolean {
    const rawUrl = this.router?.url || '/';
    const url = rawUrl.split('?')[0].split('#')[0];
    if (
      url.startsWith('/settings') ||
      url.startsWith('/auth') ||
      url.startsWith('/about') ||
      url.startsWith('/terms') ||
      url.startsWith('/user')
    ) {
      return false;
    }
    return true;
  }

  public isEditableTarget(target: EventTarget | null): boolean {
    return isEditableTarget(target);
  }

  public isReservedOrBrowserDefault(event: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'altKey'>): boolean {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return true;
    }
    if (event.key && RESERVED_BROWSER_KEYS.has(event.key)) {
      return true;
    }
    return false;
  }

  public setAvailableActions(actions: Iterable<ShortcutActionId>): void {
    this.availableActions.set(new Set(actions));
  }

  public clearAvailableActions(): void {
    this.availableActions.set(new Set());
  }

  public setRecordingShortcut(recording: boolean): void {
    this.recordingShortcut.set(recording);
  }

  public normalizeKey(key: string): string {
    return key.length === 1 ? key.toLowerCase() : key;
  }

  public formatKeyLabel(key: string): string {
    if (CODE_TO_LABEL_MAP[key]) {
      return CODE_TO_LABEL_MAP[key];
    }
    if (key.startsWith('Key')) {
      return key.slice(3).toUpperCase();
    }
    if (key.startsWith('Digit')) {
      return key.slice(5);
    }
    const mappedCode = KEY_TO_CODE_MAP[key.toLowerCase()];
    if (mappedCode) {
      if (CODE_TO_LABEL_MAP[mappedCode]) {
        return CODE_TO_LABEL_MAP[mappedCode];
      }
      if (mappedCode.startsWith('Key')) {
        return mappedCode.slice(3).toUpperCase();
      }
    }
    if (key === '=') return '+';
    return key.toUpperCase();
  }

  public formatShortcut(actionId: ShortcutActionId): string {
    if (!this.shortcutsEnabled()) {
      return '';
    }
    const key = this.shortcuts()[actionId];
    if (!key) {
      return '';
    }
    return ` (${this.formatKeyLabel(key)})`;
  }

  public formatPairShortcut(action1: ShortcutActionId, action2: ShortcutActionId): string {
    if (!this.shortcutsEnabled()) {
      return '';
    }
    const k1 = this.shortcuts()[action1];
    const k2 = this.shortcuts()[action2];
    if (!k1 && !k2) {
      return '';
    }
    return ` (${this.formatKeyLabel(k1 || '')} / ${this.formatKeyLabel(k2 || '')})`;
  }

  public getMatchingAction(event: KeyboardEvent): ShortcutActionId | null {
    if (event.defaultPrevented) {
      return null;
    }
    if (!this.shortcutsEnabled()) {
      return null;
    }
    if (this.recordingShortcut()) {
      return null;
    }
    if (!this.isAllowedRoute()) {
      return null;
    }
    if (this.isEditableTarget(event.target)) {
      return null;
    }
    if (this.isReservedOrBrowserDefault(event)) {
      return null;
    }

    const eventCode = event.code;
    const pressed = this.normalizeKey(event.key);
    const activeMap = this.shortcuts();
    const available = this.availableActions();
    const useCode = Boolean(eventCode && eventCode !== 'Unidentified');

    for (const [actionId, boundKey] of Object.entries(activeMap) as [ShortcutActionId, string][]) {
      if (!available.has(actionId)) {
        continue;
      }

      const matchesCode = Boolean(boundKey === eventCode || KEY_TO_CODE_MAP[boundKey.toLowerCase()] === eventCode);
      const normalizedBound = this.normalizeKey(boundKey);
      const mappedPressedCode = pressed ? KEY_TO_CODE_MAP[pressed] : undefined;
      const boundLabel = (CODE_TO_LABEL_MAP[boundKey] || (boundKey.startsWith('Key') ? boundKey.slice(3) : '')).toLowerCase();
      const isEquivalentPlus = (normalizedBound === '=' && pressed === '+') || (normalizedBound === '+' && pressed === '=');
      const isEquivalentMinus = (normalizedBound === '-' && pressed === '_') || (normalizedBound === '_' && pressed === '-');
      const matchesKey = Boolean(pressed && (
        pressed === normalizedBound ||
        pressed === boundLabel ||
        (mappedPressedCode !== undefined && mappedPressedCode === boundKey) ||
        isEquivalentPlus ||
        isEquivalentMinus
      ));

      const matches = useCode ? matchesCode : matchesKey;

      if (matches) {
        if (event.repeat && NON_REPEATABLE_ACTIONS.has(actionId)) {
          return null;
        }
        return actionId;
      }
    }

    return null;
  }

  public handleKeyboardEvent(event: KeyboardEvent): boolean {
    const action = this.getMatchingAction(event);
    if (!action) {
      return false;
    }

    switch (action) {
      case 'togglePause':
        this.toggleRecognition();
        event.preventDefault();
        return true;
      case 'clearScreen':
        this.clearScreen();
        event.preventDefault();
        return true;
      case 'increaseTextSize':
        this.increaseTextSize();
        event.preventDefault();
        return true;
      case 'decreaseTextSize':
        this.decreaseTextSize();
        event.preventDefault();
        return true;
      case 'increaseLineHeight':
        this.increaseLineHeight();
        event.preventDefault();
        return true;
      case 'decreaseLineHeight':
        this.decreaseLineHeight();
        event.preventDefault();
        return true;
      case 'increaseHistory':
        this.increaseRenderHistory();
        event.preventDefault();
        return true;
      case 'decreaseHistory':
        this.decreaseRenderHistory();
        event.preventDefault();
        return true;
      case 'toggleFlow':
        this.toggleTextFlow();
        event.preventDefault();
        return true;
      case 'toggleFullscreen':
        this.toggleFullscreen();
        event.preventDefault();
        return true;
      case 'togglePip':
        this.togglePip();
        event.preventDefault();
        return true;
    }
  }

  public toggleRecognition(): void {
    const status = this.recognitionStatus();
    if (status === RecognitionStatus.connected) {
      this.store.dispatch(RecognitionActions.pause());
    } else if (status === RecognitionStatus.paused) {
      this.store.dispatch(RecognitionActions.resume());
    }
  }

  public clearScreen(): void {
    this.store.dispatch(RecognitionActions.clear());
  }

  public increaseTextSize(): void {
    const current = this.textSize();
    const idx = AvailableTextSizes.findIndex((size) => size === current);
    if (idx !== -1 && idx < AvailableTextSizes.length - 1) {
      this.store.dispatch(SettingsActions.setTextSize({ size: AvailableTextSizes[idx + 1] }));
    }
  }

  public decreaseTextSize(): void {
    const current = this.textSize();
    const idx = AvailableTextSizes.findIndex((size) => size === current);
    if (idx > 0) {
      this.store.dispatch(SettingsActions.setTextSize({ size: AvailableTextSizes[idx - 1] }));
    }
  }

  public increaseLineHeight(): void {
    const current = this.lineHeight();
    const idx = AvailableLineHeights.findIndex((height) => height === current);
    if (idx !== -1 && idx < AvailableLineHeights.length - 1) {
      this.store.dispatch(SettingsActions.setLineHeight({ height: AvailableLineHeights[idx + 1] }));
    }
  }

  public decreaseLineHeight(): void {
    const current = this.lineHeight();
    const idx = AvailableLineHeights.findIndex((height) => height === current);
    if (idx > 0) {
      this.store.dispatch(SettingsActions.setLineHeight({ height: AvailableLineHeights[idx - 1] }));
    }
  }

  public increaseRenderHistory(): void {
    const count = (this.renderHistoryLength() ?? 15) + 1;
    if (count <= 25) {
      this.store.dispatch(SettingsActions.setRenderHistory({ count }));
    }
  }

  public decreaseRenderHistory(): void {
    const count = (this.renderHistoryLength() ?? 15) - 1;
    if (count >= 0) {
      this.store.dispatch(SettingsActions.setRenderHistory({ count }));
    }
  }

  public toggleTextFlow(): void {
    const current = this.textFlow();
    const nextFlow: TextFlow = current === 'top-down' ? 'bottom-up' : 'top-down';
    this.store.dispatch(SettingsActions.setTextFlow({ flow: nextFlow }));
  }

  public toggleFullscreen(): void {
    if (this.fullScreenService.isAvailable) {
      this.fullScreenService.toggle();
    }
  }

  public togglePip(): void {
    if (this.documentPipService.isSupported) {
      this.documentPipService.toggle();
    }
  }
}
