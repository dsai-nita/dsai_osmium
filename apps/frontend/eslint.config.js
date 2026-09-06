import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tseslint,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // React 17+ / Vite
      "react/react-in-jsx-scope": "off",

      // Let TypeScript handle types & globals
      "no-undef": "off",

      // Use TS version instead
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",

      // Common React relaxations
      "react/prop-types": "off",

      // Optional: relax strict destructuring
      "no-empty-pattern": "off",
    },
  },
];
