<script setup>
import { Download } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true }
})
</script>

<template>
  <section id="about" class="section-container" aria-labelledby="about-heading">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
      
      <div class="lg:col-span-7 flex flex-col gap-8">
        <div>
          <span class="pill-tag">{{ c.aboutLabel }}</span>
        </div>
        
        <h2 id="about-heading" class="display-section">
          {{ c.aboutTitle }}
        </h2>
        
        <div class="flex flex-col gap-6 text-[var(--ink-muted)] text-lg leading-relaxed">
          <p>{{ c.aboutBodyP1 }}</p>
          <p>{{ c.aboutBodyP2 }}</p>
        </div>
        
        <div class="mt-4">
          <a href="/cv.pdf" download="Farid_Eka_Aprilian_CV.pdf" class="btn-primary inline-flex">
            {{ c.ctaDownloadCv }}
            <Download class="w-4 h-4 ml-2" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div class="lg:col-span-5 flex flex-col gap-8 w-full mt-8 lg:mt-0">
        <blockquote class="border-l-2 border-[var(--accent-blue)] pl-6 text-xl italic leading-relaxed text-[var(--ink-primary)] font-[var(--font-comment)]">
          {{ c.aboutPullQuote }}
        </blockquote>
        
        <div class="surface-card mt-4 flex flex-col gap-6">
          <span class="font-mono text-[10px] text-[var(--ink-muted)] tracking-widest uppercase">Typography Scale</span>
          
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-baseline border-b border-[var(--hairline)] pb-3">
              <span class="font-mono text-xs text-[var(--ink-muted)]">Inter Display</span>
              <span class="font-medium text-xl leading-none tracking-tight text-[var(--ink-primary)]">Aa Bb 123</span>
            </div>
            <div class="flex justify-between items-baseline border-b border-[var(--hairline)] pb-3">
              <span class="font-mono text-xs text-[var(--ink-muted)]">Inter Variable</span>
              <span class="text-base leading-none text-[var(--ink-primary)]">Aa Bb 123</span>
            </div>
            <div class="flex justify-between items-baseline pb-1">
              <span class="font-mono text-xs text-[var(--ink-muted)]">JetBrains Mono</span>
              <span class="font-mono text-sm leading-none text-[var(--ink-primary)]">Aa Bb 123</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
