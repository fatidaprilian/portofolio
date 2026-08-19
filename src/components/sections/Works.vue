<script setup>
import { ref, onMounted } from 'vue'
import { ArrowUpRight, List, LayoutGrid, ExternalLink } from 'lucide-vue-next'
import gsap from 'gsap'

const props = defineProps({
  c: { type: Object, required: true },
  projects: { type: Array, required: true }
})

const emit = defineEmits(['selectProject'])

const viewMode = ref('list') // 'list' | 'grid'

// Hover reveal logic for List View
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
    <!-- Header with View Mode Switcher -->
    <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--hairline)] pb-6 gap-6">
      <div>
        <span class="pill-tag inline-block mb-4">{{ c.worksMeta }}</span>
        <h2 id="works-heading" class="display-section">{{ c.worksTitle }}</h2>
      </div>

      <!-- View Switcher -->
      <div class="flex items-center bg-[var(--surface-1)] border border-[var(--hairline)] rounded-full p-1 self-start md:self-auto">
        <button
          type="button"
          :class="[
            'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200',
            viewMode === 'list'
              ? 'bg-[var(--surface-canvas)] text-[var(--ink-primary)] shadow-sm border border-[var(--hairline)]'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
          ]"
          @click="viewMode = 'list'"
          aria-label="List View"
        >
          <List class="w-3.5 h-3.5" />
          <span>{{ c.viewModeList || 'List' }}</span>
        </button>
        <button
          type="button"
          :class="[
            'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200',
            viewMode === 'grid'
              ? 'bg-[var(--surface-canvas)] text-[var(--ink-primary)] shadow-sm border border-[var(--hairline)]'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
          ]"
          @click="viewMode = 'grid'"
          aria-label="Bento Grid View"
        >
          <LayoutGrid class="w-3.5 h-3.5" />
          <span>{{ c.viewModeGrid || 'Bento Grid' }}</span>
        </button>
      </div>
    </div>

    <!-- 1. Minimalist Typography List View -->
    <div
      v-if="viewMode === 'list'"
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
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between py-5 md:py-8 px-2 md:px-4 group-hover:px-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
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

    <!-- 2. Interactive Bento Card Grid View -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
    >
      <div
        v-for="(project, index) in projects"
        :key="'grid-'+project.title"
        class="spotlight-card p-6 md:p-7 flex flex-col justify-between cursor-pointer group"
        @click="emit('selectProject', project)"
        role="button"
        tabindex="0"
        @keydown.enter="emit('selectProject', project)"
      >
        <div>
          <!-- Thumbnail Frame -->
          <div class="w-full aspect-video rounded-xl overflow-hidden border border-[var(--hairline)] bg-[var(--surface-canvas)] mb-6 relative">
            <img
              v-if="project.screenshot"
              :src="project.screenshot"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-[var(--surface-1)] text-4xl font-bold text-[var(--ink-muted)] font-mono">
              {{ project.title.substring(0, 2).toUpperCase() }}
            </div>
            <div class="absolute top-3 right-3">
              <span class="font-mono text-xs px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/10">
                {{ project.year }}
              </span>
            </div>
          </div>

          <!-- Title & Role -->
          <div class="flex items-start justify-between gap-4 mb-3">
            <h3 class="text-2xl font-bold tracking-tight text-[var(--ink-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
              {{ project.title }}
            </h3>
            <div class="w-8 h-8 rounded-full border border-[var(--hairline)] flex items-center justify-center group-hover:bg-[var(--accent-blue)] group-hover:border-[var(--accent-blue)] group-hover:text-white transition-colors shrink-0">
              <ArrowUpRight class="w-4 h-4" />
            </div>
          </div>

          <p class="font-mono text-xs text-[var(--accent-blue)] uppercase tracking-wider mb-4">
            {{ project.role }}
          </p>

          <p class="text-sm text-[var(--ink-muted)] leading-relaxed mb-6">
            {{ project.summary }}
          </p>
        </div>

        <!-- Tags List -->
        <div class="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--hairline)]/60">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="font-mono text-[11px] text-[var(--ink-muted)] bg-[var(--surface-canvas)] px-2 py-0.5 rounded border border-[var(--hairline)]"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Floating Image Reveal (Active for List View on Desktop) -->
    <div 
      v-if="viewMode === 'list'"
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
