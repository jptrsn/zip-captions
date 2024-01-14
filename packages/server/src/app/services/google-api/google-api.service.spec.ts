import { Test, TestingModule } from '@nestjs/testing';
import { GoogleApiService } from './google-api.service';

describe('GoogleApiService', () => {
  let service: GoogleApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleApiService],
    }).compile();

    service = module.get<GoogleApiService>(GoogleApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
