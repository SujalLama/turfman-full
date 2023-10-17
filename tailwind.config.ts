import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/section/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#888888',
            lineHeight: '1.5',
            ul : {
              
              paddingLeft: '1em'
            },
            p : {
              marginTop: '1.6em',
              marginBottom: '1.6em',
            },
            li : {
              marginTop: '1em',
              marginBottom: '1em',
            }
          },
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans'],
        display: ['var(--font-roboto)', 'sans'],
      },
      colors: {
        'primary': {
          lighter: '#7bdcb5',
          light: '#00d084',
          DEFAULT: '#86bb46'
        },
        'gray': {
          'bluish': '#abb8c3',
          DEFAULT: '#6c757d',
          'dark': '#343a40',
          'text': '#888888',
          'darker': '#252525',
          'border': 'rgba(255,255,255,.2)'
        },
        black: {
          light: '#222',
          DEFAULT: '#000'
        },
        'red': '#dc3545',
        'border-color': 'rgba(255,255,255,.2)'
      },
      boxShadow: {
        'sm': '0px 0px 16px -10px rgba(0, 0, 0, 0.3)',
        'md': '0px 0px 10px -4px rgba(0, 0, 0, 0.3)',
        'lg': '0 0 30px rgba(0,0,0,.07)',
      },
      spacing: {
        '0.25': '1px',
        3.5: '15px',
        7.5: '30px',
        25: '100px',
      },
      screens: {
        'large': '992px',
      },
      animation: {
        'ping-slow': 'ping 1s cubic-bezier(0, 0, 0.2, 1) 200ms infinite'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
export default config
