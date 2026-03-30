<script setup>
import { computed } from 'vue'
import { getSkillsByLanguage } from '../data/skills'

const props = defineProps({
  language: {
    type: String,
    default: 'id'
  }
})

const skillsList = computed(() => getSkillsByLanguage(props.language))
</script>

<template>
  <section id="skills" class="relative py-16 md:py-24 bg-gradient-to-b from-[#faf7f2] to-[#f5ede3]">
    <div class="section-shell">
      <!-- Section Header -->
      <div class="text-center mb-14 md:mb-20" data-reveal-fade>
        <p class="text-xs md:text-sm font-semibold uppercase tracking-[0.12em] text-[#8b7355] mb-3">
          {{ language === 'id' ? 'Kompetensi' : 'Expertise' }}
        </p>
        <h2 class="font-display text-3xl md:text-4xl lg:text-5xl text-text leading-tight">
          {{ language === 'id' ? 'What I do best' : 'What I do best' }}
        </h2>
      </div>

      <!-- Skills Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="(skill, index) in skillsList"
          :key="skill.id"
          class="group p-6 md:p-8 rounded-xl border border-[#e8dcc8] bg-white/60 backdrop-blur-sm hover:bg-white hover:border-[#d4baa0] hover:shadow-[0_12px_32px_-8px_rgba(88,56,41,0.15)] transition-all duration-300 ease-out"
          data-reveal-fade
          :style="{ '--reveal-delay': `${80 + index * 40}ms` }"
        >
          <!-- Badge: Skill Category -->
          <div class="inline-block mb-4">
            <span class="text-xs font-bold uppercase tracking-[0.08em] text-[#7d6556] px-3 py-1 bg-[#f0e5d8] rounded-full">
              {{ skill.category }}
            </span>
          </div>

          <!-- Title -->
          <h3 class="font-display text-lg md:text-xl text-text mb-3 group-hover:text-accent transition-colors">
            {{ skill.title }}
          </h3>

          <!-- Description -->
          <p class="text-sm md:text-base text-[#6b5344] mb-5 leading-relaxed">
            {{ skill.description }}
          </p>

          <!-- Tech Tags -->
          <div class="flex flex-wrap gap-2 pt-3 border-t border-[#e8dcc8]">
            <span
              v-for="tag in skill.tags"
              :key="tag"
              class="inline-block px-2.5 py-1 text-xs font-medium text-[#7d6556] bg-[#faf7f2] group-hover:bg-[#ecd8c0] transition-colors"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
