import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // or 'media'
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        '4xl': ['2.5rem', '3rem'],
        '3xl': ['2rem', '2.375rem'],
        '2xl': ['1.5rem', '1.75rem'],
        xl: ['1.25rem', '1.5rem'],
        '2lg': ['1.125rem', '1.3125rem'],
        lg: ['1rem', '1.1875rem'],
        md: ['0.875rem', '1.0625rem'],
        sm: ['0.8125rem', '1rem'],
        xs: ['0.75rem', '0.875rem'],
      },
      fontWeight: {
        bold: '700',
        semibold: '600',
        medium: '500',
        regular: '400',
      },
      colors: {
        brand: {
          primary: '#10B981',
          secondary: '#34D399',
          tertiary: '#A3E635',
          gradient: 'linear-gradient(to right, #10B981, #A3E635)',
        },
        point: {
          purple: '#A855F7',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          pink: '#EC4899',
          rose: '#F43F5E',
          orange: '#F97316',
          yellow: '#EAB308',
        },
        background: {
          primary: '#0F172A',
          secondary: '#1E293B',
          tertiary: '#334155',
          inverse: '#FFFFFF',
        },
        interaction: {
          inactive: '#94A3B8',
          hover: '#059669',
          pressed: '#047857',
          focus: '#10B981',
        },
        border: {
          primary: '#F8FAFC',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          tertiary: '#E2E8F0',
          default: '#64748B',
          inverse: '#FFFFFF',
          disabled: '#94A3B8',
        },
        status: {
          danger: '#DC2626',
        },
        icon: {
          primary: '#64748B',
          inverse: '#F8FAFC',
          brand: '#10B981',
        },
      },
    },
  },
  plugins: [],
};
export default config;
