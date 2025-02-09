import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 } from "uuid";

export enum CreditProvider {
  MONTHLY_PATREON = 'Monthly Patreon support',
  ONE_OFF = 'One-off Purchase',
  COMMUNITY_GIFT = 'Community Gift'
}

@Schema()
export class CreditAdd {
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
			type: Date,
			required: true,
			default: Date.now
		})
		createdAt: Date;

		@Prop({
			type: String,
			required: true,
			enum: CreditProvider
		})
		provider: CreditProvider; // This should identify the purchase mechanism, e.g. "Monthly Patreon support", "One-off Purchase", "Community Gift", etc.

		@Prop({
			type: Number,
			required: true,
			min: 0
		})
		creditsAdded: number;

}

export const CreditAddSchema = SchemaFactory.createForClass(CreditAdd);

CreditAddSchema.pre<CreditAdd>('validate', function(next) {
	if (!this.createdAt) {
		this.createdAt = new Date();
	}
	return next();
})