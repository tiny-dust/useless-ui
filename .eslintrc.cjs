module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:markdown/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "markdown"],
  overrides: [
    {
      files: "*.js",
      rules: {
        "no-undef": 0,
        "@typescript-eslint/no-var-requires": 0,
      },
    },
    {
      files: ["**/*.md/*.ts", "*.md"],
      processor: "markdown/markdown",
      rules: {
        "import/order": 0,
        "prettier/prettier": 0,
        "@typescript-eslint/consistent-type-definitions": 0,
      },
    },
    // test
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
    // svelte
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: {
          // Specify a parser for each lang.
          ts: "@typescript-eslint/parser",
          js: "espree",
          typescript: "@typescript-eslint/parser",
        },
      },
      rules: {
        "@typescript-eslint/no-floating-promises": 0,
      },
    },
    // ts
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
        "import/no-cycle": 0,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    extraFileExtensions: [".svelte"],
  },
  // 排除的文件
  ignorePatterns: ["*.demo.svelte"],
  rules: {
    "import/no-cycle": 0,
  },
};
