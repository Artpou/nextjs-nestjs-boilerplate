import js from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import configTurbo from "eslint-config-turbo";
import tseslint from "typescript-eslint";
import pluginTurbo from "eslint-plugin-turbo";
import pluginImport from "eslint-plugin-import";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
    configPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: pluginTurbo,
      import: pluginImport,
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_.*?$",
        },
      ],
      "turbo/no-undeclared-env-vars": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "type",
            "builtin",
            "object",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "~/**",
              group: "external",
              position: "after",
            },
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
  {
    ignores: ["dist/**"],
  },
];
