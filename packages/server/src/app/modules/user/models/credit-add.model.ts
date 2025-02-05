import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 } from "uuid";

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
			required: true
		})
		provider: string; // This should identify the purchase mechanism, e.g. "Monthly Patreon support", "One-off Purchase", "Community Gift", etc.

		@Prop({
			type: Number
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