module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:svelte3/recommended'],
  plugins: ["svelte3", "@typescript-eslint", "markdown"],
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
      extends: ["plugin:markdown/recommended", "eslint:recommended"],
      rules: {
        "import/order": 0,
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
      files: ['**/*.svelte'],
      processor: "svelte3/svelte3",
    },
    // ts
    {
      files: ["*.ts", "*.tsx"],
      extends: [],
      extends: [
        "plugin:import/typescript",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
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
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    extraFileExtensions: [".svelte"],
  },
  // 排除的文件
  ignorePatterns: ["*.demo.svelte"],
  rules: {
    "import/no-cycle": 0,
  },
  settings: {
    "svelte3/typescript": () => require("typescript"),
  },
};
