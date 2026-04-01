<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const cursorRef = ref(null)
const cursorInnerRef = ref(null)

const mouse = { x: 0, y: 0 }
const renderedCursor = {
  x: { previous: 0, current: 0, amt: 0.15 },
  y: { previous: 0, current: 0, amt: 0.15 }
}

let animationFrameId = null
const isHovering = ref(false)

const HOVER_SELECTORS = 'a, button, input, textarea, [data-cursor="hover"]'

const onMouseMove = (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
}

const render = () => {
  renderedCursor.x.current = mouse.x
  renderedCursor.y.current = mouse.y

  renderedCursor.x.previous += (renderedCursor.x.current - renderedCursor.x.previous) * renderedCursor.x.amt
  renderedCursor.y.previous += (renderedCursor.y.current - renderedCursor.y.previous) * renderedCursor.y.amt

  if (cursorRef.value) {
    cursorRef.value.style.transform = `translate3d(${renderedCursor.x.previous}px, ${renderedCursor.y.previous}px, 0)`
  }

  if (cursorInnerRef.value) {
    cursorInnerRef.value.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
  }

  animationFrameId = requestAnimationFrame(render)
}

// Event delegation: single listener on body instead of MutationObserver + querySelectorAll
const onPointerOver = (event) => {
  if (event.target.closest(HOVER_SELECTORS)) {
    isHovering.value = true
  }
}

const onPointerOut = (event) => {
  if (event.target.closest(HOVER_SELECTORS)) {
    isHovering.value = false
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return

  mouse.x = window.innerWidth / 2
  mouse.y = window.innerHeight / 2
  renderedCursor.x.previous = mouse.x
  renderedCursor.y.previous = mouse.y

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  document.body.addEventListener('pointerover', onPointerOver, { passive: true })
  document.body.addEventListener('pointerout', onPointerOut, { passive: true })
  animationFrameId = requestAnimationFrame(render)
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('mousemove', onMouseMove)
  document.body.removeEventListener('pointerover', onPointerOver)
  document.body.removeEventListener('pointerout', onPointerOut)
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div class="cursor-container hidden md:block">
    <!-- Outer trailing circle -->
    <div 
      ref="cursorRef" 
      class="cursor-outer"
      :class="{ 'is-hover': isHovering }"
    ></div>
    <!-- Inner hard dot -->
    <div 
      ref="cursorInnerRef" 
      class="cursor-inner"
      :class="{ 'is-hover': isHovering }"
    ></div>
  </div>
</template>

<style scoped>
.cursor-container {
  pointer-events: none;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.cursor-outer {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(206, 178, 150, 0.4);
  border-radius: 50%;
  transition: width 0.3s ease-out, height 0.3s ease-out, top 0.3s ease-out, left 0.3s ease-out, background-color 0.3s ease-out, border-color 0.3s ease-out;
  will-change: transform;
}

.cursor-inner {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  background-color: rgba(206, 178, 150, 0.9);
  border-radius: 50%;
  transition: opacity 0.3s ease-out;
  will-change: transform;
}

/* Hover States */
.cursor-outer.is-hover {
  width: 50px;
  height: 50px;
  top: -25px;
  left: -25px;
  background-color: rgba(206, 178, 150, 0.1);
  border-color: rgba(206, 178, 150, 0.6);
  backdrop-filter: blur(1px);
}

.cursor-inner.is-hover {
  opacity: 0;
}
</style>
