/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'english-violet': {
          900: '#44355B',
          850: '#4D3C67',
          800: '#57496B',
        },
        'dark-purple': '#31263E',
        'raisin-black': '#221E22',
        'hunyadi-yellow': '#ECA72C',
        flame: {
          900: '#EE5622',
          850: '#F05E2E',
          800: '#EF6434',
          700: '#F1784E',
          600: '#F38964',
          500: '#F59A7A',
        },
        darkflame: '#BE441B',
        'oxford-blue': '#191D32',
        'space-cadet': '#282F44',
        blurple: { 900: '#5865F2', 800: '#8992F6' },
      },
      screens: {
        xxs: '385px',
        xs: '475px',
        mdx: '840px',
        lgx: '1200px',
      },
      fontFamily: {
        nunity: ['Nunito', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        varela: ['Varela Round', 'sans-serif'],
        minecraft: ['Minecraft', 'sans-serif'],
        whitney: ['Whitney', 'sans-serif'],
        tech: ['Earth Orbiter', 'sans-serif'],
        magic: ['Magical Markers', 'sans-serif'],
      },
      boxShadow: {
        '3d': '2px 2px 2px rgba(47, 36, 182, 0.7), 4px 4px 4px rgba(47, 36, 182, 0.7), 6px 6px 6px rgba(47, 36, 182, 0.7), 8px 8px 8px rgba(47, 36, 182, 0.7)',
        '3d-hover':
          '1px 1px 1px rgba(57, 46, 192, 0.4), 2px 2px 2px rgba(57, 46, 192, 0.4), 3px 3px 3px rgba(57, 46, 192, 0.4), 4px 4px 4px rgba(57, 46, 192, 0.4)',
        glow: '0px 0px 70px 50px rgb(0 0 0 / 0.1)',
        'glow-hover': '0px 0px 80px 70px #e879f910',
      },
      height: {
        articles: 'calc(100vh - 100px)',
      },
      animation: {
        'ping-once': 'ping 1s cubic-bezier(0, 0, 0.2, 1) forwards',
        'gradient-x': 'moving-gradient 1.5s ease infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
