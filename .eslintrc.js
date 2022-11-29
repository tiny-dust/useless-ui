module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:markdown/recommended", "plugin:markdown/recommended", "prettier"],
  plugins: ["svelte3", "@typescript-eslint", "markdown"],
  overrides: [
    {
      files: "*.js",
      rules: {
        "no-undef": 0,
      },
    },
    {
      files: ["**/*.md/*.ts",'*.md'],
      processor: "markdown/markdown",
      rules: {
        "import/order": 0,
        "prettier/prettier": 0,
        "@typescript-eslint/consistent-type-definitions": 0,
      },
    },
    {
      files: ["*.spec.ts", "*.spec.js"],
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
      },
      rules: {
        "@typescript-eslint/no-floating-promises": 0,
      },
    },
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
      rules: {
        "@typescript-eslint/no-floating-promises": 0,
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:import/typescript"],
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        "@typescript-eslint/strict-boolean-expressions": 0,
        "@typescript-eslint/prefer-nullish-coalescing": 0,
        "@typescript-eslint/naming-convention": 0,
        "multiline-ternary": 0,
        "no-void": 0,
        "import/no-cycle": 1,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/no-cycle": 0,
  },
};
