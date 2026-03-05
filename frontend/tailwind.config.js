module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        'html': {
          scrollBehavior: 'smooth',
        },
        '@supports (padding: max(0px))': {
          'body': {
            paddingLeft: 'max(12px, env(safe-area-inset-left))',
            paddingRight: 'max(12px, env(safe-area-inset-right))',
          },
        },
      });
    },
  ],
};

