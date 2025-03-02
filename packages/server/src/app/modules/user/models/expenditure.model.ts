import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 } from "uuid";

@Schema()
export class Expenditure {
	@Prop({
			type: String,
			required: true,
			default: () => v4()
	})
	id: string;

	@Prop({
    type: String,
    required: true,
    index: true
  })
  userId: string;

	@Prop({
		type: String,
		required: true,
	})
	sessionId: string;

	@Prop({
    type: Date,
    required: true,
    default: Date.now
  })
  createdAt: Date;

	@Prop({
		type: Date
	})
	updatedAt?: Date;

	@Prop({
    type: String,
		required: true
  })
  serviceName: string;  // This should identify the service provider and service. E.g. "Azure Recognition", "Azure Translation", etc.

	@Prop({
		type: Number
	})
	durationMs?: number;

	@Prop({
		type: Number
	})
	creditsUsed: number;

  @Prop({
    type: Number
  })
  creditCap?: number;

}

export const ExpenditureSchema = SchemaFactory.createForClass(Expenditure);

ExpenditureSchema.pre<Expenditure>('validate', function(next) {
	if (!this.createdAt) {
		this.createdAt = new Date();
	}
	return next();
})