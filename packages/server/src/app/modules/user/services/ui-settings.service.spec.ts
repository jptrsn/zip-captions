import { Model, model } from 'mongoose';
import { clientPayload } from '../models/ui-settings.fixture';
import { UiSettings, UiSettingsSchema } from '../models/ui-settings.model';
import { UiSettingsService } from './ui-settings.service';

describe('UiSettingsService', () => {
  const TestModel = model<UiSettings>('UiSettingsServiceSpec', UiSettingsSchema);
  let service: UiSettingsService;

  beforeEach(() => {
    jest.spyOn(TestModel.prototype, 'save').mockImplementation(function () { return Promise.resolve(this); });
    service = new UiSettingsService(TestModel as unknown as Model<UiSettings>);
  });

  afterEach(() => jest.restoreAllMocks());

  const stored = (doc: Record<string, unknown> | null) =>
    jest.spyOn(TestModel, 'findOne').mockResolvedValue(doc ? new TestModel(doc) : null as never);

  it('keeps transcription and translation for a new owner', async () => {
    stored(null);
    const saved = await service.upsert({ ...clientPayload(), ownerId: 'u1' } as Partial<UiSettings>);
    const json = saved.toJSON();
    expect(json.transcription).toEqual(clientPayload().transcription);
    expect(json.translation).toEqual(clientPayload().translation);
  });

  it('keeps transcription and translation when updating a document saved before they existed', async () => {
    stored({ ownerId: 'u1', theme: 'light', lang: 'de' });
    const saved = await service.upsert({ ...clientPayload(), ownerId: 'u1' } as Partial<UiSettings>);
    const json = saved.toJSON();
    expect(json.lang).toBe('en');
    expect(json.transcription).toEqual(clientPayload().transcription);
    expect(json.translation).toEqual(clientPayload().translation);
  });

  it('replaces nested values, and removes a nested key the new snapshot no longer has', async () => {
    stored({ ownerId: 'u1', translation: clientPayload().translation });
    const { dialectByLanguage, obsFeed, ...rest } = clientPayload().translation;
    const saved = await service.upsert({ ownerId: 'u1', translation: { ...rest, targetLanguage: 'es' } } as Partial<UiSettings>);
    const json = saved.toJSON();
    expect(json.translation.targetLanguage).toBe('es');
    expect(json.translation.dialectByLanguage).toBeUndefined();
    expect(json.translation.obsFeed).toBeUndefined();
  });

  it('leaves stored transcription and translation alone when an older client saves without them', async () => {
    stored({ ownerId: 'u1', transcription: clientPayload().transcription, translation: clientPayload().translation });
    const { transcription, translation, ...older } = clientPayload();
    const saved = await service.upsert({ ...older, theme: 'light', ownerId: 'u1' } as Partial<UiSettings>);
    const json = saved.toJSON();
    expect(json.theme).toBe('light');
    expect(json.transcription).toEqual(transcription);
    expect(json.translation).toEqual(translation);
  });
});
