import { resolveCaptionView, showPipFeedSwitch, splitPaneOrder } from './caption-view';

describe('showPipFeedSwitch', () => {
  it('shows only while Picture-in-Picture is open and translation is on', () => {
    expect(showPipFeedSwitch('split', true)).toBe(true);
    expect(showPipFeedSwitch('translated-only', true)).toBe(true);
  });

  it('is hidden when Picture-in-Picture is closed', () => {
    expect(showPipFeedSwitch('split', false)).toBe(false);
    expect(showPipFeedSwitch('translated-only', false)).toBe(false);
  });

  it('is hidden when translation is off, since there is nothing to switch', () => {
    expect(showPipFeedSwitch('off', true)).toBe(false);
    expect(showPipFeedSwitch('off', false)).toBe(false);
  });
});

describe('original-only mode', () => {
  it('shows the original, while translation stays on', () => {
    expect(resolveCaptionView('original-only', false, 'split')).toBe('original');
  });

  it('still lets the PiP content setting decide inside the PiP window', () => {
    expect(resolveCaptionView('original-only', true, 'translated')).toBe('translated');
    expect(showPipFeedSwitch('original-only', true)).toBe(true);
  });
});

describe('resolveCaptionView', () => {
  it('shows the original whenever translation is off, even in Picture-in-Picture', () => {
    expect(resolveCaptionView('off', false, 'translated')).toBe('original');
    expect(resolveCaptionView('off', true, 'split')).toBe('original');
  });

  it('follows the display mode outside Picture-in-Picture', () => {
    expect(resolveCaptionView('split', false, 'original')).toBe('split');
    expect(resolveCaptionView('translated-only', false, 'split')).toBe('translated');
  });

  it('uses the Picture-in-Picture content while Picture-in-Picture is active', () => {
    (['original', 'translated', 'split'] as const).forEach((content) => {
      expect(resolveCaptionView('split', true, content)).toBe(content);
      expect(resolveCaptionView('translated-only', true, content)).toBe(content);
    });
  });
});

describe('splitPaneOrder', () => {
  it('puts the original first by default', () => {
    expect(splitPaneOrder('original-first')).toEqual(['original', 'translated']);
  });

  it('puts the translation first when the panes are swapped', () => {
    expect(splitPaneOrder('translated-first')).toEqual(['translated', 'original']);
  });
});
