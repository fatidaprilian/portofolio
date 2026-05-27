<script setup>
import { ArrowDown } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true }
})

const emit = defineEmits(['goToSection'])
</script>

<template>
  <section id="home" class="section-container" aria-labelledby="home-heading">
    <div class="glass-panel hero-panel">
      <div>
        <span class="section-kicker">{{ c.eyebrow }}</span>
        <h1 id="home-heading" class="hero-headline">
          <template v-for="(part, i) in c.coverHeadline" :key="i">
            <em v-if="typeof part === 'object'">{{ part.italic }}</em>
            <span v-else>{{ part }}</span>
          </template>
        </h1>
        <p class="hero-desc">{{ c.coverBody }}</p>
        <div class="hero-actions">
          <button type="button" class="btn-premium" @click="emit('goToSection', 'works')">
            {{ c.ctaView }}
            <ArrowDown class="w-4 h-4" aria-hidden="true" />
          </button>
          <button type="button" class="btn-secondary" @click="emit('goToSection', 'contact')">
            {{ c.ctaContact }}
          </button>
        </div>
      </div>

      <div class="portrait-wrapper">
        <div class="target-circle"></div>
        <div class="target-lines" aria-hidden="true"></div>
        <div class="portrait-container">
          <img src="/avatar-github.jpg" alt="Farid Eka Aprilian UI/UX designer portrait" decoding="async" fetchpriority="high" />
        </div>
      </div>
    </div>
  </section>
</template>
