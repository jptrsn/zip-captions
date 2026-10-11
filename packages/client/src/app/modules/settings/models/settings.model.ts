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

/**
 * Azure locales whose models natively recognize a second language (requirements §3.1).
 * Metadata only: recognizer configuration is unchanged for these locales.
 */
export const BilingualDialects: Partial<Record<RecognitionDialect, readonly string[]>> = {
  'fr-CA': ['fr', 'en'],
  'es-US': ['es', 'en'],
  'ar-AE': ['ar', 'en'],
  'ar-BH': ['ar', 'en'],
  'ar-DZ': ['ar', 'en'],
  'ar-IL': ['ar', 'en'],
  'ar-IQ': ['ar', 'en'],
  'ar-KW': ['ar', 'en'],
  'ar-LB': ['ar', 'en'],
  'ar-LY': ['ar', 'en'],
  'ar-MA': ['ar', 'en'],
  'ar-OM': ['ar', 'en'],
  'ar-PS': ['ar', 'en'],
  'ar-QA': ['ar', 'en'],
  'ar-SA': ['ar', 'en'],
  'ar-SY': ['ar', 'en'],
  'ar-TN': ['ar', 'en'],
  'ar-YE': ['ar', 'en'],
  // English + Hindi; Hindi is not a translation source
  'en-IN': ['en'],
};

/** True when the dialect's Azure model also recognizes English */
export function isBilingualDialect(dialect: string | null | undefined): boolean {
  return !!dialect && (BilingualDialects[dialect as RecognitionDialect]?.length ?? 0) > 1;
}

/** True when a translation language can also be spoken (has recognition dialects) */
export function isSpokenLanguage(code: string | null | undefined): code is InterfaceLanguage {
  return !!code && (AvailableLanguages as string[]).includes(code);
}

export interface LanguagePair {
  lang: InterfaceLanguage;
  dialect: RecognitionDialect;
  targetLanguage: string;
  dialectByLanguage?: Partial<Record<InterfaceLanguage, RecognitionDialect>>;
}

/**
 * Swaps the spoken and translation languages. The new spoken dialect is the one last used for that
 * language, so swapping back restores e.g. fr-CA. Returns undefined when the translation language
 * can't be spoken.
 */
export function swapLanguagePair(pair: LanguagePair): LanguagePair | undefined {
  const target = pair.targetLanguage;
  if (!isSpokenLanguage(target) || target === pair.lang) {
    return undefined;
  }
  const dialectByLanguage = pair.dialect !== 'unspecified'
    ? { ...pair.dialectByLanguage, [pair.dialect.split('-')[0].toLowerCase()]: pair.dialect }
    : pair.dialectByLanguage;
  return {
    lang: target,
    dialect: dialectByLanguage?.[target] ?? 'unspecified',
    targetLanguage: pair.lang,
    dialectByLanguage,
  };
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
  // Last dialect used per spoken language, so swapping back restores e.g. fr-CA rather than the default
  dialectByLanguage?: Partial<Record<InterfaceLanguage, RecognitionDialect>>;
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

/** Interface language preference; 'spoken' follows the spoken (recognition) language */
export type UiLanguagePreference = InterfaceLanguage | 'spoken';

export interface SyncableSettings {
  theme: AppTheme;
  /** Spoken (recognition) language; also the interface language when uiLanguage is 'spoken' */
  lang: InterfaceLanguage;
  uiLanguage: UiLanguagePreference;
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