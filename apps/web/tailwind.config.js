const sharedConfig = require('@read-quill/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedConfig],
  theme: {
    extend: {
      gridTemplateColumns: {
        community: 'auto 1fr',
      },
      animation: {
        'hero-background': 'rotate 10s linear infinite',
        'home-testimonials-1': 'home-testimonials 100s linear infinite',
        'home-testimonials-2': 'home-testimonials 100s linear infinite reverse',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
