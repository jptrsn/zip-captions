const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    fontFamily: {
      'sans': ['Atkinson Hyperlegible', ...defaultTheme.fontFamily.sans],
      'atkinson': '"Atkinson Hyperlegibile"',
      'poppins': 'Poppins',
      'lexend': 'Lexend',
      'raleway': 'Raleway',
      'comic-neue': '"Comic Neue"',
      'noto-sans': '"Noto Sans"',
      'cousine': 'Cousine',
      'inconsolata': 'Inconsolata',
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
  ],
  daisyui: {
    themes: [
      'dark',
      'light',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      {
        'Zip-Dark': {
          "primary": "#db6e11",
          "secondary": "#66b1f2",
          "accent": "#bf877a",
          "neutral": "#19202E",
          "base-100": "#0d0d0d",
          "info": "#e0e7ff",
          "success": "#6ee7b7",
          "warning": "#FCDE45",
          "error": "#E33D2B",
        },
        'Zip-Light': {
          "primary": "#4178bf",
          "secondary": "#66b1f2",
          "accent": "#bf877a",
          "neutral": "#19202E",
          "base-100": "#F0F1F2",
          "info": "#e0e7ff",
          "success": "#6ee7b7",
          "warning": "#FCDE45",
          "error": "#E33D2B",
        },

      },
    ]
  }
};
