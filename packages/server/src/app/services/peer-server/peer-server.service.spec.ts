import { Test, TestingModule } from '@nestjs/testing';
import { PeerServerService } from './peer-server.service';

describe('PeerServerService', () => {
  let service: PeerServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeerServerService],
    }).compile();

    service = module.get<PeerServerService>(PeerServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
