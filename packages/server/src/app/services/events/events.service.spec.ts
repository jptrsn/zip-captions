import { model } from 'mongoose';
import { AppEvent, AppEventSchema, AppEventType } from '../../models/event.model';
import { EventsService } from './events.service';

describe('EventsService', () => {
  const EventModel = model<AppEvent>('EventsServiceSpec', AppEventSchema);
  let save: jest.SpyInstance;
  let service: EventsService;

  beforeEach(() => {
    save = jest.spyOn(EventModel.prototype, 'save').mockImplementation(function () { return Promise.resolve(this); });
    service = new EventsService(EventModel as never);
  });

  afterEach(() => jest.restoreAllMocks());

  it('stores the event and returns it', async () => {
    const event = await service.logEvent({ type: AppEventType.accountDeleted, message: 'reason: privacy' });
    expect(save).toHaveBeenCalledTimes(1);
    expect(event.type).toBe('account_deleted');
    expect(event.message).toBe('reason: privacy');
  });

  it('time-stamps an event that has no timestamp', async () => {
    const before = Date.now();
    const event = await service.logEvent({ type: AppEventType.accountDeleted });
    expect(event.timestamp.getTime()).toBeGreaterThanOrEqual(before);
  });

  it('keeps a timestamp it is given', async () => {
    const timestamp = new Date('2026-01-01T00:00:00Z');
    expect((await service.logEvent({ type: 'x', timestamp })).timestamp).toEqual(timestamp);
  });

  it('does not return an event that failed to save', async () => {
    save.mockRejectedValue(new Error('db down'));
    await expect(service.logEvent({ type: 'x' })).rejects.toThrow('db down');
  });
});
