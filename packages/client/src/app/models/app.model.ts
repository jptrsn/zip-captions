import { AudioStreamState } from "./audio-stream.model";
import { RecognitionState } from "./recognition.model";

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
  winter = 'winter'
}

export interface AppAppearanceState {
  loading: boolean;
  theme: AppTheme;
  footerVisible: boolean;
  error?: string;
}
export interface AppState {
  appearance: AppAppearanceState;
  audioStream: AudioStreamState;
  recognition: RecognitionState;
}

export * as AppActions from '../actions/app.actions';