/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aviation-blue': '#0047AB',
        'aviation-light': '#E0F7FA',
        'aviation-accent': '#FF6B00',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-white',
    'text-gray-800',
    'font-sans',
    'z-60',
    'z-70',
    // Add other utility classes that might be used via @apply but not detected by the content scanner
  ]
}
