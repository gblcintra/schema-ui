import js from "@eslint/js"
import tseslint from "typescript-eslint"
import react from "eslint-plugin-react"

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Config para TSX/TS
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["node_modules/**", "coverage/**", "*.snap.ts"], // substitui .eslintignore
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      react,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },

  // Config específica para dangerfile.js
  {
    files: ["dangerfile.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]
