import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./client/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        neutral: {
          0: 'var(--neutral-0)',
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
        },
      },
      fontSize: {
        // 2025年基準：情報密度を高めるため、全体的にコンパクトに
        'xs': ['10px', { lineHeight: '1.3', letterSpacing: '0.01em' }],    // Tiny
        'sm': ['12px', { lineHeight: '1.4', letterSpacing: '0.01em' }],    // Small
        'base': ['14px', { lineHeight: '1.5', letterSpacing: '0' }],       // Body (Mobile)
        'lg': ['16px', { lineHeight: '1.5', letterSpacing: '0' }],         // Body (Desktop)
        'xl': ['18px', { lineHeight: '1.4', letterSpacing: '-0.01em' }],   // H3
        '2xl': ['20px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],  // H2
        '3xl': ['24px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],  // H1
        '4xl': ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],  // Display
        '5xl': ['40px', { lineHeight: '1.1', letterSpacing: '-0.03em' }],  // Hero
      },
      spacing: {
        // 4pxベースのスペーシングシステム（より細かい制御）
        '0': '0px',
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      borderRadius: {
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      keyframes: {
        'collapsible-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'sparkle-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
      },
      animation: {
        'collapsible-down': 'collapsible-down 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'collapsible-up': 'collapsible-up 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'spin-slow': 'spin-slow 3s linear infinite',
        'sparkle-pulse': 'sparkle-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
