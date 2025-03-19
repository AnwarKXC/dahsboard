const useUserStore = defineStore('userStore', () => {
  const _currentUser = ref<IUser | null>(null)
  const loading = ref(false)

  const setUserData = async (user: IUser) => {
    try {
      loading.value = true
      _currentUser.value = user
    }
    catch (error) {
      console.error(error)
    }
    finally {
      loading.value = false
    }
  }

  const clearUserData = () => {
    _currentUser.value = null
  }

  // Expose only a readonly version
  const currentUser = readonly(_currentUser)
  return {
    currentUser,
    setUserData,
    clearUserData,
    loading,
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage() as Storage,
  },
})

// HMR
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

export default useUserStore
