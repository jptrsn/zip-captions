import { caching, MemoryCache, MemoryConfig, Milliseconds } from 'cache-manager';
const DEFAULT_TTL = (60 * 60 * 1000); // 60 minutes in milliseconds

export class CacheService {
  
  // public set: (key: string, value: unknown, ttl?: Milliseconds) => Promise<void>;
  // public get: <T>(key: string) => Promise<T | undefined>;
  // public del: (key: string) => Promise<void>;
  // public reset: () => Promise<void>;
  // public wrap?<T>(key: string, fn: () => Promise<T>, ttl?: Milliseconds): Promise<T | undefined>;

  private cache: MemoryCache;
  private config: MemoryConfig = {
    max: process.env.MAX_CACHE_ENTRIES ? Number(process.env.MAX_CACHE_ENTRIES) : 500,
    ttl: process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : DEFAULT_TTL
  };
  constructor(options?: Partial<MemoryConfig>) {
    if (options) {
      for (const [key, value] of Object.entries(options)) {
        this.config[key] = value;
      }
    }
  }

  public async set(key: string, value: unknown, ttl?: Milliseconds): Promise<void> {
    await this._initCache();
    return this.cache.set(key, value, ttl);
  }

  public async get<T>(key: string): Promise<T | undefined> {
    await this._initCache();
    return this.cache.get(key);
  }

  public async del(key: string): Promise<void> {
    await this._initCache();
    return this.cache.del(key);
  };

  public async reset(): Promise<void> {
    await this._initCache();
    return this.cache.reset();
  }
  public async wrap<T>(key: string, fn: () => Promise<T>, ttl?: Milliseconds): Promise<T | undefined> {
    await this._initCache();
    return this.cache.wrap(key, fn, ttl);
  };
  
  private async _initCache() {
    if (!this.cache) {
      console.log('building');
      this.cache = await caching('memory', this.config);
    }
    return this.cache;
  }

  
}