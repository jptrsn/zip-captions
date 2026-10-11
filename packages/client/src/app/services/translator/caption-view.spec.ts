import { resolveCaptionView, splitPaneOrder } from './caption-view';

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
