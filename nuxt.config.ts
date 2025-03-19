import Aura from '@primeuix/themes/aura'

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig( {
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: [ '~/assets/css/main.css' ],
  extends: [ 'app/_Base', 'app/_Auth', 'app/_User' ],

  imports: {
    dirs: [
      '../shared/types',
      '../shared/utils',
      '../server/models',
    ]
  },
  nitro: {
    imports: {
      dirs: [
        'shared/types/index',
        'shared/utils/**'
      ]
    },
  },
  pinia: {
    storesDirs: [ './app/**/stores/**', './ app/**/stores/**' ],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  tailwindcss: {
    cssPath: [ "~/assets/css/main.css", { injectPosition: "first" } ],
    viewer: false,
    editorSupport: true,
  },
  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: '.my-app-dark',
        },
      },
    },
  },

  colorMode: {
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "vueuse-color-scheme",
  },

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  i18n: {
    defaultLocale: "en",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
    },
    locales: [
      {
        code: "en",
        name: "English",
        direction: "ltr",
      },
      {
        code: "ar",
        name: "عربي",
        direction: "rtl",
      },
    ],
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
  fonts: {
    priority: [ 'google' ],
    families: [
      // only resolve this font with the `google` provider
      { name: 'Rubik', provider: 'google' },
      { name: 'Roboto', provider: 'google' },
    ],
    assets: {
      // The baseURL where font files are served.
      prefix: '/_fonts/',
    },
  },

  image: {
    provider: "ipx",
    quality: 80,
    format: [ 'webp' ],
  },
  runtimeConfig: {
    s3AccessKey: process.env.S3_ACCESS_KEY,
    s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    s3Bucket: process.env.S3_BUCKET_NAME,
    public: {

    }
  },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    '@nuxt/eslint',
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@pinia/nuxt",
    '@nuxt/fonts',
    "nuxt-mongoose",
    "@primevue/nuxt-module",
    "@vueuse/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    '@vee-validate/nuxt',
    '@nuxtjs/leaflet',
    [ "@pinia/nuxt", { autoImports: [ "defineStore", "acceptHMRUpdate" ] } ],
  ],
} )
