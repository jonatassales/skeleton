const tokens = {
  colors: {
    /**
     * Base colors
     */
    'base-white': '#FFFFFF',
    'base-black': '#000000',

    /**
     * Gray scale
     */
    'gray-25': '#FCFCFD',
    'gray-50': '#F9F9FB',
    'gray-100': '#EFF1F5',
    'gray-200': '#DCDFEA',
    'gray-300': '#B9C0D4',
    'gray-400': '#7D89B0',
    'gray-500': '#5D6B98',
    'gray-600': '#4A5578',
    'gray-700': '#404968',
    'gray-800': '#30374F',
    'gray-900': '#111322',

    /**
     * Primary scale
     */
    'primary-25': '#FCFAFF',
    'primary-50': '#F9F5FF',
    'primary-100': '#F4EBFF',
    'primary-200': '#E9D7FE',
    'primary-300': '#D6BBFB',
    'primary-400': '#B692F6',
    'primary-500': '#9E77ED',
    'primary-600': '#7F56D9',
    'primary-700': '#6941C6',
    'primary-800': '#53389E',
    'primary-900': '#42307D',

    /**
     * Error scale
     */
    'error-25': '#FFFBFA',
    'error-50': '#FEF3F2',
    'error-100': '#FEE4E2',
    'error-200': '#FECDCA',
    'error-300': '#FDA29B',
    'error-400': '#F97066',
    'error-500': '#F04438',
    'error-600': '#D92D20',
    'error-700': '#B42318',
    'error-800': '#912018',
    'error-900': '#7A271A',

    /**
     * Warning scale
     */
    'warning-25': '#FFFCF5',
    'warning-50': '#FFFAEB',
    'warning-100': '#FEF0C7',
    'warning-200': '#FEDF89',
    'warning-300': '#FEC84B',
    'warning-400': '#FDB022',
    'warning-500': '#F79009',
    'warning-600': '#DC6803',
    'warning-700': '#B54708',
    'warning-800': '#93370D',
    'warning-900': '#7A2E0E',

    /**
     * Success scale
     */
    'success-25': '#FAFDF7',
    'success-50': '#F5FBEE',
    'success-100': '#E6F4D7',
    'success-200': '#CEEAB0',
    'success-300': '#ACDC79',
    'success-400': '#86CB3C',
    'success-500': '#669F2A',
    'success-600': '#4F7A21',
    'success-700': '#3F621A',
    'success-800': '#335015',
    'success-900': '#2B4212',

    /**
     * Secondary blue scale
     */
    'secondary-blue-25': '#F5FAFF',
    'secondary-blue-50': '#EFF8FF',
    'secondary-blue-100': '#D1E9FF',
    'secondary-blue-200': '#B2DDFF',
    'secondary-blue-300': '#84CAFF',
    'secondary-blue-400': '#53B1FD',
    'secondary-blue-500': '#2E90FA',
    'secondary-blue-600': '#1570EF',
    'secondary-blue-700': '#175CD3',
    'secondary-blue-800': '#1849A9',
    'secondary-blue-900': '#194185',

    /**
     * Secondary yellow scale
     */
    'secondary-yellow-25': '#FEFDF0',
    'secondary-yellow-50': '#FEFBE8',
    'secondary-yellow-100': '#FEF7C3',
    'secondary-yellow-200': '#FEEE95',
    'secondary-yellow-300': '#FDE272',
    'secondary-yellow-400': '#FAC515',
    'secondary-yellow-500': '#EAAA08',
    'secondary-yellow-600': '#CA8504',
    'secondary-yellow-700': '#A15C07',
    'secondary-yellow-800': '#854A0E',
    'secondary-yellow-900': '#713B12'
  },

  backgroundImage: {
    'clouds-pattern': "url('/images/clouds.svg')"
  },

  keyframes: {
    disco: {
      '0%': { transform: 'translateY(-50%) rotate(0deg)' },
      '100%': { transform: 'translateY(-50%) rotate(360deg)' }
    }
  },

  animation: {
    disco: 'disco 0.4s linear infinite'
  },

  spacing: {
    px: '1px',
    2: '0.125rem',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    10: '0.625rem',
    12: '0.75rem',
    14: '0.875rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    36: '2.25rem',
    40: '2.5rem',
    44: '2.75rem',
    48: '3rem',
    56: '3.5rem',
    64: '4rem',
    80: '5rem',
    96: '6rem',
    112: '7rem',
    128: '8rem',
    144: '9rem',
    160: '10rem',
    176: '11rem',
    192: '12rem',
    208: '13rem',
    224: '14rem',
    240: '15rem',
    256: '16rem',
    288: '18rem',
    320: '20rem',
    384: '24rem'
  },

  opacity: {
    default: '100%',
    semiOpaque: '90%',
    intense: '75%',
    medium: '50%',
    light: '25%',
    semiTransparent: '10%'
  },

  borderRadius: {
    DEFAULT: '4px',
    2: '6px',
    3: '8px',
    4: '12px',
    pill: '9999px'
  },

  boxShadow: {
    sm: '0 1px 2px 0 rgba(64,73,104,.16)',
    shadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0px 2px 4px rgba(0, 0, 0, 0.06)',
    none: 'none'
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    md: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '3rem' }],
    '6xl': ['3.75rem', { lineHeight: '3.75rem' }],
    '7xl': ['4.5rem', { lineHeight: '4.5rem' }],
    '8xl': ['6rem', { lineHeight: '6rem' }],
    '9xl': ['8rem', { lineHeight: '8rem' }]
  },

  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700'
  },

  lineHeight: {
    xs: '1rem',
    sm: '1.25rem',
    md: '1.5rem',
    lg: '1.75rem',
    xl: '1.75rem',
    '2xl': '2rem',
    '3xl': '2.25rem',
    '4xl': '2.5rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem'
  },

  zIndex: {
    auto: 'auto',
    0: '0',
    1: '100',
    2: '200',
    3: '300',
    4: '400',
    max: '999'
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: tokens.colors,
      backgroundImage: tokens.backgroundImage,
      keyframes: tokens.keyframes,
      animation: tokens.animation,
      spacing: tokens.spacing,
      opacity: tokens.opacity,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.boxShadow,
      fontSize: tokens.fontSize,
      fontWeight: tokens.fontWeight,
      lineHeight: tokens.lineHeight,
      opacity: tokens.opacity,
      zIndex: tokens.zIndex
    }
  },
  plugins: []
}
