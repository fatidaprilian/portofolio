<script setup>
import { ArrowDown } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true }
})

const emit = defineEmits(['goToSection'])
</script>

<template>
  <section id="home" class="relative flex items-center min-h-screen overflow-hidden bg-[var(--surface-canvas)]" aria-labelledby="home-heading">
    
    <!-- Massive Background Typography (Sohub Style) -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
      <h1 class="text-[clamp(8rem,25vw,30rem)] font-bold tracking-tighter leading-none text-[var(--ink-primary)] opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap">
        FARID
      </h1>
    </div>

    <!-- Content Overlay (Bottom Left like Sohub) -->
    <div class="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-end h-full pb-20 pt-[25vh] md:pb-32 pointer-events-none">
      
      <!-- Bottom Left Text Block -->
      <div class="max-w-xl pointer-events-auto">
        <!-- Profile Avatar -->
        <div class="mb-6 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[var(--surface-canvas)] shadow-lg ring-1 ring-[var(--hairline)]">
          <img src="/avatar-github.jpg" alt="Farid Eka Aprilian" class="w-full h-full object-cover" />
        </div>

        <h2 id="home-heading" class="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-[var(--ink-primary)] mb-6">
          <span class="mask-reveal">
            <span class="mask-reveal-child block">{{ c.coverHeadline[0] }}</span>
          </span>
          <span class="mask-reveal">
            <span class="mask-reveal-child block text-[var(--ink-muted)]">{{ c.coverHeadline[1] }}</span>
          </span>
        </h2>
        
        <p class="hero-desc text-[var(--ink-muted)] text-lg md:text-xl font-medium max-w-md leading-relaxed">
          {{ c.coverBody }}
        </p>
        
        <div class="hero-actions flex gap-6 mt-10 items-center">
          <button type="button" class="group flex items-center gap-2 text-[var(--ink-primary)] font-bold tracking-wide uppercase text-sm hover:text-[var(--accent-blue)] transition-colors" @click="emit('goToSection', 'works')">
            {{ c.ctaView }}
            <ArrowDown class="w-4 h-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
          </button>
        </div>
      </div>

    </div>
  </section>
</template>
