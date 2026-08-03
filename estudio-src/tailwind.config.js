/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Blancos / cremas base
        cream: {
          50: '#FDFBF9',
          100: '#FBF6F1',
          200: '#F4EBE3',
        },
        // Café capuchino
        cappuccino: {
          100: '#EAD9C9',
          200: '#D8BCA3',
          300: '#C4A386',
          400: '#A8815E',
          500: '#8A6547',
          600: '#6F4E37',
        },
        // Morados pastel
        lavender: {
          100: '#EFE9FB',
          200: '#DFD3F7',
          300: '#C7B4F0',
          400: '#A88CE6',
          500: '#8B6FE0',
          600: '#6F53C4',
        },
        // Acento cálido (durazno / arcilla) para dar el "pop"
        peach: {
          200: '#F7D9C4',
          300: '#F2B79A',
          400: '#EC9370',
          500: '#E1764F',
        },
        // Tinta espresso para máximo contraste en titulares
        espresso: '#2A1E17',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
        blob: '42% 58% 63% 37% / 41% 44% 56% 59%',
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(111, 78, 55, 0.25)',
        glow: '0 0 80px -20px rgba(139, 111, 224, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-24px) rotate(6deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(4%, -6%) scale(1.08)' },
          '66%': { transform: 'translate(-5%, 4%) scale(0.96)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%' },
          '50%': { borderRadius: '58% 42% 37% 63% / 56% 59% 41% 44%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        morph: 'morph 14s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}
