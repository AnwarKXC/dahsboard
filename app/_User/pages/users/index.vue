<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'

const filterKeys = ['search', 'status', 'position', 'role'] as const

const filters = Object.fromEntries(
  filterKeys.map(key => [
    key,
    useRouteQuery(key), // Default to '1' for page
  ]),
) as Record<(typeof filterKeys)[number], { value: string | number | undefined }>

const filterQuery = computed(() => {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, ref]) => {
    if (ref.value)
      params.append(key, ref.value.toString())
  })
  return params.toString()
})

function getQueryString(filters: Record<string, { value: string | number | undefined }>) {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, ref]) => {
    if (ref.value) {
      params.append(key, ref.value.toString())
    }
  })
  return params.toString()
}

// Debounced search filter update
const updateSearchFilter = useDebounceFn((value: string) => {
  filters.search.value = value
  resetPagination() // Reset pagination when new search is applied
}, 300)

function updateFilter(key: typeof filterKeys[number], value: string | number) {
  if (key === 'search') {
    updateSearchFilter(value.toString())
  }
  else {
    filters[key].value = value
    resetPagination() // Reset pagination when filters change
  }
}

function removeFilter(key: typeof filterKeys[number]) {
  if (key in filters) {
    filters[key].value = undefined
    resetPagination()
  }
}

// Virtual scrolling logic
const { fetchUsers, loading, deleteUser } = useUsers()

const userList = ref<IUser[]>([]) // Store loaded users
const hasMore = ref(true) // Check if more pages exist

const initialPage = ref(1)
const initialLimit = ref(6)

const initialUsers = await fetchUsers(getQueryString({ ...filters, page: initialPage, limit: initialLimit }))
if (initialUsers.value) {
  userList.value = initialUsers.value.users
  hasMore.value = initialUsers.value.currentPage < initialUsers.value.totalPages
}

// Load more users when the last item is visible
async function loadMoreUsers() {
  if (!hasMore.value || loading.value)
    return

  loading.value = true

  try {
    const nextPage = ref(Number(initialPage.value) + 1)
    const newUsers = await fetchUsers(getQueryString({ ...filters, page: nextPage, limit: initialLimit }))

    if (newUsers?.value?.users && Array.isArray(newUsers.value.users)) {
      userList.value = [...userList.value, ...newUsers.value.users]
      initialPage.value = nextPage.value
      if (newUsers.value.currentPage === newUsers.value.totalPages) {
        hasMore.value = false
      }
    }
    else {
      console.error('Unexpected response from fetchUsers:', newUsers)
      hasMore.value = false
    }
  }
  catch (error) {
    console.error('Failed to fetch users:', error)
    hasMore.value = false
  }
  finally {
    loading.value = false
  }
}

function resetPagination() {
  initialPage.value = '1' // Reset to page 1
  userList.value = [] // Clear the user list
  hasMore.value = true // Reset hasMore
  loadMoreUsers() // Load users for the first page
}

definePageMeta({
  title: 'Home',
  description: 'Home page',
  layout: 'users',
})
</script>

<template>
  <main class="space-y-6 mb-6">
    <!-- Filters & Search Inputs -->
    <div class="between flex-wrap gap-4">
      <div class="grid grid-cols-2 gap-4 max-md:w-full md:max-w-xl">
        <BaseInput
          v-model="filters.search.value"
          placeholder="Search users by name or email"
          class="lg:min-w-72"
          @update:model-value="updateSearchFilter"
        />
        <BaseDropDown
          :options="['Admin', 'Employee', 'User']"
          placeholder="Filter by role"
          :default-value="filters.role.value"
          @update:model-value="updateFilter('role', $event)"
        />
      </div>
      <BaseButton class="max-md:w-full max-md:order-first" @click="navigateTo(useLocaleR('/users/new'))">
        Add new User
      </BaseButton>
    </div>

    <!-- Active Filters Section -->
    <div v-if="filterQuery" class="flex flex-wrap gap-2">
      <span
        v-for="[key, ref] in Object.entries(filters)
          .filter(([k, ref]) => ref.value)"
        :key="key"
        class="flex items-center gap-2 ps-3 bg-secondary-200 dark:text-white dark:bg-white/20 text-gray-700 rounded-lg text-200"
      >
        {{ key }}: <strong>{{ ref.value }}</strong>
        <button
          class="text-red-500 hover:bg-gray-300 p-1.5 my-0.5 rounded-lg"
          @click="removeFilter(key as typeof filterKeys[number])"
        >
          ✕
        </button>
      </span>
    </div>

    <!-- User List (Virtual Scrolling) -->
    <div v-if="userList.length" class="card__grid__layout grow content-start">
      <UserCard
        v-for="(user) in userList"
        :key="user._id"
        :user="user"
        :delete-user="deleteUser"
        :loading="loading"
      />
    </div>

    <!-- Trigger Fetch When Visible -->
    <ClientOnly>
      <div
        v-if="hasMore && !loading && userList.length"
        v-fetch-when-visible=" loadMoreUsers"
      />
    </ClientOnly>

    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center mt-4">
      <BaseTypography as="p" size="s" weight="500">
        Loading more users...
      </BaseTypography>
    </div>
  </main>
</template>

<style scoped>
.card__grid__layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
  gap: 1rem 1.25rem;
}
@media (max-width: 768px) {
  .card__grid__layout {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
</style>
