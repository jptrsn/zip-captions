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

export type Language = 'en' | 'fr' | 'sp' | 'de' | 'it' | 'pt';

export const AvailableLanguages: Language[] = [
  'en',
  'fr',
  'sp',
  'de',
  'it',
  // 'pt' // TODO: Portuguese translation file
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
export interface SettingsState {
  theme: AppTheme;
  lang: Language;
  wakeLock: boolean;
  textSize: TextSize;
  lineHeight: LineHeight;
}

export * as SettingsActions from '../../../actions/settings.actions';