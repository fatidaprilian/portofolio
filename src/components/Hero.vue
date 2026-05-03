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
const emit = defineEmits(['scrollTo'])

const splitIntoWords = (text) => {
  if (!text) return []
  return text.split(' ').map((word) => ({ word: word + ' ' }))
}

onMounted(() => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (isReducedMotion) {
    gsap.set(lightLine.value, { opacity: 0 })
    gsap.set('.word-reveal', { yPercent: 0 })
    gsap.set('.eyebrow-line', { scaleX: 1 })
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

  // 3. Eyebrow line strike
  tl.fromTo('.eyebrow-line',
    { scaleX: 0 },
    { scaleX: 1, duration: 0.8, ease: 'power3.out' },
    '-=0.8'
  )

  // 4. Word stagger emerges
  tl.fromTo('.word-reveal',
    { yPercent: 110 },
    { yPercent: 0, duration: 1, stagger: 0.05, ease: 'power4.out' },
    '-=0.6'
  )
})
</script>

<template>
  <section id="home" class="hero-section" ref="heroContainer" data-scene>
    <!-- Cinematic Diagonal/Vertical Light Line -->
    <div class="light-line-wrapper">
      <div class="light-line" ref="lightLine"></div>
    </div>

    <!-- Right Column (White space + 01) -->
    <div class="absolute inset-y-0 right-0 w-[55%] pointer-events-none flex items-end justify-end overflow-hidden z-0 hidden lg:flex">
      <div class="hero-bg-number" aria-hidden="true">01</div>
    </div>

    <!-- Left Column (Content) -->
    <div class="relative z-10 w-full lg:w-[45%] h-full flex flex-col justify-center px-6 lg:pl-24 lg:pr-0">
      <div class="hero-content">
        <!-- Eyebrow -->
        <div class="hero-eyebrow flex items-center gap-4 mb-6">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text text-accent-red font-bold uppercase tracking-widest text-xs">{{ c.eyebrow }}</span>
        </div>

        <!-- Role tag -->
        <div class="hero-role-tag mb-8 text-ink-muted text-sm tracking-wider uppercase font-bold">{{ c.role }}</div>

        <!-- Big title -->
        <h1 class="hero-title text-ink mb-8">
          <span class="block overflow-hidden pb-2">
            <span v-for="(w, i) in splitIntoWords(c.heroLine1)" :key="'l1'+i" class="word-reveal inline-block">{{ w.word }}</span>
          </span>
          <span class="block overflow-hidden pb-2">
            <em v-for="(w, i) in splitIntoWords(c.heroLine2)" :key="'l2'+i" class="word-reveal inline-block text-accent-red pr-3">{{ w.word }}</em>
          </span>
          <span class="block overflow-hidden pb-2">
            <span v-for="(w, i) in splitIntoWords(c.heroLine3)" :key="'l3'+i" class="word-reveal inline-block">{{ w.word }}</span>
          </span>
        </h1>

        <p class="hero-body text-ink-muted text-lg leading-relaxed max-w-md mb-10" data-reveal>{{ c.heroBody }}</p>

        <div class="hero-actions flex gap-4" data-reveal>
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
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center; /* Center horizontally/vertically for cinematic feel */
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

.eyebrow-line {
  display: inline-block;
  width: 100px;
  height: 2px;
  background: var(--accent-red);
  transform-origin: left;
}

.hero-title em {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-weight: 500;
}
</style>
