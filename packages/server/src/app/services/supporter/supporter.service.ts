import { Injectable } from '@angular/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supporter, SupporterDocument } from '../../models/supporter.model';

@Injectable({
  providedIn: 'root'
})
export class SupporterService {

  constructor(@InjectModel(Supporter.name) private supporterModel: Model<Supporter>,) { }

	findOne(props: Partial<Supporter>): Promise<SupporterDocument> {
		return this.supporterModel.findOne(props);
	}
}
