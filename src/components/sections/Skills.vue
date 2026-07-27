<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  c: { type: Object, required: true },
  profile: { type: Object, required: true }
})

const allSkills = computed(() => {
  if (!props.profile || !props.profile.skillGroups) return []
  return props.profile.skillGroups.flatMap(group => group.items)
})

let scrollTriggerInstance = null

const initSkillsReveal = () => {
  // GSAP animation removed to guarantee visibility of the skills section.
}

onMounted(() => {
  // No-op
})

onUnmounted(() => {
  // No-op
})
</script>

<template>
  <section id="skills" class="section-container text-center" aria-labelledby="skills-heading">
    <div class="mb-12">
      <span class="pill-tag inline-block mb-4">{{ c.skillsMeta }}</span>
      <h2 id="skills-heading" class="display-section">{{ c.skillsTitle }}</h2>
    </div>

    <div class="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
      <span 
        v-for="skill in allSkills" 
        :key="skill" 
        class="pill-tag text-sm md:text-base px-4 md:px-5 py-2 block hover:bg-[var(--surface-2)] transition-colors duration-300 cursor-default"
      >
        {{ skill }}
      </span>
    </div>
  </section>
</template>
