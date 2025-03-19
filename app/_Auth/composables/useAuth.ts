import { toast } from 'vue3-toastify'

export default () => {
  const loading = ref(false)
  const login = async (_credentials: { name: string, role: string }, rememberMe = false) => {
    const maxAge = rememberMe ? 60 * 60 * 24 * 7 : undefined
    try {
      loading.value = true
      const userCookie = useCookie('currentUser', { maxAge, sameSite: 'strict' }) as { value: string | null }
      userCookie.value = JSON.stringify({ name: _credentials.name, role: _credentials.role })
      toast.success(`Welcome`)
      loading.value = false
      return await navigateTo(useLocaleR('/'))
    }
    catch (err) {
      toast.error(err)
    }
  }

  const signout = async () => {
    try {
      const userCookie = useCookie('currentUser') as { value: string | null }
      userCookie.value = null
      toast.success(`Goodbye`)
      loading.value = false

      return await navigateTo(useLocaleR('/auth'))
    }
    catch (err) {
      toast.error(err)
    }
  }

  return {
    loading,
    login,
    signout,
  }
}
