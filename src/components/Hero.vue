<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowRight, Github } from 'lucide-vue-next'
import gsap from 'gsap'

const props = defineProps({
  c: {
    type: Object,
    required: true
  }
})

const heroContainer = ref(null)
const lightLine = ref(null)
const titleLine1 = ref(null)
const titleLine2 = ref(null)
const titleLine3 = ref(null)
const emit = defineEmits(['scrollTo'])

onMounted(() => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (isReducedMotion) {
    gsap.set(lightLine.value, { opacity: 0 })
    gsap.set([titleLine1.value, titleLine2.value, titleLine3.value], { opacity: 1, y: 0 })
    return
  }

  // Cinematic Timeline
  const tl = gsap.timeline({ delay: 0.3 })
  
  // 1. Draw diagonal line
  tl.fromTo(lightLine.value, 
    { scaleY: 0, opacity: 0 }, 
    { scaleY: 1, opacity: 1, duration: 1.4, ease: 'power4.inOut' }
  )
  
  // 2. Line splits/expands into background to reveal text
  tl.to(lightLine.value, {
    scaleX: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.inOut'
  }, '+=0.2')

  // 3. Title text emerges
  tl.fromTo([titleLine1.value, titleLine2.value, titleLine3.value],
    { opacity: 0, y: 40, rotationX: -15 },
    { opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
    '-=0.8'
  )
})
</script>

<template>
  <section id="home" class="hero-section" ref="heroContainer" data-scene>
    <!-- Cinematic Diagonal/Vertical Light Line -->
    <div class="light-line-wrapper">
      <div class="light-line" ref="lightLine"></div>
    </div>

    <!-- Ghost chapter number bg -->
    <div class="hero-bg-number" aria-hidden="true">01</div>

    <div class="hero-content relative z-10">
      <!-- Eyebrow -->
      <div class="hero-eyebrow">
        <span class="eyebrow-text">{{ c.eyebrow }}</span>
      </div>

      <!-- Role tag -->
      <div class="hero-role-tag">{{ c.role }}</div>

      <!-- Big title -->
      <h1 class="hero-title text-ink">
        <span class="block perspective-1000">
          <span class="block origin-bottom" ref="titleLine1">{{ c.heroLine1 }}</span>
        </span>
        <span class="block perspective-1000">
          <em class="text-accent-red block origin-bottom" ref="titleLine2">{{ c.heroLine2 }}</em>
        </span>
        <span class="block perspective-1000">
          <span class="block origin-bottom" ref="titleLine3">{{ c.heroLine3 }}</span>
        </span>
      </h1>

      <p class="hero-body" data-reveal>{{ c.heroBody }}</p>

      <div class="hero-actions" data-reveal>
        <button type="button" class="btn-primary" @click="emit('scrollTo', 'projects')">
          <ArrowRight class="btn-icon" aria-hidden="true" />
          {{ c.ctaView }}
        </button>
        <a
          href="https://github.com/fatidaprilian"
          target="_blank"
          rel="noreferrer"
          class="btn-secondary"
        >
          <Github class="btn-icon" aria-hidden="true" />
          {{ c.ctaGithub }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center; /* Center horizontally/vertically for cinematic feel */
  padding: 0 clamp(24px, 6vw, 80px);
  overflow: hidden;
}

.light-line-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  pointer-events: none;
}

.light-line {
  width: 2px;
  height: 200vh;
  background: linear-gradient(180deg, transparent, var(--ink), transparent);
  transform: rotate(-45deg);
  transform-origin: center;
  box-shadow: 0 0 30px 2px rgba(26, 26, 22, 0.15); /* Ink shadow */
}

@media (max-width: 768px) {
  .light-line {
    transform: rotate(0deg); /* Vertical on mobile */
    margin-left: -85vw; /* Position on the left side as indicator */
  }
}

.hero-content {
  max-width: 900px;
}

.perspective-1000 {
  perspective: 1000px;
}
</style>
