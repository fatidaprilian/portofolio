<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const cursorRef = ref(null)
const cursorInnerRef = ref(null)

const mouse = { x: 0, y: 0 }
const renderedCursor = {
  x: { previous: 0, current: 0, amt: 0.15 },
  y: { previous: 0, current: 0, amt: 0.15 }
}

let requestRef = null
const isHovering = ref(false)

const onMouseMove = (ev) => {
  mouse.x = ev.clientX
  mouse.y = ev.clientY
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

  requestRef = requestAnimationFrame(render)
}

const addHoverEvents = () => {
  const hoverElements = document.querySelectorAll('a, button, input, textarea, [data-cursor="hover"]')
  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => { isHovering.value = true })
    el.addEventListener('mouseleave', () => { isHovering.value = false })
  })
}

let mutationObserver = null

onMounted(() => {
  if (typeof window === 'undefined') return

  // Initialize mouse position to center
  mouse.x = window.innerWidth / 2
  mouse.y = window.innerHeight / 2
  renderedCursor.x.previous = mouse.x
  renderedCursor.y.previous = mouse.y

  window.addEventListener('mousemove', onMouseMove)
  requestRef = requestAnimationFrame(render)

  // Wait a bit to let DOM render completely
  setTimeout(() => {
    addHoverEvents()
  }, 1000)

  // Watch for DOM changes to re-bind hover events (e.g. navigation)
  mutationObserver = new MutationObserver((mutations) => {
    let shouldUpdate = false
    for (const m of mutations) {
      if (m.addedNodes.length > 0) {
        shouldUpdate = true
        break
      }
    }
    if (shouldUpdate) {
      addHoverEvents()
    }
  })
  
  mutationObserver.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(requestRef)
  if (mutationObserver) mutationObserver.disconnect()
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
