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

export type InterfaceLanguage = 'en' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'id' | 'pl' | 'uk';

export const AvailableLanguages: InterfaceLanguage[] = [
  'en',
  'fr',
  'es',
  'de',
  'it',
  'pt',
  'id',
  'pl',
  'uk'
]

export type RecognitionDialect = 'unspecified' | 'en-AU' | 'en-CA' | 'en-GB' | 'en-GH' | 'en-HK' | 'en-IE' | 'en-IN' | 'en-KE' | 'en-NG' | 'en-NZ' | 'en-PH' | 'en-SG' | 'en-TZ' | 'en-US' | 'en-ZA' | 'fr-BE' | 'fr-CA' | 'fr-CH' | 'fr-FR' | 'es-AR' | 'es-BO' | 'es-CL' | 'es-CO' | 'es-CR' | 'es-CU' | 'es-DO' | 'es-EC' | 'es-ES' | 'es-GQ' | 'es-GT' | 'es-HN' | 'es-MX' | 'es-NI' | 'es-PA' | 'es-PE' | 'es-PR' | 'es-PY' | 'es-SV' | 'es-US' | 'es-UY' | 'es-VE' | 'de-AT' | 'de-CH' | 'de-DE' | 'it-CH' | 'it-IT' | 'pt-BR' | 'pt-PT' | 'id-ID' | 'pl-PL' | 'uk-UA';

export const SupportedDialects: RecognitionDialect[] = [
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
]

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
export interface SettingsState extends SyncableSettings {
  transcription: TranscriptionSettings;
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
}

export * as SettingsActions from '../../../actions/settings.actions';