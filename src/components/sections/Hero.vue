<script setup>
import { ArrowDown, BookOpen, MessageSquare } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true }
})

const emit = defineEmits(['goToSection'])
</script>

<template>
  <section id="home" class="relative min-h-[90svh] flex items-center overflow-hidden pt-12 pb-16 md:py-20" aria-labelledby="home-heading">
    <div class="section-container w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left Column: Story Lead & Comic Headlines -->
        <div class="lg:col-span-7 flex flex-col items-start">
          
          <!-- Webtoon Dialogue Speech Bubble (Availability) -->
          <div class="speech-bubble mb-6 max-w-lg inline-flex items-center gap-3 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] shadow-comic">
            <span class="w-2.5 h-2.5 rounded-full bg-[var(--brand-mint)] border border-[var(--comic-border)] shrink-0 animate-pulse"></span>
            <span class="font-sans text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
              {{ c.availabilityStatus }}
            </span>
          </div>

          <!-- Main Comic Headline with Semicolon -->
          <h1 id="home-heading" class="display-hero mb-4">
            <span>{{ c.coverHeadline[0].replace(';', '') }}</span><span class="text-[var(--brand-coral)] inline-block transform -translate-y-1 font-black">;</span>
            <span class="block text-xl sm:text-2xl md:text-3xl font-bold text-[var(--brand-mint)] mt-1.5 tracking-tight font-sans">
              {{ c.coverHeadline[1] }}
            </span>
          </h1>
          
          <!-- Narrative Lead Paragraph -->
          <p class="hero-desc text-[var(--ink-muted)] text-base sm:text-lg font-normal max-w-xl leading-relaxed mb-8">
            {{ c.coverBody }}
          </p>
          
          <!-- Action Buttons with Soft Comic Shadows -->
          <div class="hero-actions flex flex-wrap gap-4 items-center mb-8">
            <button
              type="button"
              class="btn-comic-primary text-sm sm:text-base py-3 px-6"
              @click="emit('goToSection', 'works')"
            >
              <BookOpen class="w-4 h-4 mr-1" aria-hidden="true" />
              {{ c.ctaView }}
              <ArrowDown class="w-4 h-4 ml-1" aria-hidden="true" />
            </button>

            <button
              type="button"
              class="btn-comic-secondary text-sm sm:text-base py-3 px-6"
              @click="emit('goToSection', 'contact')"
            >
              <MessageSquare class="w-4 h-4 mr-1 text-[var(--brand-coral)]" aria-hidden="true" />
              {{ c.ctaContact }}
            </button>
          </div>

          <!-- Quick Badges Strip (Stickers) -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="comic-tag bg-[var(--surface-panel)] border-[var(--comic-border)] text-[var(--ink-primary)]">
              <span class="w-2 h-2 rounded-full bg-[var(--brand-sun)] mr-1.5 inline-block"></span>
              {{ c.quickStatsGpa || 'GPA 3.98 / 4.00' }}
            </span>
            <span class="comic-tag bg-[var(--surface-panel)] border-[var(--comic-border)] text-[var(--ink-primary)]">
              <span class="w-2 h-2 rounded-full bg-[var(--brand-coral)] mr-1.5 inline-block"></span>
              {{ c.quickStatsPkg || 'Creator @ryuenn3123/agentic-senior-core' }}
            </span>
          </div>
        </div>

        <!-- Right Column: Comic Snapshot / Polaroid Character Frame -->
        <div class="lg:col-span-5 flex justify-center lg:justify-end">
          <div class="relative w-full max-w-[320px] sm:max-w-[360px]">
            
            <!-- Polaroid / Webtoon Panel Card -->
            <div class="comic-panel p-4 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] shadow-comic-lg rounded-2xl transform rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
              
              <!-- Avatar Illustration / Photo Container -->
              <div class="w-full aspect-[4/4.5] rounded-xl overflow-hidden border-[1.5px] border-[var(--comic-border)] bg-[var(--surface-subtle)] relative mb-3">
                <img
                  src="/avatar-github.jpg"
                  alt="Farid Eka Aprilian"
                  class="w-full h-full object-cover"
                  fetchpriority="high"
                />
                
                <!-- Corner Webtoon Stamp -->
                <div class="absolute bottom-3 right-3 bg-[var(--brand-coral)] text-white font-mono text-[10px] font-black px-2 py-0.5 rounded border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
                  이직로그;
                </div>
              </div>

              <!-- Polaroid Caption Strip -->
              <div class="px-1 pt-1 flex items-center justify-between">
                <div>
                  <h2 class="text-base font-black text-[var(--ink-primary)] tracking-tight">Farid Eka Aprilian</h2>
                  <p class="text-xs text-[var(--ink-muted)] font-medium">Full-Stack & Systems Engineer</p>
                </div>
                <div class="w-8 h-8 rounded-full bg-[var(--brand-sun)] border border-[var(--comic-border)] flex items-center justify-center text-slate-950 font-black text-xs shadow-[1px_1px_0px_var(--comic-border)]">
                  FEA
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>
