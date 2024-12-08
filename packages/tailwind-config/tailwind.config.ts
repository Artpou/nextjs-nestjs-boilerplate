import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};

export default config;
