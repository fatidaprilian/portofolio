<script setup>
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps({
  c: { type: Object, required: true },
  profile: { type: Object, required: true }
})

let scrollTriggerInstance = null

const initExperienceReveal = () => {
  // GSAP animation removed to guarantee visibility.
}

onMounted(() => {
  // No-op
})

onUnmounted(() => {
  // No-op
})
</script>

<template>
  <section id="experience" class="section-container" aria-labelledby="experience-heading">
    <div class="mb-12">
      <span class="pill-tag inline-block mb-4">{{ c.experienceMeta }}</span>
      <h2 id="experience-heading" class="display-section">{{ c.experienceTitle }}</h2>
    </div>

    <div class="flex flex-col border-t border-[var(--hairline)]" role="list">
      <div
        v-for="item in profile.timelineItems"
        :key="`${item.period}-${item.title}`"
        class="list-row group hover:bg-[var(--surface-1)] transition-colors duration-300 p-4 md:p-6 -mx-4 md:-mx-6 rounded-xl cursor-default"
        role="listitem"
      >
        <div class="flex flex-col gap-1">
          <h3 class="text-xl md:text-2xl font-bold text-[var(--ink-primary)] tracking-tight">{{ item.title }}</h3>
          <span class="text-[var(--ink-muted)] text-sm md:text-base">{{ item.role }}</span>
          <p class="text-[var(--ink-muted)] mt-2 max-w-2xl leading-relaxed">{{ item.description }}</p>
        </div>
        
        <div class="self-start md:self-center shrink-0">
          <span class="font-mono text-sm text-[var(--ink-muted)]">{{ item.period }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
