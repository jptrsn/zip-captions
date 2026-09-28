export enum AppTheme {
  dark = 'dark',
  light = 'light',
  cupcake = 'cupcake',
  bumblebee = 'bumblebee',
  emerald = 'emerald',
  corporate = 'corporate',
  synthwave = 'synthwave',
  retro = 'retro',
  cyberpunk = 'cyberpunk',
  valentine  = 'valentine',
  halloween = 'halloween',
  garden = 'garden',
  forest = 'forest',
  aqua = 'aqua',
  lofi = 'lofi',
  pastel = 'pastel',
  fantasy = 'fantasy',
  wireframe = 'wireframe',
  black = 'black',
  luxury = 'luxury',
  dracula = 'dracula',
  cmyk = 'cmyk',
  autumn = 'autumn',
  business = 'business',
  acid = 'acid',
  lemonade = 'lemonade',
  night = 'night',
  coffee = 'coffee',
  winter = 'winter',
  ZipDark = 'Zip-Dark',
  ZipLight = 'Zip-Light',
}

export type InterfaceLanguage = 'en' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'id' | 'pl' | 'uk' | 'ar' | 'zh';

export const AvailableLanguages: InterfaceLanguage[] = [
  'en',
  'fr',
  'es',
  'de',
  'it',
  'pt',
  'id',
  'pl',
  'uk',
  'ar',
	'zh'
]

export type RecognitionDialect = 'unspecified' | 'en-AU' | 'en-CA' | 'en-GB' | 'en-GH' | 'en-HK' | 'en-IE' | 'en-IN' | 'en-KE' | 'en-NG' | 'en-NZ' | 'en-PH' | 'en-SG' | 'en-TZ' | 'en-US' | 'en-ZA' | 'fr-BE' | 'fr-CA' | 'fr-CH' | 'fr-FR' | 'es-AR' | 'es-BO' | 'es-CL' | 'es-CO' | 'es-CR' | 'es-CU' | 'es-DO' | 'es-EC' | 'es-ES' | 'es-GQ' | 'es-GT' | 'es-HN' | 'es-MX' | 'es-NI' | 'es-PA' | 'es-PE' | 'es-PR' | 'es-PY' | 'es-SV' | 'es-US' | 'es-UY' | 'es-VE' | 'de-AT' | 'de-CH' | 'de-DE' | 'it-CH' | 'it-IT' | 'pt-BR' | 'pt-PT' | 'id-ID' | 'pl-PL' | 'uk-UA' | "ar-AE" | "ar-BH" | "ar-DZ" | "ar-EG" | "ar-IL" | "ar-IQ" | "ar-JO" | "ar-KW" | "ar-LB" | "ar-LY" | "ar-MA" | "ar-OM" | "ar-PS" | "ar-QA" | "ar-SA" | "ar-SY" | "ar-TN" | "ar-YE" | "zh-CN" | "zh-CN-shandong" |"zh-CN-sichuan" |"zh-HK" |"zh-TW";

export const SupportedDialects: RecognitionDialect[] = [
  'ar-AE',
  'ar-BH',
  'ar-DZ',
  'ar-EG',
  'ar-IL',
  'ar-IQ',
  'ar-JO',
  'ar-KW',
  'ar-LB',
  'ar-LY',
  'ar-MA',
  'ar-OM',
  'ar-PS',
  'ar-QA',
  'ar-SA',
  'ar-SY',
  'ar-TN',
  'ar-YE',
	'en-AU',
	'en-CA',
	'en-GB',
	'en-GH',
	'en-HK',
	'en-IE',
	'en-IN',
	'en-KE',
	'en-NG',
	'en-NZ',
	'en-PH',
	'en-SG',
	'en-TZ',
	'en-US',
	'en-ZA',
	'fr-BE',
	'fr-CA',
	'fr-CH',
	'fr-FR',
	'es-AR',
	'es-BO',
	'es-CL',
	'es-CO',
	'es-CR',
	'es-CU',
	'es-DO',
	'es-EC',
	'es-ES',
	'es-GQ',
	'es-GT',
	'es-HN',
	'es-MX',
	'es-NI',
	'es-PA',
	'es-PE',
	'es-PR',
	'es-PY',
	'es-SV',
	'es-US',
	'es-UY',
	'es-VE',
	'de-AT',
	'de-CH',
	'de-DE',
	'it-CH',
	'it-IT',
	'pt-BR',
	'pt-PT',
	'id-ID',
	'pl-PL',
	'uk-UA',
	'zh-CN',
  'zh-CN-shandong',
  'zh-CN-sichuan',
	'zh-HK',
  'zh-TW'
]

