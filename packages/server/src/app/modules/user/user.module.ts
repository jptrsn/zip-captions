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
import { SessionService } from '../../services/session/session.service';
import { SocketConnection, SocketConnectionSchema } from '../../models/socket-connection.model';
import { OwnerRoom, OwnerRoomSchema } from '../../models/owner-rooms.model';
import { BroadcastSession, BroadcastSessionSchema } from '../../models/broadcast-session.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, 
      { name: UiSettings.name, schema: UiSettingsSchema },
      { name: SocketConnection.name, schema: SocketConnectionSchema },
      { name: OwnerRoom.name, schema: OwnerRoomSchema },
      { name: BroadcastSession.name, schema: BroadcastSessionSchema }
    ]
      ),
    JwtModule.registerAsync({
      useFactory: () => ({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '60s'} })
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
    SessionService,
  ],
})
export class UserModule {}
