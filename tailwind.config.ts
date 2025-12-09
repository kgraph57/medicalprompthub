import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./client/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary-50': 'var(--primary-50)',
        'primary-100': 'var(--primary-100)',
        'primary-200': 'var(--primary-200)',
        'primary-300': 'var(--primary-300)',
        'primary-400': 'var(--primary-400)',
        'primary-500': 'var(--primary-500)',
        'primary-600': 'var(--primary-600)',
        'primary-700': 'var(--primary-700)',
        'primary-800': 'var(--primary-800)',
        'primary-900': 'var(--primary-900)',
        
        // Neutral colors
        'neutral-0': 'var(--neutral-0)',
        'neutral-50': 'var(--neutral-50)',
        'neutral-100': 'var(--neutral-100)',
        'neutral-200': 'var(--neutral-200)',
        'neutral-300': 'var(--neutral-300)',
        'neutral-400': 'var(--neutral-400)',
        'neutral-500': 'var(--neutral-500)',
        'neutral-600': 'var(--neutral-600)',
        'neutral-700': 'var(--neutral-700)',
        'neutral-800': 'var(--neutral-800)',
        'neutral-900': 'var(--neutral-900)',
        
        // Semantic colors
        'border': 'var(--neutral-200)',
        'background': 'var(--neutral-0)',
        'foreground': 'var(--neutral-900)',
        'card': 'var(--neutral-0)',
        'muted': 'var(--neutral-100)',
        'muted-foreground': 'var(--neutral-600)',
        'accent': 'var(--neutral-100)',
        'secondary': 'var(--primary-100)',
        'secondary-foreground': 'var(--primary-900)',
        'primary': 'var(--primary-600)',
      },
      fontSize: {
        'display': ['56px', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'h2': ['32px', { lineHeight: '1.25', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
