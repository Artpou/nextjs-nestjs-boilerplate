import type { Config } from "tailwindcss";

import preset from "@workspace/ui/tailwind.preset";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/components/**/*.{ts,tsx}",
    "../../packages/ui/src/lib/**/*.{ts,tsx}",
    "../../packages/ui/tailwind.preset.ts",
  ],
  presets: [preset],
} satisfies Config;
