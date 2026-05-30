<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  c: { type: Object, required: true },
  profile: { type: Object, required: true }
})

// Flatten all skill items from nested groups into a single cohesive list for neat layout wrap
const allSkills = computed(() => {
  if (!props.profile || !props.profile.skillGroups) return []
  return props.profile.skillGroups.flatMap(group => group.items)
})

let scrollTriggerInstance = null

const initSkillsReveal = () => {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReduced) return

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: '#skills',
    start: 'top 85%',
    onEnter: () => {
      gsap.from('#skills .skill-capsule', {
        y: 24,
        opacity: 0,
        scale: 0.9,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.03
      })
    },
    once: true
  })
}

onMounted(() => {
  setTimeout(() => {
    initSkillsReveal()
  }, 150)
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
})
</script>

<template>
  <section id="skills" class="section-container" aria-labelledby="skills-heading">
    <div class="section-header">
      <span class="section-kicker">{{ c.skillsMeta }}</span>
      <h2 id="skills-heading" class="section-title">{{ c.skillsTitle }}</h2>
    </div>

    <!-- Flattened wrapping tag matrix cloud for perfect grid alignment -->
    <div class="skills-matrix flex flex-wrap gap-3 justify-center max-w-4xl mx-auto mt-8">
      <span 
        v-for="skill in allSkills" 
        :key="skill" 
        class="skill-capsule block"
      >
        {{ skill }}
      </span>
    </div>
  </section>
</template>
