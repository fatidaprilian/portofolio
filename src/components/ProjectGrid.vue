<script setup>
import { getProjectsByLanguage } from '../data/projects'
import { ArrowUpRight } from 'lucide-vue-next'
import TiltCard from './TiltCard.vue'

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
    featuredLabel: 'Unggulan',
    contextLabel: 'Konteks Produk',
    impactLabel: 'Target Dampak'
  },
  en: {
    sectionLabel: '/ Selected Work',
    sectionTitle: 'Projects',
    openRepository: 'Explore',
    browseAll: 'All on GitHub',
    tagsLabel: 'Stack',
    featuredLabel: 'Featured',
    contextLabel: 'Product Context',
    impactLabel: 'Impact Targets'
  }
}

const getActiveCopy = () => copyByLanguage[props.language] ?? copyByLanguage.id
const getAllProjects = () => getProjectsByLanguage(props.language)
const getFeaturedProject = () => getAllProjects().find((p) => p.type === 'featured')
const getStandardProjects = () => getAllProjects().filter((p) => p.type !== 'featured')

const previewThemeByAccent = {
  copper: {
    shellClassName: 'from-[#3f271c] via-[#5a3828] to-[#8b5b3f]',
    lineClassName: 'bg-[#f4d4ba]/50',
    chipClassName: 'bg-[#f6ddc8]/20 text-[#f6e8dc]'
  },
  bark: {
    shellClassName: 'from-[#1f222a] via-[#2f3646] to-[#4a5264]',
    lineClassName: 'bg-[#cad2e8]/45',
    chipClassName: 'bg-[#d8def0]/16 text-[#ebeffa]'
  },
  clay: {
    shellClassName: 'from-[#30231f] via-[#4a3128] to-[#76473b]',
    lineClassName: 'bg-[#f0cec0]/45',
    chipClassName: 'bg-[#f7d7c9]/16 text-[#f5e7df]'
  }
}

const getPreviewTheme = (accentLabel) => previewThemeByAccent[accentLabel] ?? previewThemeByAccent.copper
</script>

