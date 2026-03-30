<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'

const props = defineProps({
  language: {
    type: String,
    default: 'id'
  }
})

const copyByLanguage = {
  id: {
    labelPill: 'Full-stack Engineer & Product Builder',
    location: 'Indonesia · GMT+7',
    availableFor: 'Open to opportunities',
    summary: 'Membangun digital products yang robust di struktur, user-focused, dan siap scale dengan iterasi bisnis yang sustainable.',
    viewProjects: 'Lihat Projects',
    contact: 'Diskusi',
    stats: [
      { value: '35+', label: 'Repositori' },
      { value: '3+', label: 'Rilis Produk' },
      { value: '2026', label: 'Riset Co-Author' }
    ]
  },
  en: {
    labelPill: 'Full-stack Engineer & Product Builder',
    location: 'Indonesia · GMT+7',
    availableFor: 'Open to opportunities',
    summary: 'Building digital products with strong architecture, user focus, and sustainable business iteration.',
    viewProjects: 'View Projects',
    contact: 'Discuss',
    stats: [
      { value: '35+', label: 'Repositories' },
      { value: '3+', label: 'Deliveries' },
      { value: '2026', label: 'Co-Author' },
    ]
  }
}

const getActiveCopy = () => copyByLanguage[props.language] ?? copyByLanguage.id

const scrollY = ref(0)
const updateScrollY = () => { scrollY.value = window.scrollY }

const nameParallaxStyle = computed(() => ({
  transform: `translateY(${scrollY.value * 0.06}px)`
}))

onMounted(() => {
  window.addEventListener('scroll', updateScrollY, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollY)
})
</script>

<template>
  <section id="home" class="hero-dark-shell relative min-h-[100svh] flex flex-col overflow-hidden">
    <!-- Grain texture -->
    <div class="hero-grain-overlay" aria-hidden="true"></div>

    <!-- Subtle grid decoration — fills empty upper-right area -->
    <div class="pointer-events-none absolute inset-0 z-0 hero-grid-lines" aria-hidden="true"></div>

    <!-- Vertical divider line (desktop) -->
    <div class="hidden lg:block pointer-events-none absolute z-0 top-0 bottom-0" style="right: 38%; width: 1px; background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 100%);"></div>

    <!-- Top bar removed as per user preference -->
    <div class="relative z-10 px-5 md:px-8 lg:px-10 pt-8 md:pt-10 flex items-center h-12">
    </div>

    <!-- Main content: name (left) + avatar (right, vertically CENTERED) -->
    <div class="relative z-10 flex-1 flex flex-col lg:flex-row px-5 md:px-8 lg:px-10 pt-6 md:pt-8 pb-0 gap-0 lg:gap-10">

      <!-- Left: name pushed to bottom -->
      <div class="flex-1 flex flex-col justify-end pb-2 lg:pb-6" :style="nameParallaxStyle" data-reveal-fade>
        <h1 class="leading-none">
          <span class="hero-display-name block">FARID EKA</span>
          <span class="hero-display-name block" style="color: rgba(240,235,228,0.58);">APRILIAN</span>
        </h1>
      </div>

      <!-- Right: avatar VERTICALLY CENTERED in its column -->
      <div class="flex-shrink-0 flex lg:flex-col items-end lg:items-center justify-end lg:justify-center py-6 lg:py-8" data-reveal-fade style="--reveal-delay: 140ms">
        <div class="hero-avatar-contained">
          <img
            src="https://avatars.githubusercontent.com/u/64300224?v=4"
            alt="Farid Eka Aprilian"
            class="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>
      </div>
    </div>

    <!-- Bottom info strip -->
    <div class="relative z-10 px-5 md:px-8 lg:px-10 pb-10 md:pb-12" data-reveal-fade style="--reveal-delay: 200ms">
      <div class="border-t border-white/[0.07] pt-5 md:pt-6">
        <div class="flex flex-wrap gap-x-8 gap-y-5 items-end justify-between">

          <!-- Left: summary + CTAs -->
          <div class="space-y-4 max-w-lg">
            <p class="text-[0.85rem] leading-relaxed text-white/60 w-[95%] md:w-full">
              {{ getActiveCopy().summary }}
            </p>
            <div class="flex gap-3 flex-wrap">
              <a
                href="#work"
                class="inline-flex items-center gap-2 rounded-lg bg-[#a56a43] hover:bg-[#8c5938] text-[#f8f1e5] font-semibold text-sm px-5 py-2.5 transition duration-300"
              >
                {{ getActiveCopy().viewProjects }}
                <ArrowRight class="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                class="inline-flex items-center gap-2 rounded-lg border border-white/[0.14] hover:border-white/[0.28] hover:bg-white/[0.05] text-white/60 hover:text-white/85 font-semibold text-sm px-5 py-2.5 transition duration-300"
              >
                {{ getActiveCopy().contact }}
              </a>
            </div>
          </div>

          <!-- Right: stats only, clear contrast -->
          <div class="flex flex-wrap items-end gap-3">
            <div
              v-for="stat in getActiveCopy().stats"
              :key="stat.label"
              class="text-center px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.06] min-w-[72px]"
            >
              <p class="font-display text-2xl text-white tracking-wide leading-none">{{ stat.value }}</p>
              <p class="text-[0.6rem] tracking-[0.14em] uppercase text-white/60 mt-1">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
