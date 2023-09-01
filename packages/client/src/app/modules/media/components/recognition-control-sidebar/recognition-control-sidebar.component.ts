import { Component, Input, Renderer2, Signal, ViewChildren, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectLineHeight, selectTextSize } from '../../../../selectors/settings.selector';
import { AvailableLineHeights, AvailableTextSizes, LineHeight, SettingsActions, TextSize } from '../../../settings/models/settings.model';

@Component({
  selector: 'app-recognition-control-sidebar',
  templateUrl: './recognition-control-sidebar.component.html',
  styleUrls: ['./recognition-control-sidebar.component.scss'],
})
export class RecognitionControlSidebarComponent {
  @ViewChildren('details') subMenus!: HTMLElement[];
  @Input() showPause = false;
  public textSize: Signal<TextSize>;
  public textSizeMax: Signal<boolean>;
  public textSizeMin: Signal<boolean>;

  public lineHeight: Signal<LineHeight>;
  public lineHeightMin: Signal<boolean>;
  public lineHeightMax: Signal<boolean>;

  private availableTextSizes = AvailableTextSizes;
  private availableLineHeights = AvailableLineHeights;

  constructor(private store: Store<AppState>,
              private renderer: Renderer2) {
    this.textSize = toSignal(this.store.select(selectTextSize)) as Signal<TextSize>;
    this.textSizeMax = computed(() => this.textSize() === this.availableTextSizes[this.availableTextSizes.length - 1]);
    this.textSizeMin = computed(() => this.textSize() === this.availableTextSizes[0]);

    this.lineHeight = toSignal(this.store.select(selectLineHeight)) as Signal<LineHeight>;
    this.lineHeightMax = computed(() => this.lineHeight() === this.availableLineHeights[this.availableLineHeights.length - 1]);
    this.lineHeightMin = computed(() => this.lineHeight() === this.availableLineHeights[0]);
  }

  hideElements(elements: HTMLElement[]) {
    for (const el of elements) {
      this.renderer.removeAttribute(el, 'open');
    }
  }

  increaseTextSize(): void {
    if (!this.textSizeMax()) {
      const idx = this.availableTextSizes.findIndex((size: TextSize) => size === this.textSize());
      this.store.dispatch(SettingsActions.setTextSize({size: this.availableTextSizes[idx+1]}));
    }
  }

  decreaseTextSize(): void {
    if (!this.textSizeMin()) {
      const idx = this.availableTextSizes.findIndex((size: TextSize) => size === this.textSize());
      this.store.dispatch(SettingsActions.setTextSize({size: this.availableTextSizes[idx-1]}));
    }
  }

  increaseLineHeight(): void {
    if (!this.lineHeightMax()) {
      const idx = this.availableLineHeights.findIndex((height: LineHeight) => height === this.lineHeight());
      this.store.dispatch(SettingsActions.setLineHeight({height: this.availableLineHeights[idx+1]}));
    }
  }

  decreaseLineHeight(): void {
    if (!this.lineHeightMin()) {
      const idx = this.availableLineHeights.findIndex((height: LineHeight) => height === this.lineHeight());
      this.store.dispatch(SettingsActions.setLineHeight({height: this.availableLineHeights[idx-1]}));
    }
  }
}
