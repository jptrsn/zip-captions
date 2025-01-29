import { Controller, Get, Req } from "@nestjs/common";
import { AzureSttService } from "./services/azure-stt.service";
import { NoCache } from "../../decorators/no-cache.decorator";

@Controller('azure-stt')
export class AzureSttController {
	constructor(private azureSttService: AzureSttService) {}

	@Get('get-token')
	@NoCache()
	// @UseGuards(JwtAuthGuard)
	async getSpeechToken(@Req() req): Promise<any> {
		return this.azureSttService.getToken();
	}
}