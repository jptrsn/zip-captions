import * as fs from 'fs';
import * as path from 'path';

const i18nDir = path.resolve(__dirname, '../../../assets/i18n');
const locales = fs.readdirSync(i18nDir).filter((f) => f.endsWith('.json'));
// The page lists its keys explicitly, so read them from the source
const pageKeys = Array.from(fs.readFileSync(path.resolve(__dirname, 'privacy.component.ts'), 'utf8').matchAll(/['"](PRIVACY\.[\w.]+)['"]/g), (m) => m[1]);

/** Locale files mix nesting with flat dotted keys ("PRIVACY": { "4.3": ... }); try every split, as ngx-translate does */
const lookup = (obj: unknown, key: string): unknown => {
  if (typeof obj !== 'object' || obj === null) {
    return undefined;
  }
  const record = obj as Record<string, unknown>;
  if (key in record) {
    return record[key];
  }
  const parts = key.split('.');
  for (let n = 1; n < parts.length; n++) {
    const head = parts.slice(0, n).join('.');
    if (head in record) {
      const found = lookup(record[head], parts.slice(n).join('.'));
      if (found !== undefined) {
        return found;
      }
    }
  }
  return undefined;
};

describe('privacy page keys', () => {
  it('finds more than 50 PRIVACY keys in the page source (guards the extraction itself)', () => {
    expect(pageKeys.length).toBeGreaterThan(50);
  });

  it.each(locales)('%s has a text for every key the page lists', (locale) => {
    const json = JSON.parse(fs.readFileSync(path.join(i18nDir, locale), 'utf8'));
    expect(pageKeys.filter((key) => typeof lookup(json, key) !== 'string')).toEqual([]);
  });

  it.each(locales)('%s has no payment services paragraph (PRIVACY.4.6)', (locale) => {
    const json = JSON.parse(fs.readFileSync(path.join(i18nDir, locale), 'utf8'));
    expect(lookup(json, 'PRIVACY.4.6')).toBeUndefined();
  });

  it('does not list PRIVACY.4.6', () => {
    expect(pageKeys).not.toContain('PRIVACY.4.6');
  });
});
