import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/models/user.model';
import { Supporter, SupporterSchema } from '../../models/supporter.model';
import { AzureSttController } from './azure-stt.controller';
import { AzureSttService } from './services/azure-stt.service';
import { UserService } from '../user/services/user.service';
import { SupporterService } from '../../services/supporter/supporter.service';
import { Expenditure, ExpenditureSchema } from '../user/models/expenditure.model';
import { CacheService } from '../../services/cache/cache.service';

@Module({
	imports: [
		HttpModule,
		JwtModule.registerAsync({
			useFactory: () => ({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1d'} })
		}),
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Supporter.name, schema: SupporterSchema },
			{ name: Expenditure.name, schema: ExpenditureSchema }
		])
	],
	controllers: [
		AzureSttController
	],
	providers: [
		JwtStrategy,
		AzureSttService,
		UserService,
		SupporterService,
		CacheService
	],
})
export class AzureSttModule {}
