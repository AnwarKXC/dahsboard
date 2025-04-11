import { toast } from 'vue3-toastify'

const deletedId = ref('')
export default function useUsers() {
  const loading = ref(false)

  const { remove } = useApi()

  const fetchUsers = async (queryParams = ''): Promise<Ref<UsersResponse> | undefined > => {
    try {
      loading.value = true
      const { data } = await useFetch(`/api/user?${queryParams}`)
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
      const res = await remove('user', id)
      res && (deletedId.value = id)
      res && toast.success('User removed successfully')
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
    deletedId,
    deleteUser,
  }
}
