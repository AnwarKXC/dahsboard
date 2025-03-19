<script setup lang="ts">
import Textarea from 'primevue/textarea'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps({
  label: {
    type: String,
  },
  info: {
    type: String,
  },
  showVerification: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
  },
  showRequirement: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  containerClass: {
    type: String,
    default: '',
  },
})

const fieldCounter = ref(0)
const fieldName = computed(() => props.name || `field-${fieldCounter.value++}`)
const { value, errorMessage } = props.name
  ? useField<string>(() => fieldName.value, undefined, { syncVModel: true })
  : { value: ref<string | null>(''), errorMessage: ref('') }
</script>

<template>
  <div
    class="flex flex-col gap-1 w-full relative"
    :class="containerClass"
  >
    <BaseLabel
      :is-required="isRequired"
      :show-requirement="showRequirement"
      :disabled="disabled"
    >
      {{ label }}
    </BaseLabel>
    <Textarea
      v-model="value"
      rows="4"
      v-bind="$attrs"
      :class="{ 'error': errorMessage, '!px-9 md:!px-12 ': icon }"
      class="w-full h-full !border-secondary-300 !bg-white relative placeholder:!text-placeholder !border-2 rounded-sm "
      :disabled="disabled"
      :placeholder="placeholder"
    />
    <span
      v-if="errorMessage"
      class="text-error text-sm absolute pt-0.5 top-full"
    >
      {{ errorMessage }}</span>
  </div>
</template>

<style scoped>
textarea {
  @apply border !border-secondary-300 !bg-white !rounded-sm p-3  hover:!border-primary-400 focus:border-primary-400 duration-300 placeholder:!text-secondary-500;
}
textarea:focus,
textarea:focus-within {
  @apply !outline-primary-400 border border-primary-400;
}
.error {
  @apply border !border-error;
}
</style>
