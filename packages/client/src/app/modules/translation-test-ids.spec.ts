import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Test IDs the translation feature's templates must keep, so end-to-end and browser tests can find
 * them. Component specs for these screens can't be set up here, so this reads the templates.
 * Adding a control to the feature? Give it a `data-testid` and list it here.
 */
const REQUIRED: Record<string, string[]> = {
  'media/components/caption-panes/caption-panes.component.html': [
    'zc-split', 'zc-caption-pane-', 'zc-caption-pane-label-original',
  ],
  'media/components/recognized-text/recognized-text.component.html': [
    'zc-caption-line', 'zc-line-lang', 'zc-line-pending',
  ],
  'media/components/recognition-render/recognition-render.component.html': [
    'zc-caption-translated-controls', 'zc-caption-target-lang', 'zc-caption-download-model',
    'zc-caption-download-progress', 'zc-caption-translate-failed', 'zc-caption-divider-controls', 'zc-caption-orientation', 'zc-caption-swap-panes',
    'zc-pip-feed-switch', 'zc-pip-feed-original', 'zc-pip-feed-translated', 'zc-pip-feed-split', 'zc-pip-return',
  ],
  'peer/components/broadcast-render/broadcast-render.component.html': [
    'zc-viewer-translated-controls', 'zc-viewer-target-lang', 'zc-viewer-download-model', 'zc-viewer-download-progress', 'zc-viewer-translate-failed', 'zc-viewer-show-translation',
    'zc-viewer-divider-controls', 'zc-caption-orientation', 'zc-caption-swap-panes',
  ],
  'media/components/recognition-control-sidebar/recognition-control-sidebar.component.html': [
    'zc-sidebar-target-lang', 'zc-sidebar-layout', 'zc-sidebar-swap-panes',
    'zc-sidebar-orientation-vertical', 'zc-sidebar-orientation-horizontal',
    'zc-sidebar-pip-original', 'zc-sidebar-pip-translated', 'zc-sidebar-pip-split',
  ],
  'settings/components/obs-studio-settings/obs-studio-settings.component.html': [
    'zc-obs-caption-source', 'zc-obs-feed-original', 'zc-obs-feed-translated',
    'zc-obs-feed-fallback-hint', 'zc-obs-feed-language-hint',
  ],
  'settings/components/translation-settings/translation-settings.component.html': [
    'zc-translation-enable', 'zc-translation-spoken-lang', 'zc-translation-target-lang',
    'zc-translation-orientation', 'zc-translation-orientation-vertical',
    'zc-translation-orientation-horizontal', 'zc-translation-pip-content', 'zc-translation-pip-original',
    'zc-translation-pip-translated', 'zc-translation-pip-split', 'zc-translation-models-link',
    'zc-translation-unsupported-reason',
  ],
};

describe('translation feature test IDs', () => {
  it.each(Object.entries(REQUIRED))('%s', (path, ids) => {
    const html = readFileSync(join(__dirname, path), 'utf8');
    // zc-translation-spoken-lang is passed to the language selector as `testId`
    const missing = ids.filter((id) => !html.includes(id));
    expect(missing).toEqual([]);
  });
});
