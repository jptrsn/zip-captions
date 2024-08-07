import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UiSettings, UiSettingsDocument } from '../models/ui-settings.model';

@Injectable()
export class UiSettingsService {
  constructor(@InjectModel(UiSettings.name) private uiSettingsModel: Model<UiSettings>) {}

  async upsert(settings: Partial<UiSettings>): Promise<UiSettingsDocument> {
    const fromDb = await this.findByOwnerId(settings.ownerId);
    if (fromDb) {
      for (const [key, value] of Object.entries(settings)) {
        fromDb[key] = value;
      }
      await fromDb.save();
      return fromDb;
    } else {
      const model: UiSettingsDocument = new this.uiSettingsModel(settings);
      await model.save();
      return model;
      
    }
  }

  async findByOwnerId(id: string): Promise<UiSettingsDocument> {
    return this.uiSettingsModel.findOne({ ownerId: id });
  }

  async deleteByOwnerId(ownerId: string): Promise<void> {
    await this.uiSettingsModel.deleteMany({ ownerId });
  }
}
