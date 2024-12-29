import type { Config } from "tailwindcss";

import preset from "./tailwind.preset";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  presets: [preset],
} satisfies Config;

export default config;
