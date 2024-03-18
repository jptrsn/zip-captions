import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { CacheService } from '../../services/cache/cache.service';
import { AzureStrategy } from '../../strategies/azure.strategy';
import { GoogleStrategy } from '../../strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { UiSettingsService } from './services/ui-settings.service';
import { UiSettings, UiSettingsSchema } from './models/ui-settings.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, 
      { name: UiSettings.name, schema: UiSettingsSchema }]
      ),
    JwtModule.registerAsync({
      useFactory: () => ({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '7d'} })
    })
  ],
  controllers: [
    UserController
  ],
  providers: [
    AzureStrategy,
    GoogleStrategy,
    JwtStrategy,
    UserService,
    CacheService,
    UiSettingsService,
  ],
})
export class UserModule {}
