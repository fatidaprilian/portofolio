<script setup>
import { ref, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const props = defineProps({
  intensity: {
    type: Number,
    default: 0.15
  },
  wrapperClass: {
    type: String,
    default: 'inline-block'
  }
})

const target = ref(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target)

const targetStyle = computed(() => {
  if (isOutside.value || elementHeight.value === 0 || elementWidth.value === 0) {
    return {
      transform: 'translate(0px, 0px)',
      transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
    }
  }

  const tX = (elementX.value - elementWidth.value / 2) * props.intensity
  const tY = (elementY.value - elementHeight.value / 2) * props.intensity

  return {
    transform: `translate(${tX}px, ${tY}px)`,
    transition: 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)',
    zIndex: 10
  }
})
</script>

<template>
  <div ref="target" :style="targetStyle" :class="['will-change-transform relative', wrapperClass]">
    <slot />
  </div>
</template>
