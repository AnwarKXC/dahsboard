# Directory Structure

 directory follows Domain-Driven Design (DDD) using Nuxt layers

example for the directories

root/
├── public/
├── server/
├── app/                  <-- global, shared or one-off functionality
│   ├── _Auth      <-- module,feature or one functionality to control Authentication operations
│      ├── components/
│      ├── composables/
│         ├── api/
│           ├── useUsers()
│           ├── ...
│      ├── pages/
│      ├── layouts/
│      ├── middleware/
│      ├── stores/
│          ├── UserStore()
│          ├── ...
│   ├── assets/
│   ├── plugins/
│   ├── pages/
│      ├── about
│      ├── privacy-policy
│      ├── ...
│   ├── directives/
│   ├── app.vue
├── shared                 <-- global, shared between app and server
│   ├── types
│   ├── utils
├── server
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── middleware/
├── nuxt.config.ts
├── package.json
├── eslint.config.mjs
├── .eslintrc
├── locales/
├── .README.md
├── tailwind.config.js
├── tsconfig.json

## features

[*]- Project archtichtre [feature driven] and configurations
[*]- Base reusable components [Buttons , Inputs, DropDowns, Modals, Typography]
[*]- Localizations [AR, En]
[*]- Moods [Dark ,Light]
[*]- Auth system implementation using cookie  ['/auth' : public route to login ,'/users' : need Admin or Employee role to enter ]
[*]- Roles system [ "Admin" , "Employee" , "user"]
[*]- RBAC to mange roles permissions  UI
[*]- '/users' :  server route Api call to retrieve users info with pagination and filter fields [GET ,POST ,PUT ,Delete ,GET:/id]
[ ]-unit test using Jest no time available

### custom composables usage

#### useLocaleR() => used for navigateTo localization route { '/en/' or '/ar' } route path

#### useLocaleN() => used to return absolute route name without localization { '/en/' or '/ar' }  useLocaleN()

#### useApi() => used to make crude operation as top layer of request or as intercept (pre middleware or wrapper) for Async call you can add handleError or whiteList errors that user can see and track the other errors using sentry or any package you want

you need to copy .env.example and create your own .even

using aws s3 to upload images you can you cloudnairy or uploadthing just modify server/api/upload.ts and .env API key to match new keys

using no sql mongodb clusters to store the data

##### i get this error in 16/3/2025 "index.js:5"

 Uncaught SyntaxError: The requested module '/_nuxt/@fs/E:/programing/baseNuxt4/node_modules/unhead/dist/index.mjs?v=1dcb5680' does not provide an export named 'getActiveHead' (at index.js:5:10) " and that because i18n unstable release  link of issue https://github.com/nuxt/nuxt/issues/31265