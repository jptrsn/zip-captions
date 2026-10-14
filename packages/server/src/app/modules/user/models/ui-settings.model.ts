import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type UiSettingsDocument = HydratedDocument<UiSettings>;

/**
 * Values are stored as plain strings, without enum validators: a newer client may add a value, and a
 * validation error would fail the whole save. Clients fall back to defaults for values they don't know.
 */
@Schema({ _id: false })
export class TranscriptionSettings {

  @Prop({ type: Boolean })
  enabled?: boolean;

  @Prop({ type: String })
  titlePattern?: string;

}

export const TranscriptionSettingsSchema = SchemaFactory.createForClass(TranscriptionSettings);

/** Mixed performs no casting, so check the shape ourselves: a plain object with string values */
export function isStringRecord(value: unknown): boolean {
  if (value === undefined || value === null) {
    return true;
  }
  return typeof value === 'object' && !Array.isArray(value) && Object.values(value).every((v) => typeof v === 'string');
}

@Schema({ _id: false })
export class TranslationSettings {

  @Prop({ type: Boolean })
  enabled?: boolean;

  @Prop({ type: String })
  mode?: string;

  @Prop({ type: String })
  targetLanguage?: string;

  @Prop({ type: String })
  splitOrientation?: string;

  @Prop({ type: String })
  paneOrder?: string;

  // pipContent and obsFeed describe one device's output and are deliberately not stored (the client leaves
  // them out, and strict mode drops them if another client sends them)

  /** Last dialect used per spoken language: { [language]: dialect } */
  @Prop({
    type: MongooseSchema.Types.Mixed,
    validate: {
      validator: isStringRecord,
      message: 'dialectByLanguage must be an object whose values are strings'
    }
  })
  dialectByLanguage?: Record<string, string>;

}

export const TranslationSettingsSchema = SchemaFactory.createForClass(TranslationSettings);

@Schema()
export class UiSettings {

  @Prop({
    type: String,
    required: true,
    unique: true
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
    type: String
  })
  uiLanguage?: string;

	@Prop({
		type: String
	})
	dialect?: string;

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

  @Prop({
    type: TranscriptionSettingsSchema
  })
  transcription?: TranscriptionSettings;

  @Prop({
    type: TranslationSettingsSchema
  })
  translation?: TranslationSettings;

}

export const UiSettingsSchema = SchemaFactory.createForClass(UiSettings);