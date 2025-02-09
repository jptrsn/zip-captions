import { Injectable } from '@angular/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supporter, SupporterDocument } from '../../models/supporter.model';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Injectable({
  providedIn: 'root'
})
export class SupporterService {

  constructor(@InjectModel(Supporter.name) private supporterModel: Model<Supporter>,) { }

	async findOne(props: Partial<Supporter>): Promise<SupporterDocument> {
		try {
			const supporter = await this.supporterModel.findOne(props);
			if (!supporter) {
					throw new NotFoundException('Supporter not found');
				}
				return supporter;
			} catch (error) {
				if (error instanceof NotFoundException) {
					throw error;
				}
				throw new InternalServerErrorException('Error finding supporter');
			}
		}
}
