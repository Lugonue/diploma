export default {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': {
          100: '#EBEBEB',
          200: '#E2E2E2',
          300: '#F2F9F6',
          400: '#D9D9D9',
        },
        'gray-light': '#d3dce6',
        secondary: {
          'background': '#e4f8f3',
        },
        primary: {
          'Default': '#2B8570',
          'Light': '#589F8E',
          'Dark': '#2B8570',
          'Background': '#2B8570',
        },
        dark: {
          'background': '#1F2A26',
        }

      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
        'lg': '50px'
      }
    }
  }
};
