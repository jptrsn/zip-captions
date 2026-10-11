import { PaneOrder, PipContent, TranslationDisplayMode } from '../../modules/settings/models/settings.model';

/** What the caption area shows */
export type CaptionView = 'original' | 'translated' | 'split';

/**
 * Resolves the view from the display mode. While Picture-in-Picture is active and translation is on,
 * the PiP content setting decides. With translation off there is nothing to translate, so the
 * original is shown everywhere.
 */
export function resolveCaptionView(mode: TranslationDisplayMode, pipActive: boolean, pipContent: PipContent): CaptionView {
  if (mode === 'off') return 'original';
  if (pipActive) return pipContent;
  return mode === 'split' ? 'split' : 'translated';
}

/** The panes of a split view, in rendering order */
export function splitPaneOrder(order: PaneOrder): ('original' | 'translated')[] {
  return order === 'translated-first' ? ['translated', 'original'] : ['original', 'translated'];
}
