import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { AppService } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
