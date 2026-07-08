/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // Every color below points at a CSS variable declared once in
      // app/globals.css. Change the brand palette in ONE place (globals.css)
      // and it updates everywhere in the app.
      colors: {
        navy: 'rgb(var(--color-navy) / <alpha-value>)',
        'navy-tint': 'rgb(var(--color-navy-tint) / <alpha-value>)',
        red: 'rgb(var(--color-red) / <alpha-value>)',
        'red-hover': 'rgb(var(--color-red-hover) / <alpha-value>)',
        blue: 'rgb(var(--color-blue) / <alpha-value>)',
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        'text-light': 'rgb(var(--color-text-light) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        btn: '8px',
      },
      maxWidth: {
        content: '1180px',
      },
    },
  },
  plugins: [],
};
