import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';

export type UiSettingsDocument = HydratedDocument<UiSettings>;

@Schema()
export class UiSettings {

  @Prop({
    type: String,
    required: true
  })
  ownerId: string;

  @Prop({
    type: String
  })
  theme?: string;

  @Prop({
    type: String
  })
  lang?: string;

  @Prop({
    type: Boolean
  })
  wakelock?: boolean;

  @Prop({
    type: Number
  })
  renderHistory?: number;

  @Prop({
    type: String
  })
  textSize?: string;

  @Prop({
    type: String
  })
  lineHeight?: string;

  @Prop({
    type: String
  })
  textFlow?: string;

  @Prop({
    type: String
  })
  fontFamily?: string;

}

export const UiSettingsSchema = SchemaFactory.createForClass(UiSettings);