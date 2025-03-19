<script setup lang="ts">
const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  maxVisiblePages: {
    type: Number,
    default: 3, // Changed from 5 to 3
  },
})

const emit = defineEmits(['update:page'])
const route = useRoute()
const router = useRouter()

const currentPage = ref(Number(route.query.page) || 1)

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const visiblePages = computed(() => {
  const halfVisible = Math.floor(props.maxVisiblePages / 2)
  let start = currentPage.value - halfVisible
  let end = start + props.maxVisiblePages - 1

  // Adjust start and end for edge cases
  if (start < 1) {
    start = 1
    end = Math.min(props.maxVisiblePages, totalPages.value)
  }
  else if (end > totalPages.value) {
    end = totalPages.value
    start = Math.max(1, end - props.maxVisiblePages + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const showLeftEllipsis = computed(() => visiblePages.value[0] > 1)
const showRightEllipsis = computed(
  () => visiblePages.value[visiblePages.value.length - 1] < totalPages.value,
)

function changePage(page: number) {
  if (page < 1 || page > totalPages.value)
    return

  currentPage.value = page
  emit('update:page', page)

  const query = { ...route.query, page: page === 1 ? undefined : page.toString() }
  router.push({ query })
}

watch(
  () => route.query.page,
  (newPage: string) => {
    const page = Number(newPage) || 1
    if (page !== currentPage.value) {
      currentPage.value = page
      emit('update:page', page)
    }
  },
)
</script>

<template>
  <nav aria-label="Pagination">
    <ul class="pagination-list">
      <li>
        <button
          class="nav-button" :disabled=" currentPage === 1 " aria-label="Go to first page"
          @click="changePage(1)"
        >
          <svg
            class="nav-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" d="M5 1 1 5l4 4"
            />
          </svg>
        </button>
      </li>

      <li v-if=" showLeftEllipsis " class="ellipsis">
        ...
      </li>

      <li v-for=" page in visiblePages " :key=" page " class="page-item">
        <button
          class="pagination-button" :class=" { active: page === currentPage } "
          :aria-current=" page === currentPage ? 'page' : undefined "
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </li>

      <li v-if=" showRightEllipsis " class="ellipsis">
        ...
      </li>

      <li>
        <button
          class="nav-button" :disabled=" currentPage === totalPages "
          aria-label="Go to last page" @click="changePage(totalPages)"
        >
          <svg
            class="nav-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" d="m1 9 4-4-4-4"
            />
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.pagination-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  gap: 0.5rem;
}

.page-item {
  display: block;
}

.pagination-button,
.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: transparent;
  color: var(--dark);
  border: 2px solid #1d2c3b38;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.pagination-button:hover:not(.active):not(:disabled),
.nav-button:hover:not(:disabled) {
  background-color: var(--gold);
  border-color: transparent;
}

.pagination-button:focus,
.nav-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--pagination-focus-ring);
}

.pagination-button.active {
  background-color: var(--gold);
  border-color: transparent;
  color: white;
}

.nav-button {
  padding: 0 0.5rem;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--pagination-disabled-bg);
}

.nav-icon {
  width: 0.625rem;
  height: 0.625rem;
}

.ellipsis {
  color: var(--dark);
  user-select: none;
  padding: 0 0.25rem;
}

/* RTL Support */
[dir='rtl'] .nav-icon {
  transform: rotate(180deg);
}
</style>
