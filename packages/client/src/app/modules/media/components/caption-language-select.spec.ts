import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * A `<select [value]>` is bound before its `*ngFor` options exist, so a select created while the
 * target is "fr" shows the first option ("es") and only follows later changes. The options must be
 * marked `[selected]` instead. Component specs for these screens can't be set up here, so this
 * guards the templates themselves.
 */
describe('translation language selects', () => {
  const templates = [
    'media/components/recognition-render/recognition-render.component.html',
    'media/components/recognition-control-sidebar/recognition-control-sidebar.component.html',
    'peer/components/broadcast-render/broadcast-render.component.html',
  ];

  it.each(templates)('%s marks the current language on each option', (path) => {
    const html = readFileSync(join(__dirname, '..', '..', path), 'utf8');
    const select = html.match(/<select\b[^>]*\[value\]="targetLanguage\(\)"[^>]*>/s);
    expect(select).not.toBeNull();
    const options = html.match(/<option \*ngFor="let lang of [^"]+" \[value\]="lang\.code"[^>]*>/g) ?? [];
    expect(options.length).toBeGreaterThan(0);
    options.forEach((option) => expect(option).toContain('[selected]="lang.code === targetLanguage()"'));
  });
});
