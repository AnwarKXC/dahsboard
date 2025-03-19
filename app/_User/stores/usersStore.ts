const useUsersStore = defineStore('usersStore', () => {
  const users = ref<IUser[]>()

  const setUsersData = async (data: IUser[]) => {
    try {
      users.value = data
    }
    catch (error) {
      console.error(error)
    }
  }

  const removeUser = async (id: string) => {
    try {
      users.value = users.value.filter((user: IUser) => user._id !== id)
    }
    catch (e) {
      console.error(e)
    }
  }

  return {
    setUsersData,
    removeUser,
    users,
  }
})

// HMR
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}

export default useUsersStore
