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

export type Language = 'en' | 'fr' | 'sp' | 'de' | 'it' | 'pt' | 'id' | 'pl' | 'uk';

export const AvailableLanguages: Language[] = [
  'en',
  'fr',
  'sp',
  'de',
  'it',
  'pt',
  'id',
  'pl',
  'uk'
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
  lang: Language;
  wakelock: boolean;
  renderHistory: number;
  textSize: TextSize;
  lineHeight: LineHeight;
  textFlow: TextFlow;
  fontFamily: FontFamily;
}

export * as SettingsActions from '../../../actions/settings.actions';