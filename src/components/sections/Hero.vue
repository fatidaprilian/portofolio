<script setup>
import { ArrowDown } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true }
})

const emit = defineEmits(['goToSection'])
</script>

<template>
  <section id="home" class="relative flex items-center min-h-screen overflow-hidden bg-[var(--surface-canvas)]" aria-labelledby="home-heading">
    
    <!-- Massive Background Typography (Sohub / Framer Style) -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
      <h1 class="text-[clamp(8rem,25vw,30rem)] font-bold tracking-tighter leading-none text-[var(--ink-primary)] opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap">
        FARID
      </h1>
    </div>

    <!-- Content Overlay Container -->
    <div class="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-end h-full min-h-screen pb-20 pt-[22vh] md:pb-32 pointer-events-none">
      
      <!-- Single Column Editorial Hero Block -->
      <div class="max-w-3xl pointer-events-auto">
        
        <!-- Hardware Radar Status Beacon (Clean, No AI Emojis) -->
        <div class="kicker-pill mb-8 inline-flex items-center gap-3">
          <span class="radar-beacon" aria-hidden="true">
            <span class="radar-beacon-ring"></span>
            <span class="radar-beacon-dot"></span>
          </span>
          <span class="font-mono text-xs tracking-wider text-[var(--ink-primary)] font-semibold">
            {{ c.availabilityStatus || 'STATUS // OPEN FOR HIGH-IMPACT INITIATIVES' }}
          </span>
        </div>

        <!-- Profile Avatar with subtle border ring -->
        <div class="mb-6 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[var(--surface-canvas)] shadow-xl ring-1 ring-[var(--hairline)]">
          <img src="/avatar-github.jpg" alt="Farid Eka Aprilian" class="w-full h-full object-cover" />
        </div>

        <!-- Headline Typography with mask-reveal -->
        <h2 id="home-heading" class="text-[clamp(2.5rem,5.5vw,5rem)] font-bold tracking-tight leading-[1.04] text-[var(--ink-primary)] mb-6">
          <span class="mask-reveal">
            <span class="mask-reveal-child block">{{ c.coverHeadline[0] }}</span>
          </span>
          <span class="mask-reveal">
            <span class="mask-reveal-child block text-[var(--ink-muted)]">{{ c.coverHeadline[1] }}</span>
          </span>
        </h2>
        
        <p class="hero-desc text-[var(--ink-muted)] text-lg md:text-xl font-normal max-w-xl leading-relaxed">
          {{ c.coverBody }}
        </p>
        
        <!-- Action Buttons -->
        <div class="hero-actions flex flex-wrap gap-4 sm:gap-6 mt-10 items-center">
          <button
            type="button"
            class="btn-primary"
            @click="emit('goToSection', 'works')"
          >
            {{ c.ctaView }}
            <ArrowDown class="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            class="btn-secondary"
            @click="emit('goToSection', 'contact')"
          >
            {{ c.ctaContact }}
          </button>
        </div>
      </div>

    </div>
  </section>
</template>
