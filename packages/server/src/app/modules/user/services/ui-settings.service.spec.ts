import { Test, TestingModule } from '@nestjs/testing';
import { UiSettingsService } from './ui-settings.service';

describe('UiSettingsService', () => {
  let service: UiSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UiSettingsService],
    }).compile();

    service = module.get<UiSettingsService>(UiSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
