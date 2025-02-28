/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6efe9',
          100: '#ccdfd3',
          200: '#99bfa7',
          300: '#669f7b',
          400: '#337f4f',
          500: '#297045',
          600: '#216037',
          700: '#195029',
          800: '#11401b',
          900: '#08300d',
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      typography: (theme) => ({
        primary: {
          css: {
            '--tw-prose-body': theme('colors.primary[700]'),
            '--tw-prose-headings': theme('colors.primary[800]'),
            '--tw-prose-lead': theme('colors.primary[600]'),
            '--tw-prose-links': theme('colors.primary[600]'),
            '--tw-prose-bold': theme('colors.primary[800]'),
            '--tw-prose-bullets': theme('colors.primary[400]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 