export const DefaultDialects: { [key in InterfaceLanguage]: RecognitionDialect } = {
	'en': 'en-US',
	'fr': 'fr-FR',
	'es': 'es-ES',
	'de': 'de-DE',
  'it': 'it-IT',
  'pt': 'pt-PT',
  'id': 'id-ID',
  'pl': 'pl-PL',
  'uk': 'uk-UA',
	'zh': 'zh-CN',
  'ar': 'ar-EG'
}

export type TextSize = 'textSize-xs' | 'textSize-sm' | 'textSize-base' | 'textSize-lg' | 'textSize-xl' | 'textSize-2xl' | 'textSize-3xl' | 'textSize-4xl' | 'textSize-5xl' | 'textSize-6xl' | 'textSize-7xl' | 'textSize-8xl' | 'textSize-9xl';

export const AvailableTextSizes: TextSize[] = [
  'textSize-xs',
  'textSize-sm',
  'textSize-base',
  'textSize-lg',
  'textSize-xl',
  'textSize-2xl',
  'textSize-3xl',
  'textSize-4xl',
  'textSize-5xl',
  'textSize-6xl',
  'textSize-7xl',
  'textSize-8xl',
  'textSize-9xl',
];

export type LineHeight = 'lineHeight-none' | 'lineHeight-tight' | 'lineHeight-snug' | 'lineHeight-normal' | 'lineHeight-relaxed' | 'lineHeight-loose';

export const AvailableLineHeights: LineHeight[] = [
  'lineHeight-none',
  'lineHeight-tight',
  'lineHeight-snug',
  'lineHeight-normal',
  'lineHeight-relaxed',
  'lineHeight-loose',
]

export type TextFlow = 'bottom-up' | 'top-down';

export const AvailableTextFlow: TextFlow[] = [
  'bottom-up',
  'top-down'
]

export enum FontFamily {
  sans = 'Atkinson Hyperlegible',
  poppins = 'Poppins',
  lexend = 'Lexend',
  raleway = 'Raleway',
  comicNeue = 'Comic Neue',
  notoSans = 'Noto Sans',
  cousine = 'Cousine',
  inconsolata = 'Inconsolata'
}

export const FontFamilyClassMap: Map<FontFamily, string> = new Map([
  [FontFamily.sans, 'font-sans'],
  [FontFamily.poppins, 'font-poppins'],
  [FontFamily.lexend, 'font-lexend'],
  [FontFamily.raleway, 'font-raleway'],
  [FontFamily.comicNeue, 'font-comic-neue'],
  [FontFamily.notoSans, 'font-noto-sans'],
  [FontFamily.cousine, 'font-cousine'],
  [FontFamily.inconsolata, 'font-inconsolata'],
])

export const AvailableFontFamilies: FontFamily[] = Array.from(FontFamilyClassMap.keys());

export interface TranscriptionSettings {
  enabled: boolean;
  loading?: boolean;
  titlePattern?: string;
}

export type TranslationDisplayMode = 'off' | 'split' | 'translated-only';

export interface TranslationSettings {
  enabled: boolean;
  mode: TranslationDisplayMode;
  targetLanguage: string;
}

export interface SupportedTranslationLanguage {
  code: string;
  name: string;
}

export const AvailableTranslationLanguages: SupportedTranslationLanguage[] = [
  { code: 'es', name: 'Spanish (Español)' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French (Français)' },
  { code: 'de', name: 'German (Deutsch)' },
  { code: 'it', name: 'Italian (Italiano)' },
  { code: 'pt', name: 'Portuguese (Português)' },
  { code: 'uk', name: 'Ukrainian (Українська)' },
  { code: 'ar', name: 'Arabic (العربية)' },
  { code: 'zh', name: 'Chinese (中文)' },
  { code: 'ja', name: 'Japanese (日本語)' },
  { code: 'ko', name: 'Korean (한국어)' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'vi', name: 'Vietnamese (Tiếng Việt)' },
  { code: 'ru', name: 'Russian (Русский)' },
  { code: 'nl', name: 'Dutch (Nederlands)' },
  { code: 'pl', name: 'Polish (Polski)' },
  { code: 'tr', name: 'Turkish (Türkçe)' }
];

export interface SettingsState extends SyncableSettings {
  transcription: TranscriptionSettings;
  translation: TranslationSettings;
}

export interface SyncableSettings {
  theme: AppTheme;
  lang: InterfaceLanguage;
	dialect: RecognitionDialect;
  wakelock: boolean;
  renderHistory: number;
  textSize: TextSize;
  lineHeight: LineHeight;
  textFlow: TextFlow;
  fontFamily: FontFamily;
  translation: TranslationSettings;
}

export * as SettingsActions from '../../../actions/settings.actions';