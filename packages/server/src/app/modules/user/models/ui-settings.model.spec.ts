import { model } from 'mongoose';
import { clientPayload } from './ui-settings.fixture';
import { isStringRecord, UiSettings, UiSettingsSchema } from './ui-settings.model';

describe('UiSettingsSchema', () => {
  const Model = model<UiSettings>('UiSettingsSchemaSpec', UiSettingsSchema);

  it('stores the interface language preference alongside the spoken language', () => {
    expect(UiSettingsSchema.path('lang')?.instance).toBe('String');
    expect(UiSettingsSchema.path('uiLanguage')?.instance).toBe('String');
  });

  it('has typed transcription and translation fields', () => {
    expect(UiSettingsSchema.path('transcription')).toBeDefined();
    expect(UiSettingsSchema.path('translation')).toBeDefined();
    expect(UiSettingsSchema.path('translation.enabled')?.instance).toBe('Boolean');
    expect(UiSettingsSchema.path('translation.targetLanguage')?.instance).toBe('String');
    expect(UiSettingsSchema.path('transcription.titlePattern')?.instance).toBe('String');
  });

  it('keeps transcription and translation from a client payload', () => {
    const doc = new Model({ ...clientPayload(), ownerId: 'u1' });
    const json = doc.toJSON({ versionKey: false });
    expect(json.transcription).toEqual({ enabled: true, titlePattern: 'Sunday {date}' });
    expect(json.translation).toEqual(clientPayload().translation);
  });

  it('gives the sub-documents no _id', () => {
    const json = new Model({ ...clientPayload(), ownerId: 'u1' }).toJSON();
    expect(json.transcription).not.toHaveProperty('_id');
    expect(json.translation).not.toHaveProperty('_id');
  });

  it('still drops unknown fields, top-level and nested, and the client-only loading flag', () => {
    const doc = new Model({
      ...clientPayload(),
      ownerId: 'u1',
      somethingElse: 1,
      transcription: { enabled: true, loading: true, extra: 'x' },
      translation: { ...clientPayload().translation, extra: 'x' },
    });
    const json = doc.toJSON() as unknown as Record<string, Record<string, unknown>>;
    expect(json['somethingElse']).toBeUndefined();
    expect(json['transcription']).toEqual({ enabled: true });
    expect(json['translation']['extra']).toBeUndefined();
  });

  it('rejects a value of the wrong type', () => {
    const doc = new Model({ ownerId: 'u1', translation: { enabled: 'maybe' } });
    expect(doc.validateSync()?.errors['translation.enabled']).toBeDefined();
  });

  it('does not store the device-specific Picture-in-Picture and OBS settings', () => {
    const doc = new Model({ ownerId: 'u1', translation: { ...clientPayload().translation, pipContent: 'split', obsFeed: 'translated' } });
    const json = doc.toJSON() as unknown as { translation: Record<string, unknown> };
    expect(json.translation['pipContent']).toBeUndefined();
    expect(json.translation['obsFeed']).toBeUndefined();
    expect(json.translation['targetLanguage']).toBe('fr');
  });

  describe('dialectByLanguage', () => {
    const validate = (dialectByLanguage: unknown) =>
      new Model({ ownerId: 'u1', translation: { ...clientPayload().translation, dialectByLanguage } }).validateSync();

    it.each([[{ fr: 'fr-CA' }], [{}], [undefined]])('accepts %j', (value) => {
      expect(validate(value)).toBeUndefined();
    });

    it.each([[{ fr: { invalid: true } }], [{ fr: 5 }], [['fr-CA']], ['fr-CA'], [5]])('rejects %j', (value) => {
      expect(validate(value)?.errors['translation.dialectByLanguage']).toBeDefined();
    });
  });

  describe('isStringRecord', () => {
    it('is true for nothing, and for a plain object of strings', () => {
      expect([undefined, null, {}, { a: 'b' }].every(isStringRecord)).toBe(true);
    });
    it('is false for arrays, primitives and non-string values', () => {
      expect([[], 'x', 1, { a: 1 }, { a: null }, { a: {} }].some(isStringRecord)).toBe(false);
    });
  });
});
