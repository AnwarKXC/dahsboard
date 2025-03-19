<script setup lang="ts">
// Use withDefaults pattern for proper TypeScript IntelliSense
const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  clx: '',
  to: null,
  variant: 'PRIMARY',
  size: 'md',
  isLoading: false,
  disabled: false,
  iconOnly: false,
})

enum ButtonVariant {
  PRIMARY = 'primary',
  OUTLINE_PRIMARY = 'outlinePrimary',
  SECONDARY = 'secondary',
  OUTLINE_SECONDARY = 'outlineSecondary',
  ERROR = 'error',
  OUTLINE_ERROR = 'outlineError',
  GOLD = 'gold',
  OUTLINE_GOLD = 'outlineGold',
  RED = 'red',
  NONE = 'none',
}

// Define interface for button props
interface ButtonProps {
  as?: 'button' | 'link'
  clx?: string
  to?: string | null
  variant?: keyof typeof ButtonVariant
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon'
  firstIcon?: string
  lastIcon?: string
  iconClass?: string
  isLoading?: boolean
  disabled?: boolean
  ariaLabel?: string
  loadingText?: string
  iconOnly?: boolean
  keyUp?: (event: KeyboardEvent) => void
}

const baseClasses = ' center gap-1 rounded-md select-none border-2  border-transparent  '

const variantClasses = computed<string>(() => {
  const variantMap: Record<ButtonVariant, string> = {
    [ButtonVariant.PRIMARY]: 'bg-primary-500 bg-gradient-to-bl from-primary-500 to-primary-400 text-white hover:to-primary-500 duration-300 ',
    [ButtonVariant.OUTLINE_PRIMARY]:
    '!border-primary-400 text-primary-500 hover:text-primary-500 hover:!border-primary-400 duration-300',
    [ButtonVariant.SECONDARY]:
    '!bg-secondary-600 text-white hover:bg-secondary-500 duration-300',
    [ButtonVariant.OUTLINE_SECONDARY]:
    '!border-secondary-500 duration-300 hover:bg-secondary-500/20',
    [ButtonVariant.ERROR]: 'bg-error text-white duration-300 ',
    [ButtonVariant.OUTLINE_ERROR]:
    '!border-error text-error hover:bg-error duration-300 hover:text-white',
    [ButtonVariant.GOLD]:
    'bg-gold-300 text-white  border-gold-300 hover:bg-gold-400 duration-300',
    [ButtonVariant.OUTLINE_GOLD]:
    '!border-gold-400 text-gold-400 hover:bg-gold-500 duration-300',
    [ButtonVariant.RED]:
      '!bg-red-500 hover:!bg-red-400 !text-white duration-300 ',
    [ButtonVariant.NONE]: '',
  }
  const normalizedVariant = props.variant?.toUpperCase() as keyof typeof ButtonVariant
  return variantMap[ButtonVariant[normalizedVariant]] || ''
})

const sizeClasses = computed(() => {
  const sizeMap: Record<string, string> = {
    xs: ' px-4 py-2',
    sm: ' px-6 py-2',
    md: ' px-8 py-2.5',
    lg: 'text-400 px-10 py-3',
    icon: 'size-8 md:size-10 !p-0 ',
  }
  return sizeMap[props.size]
})

const buttonClasses = computed(() => [
  baseClasses,
  props.clx,
  variantClasses.value,
  sizeClasses?.value,
  { 'opacity-50 cursor-not-allowed': props.disabled && props.as === 'button' },
])
</script>

<template>
  <!-- Render as Button -->
  <button
    :class="buttonClasses"
    :disabled="props.disabled"
    :aria-label="props.ariaLabel"
    @keyup="props.keyUp"
  >
    <!-- First Icon -->
    <Icon
      v-if="props.firstIcon && !props.isLoading"
      :name="props.firstIcon"
      size="24"
      :class="props.iconClass"
    />

    <!-- Content Slot (replaces text prop) -->
    <slot v-if="!props.isLoading" />

    <!-- Last Icon -->
    <Icon
      v-if="props.lastIcon && !props.isLoading && !props.iconOnly"
      :name="props.lastIcon"
      size="24"
      :class="props.iconClass"
    />

    <!-- Loading Indicator -->
    <template v-if="props.isLoading">
      <Icon
        name="eos-icons:loading"
        size="24"
      />
      <span v-if="props.loadingText">{{ props.loadingText }}</span>
    </template>
  </button>
</template>

<style scoped></style>
