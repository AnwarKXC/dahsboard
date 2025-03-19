<script setup lang="ts">
// Props
const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    validator: (value: number) => value >= 0 && value <= 100,
  },
  size: {
    type: Number,
    default: 120, // Size of the SVG
  },
  title: {
    type: String,
    default: '',
  },
  value: {
    type: Number,
    default: 0,
  },
})

// Animated percentage state
const animatedPercentage = ref(0)

// Watch percentage prop and animate
watch(() => props.percentage, (newPercentage: number) => {
  const duration = 1500 // Animation duration in milliseconds
  const startTime = performance.now()

  function updateAnimation(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smoother animation (cubic-bezier)
    const easedProgress = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - (-2 * progress + 2) ** 3 / 2

    animatedPercentage.value = easedProgress * newPercentage

    if (progress < 1) {
      requestAnimationFrame(updateAnimation)
    }
    else {
      animatedPercentage.value = newPercentage
    }
  }

  import.meta.client && requestAnimationFrame(updateAnimation)
}, { immediate: true })

// Stroke Length for SVG Circle
const circleLength = 2 * Math.PI * 45 // Circumference of the circle (r = 45)

// Determine color dynamically based on percentage
const circleColor = computed(() => {
  if (animatedPercentage.value <= 15)
    return '#992606' // Deep Red
  if (animatedPercentage.value <= 30)
    return '#fe0010' // Red
  if (animatedPercentage.value <= 45)
    return '#ff9910' // Deep Orange
  if (animatedPercentage.value <= 60)
    return '#ffd100' // Light Orange
  if (animatedPercentage.value <= 75)
    return '#90EE90' // Light Green
  return '#006400' // Deep Green
})

// Dynamic style for the progress circle
const circleStyle = computed(() => ({
  strokeDasharray: `${circleLength} ${circleLength}`,
  strokeDashoffset: `${circleLength * (1 - animatedPercentage.value / 100)}`,
  stroke: circleColor.value,
}))
</script>

<template>
  <div class="grid place-content-center gap-2 text-[#92ee90]">
    <div class="circular-progress">
      <svg
        :width="size"
        :height="size"
        viewBox="0 0 100 100"
        class="progress-circle"
      >
        <!-- Background Circle -->
        <circle
          class="circle-bg"
          cx="50"
          cy="50"
          r="45"
          stroke-width="7"
        />
        <!-- Foreground Circle (Progress) -->
        <circle
          class="circle-progress"
          cx="50"
          cy="50"
          r="45"
          stroke-width="7"
          :style="circleStyle"
        />
        <!-- Centered Text -->
        <text
          x="50"
          y="50"
          text-anchor="middle"
          dy=".3em"
          class="percentage-text"
        >
          {{ animatedPercentage.toFixed(2) }}%
        </text>
      </svg>
    </div>
    <div class="text-center text-[#031106] text-sm font-semibold font-['Poppins'] capitalize">
      {{ props.title }}
    </div>
    <div class="text-center">
      <span class="text-[#516155] text-xs font-normal font-['Poppins']">Available </span>
      <span class="text-[#031106] text-xs font-normal font-['Poppins']">
        {{ props.value }} Unit
      </span>
    </div>
  </div>
</template>

<style scoped>
.circular-progress {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.circle-bg {
  fill: none;
  stroke: #e6e6e6; /* Light gray background */
  stroke-width: 7;
}

.circle-progress {
  fill: none;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s ease-in-out;
}

.percentage-text {
  font-size: 1.2rem;
  font-weight: bold;
  fill: #000; /* Black text */
}
</style>
