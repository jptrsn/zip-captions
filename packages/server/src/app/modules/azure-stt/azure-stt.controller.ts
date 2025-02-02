import { Controller, Get, HttpException, HttpStatus, Req, UseGuards } from "@nestjs/common";
import { AzureSttService } from "./services/azure-stt.service";
import { NoCache } from "../../decorators/no-cache.decorator";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { UserService } from "../user/services/user.service";
import { SupporterService } from "../../services/supporter/supporter.service";

@Controller('azure-stt')
export class AzureSttController {
	constructor(
		private azureSttService: AzureSttService,
		private userService: UserService,
		private supporterService: SupporterService,
	) {}

	@Get('get-token')
	@NoCache()
	@UseGuards(JwtAuthGuard)
	async getSpeechToken(@Req() req): Promise<{token: string; region: string}> {
		const user = await this.userService.findOne({ id: req.user.id });
		if (!user) {
			throw new HttpException(`User not found`, HttpStatus.NOT_FOUND)
		}
		const supporter = await this.supporterService.findOne({ email: user.primaryEmail });
		if (!supporter || !supporter.amountCents) {
			throw new HttpException(`User is not a supporter`, HttpStatus.BAD_REQUEST);
		}
		return this.azureSttService.getToken();
	}
}