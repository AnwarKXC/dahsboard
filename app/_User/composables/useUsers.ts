import { toast } from 'vue3-toastify'

export default function useUsers() {
  const loading = ref(false)

  const { setUsersData, removeUser } = usersStore()

  const { remove } = useApi()

  const fetchUsers = async (queryParams = ''): Promise<UsersResponse | undefined > => {
    try {
      loading.value = true
      const { data } = await useFetch(`/api/user?${queryParams}`)
      setUsersData(data.value.users)
      return data
    }
    catch (error) {
      console.error('Error fetching users:', error)
    }
    finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: string) => {
    try {
      loading.value = true
      await remove('user', id)
      removeUser(id)
      toast.success('User removed successfully')
    }
    catch (error) {
      toast.error(error)
    }
    finally {
      loading.value = false
    }
  }

  return {
    fetchUsers,
    loading,
    deleteUser,
  }
}
