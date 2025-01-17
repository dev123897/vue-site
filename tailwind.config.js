/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        'midnight': {
          10: '#384257',
          15: '#2d3545',
          20: '#1c273e',
          30: '#0f1b33',
          40: '#0c131f',
          50: '#0b101a'
        },
        'sleet': {
          10: '#e1e8ea',
          20: '#bdc7cb ',
          30: '#a8b0b4',
          40: '#4b4e52'
        },
        'salmon': {
          10: '#ffaea6',
          20: '#ff6f61',
          30: '#ff503f',
          40: '#f14838'
        }
      },
      fontFamily: {
        'fira-sans': ['"Fira Sans"', 'sans-serif']
      },
      fontSize: {
        mdd: ['20px', '22px'],
      },
      padding: {
        '9rem': '9rem'
      }
    },
  },
  plugins: [],
}

