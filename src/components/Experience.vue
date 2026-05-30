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
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReduced) return

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: '#experience',
    start: 'top 85%',
    onEnter: () => {
      gsap.from('#experience .timeline-item', {
        x: -32,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.16
      })
    },
    once: true
  })
}

onMounted(() => {
  setTimeout(() => {
    initExperienceReveal()
  }, 150)
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
})
</script>

<template>
  <section id="experience" class="section-container" aria-labelledby="experience-heading">
    <div class="section-header">
      <span class="section-kicker">{{ c.experienceMeta }}</span>
      <h2 id="experience-heading" class="section-title">{{ c.experienceTitle }}</h2>
    </div>

    <div class="experience-timeline" role="list">
      <div
        v-for="item in profile.timelineItems"
        :key="`${item.period}-${item.title}`"
        class="timeline-item"
        role="listitem"
      >
        <div class="timeline-dot">
          <div class="timeline-pulse"></div>
        </div>
        
        <div class="glass-panel timeline-card w-full">
          <div class="timeline-header">
            <h3 class="timeline-role">{{ item.title }}</h3>
            <span class="timeline-period">{{ item.period }}</span>
          </div>
          <span class="timeline-institution">{{ item.role }}</span>
          <p class="timeline-desc">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
