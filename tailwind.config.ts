import { nextui } from '@nextui-org/theme';
import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  plugins: [
    nextui({
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light",
      themes: {
        light: {
          layout: {},
          colors: {}
        },
        dark: {
          layout: {},
          colors: {}
        }
      }
    })],
};
export default config;
