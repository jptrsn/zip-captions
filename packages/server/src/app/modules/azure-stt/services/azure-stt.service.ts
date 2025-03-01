import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { firstValueFrom } from "rxjs";
import { Expenditure } from "../../user/models/expenditure.model";
import { Model } from "mongoose";
import { User } from "../../user/models/user.model";

@Injectable()
export class AzureSttService {
	private readonly STT_CREDITS_PER_MINUTE = 60;
	private speechKey = process.env.AZURE_SPEECH_KEY;
	private speechRegion = process.env.AZURE_SPEECH_REGION;
	constructor(private http: HttpService,
							@InjectModel(Expenditure.name) private expenditureModel: Model<Expenditure>,
							@InjectModel(User.name) private userModel: Model<User>,
	) { }

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

	async startExpenditure(userId: string, sessionId: string, startedAtTimestamp?: number): Promise<{id: string}> {
		console.log('start expenditure!', sessionId);
		const user = await this.userModel.findOne({ id: userId });
		if (!user || !user.creditBalance) {
			throw new Error("Invalid user")
		}
		const createdAt = startedAtTimestamp ? new Date(startedAtTimestamp) : new Date();
		const session = new this.expenditureModel({ userId, sessionId, createdAt, serviceName: 'Azure-STT', creditCap: user.creditBalance });
		await session.save();
		return { id: session.id }
	}

	async pingExpenditure(userId: string, sessionId: string, pingTimestamp?: number): Promise<boolean> {
		console.log('ping expenditure!', sessionId);
		const updatedAt = pingTimestamp ? new Date(pingTimestamp) : new Date();
		const spend = await this.expenditureModel.findOne({ userId, sessionId });
		if (!spend) {
			throw new Error('Not found')
		}
    const dur = updatedAt.getTime() - spend.createdAt.getTime();
    const cost = this._calculateSpend(dur);
		spend.updatedAt = updatedAt;
		await spend.save();
    return (spend.creditCap && cost < spend.creditCap)
	}

	async completeExpenditure(userId: string, sessionId: string, timestamp?: number): Promise<{userId: string, creditBalance: number}> {
		console.log('complete expenditure!', sessionId);
		const spend = await this.expenditureModel.findOne({userId, sessionId});
		if (!spend) {
			throw new Error('Not found')
		}
		const user = await this.userModel.findOne({ id: spend.userId });
		if (!user) {
			throw new Error("User not found")
		}
    const start = spend.createdAt.getTime();
		const end = spend.updatedAt ? Math.max(spend.updatedAt.getTime(), timestamp) : timestamp;
    spend.durationMs = end - start;
		const cost = this._calculateSpend(spend.durationMs);
		spend.creditsUsed = cost;
		await spend.save();
		const curr = user.creditBalance || 0;
		user.creditBalance = Math.max(0, curr - cost);
		await user.save();
		return { userId: user.id, creditBalance: user.creditBalance };
	}

  private _calculateSpend(ms: number): number {
		return Math.max(1, Math.ceil((ms / 1000 / 60) * this.STT_CREDITS_PER_MINUTE ));
  }

}