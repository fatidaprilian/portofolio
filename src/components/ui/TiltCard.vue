<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const target = ref(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target)
const isTiltEnabled = ref(true)

let pointerMediaQuery
let viewportMediaQuery

const updateTiltAvailability = () => {
  const hasCoarsePointer = pointerMediaQuery ? pointerMediaQuery.matches : false
  const isSmallViewport = viewportMediaQuery ? viewportMediaQuery.matches : false
  isTiltEnabled.value = !hasCoarsePointer && !isSmallViewport
}

onMounted(() => {
  if (typeof window === 'undefined') return

  pointerMediaQuery = window.matchMedia('(pointer: coarse)')
  viewportMediaQuery = window.matchMedia('(max-width: 1023px)')
  updateTiltAvailability()

  pointerMediaQuery.addEventListener('change', updateTiltAvailability)
  viewportMediaQuery.addEventListener('change', updateTiltAvailability)
})

onUnmounted(() => {
  pointerMediaQuery?.removeEventListener('change', updateTiltAvailability)
  viewportMediaQuery?.removeEventListener('change', updateTiltAvailability)
})

const cardStyle = computed(() => {
  if (!isTiltEnabled.value) {
    return {
      transform: 'none',
      transition: 'none'
    }
  }

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
