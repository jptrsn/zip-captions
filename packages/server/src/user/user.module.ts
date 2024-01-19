import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { HttpModule } from '@nestjs/axios';
import { CacheService } from '../app/services/cache/cache.service';
import { GoogleApiService } from '../app/services/google-api/google-api.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [
    UserService,
    CacheService,
    GoogleApiService,
  ],
  exports: [UserService],
})
export class UserModule {}
