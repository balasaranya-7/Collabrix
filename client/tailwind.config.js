/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        collabrix: {
          onyx: '#000000',
          velvet: '#1A1515',
          velvetLight: '#241D1D',
          roseGold: '#B07878',
          roseGoldHover: '#9A6363',
          roseGlimmer: '#E6C2BF',
          pearlDust: '#F9EBE5',
          pearlWhite: '#FFF9F6',
          mutedText: '#A39292',
          borderVelvet: '#2E2424',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(176, 120, 120, 0.15)',
        'velvet': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'glow': '0 0 25px rgba(176, 120, 120, 0.25)',
      }
    },
  },
  plugins: [],
}
