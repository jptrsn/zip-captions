import { Controller, Get, Req } from "@nestjs/common";
import { AzureSttService } from "./services/azure-stt.service";

@Controller('azure-stt')
export class AzureSttController {
	constructor(private azureSttService: AzureSttService) {}

	@Get('get-token')
	// @UseGuards(JwtAuthGuard)
	async getSpeechToken(@Req() req): Promise<any> {
		return this.azureSttService.getToken();
	}
}