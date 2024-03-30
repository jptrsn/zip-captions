import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BroadcastSession } from '../../models/broadcast-session.model';
import { Model } from 'mongoose';
import { CacheService } from '../cache/cache.service';
import { v4 } from 'uuid';

@Injectable()
export class SessionService {
  constructor(@InjectModel(BroadcastSession.name) private sessionModel: Model<BroadcastSession>,
              private cache: CacheService) {}

  async setUserId(id?: string): Promise<string> {
    console.log('set ID', id)
    let userId: string;
    if (id) {
      userId = id;
    } else {
      userId = await this.cache.wrap(`client_id_${id}`, async () => v4());
    }
    return userId;
  }
}
