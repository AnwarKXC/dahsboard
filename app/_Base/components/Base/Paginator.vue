<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'

const props = defineProps({
  pagesCount: {
    type: Number,
    required: true,
  },
  rows: {
    type: Number,
    required: true,
  },
  paginationSize: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits<
  {
    (event: 'page', payload: PaginationPageEvent): void
  }
>()

export interface PaginationPageEvent {
  page: number // this is the page index not the page number
  rows: number
  first: number
  pageCount: number
}

const pageQuery = useRouteQuery('page', 1, {
  transform: Number,
})
const currentPage = ref(pageQuery.value)

watch(pageQuery, () => {
  currentPage.value = pageQuery.value
})
function selectPage(page: number) {
  if (page < 1 || page > props.pagesCount)
    return

  emit('page', {
    page,
    rows: props.rows,
    first: (page - 1) * props.rows,
    pageCount: props.pagesCount,
  })
  pageQuery.value = page
}

const pagesToShow = computed(() => {
  const pages = []

  for (let i = 1; i <= props.pagesCount; i++)
    pages.push(i)

  if (pages.length <= props.paginationSize)
    return pages
  else if (currentPage.value <= props.paginationSize / 2)
    return pages.slice(0, props.paginationSize)
  else if (currentPage.value + props.paginationSize / 2 > props.pagesCount)
    return pages.slice(-props.paginationSize + 1)
  else
    return pages.slice(currentPage.value - Math.floor(props.paginationSize / 2), currentPage.value + Math.floor(props.paginationSize / 2) + 1)
})

function resetPagination() {
  currentPage.value = 1
  pageQuery.value = 1
}

defineExpose({
  resetPagination,
})
</script>

<template>
  <div v-if="pagesCount > 1" class="flex items-center justify-between my-3">
    <span class="paginationItem" :class="{ disabled: currentPage === 1 }" @click="selectPage(currentPage - 1)">
      <Icon class="font-bold text-2xl rtl:rotate-180" name="solar:alt-arrow-left-linear" />
    </span>
    <div class="paginationNumberContainer">
      <template v-if="currentPage > 3 && !arrayIncludes(pagesToShow, 1) && !arrayIncludes(pagesToShow, 2)">
        <span
          v-if="currentPage > 3 && !arrayIncludes(pagesToShow, 1)"
          class="paginationNumber"
          :class="{ active: currentPage === 1 }"
          @click="selectPage(1)"
        >1</span>
        <span
          v-if="currentPage > 4 && !arrayIncludes(pagesToShow, 2)"
          class="paginationNumber"
          :class="{ active: currentPage === 2 }"
          @click="selectPage(2)"
        >2</span>
        <span class="text-secondary-400">...</span>
      </template>
      <span
        v-for="item in pagesToShow"
        :key="item" class="paginationNumber"
        :class="{ active: currentPage === item }"
        @click="selectPage(item)"
      >{{ item }}</span>
      <template v-if="currentPage < pagesCount - 4">
        <span class="text-secondary-400">..</span>
        <span
          v-if="currentPage < pagesCount - 5"
          class="paginationNumber"
          :class="{ active: currentPage === pagesCount - 1 }"
          @click="selectPage(pagesCount - 1)"
        >
          {{ pagesCount - 1 }}
        </span>
        <span
          v-if="currentPage < pagesCount - 4"
          class="paginationNumber"
          :class="{ active: currentPage === pagesCount }"
          @click="selectPage(pagesCount)"
        >
          {{ pagesCount }}
        </span>
      </template>
    </div>
    <span class="paginationItem" :class="{ disabled: currentPage === pagesCount || pagesCount === 0 }" @click="selectPage(currentPage + 1)">
      <Icon class="font-bold text-2xl rtl:rotate-180" name="solar:alt-arrow-right-linear" />
    </span>
  </div>
</template>

<style scoped>
.paginationItem {
  @apply uppercase flex items-center justify-center text-sm hover:text-primary-500 cursor-pointer;
}
.paginationNumber {
  @apply aspect-square size-6 text-sm p-4 center hover:text-primary-500 cursor-pointer text-secondary-400 rounded-full;
}
.paginationNumberContainer {
  @apply flex items-center justify-center gap-3;
}
.active {
  @apply !bg-secondary-600 !text-white;
}
.disabled {
  @apply text-secondary-400 cursor-not-allowed hover:text-secondary-400 hidden;
}
</style>
