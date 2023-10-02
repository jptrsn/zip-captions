import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache, Milliseconds } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  public async set(key: string, value: unknown, ttl?: Milliseconds): Promise<void> {
    return this.cacheManager.set(key, value, ttl);
  }

  public async get<T>(key: string): Promise<T | undefined> {
    return this.cacheManager.get(key);
  }

  public async del(key: string): Promise<void> {
    return this.cacheManager.del(key);
  };

  public async reset(): Promise<void> {
    return this.cacheManager.reset();
  }
  public async wrap<T>(key: string, fn: () => Promise<T>, ttl?: Milliseconds): Promise<T | undefined> {
    return this.cacheManager.wrap(key, fn, ttl);
  };
}
