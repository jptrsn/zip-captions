import { BadRequestException, Body, Controller, ForbiddenException, Headers, Post, RawBodyRequest, Req } from '@nestjs/common';
import { createHmac } from 'crypto';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('patreon-webhook')
  async updatePatreonSupporters(@Req() req: RawBodyRequest<Request>, @Headers() headers,  @Body() body): Promise<void> {
    try {
      const event = headers['x-patreon-event'];
      const signature = headers['x-patreon-signature'];
      const secret = process.env.PATREON_SUPPORTER_WEBHOOK_SECRET;

      if (!event || !signature || !secret) {
        throw new BadRequestException();
      } 
      if (!this._verifySignature(req.rawBody, secret, signature)) {
        throw new ForbiddenException();
      }
      switch (event) {
        case 'members:pledge:create':
          await this.appService.createPledge(body);
          break;
        case 'members:pledge:update':
          await this.appService.updatePledge(body);
          break;
        case 'members:pledge:delete':
          await this.appService.deletePledge(body);
          break;
        default:
          console.log('unhanled webhook event', event);
          break;
      }
    } catch(e) {
      // Log the error, but do not fail the request, as the webhook will retry if not successful
      console.error(e);
    }
  }

  private _verifySignature(body: Buffer, secret: string, signature: string): boolean {
    const hasher = createHmac('md5', secret);
    const hash = hasher.update(body).digest('hex');
    return hash === signature;
  }

}