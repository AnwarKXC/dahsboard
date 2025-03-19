import { toast } from 'vue3-toastify'

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface ApiResponse<T> {
  data: Ref< T>
  refresh?: () => void
}

export default function () {
  const apiKey = '/api'
  const loading = ref(false)

  async function apiRequest<T, D = Record<string, unknown>>(
    method: ApiMethod,
    endpoint: string,
    data?: D,
    customHeaders: Record<string, string> = {},
  ): Promise<T | undefined> {
    loading.value = true
    try {
      const response = await $fetch<T>(`${apiKey}/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          ...customHeaders,
        },
        body: data !== null && data !== undefined ? JSON.stringify(data) : undefined,
      })
      return response as T
    }
    catch (error: unknown) {
      handleApiError(error)
    }
    finally {
      loading.value = false
    }
  }

  function handleApiError(error: unknown) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      toast.error((error as { message: string }).message)
    }
    else {
      toast.error('An unknown error occurred')
    }
  }

  async function create<T, D = Record<string, unknown>>(resource: string, data: D) {
    return apiRequest<ApiResponse<T>, D>('POST', resource, data)
  }

  async function edit<T, D = Record<string, unknown>>(resource: string, id: string, data: D, method: ApiMethod = 'PUT') {
    return apiRequest<ApiResponse<T>, D>(method, `${resource}/${id}`, data)
  }

  async function remove<T>(resource: string, id: string) {
    return apiRequest<ApiResponse<T>>('DELETE', `${resource}/${id}`)
  }

  async function getAll<T>(
    resource: string,
    queryParams: Record<string, string> = {},
  ): Promise<ApiResponse<T> | undefined> {
    loading.value = true
    try {
      const queryString = new URLSearchParams(queryParams).toString()
      const url = `${apiKey}/${resource}${queryString ? `?${queryString}` : ''}`
      const { data, refresh } = await useFetch<ApiResponse<T>>(url)
      return { data: data as T, refresh: refresh as () => void }
    }
    catch (error: unknown) {
      handleApiError(error)
    }
    finally {
      loading.value = false
    }
  }

  async function get<T>(resource: string, id: string): Promise<ApiResponse<T> | undefined> {
    loading.value = true
    try {
      const url = `${apiKey}/${resource}/${id}`
      const response = await useFetch<ApiResponse<T>>(url)
      return { data: response.data as T, refresh: response.refresh as () => void }
    }
    catch (error: unknown) {
      handleApiError(error)
    }
    finally {
      loading.value = false
    }
  }

  return {
    get,
    getAll,
    create,
    edit,
    remove,
    loading,
  }
}
