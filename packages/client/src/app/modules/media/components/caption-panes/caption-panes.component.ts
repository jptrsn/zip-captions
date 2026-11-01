import { Component, Input, Signal } from '@angular/core';
import { PaneOrder, SplitOrientation } from '../../../settings/models/settings.model';
import { CaptionLine } from '../../../../services/translator/caption-lines';
import { CaptionView, splitPaneOrder } from '../../../../services/translator/caption-view';

/**
 * The caption area: the original pane, the translated pane, or both (stacked or side by side, in either
 * order). Shared by the caption view and the broadcast viewer. It is presentational: the translated
 * pane's controls and the split layout controls are projected by the parent.
 *
 *   <div translatedControls> … </div>   controls shown in the translated pane (language select, download)
 *   <div dividerControls> … </div>      controls centred on the divider of a split view
 */
@Component({
  selector: 'app-caption-panes',
  templateUrl: './caption-panes.component.html',
  host: { class: 'flex flex-1 flex-col min-h-0 min-w-0' },
})
export class CaptionPanesComponent {
  @Input({ required: true }) view!: CaptionView;
  @Input() orientation: SplitOrientation = 'vertical';
  @Input() paneOrder: PaneOrder = 'original-first';
  @Input() controlsVisible = true;
  @Input() textFlowDown: boolean | undefined = false;
  @Input() hintText = 'HINTS.beginSpeaking';

  /** Label on the original pane in a split view */
  @Input() originalLabel = '';
  @Input() originalLang = 'en';
  @Input() originalDir: 'ltr' | 'rtl' = 'ltr';
  @Input() translatedLang = 'es';
  @Input() translatedDir: 'ltr' | 'rtl' = 'ltr';

  @Input({ required: true }) connected!: Signal<boolean | undefined>;
  @Input({ required: true }) error!: Signal<string | undefined>;
  @Input({ required: true }) renderHistory!: Signal<number | undefined>;
  @Input({ required: true }) hasLiveResults!: Signal<boolean>;
  @Input({ required: true }) hasTranslatedResults!: Signal<boolean>;
  @Input({ required: true }) originalLines!: Signal<CaptionLine[]>;
  @Input({ required: true }) translatedLines!: Signal<CaptionLine[]>;
  @Input({ required: true }) liveText!: Signal<string>;
  @Input({ required: true }) translatedLiveText!: Signal<string>;

  get panes(): ('original' | 'translated')[] {
    return splitPaneOrder(this.paneOrder);
  }
}
