import { model } from 'mongoose';
import { clientPayload } from './models/ui-settings.fixture';
import { UiSettings, UiSettingsSchema } from './models/ui-settings.model';
import { UiSettingsService } from './services/ui-settings.service';
import { UserController } from './user.controller';
import { HttpException } from '@nestjs/common';

describe('UserController settings', () => {
  const TestModel = model<UiSettings>('UserControllerSpec', UiSettingsSchema);
  const req = { user: { id: 'u1' } };
  let controller: UserController;
  let cache: { set: jest.Mock; get: jest.Mock; del: jest.Mock };
  let service: Pick<UiSettingsService, 'upsert' | 'findByOwnerId'>;

  beforeEach(() => {
    cache = { set: jest.fn(), get: jest.fn(), del: jest.fn() };
    service = {
      upsert: jest.fn(async (settings) => new TestModel(settings)),
      findByOwnerId: jest.fn(async () => new TestModel({ ...clientPayload(), ownerId: 'u1' })),
    };
    controller = new UserController(null, service as UiSettingsService, null, null, null, cache as never, null);
  });

  it('returns transcription and translation after a save, without ownerId or _id, and caches the same copy', async () => {
    const result = await controller.saveSettings(req, { id: 'u1' }, { settings: clientPayload() });
    expect(result.transcription).toEqual(clientPayload().transcription);
    expect(result.translation).toEqual(clientPayload().translation);
    expect(result).not.toHaveProperty('ownerId');
    expect(result).not.toHaveProperty('_id');
    expect(cache.set).toHaveBeenCalledWith(`${UserController.SETTINGS_CACHE_KEY}-u1`, result);
  });

  it('answers 400, not 500, when the settings fail validation, and caches nothing', async () => {
    service.upsert = jest.fn(async (settings) => {
      const doc = new TestModel(settings);
      await doc.validate();
      return doc;
    });
    const bad = { ...clientPayload(), translation: { ...clientPayload().translation, dialectByLanguage: { fr: { invalid: true } } } };
    const error = await controller.saveSettings(req, { id: 'u1' }, { settings: bad }).catch((e) => e);
    expect(error).toBeInstanceOf(HttpException);
    expect(error.getStatus()).toBe(400);
    expect(cache.set).not.toHaveBeenCalled();
  });

  it('lets other errors through', async () => {
    service.upsert = jest.fn().mockRejectedValue(new Error('database down'));
    await expect(controller.saveSettings(req, { id: 'u1' }, { settings: clientPayload() })).rejects.toThrow('database down');
  });

  it('returns transcription and translation on read', async () => {
    const result = await controller.getSettings(req, { id: 'u1' });
    expect(result?.transcription).toEqual(clientPayload().transcription);
    expect(result?.translation).toEqual(clientPayload().translation);
    expect(result).not.toHaveProperty('ownerId');
  });

  it('refuses another user\'s settings', async () => {
    await expect(controller.getSettings(req, { id: 'u2' })).rejects.toThrow('Forbidden');
  });
});
