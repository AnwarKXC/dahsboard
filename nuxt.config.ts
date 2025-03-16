import Aura from '@primevue/themes/aura'

export default defineNuxtConfig( {
	devtools: { enabled: true },

	future: {
		compatibilityVersion: 4,
	},

	imports: {
		dirs: [ '../shared/types', '../shared/utils', '../shared/validators', 'composables/api', 'components/icons' ]
	},
	pinia: {
		storesDirs: [ './app/stores/**' ],
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	tailwindcss: {
		cssPath: [ 'assets/css/main.css', { injectPosition: 'first' } ],
		configPath: '../tailwind.config',
		exposeConfig: {
			level: 2,
		},
		editorSupport: { autocompleteUtil: { as: 'tailwindClasses' } },
		config: {},
		viewer: true,
	},

	primevue: {
		options: {
			ripple: true,
			inputVariant: 'filled',
			theme: {
				preset: Aura,
				options: {
					prefix: 'p',
					darkModeSelector: '.dark',
				},
			},
		},
	},

	css: [ "assets/css/main.css" ],

	colorMode: {
		hid: "nuxt-color-mode-script",
		globalName: "__NUXT_COLOR_MODE__",
		componentName: "ColorScheme",
		classPrefix: "dark",
		classSuffix: "",
		fallback: "dark",
		storage: 'cookie',
		storageKey: "color-scheme",
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
		vueI18n: "locales/i18n.config.ts",
		defaultLocale: "en",
		strategy: "prefix",
		detectBrowserLanguage: {
			useCookie: true,
		},
		langDir: 'locales',

		locales: [
			{
				code: "en",
				iso: "en",
				name: "English",
				file: "./en.json",
				direction: "ltr",
				icon: 'flag:us-1x1',

			},
			{
				code: "ar",
				iso: "ar",
				name: "عربي",
				file: "./ar.json",
				direction: "rtl",
				icon: 'flag:sa-1x1',
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

	nitro: {
		prerender: {
			routes: [],
		},
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

	compatibilityDate: "2025-03-15",
} )