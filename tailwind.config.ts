import type { Config, } from "tailwindcss";
import * as colors from "tailwindcss/colors";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main brand colors from the design
        primary: {
          DEFAULT: colors.blue[500], // Used in buttons, interactive elements
          dark: colors.blue[600],    // Hover states
          light: colors.blue[50],    // Light backgrounds
        },
        // Background colors
        background: {
          DEFAULT: colors.gray[50],  // Main page background
          dark: colors.blue[900],    // Hero section background
          card: colors.white,        // Card backgrounds
        },
        // Text colors
        text: {
          DEFAULT: colors.gray[700], // Regular text
          light: colors.white,       // Text on dark backgrounds
          muted: colors.gray[600],   // Secondary text
          accent: colors.blue[600],  // Highlighted text
        },
        // Status colors from the seller cards
        status: {
          success: colors.green[500], // "In Stock" status
          warning: colors.orange[500], // "Limited" status
        },
        // Rating colors
        rating: {
          DEFAULT: colors.yellow[500], // Star ratings
        },
        // Border colors
        border: {
          DEFAULT: colors.gray[200],
          accent: colors.blue[500], // Selected card border
        },
      },
      // You might also want these for consistent spacing/sizing
      spacing: {
        'section': '3rem',     // Standard section padding
        'card': '1.5rem',      // Card padding
      },
      borderRadius: {
        'card': '0.5rem',      // Card border radius
      },
      fontSize: {
        // Font sizes used in the design
        'title': ['2.25rem', { lineHeight: '2.5rem' }],     // Section titles
        'subtitle': ['1.5rem', { lineHeight: '2rem' }],     // Card titles
        'body': ['1rem', { lineHeight: '1.5rem' }],         // Regular text
        'small': ['0.875rem', { lineHeight: '1.25rem' }],   // Small text
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // Card shadow
      },
    },
  },
//   plugins: [require("tailwindcss-animate"), require("daisyui")],
} satisfies Config;
