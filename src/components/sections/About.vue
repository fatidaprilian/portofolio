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

      <div class="lg:col-span-5 flex flex-col gap-6 w-full mt-8 lg:mt-0">
        <blockquote class="border-l-2 border-[var(--accent-blue)] pl-6 text-xl italic leading-relaxed text-[var(--ink-primary)]">
          {{ c.aboutPullQuote }}
        </blockquote>
        
        <!-- Engineering Principles Matrix Card -->
        <div class="spotlight-card p-6 flex flex-col gap-5">
          <div class="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
            <span class="font-mono text-xs font-semibold text-[var(--ink-primary)] uppercase tracking-wider">
              {{ c.principlesLabel || 'Engineering Principles' }}
            </span>
            <span class="font-mono text-[10px] text-[var(--accent-blue)] bg-[var(--surface-canvas)] border border-[var(--hairline)] px-2 py-0.5 rounded">
              CORE PHILOSOPHY
            </span>
          </div>
          
          <div class="flex flex-col gap-4">
            <div
              v-for="item in c.principles"
              :key="item.tag"
              class="flex flex-col gap-1 pb-3 border-b border-[var(--hairline)]/60 last:border-b-0 last:pb-0"
            >
              <div class="flex items-center gap-2">
                <span class="font-mono text-[10px] font-bold text-[var(--accent-blue)]">{{ item.tag }}</span>
                <h3 class="text-sm font-bold text-[var(--ink-primary)] tracking-tight">{{ item.title }}</h3>
              </div>
              <p class="text-xs text-[var(--ink-muted)] leading-relaxed pl-4">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
