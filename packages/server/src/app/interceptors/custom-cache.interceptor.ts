import { CacheInterceptor } from "@nestjs/cache-manager";
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
}