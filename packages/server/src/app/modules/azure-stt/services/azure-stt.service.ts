import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AzureSttService {
	private speechKey = process.env.AZURE_SPEECH_KEY;
	private speechRegion = process.env.AZURE_SPEECH_REGION;
	constructor(private http: HttpService) { }

	async getToken(): Promise<{token: string; region: string}> {
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