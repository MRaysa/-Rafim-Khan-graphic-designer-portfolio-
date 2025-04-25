/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out forwards',
        'slideUpIn': 'slideUpIn 0.8s ease-out forwards',
        'highlight': 'highlight 1.5s ease-in-out forwards',
        'modalFadeIn': 'modalFadeIn 0.3s ease-out forwards',
        'progress': 'progress 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUpIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        highlight: {
          '0%': { backgroundSize: '0% 100%' },
          '100%': { backgroundSize: '100% 100%' },
        },
        modalFadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress, 100%)' },
        },
      },
      aspectRatio: {
        'square': '1 / 1',
        'portrait': '3 / 4',
        'landscape': '4 / 3',
      },
    },
  },
  plugins: [
    function({ addComponents, theme }) {
      addComponents({
        '.aspect-w-1': {
          position: 'relative',
          paddingBottom: 'calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%)',
          '> *': {
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
          },
          '--tw-aspect-w': '1',
        },
        '.aspect-h-1': {
          '--tw-aspect-h': '1',
        },
        '.aspect-w-3': {
          '--tw-aspect-w': '3',
        },
        '.aspect-h-4': {
          '--tw-aspect-h': '4',
        },
        '.aspect-w-4': {
          '--tw-aspect-w': '4',
        },
        '.aspect-h-3': {
          '--tw-aspect-h': '3',
        },
        '.aspect-w-4': {
          '--tw-aspect-w': '4',
        },
        '.aspect-h-5': {
          '--tw-aspect-h': '5',
        },
      });
    },
  ],
};