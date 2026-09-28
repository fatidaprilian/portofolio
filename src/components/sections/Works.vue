<script setup>
import { ref, onMounted } from 'vue'
import { ArrowUpRight, List, LayoutGrid, FolderGit2, Github } from 'lucide-vue-next'
import gsap from 'gsap'

const props = defineProps({
  c: { type: Object, required: true },
  projects: { type: Array, required: true }
})

const emit = defineEmits(['selectProject'])

const viewMode = ref('grid') // Default to clean comic grid

// Hover reveal logic for List View
const listRef = ref(null)
const revealRef = ref(null)
const hoveredProjectIndex = ref(null)

let xTo = null
let yTo = null

const initQuickTo = () => {
  if (revealRef.value && typeof window !== 'undefined') {
    gsap.set(revealRef.value, { xPercent: -50, yPercent: -50 })
    xTo = gsap.quickTo(revealRef.value, "x", { duration: 0.25, ease: "power2.out" })
    yTo = gsap.quickTo(revealRef.value, "y", { duration: 0.25, ease: "power2.out" })
  }
}

onMounted(() => {
  initQuickTo()
})

const onProjectEnter = (e, index) => {
  hoveredProjectIndex.value = index
  if (!xTo || !yTo) {
    initQuickTo()
  }
  if (revealRef.value && e) {
    gsap.set(revealRef.value, { x: e.clientX, y: e.clientY })
  }
}

