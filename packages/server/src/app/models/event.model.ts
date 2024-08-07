import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum AppEventType {
  accountDeleted = 'account_deleted'
}

export type AppEventDocument = HydratedDocument<AppEvent>;

@Schema()
export class AppEvent {
  @Prop({
    type: String,
    index: true,
    required: true
  })
  type: string;

  @Prop({
    type: Date,
    required: true,
    index: true,
    default: Date.now
  })
  timestamp: Date;

  @Prop({
    type: String
  })
  message?: string;
}

export const AppEventSchema = SchemaFactory.createForClass(AppEvent);