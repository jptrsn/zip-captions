import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { model } from 'mongoose';
import { Supporter, SupporterSchema } from '../../models/supporter.model';
import { SupporterService } from './supporter.service';

describe('SupporterService', () => {
  const SupporterModel = model<Supporter>('SupporterServiceSpec', SupporterSchema);
  let findOne: jest.SpyInstance;
  let service: SupporterService;

  beforeEach(() => {
    findOne = jest.spyOn(SupporterModel, 'findOne');
    service = new SupporterService(SupporterModel as never);
  });

  afterEach(() => jest.restoreAllMocks());

  it('can be built by Nest from the supporter model', async () => {
    const module = await Test.createTestingModule({
      providers: [SupporterService, { provide: getModelToken(Supporter.name), useValue: SupporterModel }],
    }).compile();
    expect(module.get(SupporterService)).toBeInstanceOf(SupporterService);
  });

  it('finds the supporter that matches', async () => {
    const supporter = new SupporterModel({ id: 'p1', email: 'a@b.c', status: 'member' });
    findOne.mockResolvedValue(supporter as never);
    await expect(service.findOne({ email: 'a@b.c' })).resolves.toBe(supporter);
    expect(findOne).toHaveBeenCalledWith({ email: 'a@b.c' });
  });

  it('answers not found when there is no such supporter', async () => {
    findOne.mockResolvedValue(null as never);
    await expect(service.findOne({ email: 'nobody@b.c' })).rejects.toThrow(NotFoundException);
  });

  it('hides a database failure behind a generic error', async () => {
    findOne.mockRejectedValue(new Error('connection reset by peer'));
    const error = await service.findOne({ email: 'a@b.c' }).catch((e) => e);
    expect(error).toBeInstanceOf(InternalServerErrorException);
    expect(error.message).toBe('Error finding supporter');
  });
});
