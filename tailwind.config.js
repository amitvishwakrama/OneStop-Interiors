/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#FDF8F3',
          100: '#F7EDE2',
          200: '#ECCDB3',
          300: '#DEA780',
          400: '#CE7E4D',
          500: '#B85D2A',
          600: '#9A451C',
          700: '#7B3317', // Rich Warm Wood
          800: '#5F2714',
          900: '#3D170A', // Dark Walnut Wood
          950: '#260D05',
        },
        cream: {
          50: '#FFFEFA',
          100: '#FDFBF7', // Main warm cream background
          200: '#F7F3EB',
          300: '#EFE8DA',
          400: '#E2D7C2',
          500: '#D2C3A7',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706', // Primary Accent Gold/Amber CTA
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        charcoal: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B', // Main Charcoal Dark
          900: '#0F172A', // Deep Charcoal
          950: '#020617',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(120, 53, 15, 0.08), 0 1px 2px rgba(120, 53, 15, 0.04)',
        'warm-md': '0 4px 12px rgba(120, 53, 15, 0.10), 0 2px 4px rgba(120, 53, 15, 0.06)',
        'warm-lg': '0 12px 30px rgba(120, 53, 15, 0.12), 0 4px 8px rgba(120, 53, 15, 0.08)',
        'warm-xl': '0 20px 40px rgba(120, 53, 15, 0.16)',
      },
      borderRadius: {
        'warm': '0.75rem',
      }
    },
  },
  plugins: [],
};

