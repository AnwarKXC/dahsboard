<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'lg',
  },
  inverted: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <NuxtLink
    :to="useLocaleR('/')"
    class="mx-auto flex items-center gap-2 justify-center"
  >
    <svg
      width="31"
      height="15"
      viewBox="0 0 31 15"
      fill="none"
      class="md:w-8 w-6 dark:invert"
      :class="inverted ? 'invert' : ''"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 97">
        <path
          id="Polygon 1"
          d="M0.353554 7.5L7.5 0.353554L14.6464 7.5L7.5 14.6464L0.353554 7.5Z"
          stroke="black"
          stroke-width="0.5"
        />
        <path
          id="Polygon 2"
          d="M8.35355 7.5L15.5 0.353554L22.6464 7.5L15.5 14.6464L8.35355 7.5Z"
          stroke="black"
          stroke-width="0.5"
        />
        <path
          id="Polygon 3"
          d="M16.3536 7.5L23.5 0.353554L30.6464 7.5L23.5 14.6464L16.3536 7.5Z"
          stroke="black"
          stroke-width="0.5"
        />
      </g>
    </svg>
    <h3
      class="sevillana whitespace-nowrap text-gold capitalize"
      :class="size === 'lg' ? '' : 'text-2xl'"
    >
      Dashboard
    </h3>
    <svg
      width="31"
      height="15"
      viewBox="0 0 31 15"
      fill="none"
      class="md:w-8 w-6 dark:invert"
      :class="inverted ? 'invert' : ''"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 97">
        <path
          id="Polygon 1"
          d="M0.353554 7.5L7.5 0.353554L14.6464 7.5L7.5 14.6464L0.353554 7.5Z"
          stroke="black"
          stroke-width="0.5"
        />
        <path
          id="Polygon 2"
          d="M8.35355 7.5L15.5 0.353554L22.6464 7.5L15.5 14.6464L8.35355 7.5Z"
          stroke="black"
          stroke-width="0.5"
        />
        <path
          id="Polygon 3"
          d="M16.3536 7.5L23.5 0.353554L30.6464 7.5L23.5 14.6464L16.3536 7.5Z"
          stroke="black"
          stroke-width="0.5"
        />
      </g>
    </svg>
  </NuxtLink>
</template>

<style scoped></style>
