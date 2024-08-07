import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppEvent, AppEventDocument } from '../../models/event.model';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(AppEvent.name) private eventsModel: Model<AppEvent>) {}

  async logEvent(event: Partial<AppEvent>): Promise<AppEventDocument> {
    const ev = new this.eventsModel(event);
    await ev.save();
    return ev;
  }
}
