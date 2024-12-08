import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: [
    "src/components/**/*.tsx",
    "src/lib/**/*.ts",
    "src/globals.css",
  ],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  external: ["react"],
  ...options,
}));
