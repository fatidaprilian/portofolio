<script setup>
import { ref, onMounted } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import gsap from 'gsap'

const props = defineProps({
  c: { type: Object, required: true },
  projects: { type: Array, required: true }
})

const emit = defineEmits(['selectProject'])

// Hover reveal logic
const listRef = ref(null)
const revealRef = ref(null)
const hoveredProjectIndex = ref(null)

let xTo = null
let yTo = null

onMounted(() => {
  if (typeof window !== 'undefined') {
    // Setup GSAP quickTo for high performance cursor follow
    xTo = gsap.quickTo(revealRef.value, "left", { duration: 0.6, ease: "power3" })
    yTo = gsap.quickTo(revealRef.value, "top", { duration: 0.6, ease: "power3" })
  }
})

const handleMouseMove = (e) => {
  if (xTo && yTo && hoveredProjectIndex.value !== null) {
    xTo(e.clientX)
    yTo(e.clientY)
  }
}

const onProjectEnter = (e, index) => {
  hoveredProjectIndex.value = index
  if (xTo && yTo) {
    xTo(e.clientX)
    yTo(e.clientY)
  }
}

const onProjectLeave = () => {
  hoveredProjectIndex.value = null
}
</script>

<template>
  <section id="works" class="section-container" aria-labelledby="works-heading">
    <div class="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--hairline)] pb-8">
      <div>
        <span class="pill-tag inline-block mb-4">{{ c.worksMeta }}</span>
        <h2 id="works-heading" class="display-section">{{ c.worksTitle }}</h2>
      </div>
    </div>

    <!-- Typography List Container -->
    <div 
      ref="listRef"
      class="relative"
      @mousemove="handleMouseMove"
      @mouseleave="onProjectLeave"
    >
      <div
        v-for="(project, index) in projects"
        :key="project.title"
        class="group relative block w-full border-b border-[var(--hairline)] cursor-pointer outline-none focus-visible:bg-[var(--surface-1)] transition-colors duration-300"
        @mouseenter="onProjectEnter($event, index)"
        @click="emit('selectProject', project)"
        role="button"
        tabindex="0"
        @keydown.enter="emit('selectProject', project)"
        :aria-label="`View details for ${project.title}`"
        data-cursor="hover"
      >
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-14 px-2 md:px-4 group-hover:px-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
          <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full md:w-auto">
            <span class="font-mono text-sm text-[var(--ink-muted)] font-medium">0{{ index + 1 }}</span>
            <h3 class="font-system text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-[var(--ink-primary)] group-hover:text-[var(--accent-blue)] transition-colors duration-300">
              {{ project.title }}
            </h3>
          </div>
          
          <div class="flex items-center gap-6 mt-6 md:mt-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:-translate-x-4 md:group-hover:translate-x-0">
            <span class="font-mono text-xs text-[var(--ink-muted)] uppercase tracking-widest">{{ project.role }}</span>
            <div class="w-10 h-10 rounded-full border border-[var(--hairline)] flex items-center justify-center bg-[var(--surface-canvas)] group-hover:bg-[var(--accent-blue)] group-hover:border-[var(--accent-blue)] group-hover:text-white transition-colors duration-300">
              <ArrowUpRight class="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Image Reveal -->
    <div 
      ref="revealRef"
      class="pointer-events-none fixed top-0 left-0 z-40 overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--surface-canvas)] shadow-2xl transition-[opacity,transform] duration-300 ease-out hidden md:block"
      :class="[
        hoveredProjectIndex !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
        '-translate-x-1/2 -translate-y-1/2'
      ]"
      style="width: 380px; height: 250px;"
    >
      <div 
        v-for="(project, index) in projects" 
        :key="'img-'+index"
        class="absolute inset-0 w-full h-full transition-opacity duration-400 ease-in-out"
        :class="hoveredProjectIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
      >
        <img 
          v-if="project.screenshot" 
          :src="project.screenshot" 
          :alt="project.title" 
          class="w-full h-full object-cover scale-105"
        />
        <div v-else class="w-full h-full flex items-center justify-center bg-[var(--surface-1)] text-4xl font-bold text-[var(--ink-muted)]">
          {{ project.title.substring(0, 2).toUpperCase() }}
        </div>
      </div>
    </div>
  </section>
</template>
