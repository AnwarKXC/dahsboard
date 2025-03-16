// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  await antfu( {
       rules: {
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-call': 'off',
      'unused-imports/no-unused-vars': 'off',
      "ts/strict-boolean-expressions": 'off',
          "@typescript-eslint/no-unsafe-member-access": "off"

    },
    ignores: [
      // Ignore build and dist directories
      '**/dist/',
      '**/build/',
      // Ignore specific file types
      '**/*.min.js',
      '**/*.d.ts',
      // Ignore node modules
      '**/node_modules/',
      // Ignore specific files
      '.nuxt/',
      '.output/',
      '.vscode/',
      '.husky/',
      // Ignore specific patterns
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.md',
      '**/*.config.ts',
      '**.toml'
    ],
    vue: {
      overrides: {
        "vue/define-macros-order": ["error", {
          "order": ["enum", "interface", "defineOptions", "defineProps", "defineEmits", "defineSlots"]
        }],
      }
    },
  typescript: {
  tsconfigPath: './tsconfig.json',
  parserOptions: {
    projectService: true,
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  overrides: {
    'node/prefer-global/process': 'off',
    'style/quote-props': 'off',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/require-name-property': 'error',
      "ts/strict-boolean-expressions ": 'off',
    '@typescript-eslint/consistent-type-definitions': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'unused-imports/no-unused-vars': 'off',

    camelcase: [
      'error',
      {
        ignoreDestructuring: false,
        ignoreImports: false,
        ignoreGlobals: false,
        properties: 'always',
      },
    ],
    'vue/multi-word-component-names': 'off',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'no-console': 'error',
    'no-debugger': 'error',
    curly: ['off', 'all'],
  },
},

    formatters: {
      css: true,
      html: true,
    },
    stylistic: {
      semi: false,
      quotes: 'single',
      indent: 2,
    },
  }),
)
