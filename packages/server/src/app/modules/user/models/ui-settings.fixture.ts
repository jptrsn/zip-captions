// What the client posts from "Save current": the whole state, `transcription` without `loading`
export const clientPayload = () => ({
  theme: 'Zip-Dark',
  lang: 'en',
  uiLanguage: 'spoken',
  dialect: 'unspecified',
  wakelock: true,
  renderHistory: 15,
  textSize: 'textSize-3xl',
  lineHeight: 'lineHeight-normal',
  textFlow: 'bottom-up',
  fontFamily: 'Atkinson Hyperlegible',
  transcription: { enabled: true, titlePattern: 'Sunday {date}' },
  translation: {
    enabled: true,
    mode: 'split',
    targetLanguage: 'fr',
    splitOrientation: 'horizontal',
    paneOrder: 'translated-first',
    pipContent: 'split',
    obsFeed: 'translated',
    dialectByLanguage: { fr: 'fr-CA', es: 'es-US' },
  },
});
