const sharedConfig = require('@read-quill/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedConfig],
  theme: {
    extend: {
      animation: {
        'hero-background': 'rotate 10s linear infinite',
      },
    },
  },
};