<template>
  <section id="work" class="pb-0">
    <!-- Section header -->
    <div class="section-shell pt-20 md:pt-28 pb-10 md:pb-12" data-reveal>
      <div class="flex items-end justify-between gap-4 md:gap-6 border-b border-[#d7c2a8]/60 pb-6">
        <div>
          <p class="text-[0.6rem] md:text-xs uppercase tracking-[0.26em] text-muted mb-2 md:mb-3">{{ getActiveCopy().sectionLabel }}</p>
          <h2 class="font-display text-4xl sm:text-5xl md:text-8xl lg:text-[9rem] text-text leading-none tracking-wide">
            {{ getActiveCopy().sectionTitle }}
          </h2>
        </div>
        <a
          href="https://github.com/fatidaprilian?tab=repositories"
          target="_blank"
          rel="noreferrer"
          class="flex-shrink-0 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted hover:text-text transition underline-link pb-2"
        >
          {{ getActiveCopy().browseAll }}
          <ArrowUpRight class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>

    <!-- Featured project — visual-first full-width card -->
    <div
      v-if="getFeaturedProject()"
      class="border-b border-[#d7c2a8]/60 group"
      data-reveal
    >
      <div class="section-shell">
        <TiltCard>
          <div class="grid lg:grid-cols-12 gap-8 lg:gap-10 py-10 md:py-14 items-start">
          <div class="lg:col-span-5 xl:col-span-4">
            <div
              class="relative overflow-hidden rounded-2xl border border-white/10 min-h-[220px] sm:min-h-[280px] md:min-h-[320px] p-4 sm:p-5 md:p-6 bg-gradient-to-br shadow-[0_24px_44px_-30px_rgba(40,22,12,0.85)]"
              :class="getPreviewTheme(getFeaturedProject().accent).shellClassName"
            >
              <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.42),transparent_38%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.22),transparent_45%)]"></div>
              <div class="relative z-10 h-full flex flex-col justify-between">
                <p class="text-[0.62rem] uppercase tracking-[0.18em] text-white/75">{{ getFeaturedProject().preview.eyebrow }}</p>
                <div class="space-y-3">
                  <p class="text-[#faeee4] font-semibold leading-relaxed text-xs sm:text-sm md:text-base max-w-[26ch]">{{ getFeaturedProject().preview.headline }}</p>
                  <div class="space-y-2.5">
                    <span class="block h-1.5 rounded-full" :class="getPreviewTheme(getFeaturedProject().accent).lineClassName"></span>
                    <span class="block h-1.5 rounded-full w-[78%]" :class="getPreviewTheme(getFeaturedProject().accent).lineClassName"></span>
                    <span class="block h-1.5 rounded-full w-[52%]" :class="getPreviewTheme(getFeaturedProject().accent).lineClassName"></span>
                  </div>
                </div>
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.62rem] uppercase tracking-[0.14em] w-fit" :class="getPreviewTheme(getFeaturedProject().accent).chipClassName">
                  {{ getFeaturedProject().role }}
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7 xl:col-span-8 space-y-7">
            <div>
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1 md:gap-4 mb-3 md:mb-4">
                <span class="font-display text-4xl sm:text-5xl text-[#c0a08a] leading-none">01</span>
                <span class="inline-block text-[0.52rem] sm:text-[0.55rem] md:text-[0.6rem] tracking-[0.2em] uppercase border border-[#b98a69] bg-[#f5e4d1] text-[#6f4933] rounded-full px-2.5 py-1">{{ getActiveCopy().featuredLabel }}</span>
                <span class="text-[0.62rem] sm:text-[0.65rem] md:text-xs text-muted">{{ getFeaturedProject().year }}</span>
              </div>
              <h3 class="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-text tracking-wide leading-[0.9] break-words group-hover:text-[#5a3e2f] transition-colors duration-500">
                {{ getFeaturedProject().title }}
              </h3>
              <p class="mt-4 md:mt-5 text-[#5f4a3d] text-sm md:text-base leading-relaxed max-w-2xl">{{ getFeaturedProject().summary }}</p>
              <div v-if="getFeaturedProject().productContext" class="mt-5 rounded-xl border border-[#d7c2a8]/70 bg-[#f8eddf]/72 p-4 md:p-5">
                <p class="text-[0.62rem] uppercase tracking-[0.2em] text-muted mb-2">{{ getActiveCopy().contextLabel }}</p>
                <p class="text-sm md:text-[0.95rem] text-[#553f32] leading-relaxed">{{ getFeaturedProject().productContext }}</p>
              </div>
            </div>

            <div class="rounded-2xl border border-[#d7c2a8]/65 bg-[#f4e4d2]/40 p-5 md:p-6">
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
              <div v-if="getFeaturedProject().impactMetrics.length" class="mt-6">
                <p class="text-[0.62rem] uppercase tracking-[0.2em] text-muted mb-2.5">{{ getActiveCopy().impactLabel }}</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="metricItem in getFeaturedProject().impactMetrics"
                    :key="metricItem"
                    class="rounded-full border border-[#b99375]/65 bg-[#f7eadb] px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.02em] text-[#644537]"
                  >
                    {{ metricItem }}
                  </span>
                </div>
              </div>
              <a
                :href="getFeaturedProject().link"
                target="_blank"
                rel="noreferrer"
                class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6f4930] hover:text-[#3f2310] transition border-b border-[#a56a43]/50 pb-0.5 hover:border-[#3f2310] underline-link"
              >
                {{ getActiveCopy().openRepository }}
                <ArrowUpRight class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        </TiltCard>
      </div>
    </div>

    <!-- Standard projects — visual strips -->
    <div class="border-b border-[#d7c2a8]/60">
      <div class="section-shell">
        <div
          v-for="(project, index) in getStandardProjects()"
          :key="project.title"
          data-reveal
          :style="{ '--reveal-delay': `${index * 60}ms` }"
        >
          <TiltCard>
            <a
              :href="project.link"
              target="_blank"
              rel="noreferrer"
              class="group flex items-start lg:items-center gap-4 lg:gap-6 py-7 md:py-8 border-b border-[#d7c2a8]/50 last:border-b-0 transition-all duration-500 hover:bg-[#f5e5d2]/50 -mx-5 md:-mx-8 lg:-mx-10 px-5 md:px-8 lg:px-10"
            >
          <div
            class="hidden sm:flex w-24 md:w-28 lg:w-32 min-h-16 md:min-h-20 rounded-xl border border-white/10 bg-gradient-to-br p-3 flex-col justify-between shadow-[0_16px_30px_-20px_rgba(30,17,12,0.8)]"
            :class="getPreviewTheme(project.accent).shellClassName"
          >
            <span class="text-[0.55rem] uppercase tracking-[0.16em] text-[#f5e8df]">Preview</span>
            <span class="h-1.5 rounded-full" :class="getPreviewTheme(project.accent).lineClassName"></span>
          </div>

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
          </TiltCard>
        </div>
      </div>
    </div>
  </section>
</template>
