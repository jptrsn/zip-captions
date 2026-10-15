import { BadRequestException, Body, Controller, ForbiddenException, Headers, HttpCode, Logger, Post, RawBodyRequest, Req } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {
    if (!process.env.PATREON_SUPPORTER_WEBHOOK_SECRET) {
      // Without the secret every webhook fails its check and is only logged, so supporters are never updated
      this.logger.warn('PATREON_SUPPORTER_WEBHOOK_SECRET is not set: every Patreon webhook will be ignored');
    }
  }

  @Post('patreon-webhook')
  @HttpCode(200)
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

      if (body.data?.included?.length) {
        const tier = body.data.included.find((incl) => incl.type === 'tier');
        if (tier) {
          console.log('tier attributes', JSON.stringify(tier.attributes))
        }
      }
      switch (event) {
        case 'members:create':
        case 'members:update':
          await this.appService.upsertMember(body);
          break;
        case 'members:delete':
          await this.appService.markMemberDeleted(body);
          break;
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
          console.log('unhandled webhook event', event);
          console.log(body);
          break;
      }
    } catch(e) {
      // Log the error, but do not fail the request, as the webhook will retry if not successful
      console.error(e);
    }
  }

  private _verifySignature(body: Buffer, secret: string, signature: string): boolean {
    // Exactly 32 hex characters: Buffer.from(..., 'hex') stops at the first bad character, which would
    // otherwise let a correct signature followed by junk through
    if (!/^[0-9a-f]{32}$/i.test(signature)) {
      return false;
    }
    const expected = createHmac('md5', secret).update(body).digest();
    return timingSafeEqual(Buffer.from(signature, 'hex'), expected);
  }

}