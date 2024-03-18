import { CACHE_KEY_METADATA, CacheInterceptor } from "@nestjs/cache-manager";
import { ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  protected isRequestCacheable(context: ExecutionContext): boolean {
    const http = context.switchToHttp();
    const request = http.getRequest();

    const ignoreCaching: boolean | undefined = this.reflector.get(
      'ignoreCaching',
      context.getHandler(),
    );
    
    return request.method === 'GET' ? !ignoreCaching : false;
  }

  trackBy(context: ExecutionContext): string | undefined {
    const cacheKey = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );
 
    if (cacheKey) {
      const request = context.switchToHttp().getRequest();
      if (request.params.id) {
        return `${cacheKey}-${request.params.id}`
      }
    }
 
    return super.trackBy(context);
  }
}