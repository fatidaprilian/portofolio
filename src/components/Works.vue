<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps({
  c: { type: Object, required: true },
  projects: { type: Array, required: true }
})

const emit = defineEmits(['selectProject'])

const trackRef = ref(null)
let ctx = null

const initHorizontalScroll = () => {
  const track = trackRef.value
  if (!track) return

  const container = track.parentElement
  if (!container) return

  // Check if reduced motion is active or if screen is mobile/tablet width
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.innerWidth <= 1024

  // Always revert any existing context first to avoid duplicating spacers
  if (ctx) {
    ctx.revert()
    ctx = null
  }

  if (isReduced || isMobile) return

  // Create GSAP context for bulletproof cleanup
  ctx = gsap.context(() => {
    // We compute the measurements DYNAMICALLY within arrow functions
    // This allows ScrollTrigger to fetch live, fully-reflowed widths against the container during refreshes
    ScrollTrigger.create({
      trigger: '#works',
      start: 'top 80px',
      end: () => `+=${track.scrollWidth - container.clientWidth}`,
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      animation: gsap.to(track, {
        x: () => -(track.scrollWidth - container.clientWidth),
        ease: 'none'
      })
    })
  })
}

let resizeObserver = null

const onResize = () => {
  if (ctx) {
    ctx.revert()
    ctx = null
  }
  // Recalculate horizontal scroll after DOM settles
  setTimeout(() => {
    initHorizontalScroll()
    ScrollTrigger.refresh()
  }, 100)
}

onMounted(() => {
  // Allow DOM and styles to fully settle first
  setTimeout(() => {
    initHorizontalScroll()
    ScrollTrigger.refresh()
  }, 200)

  window.addEventListener('resize', onResize, { passive: true })

  // Observe track element size shifts (such as dynamic layout reflows)
  if (typeof ResizeObserver !== 'undefined' && trackRef.value) {
    resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh()
    })
    resizeObserver.observe(trackRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (ctx) {
    ctx.revert()
  }
})
</script>

<template>
  <section id="works" class="section-container relative" aria-labelledby="works-heading">
    <!-- Fine corner crop marks for section -->
    <div class="crop-mark crop-mark-tl"></div>
    <div class="crop-mark crop-mark-tr"></div>
    <div class="crop-mark crop-mark-bl"></div>
    <div class="crop-mark crop-mark-br"></div>

    <div class="section-header">
      <span class="section-kicker">{{ c.worksMeta }}</span>
      <h2 id="works-heading" class="section-title">{{ c.worksTitle }}</h2>
    </div>

    <div class="works-horizontal-container">
      <div ref="trackRef" class="works-track">
        <div
          v-for="(project, index) in projects"
          :key="project.title"
          class="glass-panel work-card works-horizontal-card relative"
          @click="emit('selectProject', project)"
          role="button"
          tabindex="0"
          @keydown.enter="emit('selectProject', project)"
          :aria-label="`View details for ${project.title}`"
        >
          <!-- Corner Crop Marks on card hover -->
          <div class="crop-mark crop-mark-tl"></div>
          <div class="crop-mark crop-mark-tr"></div>
          <div class="crop-mark crop-mark-bl"></div>
          <div class="crop-mark crop-mark-br"></div>

          <div class="work-card-head">
            <span class="work-card-index">0{{ index + 1 }}</span>
            <span class="work-card-year">{{ project.year }}</span>
          </div>

          <h3>{{ project.title }}</h3>
          <p>{{ project.summary }}</p>

          <div class="work-card-footer">
            <span>{{ project.role }}</span>
            <span class="work-card-action">
              {{ c.ctaDetails }}
              <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
            </span>
          </div>

          <!-- Fine technical spec metadata below -->
          <div class="flex justify-between items-center text-[9px] font-mono text-tertiary mt-4 pt-4 border-t border-rule" aria-hidden="true">
            <span>SYS_COORD_0{{ index + 1 }}</span>
            <span>RENDER_OKLCH // PASS</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
