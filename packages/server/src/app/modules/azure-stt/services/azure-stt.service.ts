import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../../user/models/user.model";
import { Supporter } from "../../../models/supporter.model";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AzureSttService {
	private speechKey = process.env.AZURE_SPEECH_KEY;
	private speechRegion = process.env.AZURE_SPEECH_REGION;
	constructor(@InjectModel(User.name) private userModel: Model<User>,
							@InjectModel(Supporter.name) private supporterModel: Model<Supporter>,
							private http: HttpService) { }

	async getToken(): Promise<any> {
		const headers = {
			headers: {
					'Ocp-Apim-Subscription-Key': this.speechKey,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			};
		const tokenResponse = await firstValueFrom(this.http.post(`https://${this.speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers));
		return { token: tokenResponse.data, region: this.speechRegion };

	}
}