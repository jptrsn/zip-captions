import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AzureSttService } from "./services/azure-stt.service";
import { NoCache } from "../../decorators/no-cache.decorator";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { UserService } from "../user/services/user.service";
import { SupporterService } from "../../services/supporter/supporter.service";
import { CacheService } from "../../services/cache/cache.service";
import { UserController } from "../user/user.controller";

@Controller('azure-stt')
export class AzureSttController {
	constructor(
		private azureSttService: AzureSttService,
		private userService: UserService,
		private supporterService: SupporterService,
		private cache: CacheService,
	) {}

	@Get('get-token')
	@NoCache()
	@UseGuards(JwtAuthGuard)
	async getSpeechToken(@Req() req): Promise<{token: string; region: string}> {
		const user = await this.userService.findOne({ id: req.user.id });
		if (!user) {
			throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
		}
		if (!user.creditBalance) {
			throw new HttpException(`Payment required`, HttpStatus.PAYMENT_REQUIRED);
		}
		return this.azureSttService.getToken();
	}

	@Post('start')
	@UseGuards(JwtAuthGuard)
	async startAzureSttSession(@Req() req, @Body() body: { sessionId: string, timestamp: number }): Promise<{id: string }> {
		const userId = req.user.id;
		return this.azureSttService.startExpenditure(userId, body.sessionId, body.timestamp);
	}

	@Post('track')
	@UseGuards(JwtAuthGuard)
	async trackAzureSttSession(@Req() req, @Body() body: { sessionId: string, timestamp: number }): Promise<boolean> {
		return this.azureSttService.pingExpenditure(req.user.id, body.sessionId, body.timestamp);
	}

	@Post('end')
	@UseGuards(JwtAuthGuard)
	async endAzureSttSession(@Req() req, @Body() body: { sessionId: string, timestamp?: number }): Promise<{creditBalance: number}> {
		const result = await this.azureSttService.completeExpenditure(req.user.id, body.sessionId, body.timestamp);
		await this.userService.updateUser(result.userId, { creditBalance: result.creditBalance })
		this._burstCacheForKey(UserController.PROFILE_CACHE_KEY, { id: result.userId });
		return result;
	}

	private _burstCacheForKey(key: string, params: { id: string }): void {
    this.cache.del(`${key}-${params.id}`)
  }
}