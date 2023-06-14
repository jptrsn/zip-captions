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

export type Language = 'en' | 'fr' | 'sp' | 'de' | 'it';

export const AvailableLanguages: Language[] = [
  'en',
  'fr',
  'sp',
  'de',
  'it'
]

export interface SettingsState {
  theme: AppTheme;
  lang: Language;
}

export * as SettingsActions from '../../../actions/settings.actions';