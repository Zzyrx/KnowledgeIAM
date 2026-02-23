/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'iam-dark': '#080C14',
        'iam-medium': '#0F1629',
        'iam-surface': '#161D30',
        'iam-cyan': '#06B6D4',
        'iam-violet': '#8B5CF6',
        'iam-text': '#F8FAFC',
        'iam-muted': '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
