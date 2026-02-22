/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'iam-dark': '#0C1933',
        'iam-medium': '#122850',
        'iam-cyan': '#00B4DC',
        'iam-text': '#FFFFFF',
        'iam-muted': '#B4C3DC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
