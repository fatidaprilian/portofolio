<script setup>
const props = defineProps({
  language: {
    type: String,
    default: 'id'
  }
})

const copyByLanguage = {
  id: {
    sectionLabel: '/ Layanan',
    sectionTitle: 'Yang\nSaya\nKerjakan',
    disciplinesCount: 'bidang keahlian',
    capabilityItems: [
      {
        number: '01',
        microLabel: 'Terbaik',
        title: 'Web Engineering',
        description: 'Membangun website production-ready yang cepat, responsif, dan mudah dikembangkan untuk iterasi bisnis berikutnya.',
        toolHighlights: ['Vue', 'Vite', 'Tailwind', 'TypeScript', 'Node.js']
      },
      {
        number: '02',
        microLabel: 'MVP ke Market',
        title: 'Product System Design',
        description: 'Mendesain fondasi produk dari alur user, struktur informasi, sampai prioritas fitur agar roadmap lebih jelas.',
        toolHighlights: ['Figma mindset', 'Feature mapping', 'MVP scope', 'Flow architecture']
      },
      {
        number: '03',
        microLabel: 'User Focused',
        title: 'UI/UX Structure',
        description: 'Merancang pengalaman yang jelas dan mudah digunakan dengan komponen reusable dan hierarki visual yang konsisten.',
        toolHighlights: ['Design consistency', 'Usability', 'Component logic', 'Interaction states']
      },
      {
        number: '04',
        microLabel: 'Berbasis Data',
        title: 'Backend Maintainability',
        description: 'Menyusun backend dengan service boundary yang rapi agar logic bisnis terjaga, testing lebih mudah, dan scaling lebih aman.',
        toolHighlights: ['Laravel', 'Express', 'Domain boundaries', 'Validation-first']
      }
    ]
  },
  en: {
    sectionLabel: '/ Services',
    sectionTitle: 'What\nI Do\nBest',
    disciplinesCount: 'disciplines',
    capabilityItems: [
      {
        number: '01',
        microLabel: 'Top Performing',
        title: 'Web Engineering',
        description: 'Building production-ready websites that are fast, responsive, and easy to evolve for future business iterations.',
        toolHighlights: ['Vue', 'Vite', 'Tailwind', 'TypeScript', 'Node.js']
      },
      {
        number: '02',
        microLabel: 'MVP Go-to-market',
        title: 'Product System Design',
        description: 'Designing product foundations from user flow and information structure to feature priorities for a clearer roadmap.',
        toolHighlights: ['Figma mindset', 'Feature mapping', 'MVP scope', 'Flow architecture']
      },
      {
        number: '03',
        microLabel: 'User Focused',
        title: 'UI/UX Structure',
        description: 'Crafting clear and usable experiences with reusable components and consistent visual hierarchy.',
        toolHighlights: ['Design consistency', 'Usability', 'Component logic', 'Interaction states']
      },
      {
        number: '04',
        microLabel: 'Data Backed',
        title: 'Backend Maintainability',
        description: 'Structuring backend services with clear boundaries so business logic stays stable, testable, and safer to scale.',
        toolHighlights: ['Laravel', 'Express', 'Domain boundaries', 'Validation-first']
      }
    ]
  }
}

const getActiveCopy = () => copyByLanguage[props.language] ?? copyByLanguage.id
</script>

<template>
  <section id="skills" class="relative">
    <div class="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">

      <!-- Desktop: sticky left + scrolling right split -->
      <div class="hidden lg:flex gap-0">

        <!-- LEFT: sticky title column -->
        <div class="w-[38%] flex-shrink-0 pr-12">
          <div class="sticky top-0 h-screen flex flex-col justify-center">
            <p class="text-xs uppercase tracking-[0.26em] text-muted mb-6">{{ getActiveCopy().sectionLabel }}</p>
            <h2 class="font-display text-[7.5rem] xl:text-[9rem] leading-[0.86] tracking-wide text-text whitespace-pre-line">
              {{ getActiveCopy().sectionTitle }}
            </h2>
            <!-- Decorative accent line -->
            <div class="mt-10 h-px w-16 bg-accent opacity-60"></div>
            <p class="mt-4 text-xs text-muted uppercase tracking-[0.2em]">{{ getActiveCopy().capabilityItems.length }} {{ getActiveCopy().disciplinesCount }}</p>
          </div>
        </div>

        <!-- RIGHT: scrollable capability rows -->
        <div class="flex-1 border-l border-[#d7c2a8]/50 pt-32 pb-32">
          <div
            v-for="(capability, index) in getActiveCopy().capabilityItems"
            :key="capability.number"
            class="group border-b border-[#d7c2a8]/50 pl-10 py-12 hover:bg-[#f5e9d8]/50 transition-colors duration-500"
          >
            <!-- Number + micro label row -->
            <div class="flex items-center gap-4 mb-5">
              <span class="font-display text-5xl text-[#a56a43] leading-none">{{ capability.number }}</span>
              <span class="text-[0.6rem] tracking-[0.2em] uppercase text-muted border border-[#c9a98d]/50 rounded-full px-3 py-1">{{ capability.microLabel }}</span>
            </div>

            <!-- Title -->
            <h3 class="font-display text-4xl xl:text-5xl text-text tracking-wide leading-none mb-5 group-hover:translate-x-1 transition-transform duration-500">
              {{ capability.title }}
            </h3>

            <!-- Description -->
            <p class="text-[#5b4639] leading-relaxed max-w-lg mb-7">{{ capability.description }}</p>

            <!-- Tool tags -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="toolLabel in capability.toolHighlights"
                :key="`${capability.number}-${toolLabel}`"
                class="text-xs text-[#654d40] border border-[#ccb298]/60 rounded-lg px-3 py-1.5 bg-transparent group-hover:bg-[#f1e4d2]/80 transition-colors duration-500"
              >
                {{ toolLabel }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile: stacked layout -->
      <div class="lg:hidden py-16">
        <p class="text-xs uppercase tracking-[0.26em] text-muted mb-4">{{ getActiveCopy().sectionLabel }}</p>
        <h2 class="font-display text-6xl text-text leading-none tracking-wide mb-12">
          {{ getActiveCopy().sectionTitle.replace(/\n/g, ' ') }}
        </h2>
        <div class="space-y-0 border-t border-[#d7c2a8]/50">
          <div
            v-for="capability in getActiveCopy().capabilityItems"
            :key="capability.number"
            class="border-b border-[#d7c2a8]/50 py-8"
          >
            <div class="flex items-center gap-3 mb-3">
              <span class="font-display text-3xl text-[#a56a43]">{{ capability.number }}</span>
              <span class="text-[0.6rem] tracking-[0.18em] uppercase text-muted border border-[#c9a98d]/50 rounded-full px-2.5 py-1">{{ capability.microLabel }}</span>
            </div>
            <h3 class="font-display text-3xl text-text tracking-wide leading-none mb-3">{{ capability.title }}</h3>
            <p class="text-sm text-[#5b4639] leading-relaxed mb-4">{{ capability.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in capability.toolHighlights" :key="tag" class="text-xs text-[#654d40] border border-[#ccb298]/60 rounded-lg px-2.5 py-1">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
