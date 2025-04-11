import { StorageSerializers, useSessionStorage } from '@vueuse/core'
import { createError, useFetch } from 'nuxt/app'

export default async <T>(url: string, forceRefresh = false) => {
  // Use sessionStorage to cache data
  const cached = useSessionStorage<T>(url, null, {
    serializer: StorageSerializers.object,
  })

  if (forceRefresh || !cached.value) {
    const { data, error } = await useFetch<T>(() => url)

    if (error.value) {
      const statusCode = error.value?.statusCode || 500
      const statusMessage = `Could not fetch data from ${url}`
      const message = error.value?.message || 'Unknown error'

      console.error(`Error ${statusCode}: ${message}`)

      throw createError({
        statusCode,
        statusMessage,
        message,
      })
    }

    // Update the cache
    cached.value = data.value as T
  }
  else {
    console.warn(`Getting value from cache`)
  }

  return cached
}
