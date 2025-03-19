<script setup lang="ts">
type Size = 'xxl' | 'xl' | 'l' | 'm' | 's' | 'text'
type Weight = '300' | '400' | '500' | '600' | '700'
type Align = 'start' | 'center' | 'justify'
type Transform = 'none' | 'uppercase' | 'lowercase' | 'capitalize'

// Define props interface explicitly
interface TextProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  size?: Size
  weight?: Weight
  align?: Align
  transform?: Transform
  color?: string
  truncate?: boolean | number
  italic?: boolean
  class?: string
}

// Use the interface with withDefaults to provide proper type inference
const props = withDefaults(defineProps<TextProps>(), {
  tag: 'p',
  size: 'text',
  weight: '400',
  align: 'start',
  italic: false,
})

const SIZE_STYLES: Record<Size, { fontSize: string }> = {
  xxl: { fontSize: 'clamp(2.25rem, 1.5rem + 3vw, 3.75rem)' }, // 36px to 60px
  xl: { fontSize: 'clamp(1.875rem, 1.3rem + 2.5vw, 3rem)' }, // 30px to 48px
  l: { fontSize: 'clamp(1.5rem, 1.1rem + 2vw, 2.25rem)' }, // 24px to 36px
  m: { fontSize: 'clamp(1.25rem, 1rem + 1.5vw, 1.875rem)' }, // 20px to 30px
  s: { fontSize: 'clamp(1.115rem, 0.9rem + 1vw, 1.35rem)' }, // 18px to 24px
  text: { fontSize: '1rem' }, // 16px fixed
}

const WEIGHT_CLASSES: Record<Weight, string> = {
  300: 'font-light',
  400: 'font-normal',
  500: 'font-medium',
  600: 'font-semibold',
  700: 'font-bold',
}

const ALIGN_CLASSES: Record<Align, string> = {
  start: 'text-start',
  center: 'text-center',
  justify: 'text-justify',
}

const TRANSFORM_CLASSES: Record<Transform, string> = {
  none: '',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
}

const LINE_HEIGHT_CLASSES: Record<Size, string> = {
  xxl: 'leading-tight', // 1.25
  xl: 'leading-tight', // 1.25
  l: 'leading-snug', // 1.375
  m: 'leading-snug', // 1.375
  s: 'leading-normal', // 1.5
  text: 'leading-relaxed', // 1.625
}

const classes = computed(() => {
  const size = props.size as Size
  const baseClasses = [
    LINE_HEIGHT_CLASSES[size],
    WEIGHT_CLASSES[props.weight as Weight],
    ALIGN_CLASSES[props.align as Align],
    props.transform && TRANSFORM_CLASSES[props.transform as Transform],
    props.italic && 'italic',
    props.truncate === true && 'truncate',
    typeof props.truncate === 'number' && `overflow-hidden line-clamp-${props.truncate}`,
    props.class,
  ]

  return baseClasses.filter(Boolean).join(' ')
})

const styles = computed(() => ({
  ...SIZE_STYLES[props.size as Size],
  color: props.color,
}))
</script>

<template>
  <component
    :is="props.tag"
    :class="classes"
    :style="styles"
  >
    <slot />
  </component>
</template>
