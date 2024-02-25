import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { NoCache } from '../../decorators/no-cache.decorator';
import { AzureOAuthGuard } from '../../guards/azure-oauth.guard';
import { GoogleOAuthGuard } from '../../guards/google-oauth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserProfile } from './models/user.model';
import { UserService } from './services/user.service';
import { UiSettingsService } from './services/ui-settings.service';
import { UiSettings, UiSettingsDocument } from './models/ui-settings.model';
import { CustomCacheInterceptor } from '../../interceptors/custom-cache.interceptor';
import { CacheKey } from '@nestjs/cache-manager';
import { CacheService } from '../../services/cache/cache.service';

@Controller('user')
export class UserController {
  public static PROFILE_CACHE_KEY = 'USER_PROFILE';
  public static SETTINGS_CACHE_KEY = 'USER_SETTINGS';
  private clientUrl: string;
  constructor(private readonly userService: UserService,
              private readonly uiSettingsService: UiSettingsService,
              private cache: CacheService,
              private jwtService: JwtService) 
  {
    this.clientUrl = process.env.APP_ORIGIN
  }

  @Get('profile/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CustomCacheInterceptor)
  @CacheKey(UserController.PROFILE_CACHE_KEY)
  async getUser(@Req() req, @Param() params: { id: string }): Promise<UserProfile> {
    if (params.id !== req.user.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    const user = await this.userService.findOne({id: req.user.id});
    const userProfile = {
      id: user.id,
      createdAt: user.createdAt.toString(),
      familyName: user.familyName,
      givenName: user.givenName,
      primaryEmail: user.primaryEmail,
      googleConnected: !!user.googleId,
      azureConnected: !!user.msId,
      syncUiSettings: user.syncUiSettings
    }
    return userProfile;
  }

  @Get('profile/:id/settings')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CustomCacheInterceptor)
  @CacheKey(UserController.SETTINGS_CACHE_KEY)
  async getSettings(@Req() req, @Param() params: { id: string }): Promise<Partial<UiSettings> | null> {
    this._validateParam(req, params);
    const settings = await this.uiSettingsService.findByOwnerId(params.id);
    if (settings) {
      return this._pruneSettingsFields(settings)
    }
    return null;
  }

  @Post('profile/:id/settings')
  @UseGuards(JwtAuthGuard)
  async saveSettings(@Req() req, @Param() params: { id: string}, @Body() body): Promise<Partial<UiSettings>> {
    this._validateParam(req, params);
    const settings = await this.uiSettingsService.upsert({...body.settings, ownerId: params.id });
    const pruned = this._pruneSettingsFields(settings);
    this._updateCachedResponse(UserController.SETTINGS_CACHE_KEY, params, pruned);
    return pruned;
  }

  @Post('profile/:id/sync')
  @UseGuards(JwtAuthGuard)
  async saveSyncProperty(@Req() req, @Param() params: { id: string }, @Body() body): Promise<{sync: boolean}> {
    this._validateParam(req, params);
    const updatedUser = await this.userService.updateUser(params.id, { syncUiSettings: body.sync });
    this._burstCacheForKey(UserController.PROFILE_CACHE_KEY, params);
    return {sync: updatedUser.syncUiSettings || false};
  }

  @Get('validate')
  @NoCache()
  @UseGuards(JwtAuthGuard)
  async validate(@Req() req): Promise<{id: string} | null> {
    if ((req.user?.exp * 1000) > Date.now()) {
      return {id: req.user.id}
    }
    return null
  }

  @Get('google-login')
  @NoCache()
  @UseGuards(GoogleOAuthGuard)
  googleAuth(@Req() req) {
      console.log('login with google')
  }

  @Get('azure-login')
  @NoCache()
  @UseGuards(AzureOAuthGuard)
  azureAuth(@Req() req) {
    console.log('login with azure')
  }

  @Get('google-redirect')
  @NoCache()
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    try {
      const user = await this.userService.googleLogin(req);
      this._sendTokenResponse(user.id, res);
    } catch(e) {
      console.error(e)
      res.redirect(`${this.clientUrl}/auth/login?error=${encodeURIComponent(e)}`)
    }
  }

  @Get('azure-redirect')
  @NoCache()
  @UseGuards(AzureOAuthGuard)
  async azureAuthRedirect(@Req() req, @Res() res) {
    try {
      if (req.authInfo?.message) {
        throw new Error('No user from microsoft');
      }
      const user = await this.userService.msLogin(req.user);
      this._sendTokenResponse(user.id, res);
    } catch(e: any) {
      console.error(e);
      res.redirect(`${this.clientUrl}/auth/login?error=${encodeURIComponent(e)}`)
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req, @Res() res) {
    await req.logout((err) => {
      if (err) {
        console.warn(err)
        Promise.reject(err)
      }
      Promise.resolve('OK')
    })
    res.status(200).send('OK')
  }

  private _sendTokenResponse(userId: string, res: Response): void {
    const token = this.jwtService.sign({ sub: userId })
    res.redirect(`${this.clientUrl}/auth/login?id_token=${token}`);
  }

  private _validateParam(req: { user: { id: string }}, params: { id: string }): void {
    if (params.id !== req.user.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
  }

  private _pruneSettingsFields(settings: UiSettingsDocument): Partial<UiSettings> {
    const converted = settings.toJSON({versionKey: false});
    delete converted.ownerId;
    delete converted._id;
    console.log('returning', converted)
    return converted;
  }

  private _burstCacheForKey(key: string, params: { id: string }): void {
    this.cache.del(`${key}-${params.id}`)
  }
  
  private _updateCachedResponse(key: string, params: { id: string}, value: any): void {
    this.cache.set(`${key}-${params.id}`, value);
  }
}
