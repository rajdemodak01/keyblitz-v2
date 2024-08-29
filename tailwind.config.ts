import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        // 'sm': '640px',
        // 'md': '768px',
        // 'lg': '1024px',
        // 'xl': '1280px',
        // '2xl': '1536px',
      },
      fontFamily: {
        sans: ["var(--font-spacemono)"],
      },
      fontSize: {
        pa: [
          "1.5rem", // change this for the paragraph fontsize to change
          {
            lineHeight: "2rem",
            // letterSpacing: '-0.02em',
            // fontWeight: '700',
          },
        ],
      },
      spacing: {
        pa: "0.8rem", // change this for the paragraph gap to change
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: {
          DEFAULT: "var(--foreground)",
          light: "var(--foreground-light)",
          "light-1": "var(--foreground-light-1)",
        },
        "background-transparent": "var(--background) / 0.9",
        "ghost-cursor": "var(--ghost-cursor)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          light: "var(--destructive-light)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        "transparent-dark": "var(--transparent-dark)",
      },
    },
  },
  plugins: [],
};
export default config;
