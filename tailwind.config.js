/** @type {import('tailwindcss').Config} */
export default {
  darkMode: [ "class" ],
  content: [
    "./app/**/*.{js,vue,ts}",
    "./app/**/**/*.{js,vue,ts}",
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontSize: {
        100: "var(--fs-100)",
        200: "var(--fs-200)",
        300: "var(--fs-300)" /* Min: 15.04px, Max: 15.68px, Preferred: Varies from 40.64px to 117.44px */,
        400: "var(--fs-400)" /* Min: 18.08px, Max: 20.96px, Preferred: Varies from 122.56px to 439.36px */,
        500: "var(--fs-500)" /* Min: 21.6px, Max: 28px, Preferred: Varies from 240.16px to 902.56px */,
        600: "var(--fs-600)" /* Min: 25.92px, Max: 37.28px, Preferred: Varies from 368.32px to 1134.4px */,
        700: "var(--fs-700)" /* Min: 31.04px,
        37.28px, Max: 66.24px, Preferred: Varies from 664.32px to 2082.24px */,
        900: "var(--fs-900)" /* Min: 44.8px, Max: 72px, Preferred: Varies from 861.44px to 2763.68px */,
      },
      colors: {
        primary: {
          300: "hsla(var(--clr-primary-300), <alpha-value>)",
          400: "hsla(var(--clr-primary-400), <alpha-value>)",
          500: "hsla(var(--clr-primary-500), <alpha-value>)",
        },
        secondary: {
          200: "hsla(var(--clr-secondary-200), <alpha-value>)",
          300: "hsla(var(--clr-secondary-300), <alpha-value>)",
          400: "hsla(var(--clr-secondary-400), <alpha-value>)",
          500: "hsla(var(--clr-secondary-500), <alpha-value>)",
          600: "hsla(var(--clr-secondary-600), <alpha-value>)",
        },
        gold: {
          300: "hsla(var(--clr-gold-300), <alpha-value>)",
          400: "hsla(var(--clr-gold-400), <alpha-value>)",
          500: "hsla(var(--clr-gold-500), <alpha-value>)",
        },
        success: "hsla(var(--clr-success), <alpha-value>)",
        error: "hsla(var(--clr-error), <alpha-value>)",
        warning: "hsla(var(--clr-warning), <alpha-value>)",

      },
  boxShadow: {
    primary: "0 0 0 3px hsla(var(--clr-primary-500), 0.5)",
    secondary: "0 0 0 3px hsla(var(--clr-secondary-500), 0.5)",
    success: "0 0 0 3px hsla(var(--clr-success), 0.5)",
    error: "0 0 0 3px hsla(var(--clr-error), 0.5)",
    warning: "0 0 0 3px hsla(var(--clr-warning), 0.5)",
    gold: "0 0 0 3px hsla(var(--clr-gold-500), 0.5)",
  },
  

      fontFamily: {
        Rubic: [ "Rubic", "sans-serif", "system-ui" ],
        Poppins: [ "Poppins", "sans-serif", "system-ui" ],
      },
      borderColor: ( theme ) => ( {
        DEFAULT: theme( "colors.secondary.300", "currentColor" ),
      } ),


    },
  },
  plugins: [
    function ( { addBase, theme, addComponents } ) {
      // Add base styles
      addBase( {
        html: {
          fontFamily: "Rubic, sans-serif",
          scrollBehavior: "smooth",
        },
        body: {
          "line-height": "1.5",
        },
      } )
      addComponents( {
        ".center": {
          "@apply flex items-center justify-center": {},
        },
        ".between": {
          "@apply flex justify-between items-center": {},
        },
        ".absolute-center": {
          "@apply absolute left-1/2 translate-x-1/2": {},
        },
        ".inset-z": {
          "@apply z-50 absolute  inset-0 w-full h-full": {},
        },
      } )
    },
  ],
}
