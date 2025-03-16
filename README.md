# SecureVet Directory Structure

SecureVet directory follows Domain-Driven Design (DDD) using Nuxt layers

example for the directories

root/
├── public/
├── server/
├── app/                  <-- global, shared or one-off functionality
│   ├── assets/
│   ├── components/
│   ├── composables/
│      ├── api/
│        ├── useUsers/
│   ├── pages/
│   ├── layouts/
│   ├── middleware/
│   ├── stores/
│   ├── plugins/
│   ├── app.vue
├── shared                 <-- global, shared between app and server
│   ├── types
│   ├── utils
├── nuxt.config.ts
├── package.json
├── eslint.config.mjs
├── .eslintrc
├── .README.md
├── tailwind.config.js
├── tsconfig.json

## features

server
[ ]- Auth system implementation using sessions for more security
[ ]- Roles system ["Owner", "Administrator" , "Employee" , "user"]
[ ]- RBAC to mange roles permissions
[ ]- Front-End Layout
[ ]- Users Management dashboard
[ ]- middleware and role Permissions

### custom composables usage

#### useLocaleR() => used for navigateTo localization route { '/en/' or '/ar' } route path

#### useLocaleN() => used to return absolute route name without localization { '/en/' or '/ar' }  useLocaleN()
