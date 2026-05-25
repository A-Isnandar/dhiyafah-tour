/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#060D25',
        primary: '#0B1E59',
        accent: '#FFC000',
        highlight: '#E60000',
        glass: 'rgba(255, 255, 255, 0.05)',
        'navy-light': '#1A3080',
        'gold-light': '#FFD54F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      backgroundImage: {
        'noise': "url('https://grainy-gradients.vercel.app/noise.svg')",
      },
    },
  },
  plugins: [],
}
