<script setup>
import { Download, User, MapPin, GraduationCap, Code2, Heart } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true }
})
</script>

<template>
  <section id="about" class="section-container" aria-labelledby="about-heading">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      <!-- Left Narrative Column -->
      <div class="lg:col-span-7 flex flex-col gap-6">
        <div>
          <span class="comic-chapter-badge bg-[var(--brand-sun)] text-slate-950">
            <User class="w-3.5 h-3.5 text-slate-950" />
            {{ c.aboutLabel }}
          </span>
        </div>
        
        <h2 id="about-heading" class="display-section">
          {{ c.aboutTitle }}
        </h2>
        
        <div class="flex flex-col gap-5 text-[var(--ink-muted)] text-base sm:text-lg leading-relaxed">
          <p>{{ c.aboutBodyP1 }}</p>
          <p>{{ c.aboutBodyP2 }}</p>
        </div>
        
        <div class="pt-2">
          <a href="/cv.pdf" download="Farid_Eka_Aprilian_CV.pdf" class="btn-comic-primary inline-flex">
            <span>{{ c.ctaDownloadCv }}</span>
            <Download class="w-4 h-4 ml-1.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <!-- Right Column: Speech Bubble Quote & Quick Highlights Card -->
      <div class="lg:col-span-5 flex flex-col gap-6 w-full mt-4 lg:mt-0">
        
        <!-- Speech Bubble Quote (Warm & Personal) -->
        <div class="speech-bubble bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] p-6 shadow-comic">
          <p class="font-editorial text-lg md:text-xl italic leading-relaxed text-[var(--ink-primary)]">
            {{ c.aboutPullQuote }}
          </p>
          <div class="mt-3 flex items-center justify-end gap-2 font-mono text-xs text-[var(--brand-coral)] font-bold">
            <span>— Farid Eka Aprilian</span>
          </div>
        </div>
        
        <!-- Quick Highlights Card (Clean, Normie, Friendly) -->
        <div class="comic-panel p-6 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] shadow-comic flex flex-col gap-4">
          <div class="flex items-center justify-between border-b border-[var(--comic-border)]/20 pb-3">
            <h3 class="font-black text-sm text-[var(--ink-primary)]">
              {{ c.highlightsTitle || 'Sekilas Tentang Saya' }}
            </h3>
            <span class="font-mono text-[10px] font-bold text-slate-950 bg-[var(--brand-mint)] border border-[var(--comic-border)] px-2 py-0.5 rounded shadow-[1px_1px_0px_var(--comic-border)]">
              PROFIL
            </span>
          </div>
          
          <div class="flex flex-col gap-3">
            <div
              v-for="item in c.highlights"
              :key="item.label"
              class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-[var(--surface-subtle)] last:border-b-0 last:pb-0"
            >
              <span class="font-mono text-xs font-bold text-[var(--ink-muted)] shrink-0">
                {{ item.label }}
              </span>
              <span class="text-xs sm:text-sm font-semibold text-[var(--ink-primary)] sm:text-right">
                {{ item.value }}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