const handleMouseMove = (e) => {
  if (!xTo || !yTo) {
    initQuickTo()
  }
  if (xTo && yTo && hoveredProjectIndex.value !== null) {
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
    <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--comic-border)]/20 pb-6 gap-6">
      <div>
        <span class="comic-chapter-badge bg-[var(--brand-mint)] text-slate-950 mb-4">
          <FolderGit2 class="w-3.5 h-3.5 text-slate-950" />
          {{ c.worksMeta }}
        </span>
        <h2 id="works-heading" class="display-section">{{ c.worksTitle }}</h2>
      </div>

      <!-- View Mode Switcher -->
      <div class="flex items-center bg-[var(--surface-panel)] border border-[var(--comic-border)] rounded-xl p-1 shadow-[1px_1px_0px_var(--comic-border)] self-start md:self-auto gap-1">
        <button
          type="button"
          :class="[
            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
            viewMode === 'grid'
              ? 'bg-[var(--brand-coral)] text-white border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
          ]"
          @click="viewMode = 'grid'"
          aria-label="Grid View"
        >
          <LayoutGrid class="w-3.5 h-3.5" />
          <span>{{ c.viewModeGrid || 'Grid' }}</span>
        </button>
        <button
          type="button"
          :class="[
            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
            viewMode === 'list'
              ? 'bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
          ]"
          @click="viewMode = 'list'"
          aria-label="List View"
        >
          <List class="w-3.5 h-3.5" />
          <span>{{ c.viewModeList || 'List' }}</span>
        </button>
      </div>
    </div>

    <!-- 1. Interactive Comic Panel Grid View -->
    <div
      v-if="viewMode === 'grid'"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
    >
      <div
        v-for="(project, index) in projects"
        :key="'grid-'+project.title"
        class="comic-panel p-5 sm:p-6 flex flex-col justify-between cursor-pointer group bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)]"
        @click="emit('selectProject', project)"
        role="button"
        tabindex="0"
        @keydown.enter="emit('selectProject', project)"
      >
        <div>
          <!-- Thumbnail Frame -->
          <div class="w-full aspect-video rounded-xl overflow-hidden border-[1.5px] border-[var(--comic-border)] bg-[var(--surface-subtle)] mb-5 relative">
            <img
              v-if="project.screenshot"
              :src="project.screenshot"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-[var(--surface-subtle)] text-4xl font-black text-[var(--ink-muted)] font-mono">
              {{ project.title.substring(0, 2).toUpperCase() }}
            </div>
            
            <!-- Year Tag -->
            <div class="absolute top-3 right-3">
              <span class="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
                {{ project.year }}
              </span>
            </div>

            <!-- Index Tag -->
            <div class="absolute bottom-3 left-3">
              <span class="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--surface-panel)] text-[var(--ink-primary)] border border-[var(--comic-border)]">
                #0{{ index + 1 }}
              </span>
            </div>
          </div>

          <!-- Title & Action -->
          <div class="flex items-start justify-between gap-4 mb-2">
            <h3 class="text-xl sm:text-2xl font-black tracking-tight text-[var(--ink-primary)] group-hover:text-[var(--brand-coral)] transition-colors">
              {{ project.title }}
            </h3>
            <div class="w-8 h-8 rounded-xl border border-[var(--comic-border)] bg-[var(--surface-panel)] flex items-center justify-center group-hover:bg-[var(--brand-coral)] group-hover:text-white shadow-[1px_1px_0px_var(--comic-border)] transition-all shrink-0">
              <ArrowUpRight class="w-4 h-4" />
            </div>
          </div>

          <!-- Role Label -->
          <p class="font-mono text-xs font-bold text-[var(--brand-mint)] uppercase tracking-wider mb-3">
            {{ project.role }}
          </p>

          <!-- Summary -->
          <p class="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed mb-6">
            {{ project.summary }}
          </p>
        </div>

        <!-- Tags List -->
        <div class="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--comic-border)]/15">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="comic-tag text-[10px] sm:text-[11px]"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- 6th Card (Grid Slot 6): More Projects on GitHub -->
      <a
        href="https://github.com/fatidaprilian?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        class="comic-panel p-5 sm:p-6 flex flex-col justify-between group bg-[var(--surface-panel)] border-[1.5px] border-dashed border-[var(--comic-border)] hover:border-solid hover:border-[var(--brand-coral)] transition-all cursor-pointer"
        :aria-label="c.moreProjectsTitle || 'Explore more projects on GitHub'"
      >
        <div>
          <!-- Thumbnail Frame / GitHub Graphic -->
          <div class="w-full aspect-video rounded-xl overflow-hidden border-[1.5px] border-[var(--comic-border)] bg-[var(--surface-subtle)] mb-5 relative flex flex-col items-center justify-center p-6 text-center group-hover:bg-[var(--surface-sunken)] transition-colors">
            <div class="w-14 h-14 rounded-2xl bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] shadow-[2px_2px_0px_var(--comic-border)] flex items-center justify-center text-[var(--brand-coral)] mb-2 group-hover:scale-110 group-hover:rotate-[-4deg] transition-transform">
              <Github class="w-7 h-7" />
            </div>
            <p class="font-mono text-xs font-bold text-[var(--ink-muted)]">github.com/fatidaprilian</p>

            <!-- Corner Badge -->
            <div class="absolute top-3 right-3">
              <span class="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
                20+ Repos
              </span>
            </div>

            <!-- Index Tag -->
            <div class="absolute bottom-3 left-3">
              <span class="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--brand-coral)] text-white border border-[var(--comic-border)]">
                #MORE
              </span>
            </div>
          </div>

          <!-- Title & Action -->
          <div class="flex items-start justify-between gap-4 mb-2">
            <h3 class="text-xl sm:text-2xl font-black tracking-tight text-[var(--ink-primary)] group-hover:text-[var(--brand-coral)] transition-colors">
              {{ c.moreProjectsTitle || 'Lihat Proyek Lainnya di GitHub' }}
            </h3>
            <div class="w-8 h-8 rounded-xl border border-[var(--comic-border)] bg-[var(--surface-panel)] flex items-center justify-center group-hover:bg-[var(--brand-coral)] group-hover:text-white shadow-[1px_1px_0px_var(--comic-border)] transition-all shrink-0">
              <ArrowUpRight class="w-4 h-4" />
            </div>
          </div>

          <!-- Role Label -->
          <p class="font-mono text-xs font-bold text-[var(--brand-mint)] uppercase tracking-wider mb-3">
            {{ c.moreProjectsRole || 'Open-Source & Code Sandbox' }}
          </p>

          <!-- Summary -->
          <p class="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed mb-6">
            {{ c.moreProjectsSubtitle || 'Eksplorasi eksperimen kode, script automasi, library, dan modul open-source lainnya di profil GitHub saya.' }}
          </p>
        </div>

        <!-- Tags / Action Link -->
        <div class="pt-4 border-t border-[var(--comic-border)]/15 flex items-center justify-between">
          <div class="flex flex-wrap gap-1.5">
            <span class="comic-tag text-[10px] sm:text-[11px]">Git Repositories</span>
            <span class="comic-tag text-[10px] sm:text-[11px]">Open Source</span>
          </div>
          <span class="font-mono text-xs font-bold text-[var(--brand-coral)] flex items-center gap-1 group-hover:underline">
            {{ c.moreProjectsCta || 'Buka GitHub' }}
            <ArrowUpRight class="w-3.5 h-3.5" />
          </span>
        </div>
      </a>
    </div>

    <!-- 2. Clean List View -->
    <div
      v-else
      ref="listRef"
      class="relative flex flex-col gap-3"
      @mousemove="handleMouseMove"
      @mouseleave="onProjectLeave"
    >
      <div
        v-for="(project, index) in projects"
        :key="project.title"
        class="comic-panel p-5 sm:p-6 cursor-pointer bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] hover:border-[var(--brand-coral)] transition-all group"
        @mouseenter="onProjectEnter($event, index)"
        @click="emit('selectProject', project)"
        role="button"
        tabindex="0"
        @keydown.enter="emit('selectProject', project)"
        :aria-label="`View details for ${project.title}`"
      >
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4 sm:gap-6">
            <span class="font-mono text-sm sm:text-base font-black px-2.5 py-1 rounded bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
              #0{{ index + 1 }}
            </span>
            <div>
              <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-[var(--ink-primary)] group-hover:text-[var(--brand-coral)] transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-xs text-[var(--ink-muted)] font-medium mt-0.5">{{ project.role }} • {{ project.year }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-4 self-end md:self-center">
            <div class="flex flex-wrap gap-1 hidden sm:flex">
              <span
                v-for="tag in project.tags.slice(0, 3)"
                :key="tag"
                class="comic-tag text-[10px]"
              >
                {{ tag }}
              </span>
            </div>
            <div class="w-9 h-9 rounded-xl border border-[var(--comic-border)] bg-[var(--surface-panel)] flex items-center justify-center group-hover:bg-[var(--brand-coral)] group-hover:text-white shadow-[1px_1px_0px_var(--comic-border)] transition-all">
              <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <!-- List View: More on GitHub Row -->
      <a
        href="https://github.com/fatidaprilian?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        class="comic-panel p-5 sm:p-6 bg-[var(--surface-panel)] border-[1.5px] border-dashed border-[var(--comic-border)] hover:border-solid hover:border-[var(--brand-coral)] transition-all group block"
        @mouseenter="onProjectEnter($event, 'more')"
        @mouseleave="onProjectLeave"
        :aria-label="c.moreProjectsTitle || 'Explore more projects on GitHub'"
      >
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4 sm:gap-6">
            <span class="font-mono text-sm sm:text-base font-black px-2.5 py-1 rounded bg-[var(--brand-coral)] text-white border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
              #MORE
            </span>
            <div>
              <div class="flex items-center gap-2">
                <Github class="w-4 h-4 text-[var(--brand-coral)] shrink-0" />
                <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-[var(--ink-primary)] group-hover:text-[var(--brand-coral)] transition-colors">
                  {{ c.moreProjectsTitle || 'Lihat Proyek Lainnya di GitHub' }}
                </h3>
              </div>
              <p class="text-xs text-[var(--ink-muted)] font-medium mt-0.5">{{ c.moreProjectsListMeta || 'github.com/fatidaprilian • 20+ Repositori Publik & Eksperimen' }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-4 self-end md:self-center">
            <div class="flex flex-wrap gap-1 hidden sm:flex">
              <span class="comic-tag text-[10px]">Open Source</span>
              <span class="comic-tag text-[10px]">20+ Repos</span>
            </div>
            <div class="w-9 h-9 rounded-xl border border-[var(--comic-border)] bg-[var(--surface-panel)] flex items-center justify-center group-hover:bg-[var(--brand-coral)] group-hover:text-white shadow-[1px_1px_0px_var(--comic-border)] transition-all">
              <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      </a>
    </div>

    <!-- Floating Comic Image Reveal (for List View) -->
    <div 
      ref="revealRef"
      v-show="viewMode === 'list'"
      class="pointer-events-none fixed top-0 left-0 z-50 overflow-hidden rounded-2xl border-2 border-[var(--comic-border)] bg-[var(--surface-panel)] shadow-comic-lg transition-[opacity,transform] duration-200 ease-out hidden md:block"
      :class="hoveredProjectIndex !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-90'"
      style="width: 360px; height: 230px;"
    >
      <div 
        v-for="(project, index) in projects" 
        :key="'img-'+index"
        class="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out"
        :class="hoveredProjectIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
      >
        <img 
          v-if="project.screenshot" 
          :src="project.screenshot" 
          :alt="project.title" 
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full flex flex-col items-center justify-center bg-[var(--surface-subtle)] text-center p-6">
          <div class="w-14 h-14 rounded-2xl bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] flex items-center justify-center font-mono text-2xl font-black text-[var(--brand-coral)] mb-2 shadow-[2px_2px_0px_var(--comic-border)]">
            {{ project.title.substring(0, 2).toUpperCase() }}
          </div>
          <p class="font-black text-base text-[var(--ink-primary)] tracking-tight">{{ project.title }}</p>
          <span class="font-mono text-xs font-bold text-[var(--brand-mint)] mt-0.5">{{ project.role }}</span>
        </div>
      </div>

      <!-- More Projects Floating Preview -->
      <div 
        class="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out flex flex-col items-center justify-center bg-[var(--surface-panel)] p-6 text-center"
        :class="hoveredProjectIndex === 'more' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
      >
        <div class="w-16 h-16 rounded-2xl bg-[var(--surface-subtle)] border-2 border-[var(--comic-border)] flex items-center justify-center text-[var(--brand-coral)] mb-3 shadow-[2px_2px_0px_var(--comic-border)]">
          <Github class="w-8 h-8" />
        </div>
        <p class="font-black text-base text-[var(--ink-primary)]">github.com/fatidaprilian</p>
        <p class="font-mono text-xs font-bold text-[var(--ink-muted)] mt-1">{{ c.moreProjectsPreviewSub || '20+ Repositories & Experiments ↗' }}</p>
      </div>
    </div>
  </section>
</template>
