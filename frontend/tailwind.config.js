/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Pulled from the RaphLog dashboard screenshot
        talium: {
          purple: '#8b5cf6',
          'purple-dark': '#7c3aed',
          green: '#10b981',
          'green-dark': '#059669',
          pink: '#ec4899',
          'pink-dark': '#db2777',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
