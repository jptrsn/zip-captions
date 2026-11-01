import { CacheService } from './cache.service';

describe('CacheService', () => {
  let manager: { set: jest.Mock; get: jest.Mock; del: jest.Mock; reset: jest.Mock; wrap: jest.Mock };
  let service: CacheService;

  beforeEach(() => {
    manager = { set: jest.fn().mockResolvedValue(undefined), get: jest.fn(), del: jest.fn().mockResolvedValue(undefined), reset: jest.fn().mockResolvedValue(undefined), wrap: jest.fn() };
    service = new CacheService(manager as never);
  });

  it('stores a value, passing the time to live on', async () => {
    await service.set('key', { a: 1 }, 5000);
    expect(manager.set).toHaveBeenCalledWith('key', { a: 1 }, 5000);
  });

  it('stores a value with no time to live', async () => {
    await service.set('key', 'value');
    expect(manager.set).toHaveBeenCalledWith('key', 'value', undefined);
  });

  it('returns what the cache holds, or nothing', async () => {
    manager.get.mockResolvedValueOnce('hit').mockResolvedValueOnce(undefined);
    await expect(service.get('a')).resolves.toBe('hit');
    await expect(service.get('b')).resolves.toBeUndefined();
  });

  it('removes a key and clears the cache', async () => {
    await service.del('key');
    await service.reset();
    expect(manager.del).toHaveBeenCalledWith('key');
    expect(manager.reset).toHaveBeenCalled();
  });

  it('wraps a function so the cache decides whether to run it', async () => {
    manager.wrap.mockImplementation(async (_key: string, fn: () => Promise<string>) => fn());
    const fn = jest.fn().mockResolvedValue('computed');
    await expect(service.wrap('key', fn, 1000)).resolves.toBe('computed');
    expect(manager.wrap).toHaveBeenCalledWith('key', fn, 1000);
  });

  it('passes errors from the cache on', async () => {
    manager.get.mockRejectedValue(new Error('redis down'));
    await expect(service.get('key')).rejects.toThrow('redis down');
  });
});
