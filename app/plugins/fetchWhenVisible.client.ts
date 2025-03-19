import vFetchWhenVisible from '~/directives/fetchWhenVisible'

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-expect-error Property '$observeAnimation' does not exist on type 'NuxtApp'
  nuxtApp.vueApp.directive('fetch-when-visible', vFetchWhenVisible)
})
