import { Test, TestingModule } from '@nestjs/testing';
import { SessionGateway } from './session.gateway';

describe('SessionGateway', () => {
  let gateway: SessionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionGateway],
    }).compile();

    gateway = module.get<SessionGateway>(SessionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
