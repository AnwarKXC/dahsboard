<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
const props = defineProps({
  label: {
    type: String,

  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  goldenArrow: {
    type: Boolean,
    default: false,
  },
  wrapperClasses: {
    type: String,
    default: '',
  },
  info: {
    type: String,
  },
  darkBackground: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  showRequirement: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: Boolean,
    default: false,
  },
})

// const modelValue = defineModel('modelValue');
const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
})
</script>

<template>
  <div class="grid w-full gap-1 " :class="wrapperClasses">
    <BaseLabel v-if="label" :is-required="isRequired" :show-requirement="showRequirement" :disabled="disabled">
      {{ label }}
    </BaseLabel>
    <Select
      v-model="value"
      :disabled="disabled"
      :filter="filter"
      :auto-filter-focus="true"
      v-bind="$attrs"
      :class="errorMessage ? '!border-error hover:!border-error ' : ''"
    />
    <span class="text-error text-sm h-1.5 -mt-1">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
:deep(.p-select) {
  @apply !rounded-md border-2 placeholder:!text-secondary-400 dark:!text-white  w-full p-0.5  !bg-secondary-300 !bg-opacity-20  hover:!border-primary-400 border-secondary-300 focus:!border-primary-400 disabled:hover:!border-secondary-300 !h-[48px];
}
:deep(.p-select-label) {
  @apply dark:!text-white/80 text-black;
}

:deep(.p-placeholder) {
  @apply dark:!text-white/40 !text-secondary-500;
}

:deep(.p-select-option.p-select-option-selected) {
  @apply !bg-black !text-white;
}
:deep(.p-select-dropdown-icon) {
  @apply text-gold-300 !w-3.5;
}
</style>
