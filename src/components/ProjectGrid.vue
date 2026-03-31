<script setup>
import { getProjectsByLanguage } from '../data/projects'
import { ArrowUpRight } from 'lucide-vue-next'

const props = defineProps({
  language: {
    type: String,
    default: 'id'
  }
})

const copyByLanguage = {
  id: {
    sectionLabel: '/ Proyek Pilihan',
    sectionTitle: 'Proyek',
    openRepository: 'Eksplor',
    browseAll: 'Semua di GitHub',
    tagsLabel: 'Teknologi',
    featuredLabel: 'Unggulan'
  },
  en: {
    sectionLabel: '/ Selected Work',
    sectionTitle: 'Projects',
    openRepository: 'Explore',
    browseAll: 'All on GitHub',
    tagsLabel: 'Stack',
    featuredLabel: 'Featured'
  }
}

const getActiveCopy = () => copyByLanguage[props.language] ?? copyByLanguage.id
const getAllProjects = () => getProjectsByLanguage(props.language)
const getFeaturedProject = () => getAllProjects().find((p) => p.type === 'featured')
const getStandardProjects = () => getAllProjects().filter((p) => p.type !== 'featured')
</script>

<template>
  <section id="work" class="pb-0">
    <!-- Section header -->
    <div class="section-shell pt-20 md:pt-28 pb-10 md:pb-12" data-reveal>
      <div class="flex items-end justify-between gap-6 border-b border-[#d7c2a8]/60 pb-6">
        <div>
          <p class="text-[0.6rem] md:text-xs uppercase tracking-[0.26em] text-muted mb-2 md:mb-3">{{ getActiveCopy().sectionLabel }}</p>
          <h2 class="font-display text-5xl md:text-8xl lg:text-[9rem] text-text leading-none tracking-wide">
            {{ getActiveCopy().sectionTitle }}
          </h2>
        </div>
        <a
          href="https://github.com/fatidaprilian?tab=repositories"
          target="_blank"
          rel="noreferrer"
          class="flex-shrink-0 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-text transition underline-link pb-2"
        >
          {{ getActiveCopy().browseAll }}
          <ArrowUpRight class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>

    <!-- Featured project — OVERSIZED full-width card -->
    <div
      v-if="getFeaturedProject()"
      class="border-b border-[#d7c2a8]/60 group"
      data-reveal
    >
      <div class="section-shell">
        <div class="grid lg:grid-cols-12 gap-0 py-10 md:py-14">
          <!-- Number + meta left side -->
          <div class="lg:col-span-1 mb-4 lg:mb-0">
            <span class="font-display text-5xl text-[#c0a08a]">01</span>
          </div>

          <!-- Title block -->
          <div class="lg:col-span-6 lg:pr-10">
            <div class="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
              <span class="inline-block text-[0.55rem] md:text-[0.6rem] tracking-[0.2em] uppercase border border-[#b98a69] bg-[#f5e4d1] text-[#6f4933] rounded-full px-2.5 py-1 mt-1">{{ getActiveCopy().featuredLabel }}</span>
              <span class="text-[0.65rem] md:text-xs text-muted mt-1.5">{{ getFeaturedProject().year }}</span>
            </div>
            <h3 class="font-display text-4xl md:text-6xl lg:text-7xl text-text tracking-wide leading-[0.9] break-words group-hover:text-[#5a3e2f] transition-colors duration-500">
              {{ getFeaturedProject().title }}
            </h3>
            <p class="mt-4 md:mt-5 text-[#5f4a3d] text-sm md:text-base leading-relaxed max-w-xl">{{ getFeaturedProject().summary }}</p>
          </div>

          <!-- Right: details + CTA -->
          <div class="lg:col-span-5 lg:pl-10 lg:border-l border-[#d7c2a8]/60 flex flex-col justify-between mt-8 lg:mt-0 gap-8">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-muted mb-3">{{ getActiveCopy().tagsLabel }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in getFeaturedProject().tags"
                  :key="tag"
                  class="rounded-lg border border-[#be9f84] px-3 py-1.5 text-xs font-medium text-[#553b2e] bg-[#f0ddc8]/70"
                >
                  {{ tag }}
                </span>
              </div>
              <div class="mt-6 space-y-2">
                <div
                  v-for="keyPoint in getFeaturedProject().keyPoints"
                  :key="keyPoint"
                  class="text-sm text-[#4e372c] flex items-start gap-2"
                >
                  <span class="mt-1.5 h-1 w-3 bg-accent/60 flex-shrink-0 rounded-full"></span>
                  <span>{{ keyPoint }}</span>
                </div>
              </div>
            </div>
            <a
              :href="getFeaturedProject().link"
              target="_blank"
              rel="noreferrer"
              class="self-start inline-flex items-center gap-2 text-sm font-semibold text-[#6f4930] hover:text-[#3f2310] transition border-b border-[#a56a43]/50 pb-0.5 hover:border-[#3f2310] underline-link"
            >
              {{ getActiveCopy().openRepository }}
              <ArrowUpRight class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Standard projects — horizontal strips -->
    <div class="border-b border-[#d7c2a8]/60">
      <div class="section-shell">
        <a
          v-for="(project, index) in getStandardProjects()"
          :key="project.title"
          :href="project.link"
          target="_blank"
          rel="noreferrer"
          class="group flex items-start lg:items-center gap-4 lg:gap-6 py-7 md:py-8 border-b border-[#d7c2a8]/50 last:border-b-0 transition-all duration-500 hover:bg-[#f5e5d2]/50 -mx-5 md:-mx-8 lg:-mx-10 px-5 md:px-8 lg:px-10"
          data-reveal
          :style="{ '--reveal-delay': `${index * 60}ms` }"
        >
          <!-- Index number -->
          <span class="font-display text-3xl md:text-4xl text-[#c0a08a] w-12 flex-shrink-0 leading-none">
            {{ String(index + 2).padStart(2, '0') }}
          </span>

          <!-- Title — most prominent -->
          <div class="flex-1 min-w-0 pb-1">
            <h3 class="font-display text-xl md:text-3xl lg:text-4xl text-text tracking-wide leading-tight group-hover:text-[#5a3e2f] transition-colors duration-500 break-words">
              {{ project.title }}
            </h3>
            <p class="text-xs md:text-sm text-muted mt-0.5 md:mt-1 truncate">{{ project.summary }}</p>
          </div>

          <!-- Tags — hidden on small, shown on md -->
          <div class="hidden md:flex flex-wrap gap-1.5 max-w-[220px] justify-end flex-shrink-0">
            <span
              v-for="tag in project.tags.slice(0, 3)"
              :key="tag"
              class="text-[0.6rem] uppercase tracking-[0.1em] text-[#5a3e30] border border-[#ccb298]/60 rounded px-2 py-1 bg-transparent"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Year + arrow -->
          <div class="flex-shrink-0 flex items-center gap-3 text-muted text-sm">
            <span class="hidden lg:block">{{ project.year }}</span>
            <ArrowUpRight class="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
