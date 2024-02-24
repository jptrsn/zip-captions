import { Injectable } from '@nestjs/common';
import { UiSettings, UiSettingsDocument } from '../models/ui-settings.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CacheService } from '../../../services/cache/cache.service';

@Injectable()
export class UiSettingsService {
  constructor(@InjectModel(UiSettings.name) private uiSettingsModel: Model<UiSettings>,
              private cache: CacheService) {}

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
    const key = `ui_settings_${id}`;
    const doc = await this.cache.wrap(
      key,
      () => this.uiSettingsModel.findOne({ ownerId: id }, '-_id')
    )
    return doc;
  }
}
