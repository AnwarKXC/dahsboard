<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  label: String,
  loading: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  icon: String,
  disabled: { type: Boolean, default: false },
  labelNote: { type: String, default: '' },
  isRequired: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
  name: { type: String, required: false, default: '' },
  placeholder: { type: String, default: '' },
  verificationFn: Function,
  verificationButtonLabel: { type: String, default: 'Apply' },
  verificationButtonClass: String,
  hideVerifyButton: { type: Boolean, default: false },
  error: String,
  hideIcon: { type: Boolean, default: false },
  wrapperClasses: String,
  showRequirement: { type: Boolean, default: true },
})

const inputType = ref(props.type)

const fieldName = computed(() => props.name || `field-${Date.now()}-${Math.random()}-${props.placeholder}-${props.label}`)
const { value, errorMessage } = props.name
  ? useField(() => fieldName.value, undefined, { syncVModel: true })
  : { value: ref(''), errorMessage: ref('') }

const _error = computed(() => {
  return props.error !== undefined ? props.error : errorMessage.value
})
const inputRef = ref<HTMLInputElement | null>(null) // Reference for the input field
const isInputDisabled = ref(props.disabled)

watch(
  () => props.disabled,
  (newValue: boolean) => {
    isInputDisabled.value = newValue
  },
)

function enableInput() {
  isInputDisabled.value = false
  inputRef.value && inputRef.value.focus()
}

defineExpose({
  isInputDisabled,
})
</script>

<template>
  <div
    class="grid gap-1"
    :class="wrapperClasses"
  >
    <BaseLabel
      v-if="label"
      :is-required="isRequired"
      :show-requirement="showRequirement"
      :disabled="disabled"
      :note="labelNote"
    >
      {{ label }}
    </BaseLabel>
    <div class="relative">
      <button
        v-if="icon && !hideIcon && isInputDisabled"
        class="absolute top-[55%] translate-y-[-50%] end-3 z-10"
        @click.prevent="enableInput"
      >
        <Icon
          :name="icon"
          class="text-gold-300 text-2xl"
        />
      </button>

      <input
        v-bind="$attrs"
        :id="name"
        ref="inputRef"
        v-model="value"
        pattern="^(?!\s*$).+"
        :type="inputType"
        :class="{ 'error': _error, '!pe-11': icon && !hideIcon }"
        class="w-full h-full relative  hover:!border-primary-400 !border-2 duration-300 "
        :disabled="isInputDisabled"
        :placeholder="$t(placeholder) || placeholder"
      >
    </div>
    <span class="text-error text-sm h-1.5 -mt-1">{{ _error }}</span>
  </div>
</template>

<style scoped>
  input {
  @apply rounded-md border placeholder:text-secondary-500 dark:placeholder:text-white/40 text-300 w-full p-3   h-[48px] bg-secondary-300 bg-opacity-20   disabled:hover:!border-secondary-300  text-black dark:text-white/80;
}
input:focus,
input:focus-within {
  @apply outline-primary-400 border dark:border-primary-400 dark:outline-none bg-white/15;
}
.error {
  @apply border border-error;
}
</style>
