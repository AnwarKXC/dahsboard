import vObserveAnimation from '~/directives/observeAnimation'

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-expect-error Property '$observeAnimation' does not exist on type 'NuxtApp'
  nuxtApp.vueApp.directive('observe-animation', vObserveAnimation)
})
