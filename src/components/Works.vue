<script setup>
import { ArrowUpRight } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true },
  projects: { type: Array, required: true }
})

const emit = defineEmits(['selectProject'])
</script>

<template>
  <section id="works" class="section-container" aria-labelledby="works-heading">
    <div class="section-header">
      <span class="section-kicker">{{ c.worksMeta }}</span>
      <h2 id="works-heading" class="section-title">{{ c.worksTitle }}</h2>
    </div>

    <div class="works-matrix">
      <div
        v-for="(project, index) in projects"
        :key="project.title"
        class="glass-panel work-card"
        @click="emit('selectProject', project)"
        role="button"
        tabindex="0"
        @keydown.enter="emit('selectProject', project)"
        :aria-label="`View details for ${project.title}`"
      >
        <div class="work-card-head">
          <span class="work-card-index">0{{ index + 1 }}</span>
          <span class="work-card-year">{{ project.year }}</span>
        </div>

        <h3>{{ project.title }}</h3>
        <p>{{ project.summary }}</p>

        <div class="work-card-footer">
          <span>{{ project.role }}</span>
          <span class="work-card-action">
            {{ c.ctaDetails }}
            <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
