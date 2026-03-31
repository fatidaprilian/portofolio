<script setup>
import { ref, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const target = ref(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target)

const cardStyle = computed(() => {
  // Graceful degradation when dimensions are 0 (e.g., initial render)
  if (isOutside.value || elementHeight.value === 0 || elementWidth.value === 0) {
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    }
  }

  const maxRotation = 4 // subtle 4 degrees tilt
  const rX = ((elementHeight.value / 2 - elementY.value) / (elementHeight.value / 2)) * maxRotation
  const rY = ((elementX.value - elementWidth.value / 2) / (elementWidth.value / 2)) * maxRotation

  return {
    transform: `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg)`,
    transition: 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)'
  }
})
</script>

<template>
  <div ref="target" :style="cardStyle" class="will-change-transform w-full h-full">
    <slot />
  </div>
</template>
