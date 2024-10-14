import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        verdana: ['Verdana', 'sans-serif'],
      },
      fontSize: {
        // 40px / 48px => 2.5rem / 3rem, Medium
        '4xl': ['2.5rem', { lineHeight: '3rem', fontWeight: '500' }],
        // 32px / 38px => 2rem / 2.375rem, Bold
        '3xl-bold': ['2rem', { lineHeight: '2.375rem', fontWeight: '700' }],
        // 32px / 38px => 2rem / 2.375rem, Semibold
        '3xl-semibold': ['2rem', { lineHeight: '2.375rem', fontWeight: '600' }],
        // 24px / 28px => 1.5rem / 1.75rem, Bold
        '2xl-bold': ['1.5rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        // 24px / 28px => 1.5rem / 1.75rem, Semibold
        '2xl-semibold': [
          '1.5rem',
          { lineHeight: '1.75rem', fontWeight: '600' },
        ],
        // 24px / 28px => 1.5rem / 1.75rem, Medium
        '2xl-medium': ['1.5rem', { lineHeight: '1.75rem', fontWeight: '500' }],
        // 24px / 28px => 1.5rem / 1.75rem, Regular
        '2xl-regular': ['1.5rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        // 20px / 24px => 1.25rem / 1.5rem, Bold
        'xl-bold': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        // 20px / 24px => 1.25rem / 1.5rem, Semibold
        'xl-semibold': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        // 20px / 24px => 1.25rem / 1.5rem, Medium
        'xl-medium': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        // 20px / 24px => 1.25rem / 1.5rem, Regular
        'xl-regular': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        // 18px / 21px => 1.125rem / 1.3125rem, Bold
        '2lg-bold': [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '700' },
        ],
        // 18px / 21px => 1.125rem / 1.3125rem, Semibold
        '2lg-semibold': [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '600' },
        ],
        // 18px / 21px => 1.125rem / 1.3125rem, Medium
        '2lg-medium': [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '500' },
        ],
        // 18px / 21px => 1.125rem / 1.3125rem, Regular
        '2lg-regular': [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '400' },
        ],
        // 16px / 19px => 1rem / 1.1875rem, Bold
        'lg-bold': ['1rem', { lineHeight: '1.1875rem', fontWeight: '700' }],
        // 16px / 19px => 1rem / 1.1875rem, Semibold
        'lg-semibold': ['1rem', { lineHeight: '1.1875rem', fontWeight: '600' }],
        // 16px / 19px => 1rem / 1.1875rem, Medium
        'lg-medium': ['1rem', { lineHeight: '1.1875rem', fontWeight: '500' }],
        // 16px / 19px => 1rem / 1.1875rem, Regular
        'lg-regular': ['1rem', { lineHeight: '1.1875rem', fontWeight: '400' }],
        // 14px / 17px => 0.875rem / 1.0625rem, Bold
        'md-bold': ['0.875rem', { lineHeight: '1.0625rem', fontWeight: '700' }],
        // 14px / 17px => 0.875rem / 1.0625rem, Semibold
        'md-semibold': [
          '0.875rem',
          { lineHeight: '1.0625rem', fontWeight: '600' },
        ],
        // 14px / 17px => 0.875rem / 1.0625rem, Medium
        'md-medium': [
          '0.875rem',
          { lineHeight: '1.0625rem', fontWeight: '500' },
        ],
        // 14px / 17px => 0.875rem / 1.0625rem, Regular
        'md-regular': [
          '0.875rem',
          { lineHeight: '1.0625rem', fontWeight: '400' },
        ],
        // 13px / 16px => 0.8125rem / 1rem, Semibold
        'sm-semibold': ['0.8125rem', { lineHeight: '1rem', fontWeight: '600' }],
        // 13px / 16px => 0.8125rem / 1rem, Medium
        'sm-medium': ['0.8125rem', { lineHeight: '1rem', fontWeight: '500' }],
        // 12px / 14px => 0.75rem / 0.875rem, Semibold
        'xs-semibold': [
          '0.75rem',
          { lineHeight: '0.875rem', fontWeight: '600' },
        ],
        // 12px / 14px => 0.75rem / 0.875rem, Medium
        'xs-medium': ['0.75rem', { lineHeight: '0.875rem', fontWeight: '500' }],
        // 12px / 14px => 0.75rem / 0.875rem, Regular
        'xs-regular': [
          '0.75rem',
          { lineHeight: '0.875rem', fontWeight: '400' },
        ],
      },
      colors: {
        brand: {
          primary: '#10b981',
          secondary: '#34d399',
          tertiary: '#a3e635',
        },
        point: {
          purple: 'a855f7',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          pink: '#ec4899',
          rose: '#f43f5e',
          orange: '#f97316',
          yellow: '#eab308',
        },
        interaction: {
          inactive: '#94a3b8',
          hover: '#059669',
          pressed: '#047857',
          focus: '#10b981',
        },
        status: {
          danger: '#dc2626',
        },
        icon: {
          primary: '#64748b',
          inverse: '#f8fafc',
          brand: '#10b981',
        },
      },
      backgroundColor: {
        primary: '#0f172a',
        secondary: '#1e293b',
        tertiary: '#334155',
        inverse: '#ffffff',
        select: '#18212f',
      },
      textColor: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        tertiary: '#e2e8f0',
        default: '#64748b',
        inverse: '#ffffff',
        disabled: '#94a3b8',
      },
      borderColor: {
        primary: '#f8fafc1a',
      },
      screens: {
        tab: { max: '74.9375rem' },
        mob: { max: '46.4375rem' },
        pc: { min: '75rem' },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
