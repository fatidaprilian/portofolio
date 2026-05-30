<script setup>
import { Download } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true }
})
</script>


<template>
  <section id="about" class="max-w-[1200px] mx-auto w-full px-4 md:px-8 py-6 md:py-12 relative" aria-labelledby="about-heading">
    <!-- Fine corner crop marks -->
    <div class="crop-mark crop-mark-tl"></div>
    <div class="crop-mark crop-mark-tr"></div>
    <div class="crop-mark crop-mark-bl"></div>
    <div class="crop-mark crop-mark-br"></div>

    <div class="glass-panel p-0 overflow-hidden flex flex-col lg:flex-row items-stretch">
      <!-- COLUMN 1: Technical Coordinate Axis Sidebar (Implicit Authority) -->
      <div class="hidden lg:flex coord-axis py-6" aria-hidden="true">
        <span class="coord-item">SYS_INDEX // 002</span>
        <span class="coord-item">LAT_40.7128N // LON_74.0060W</span>
        <span class="coord-item">RENDER_KINETIC // STABLE</span>
      </div>

      <!-- COLUMN 2: Main Editorial Grid -->
      <div class="flex-1 p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        <div class="lg:col-span-7 flex flex-col gap-6">
          <span class="section-kicker tracking-widest font-mono text-[10px] opacity-75 uppercase">{{ c.aboutLabel }}</span>
          <h2 id="about-heading" class="section-title text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-none tracking-tight my-4">
            {{ c.aboutTitle }}
          </h2>
          <p class="text-sm md:text-base text-secondary leading-relaxed">{{ c.aboutBodyP1 }}</p>
          <p class="text-sm md:text-base text-secondary leading-relaxed">{{ c.aboutBodyP2 }}</p>
          
          <div class="mt-2 flex flex-wrap gap-4">
            <a href="/cv.pdf" download="Farid_Eka_Aprilian_CV.pdf" class="btn-premium flex items-center gap-2">
              {{ c.ctaDownloadCv }}
              <Download class="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

        </div>

        <div class="lg:col-span-5 flex flex-col gap-6 w-full">
          <blockquote class="philosophy-quote my-0 border-l-2 border-accent pl-6 text-sm md:text-base italic leading-relaxed text-primary">
            {{ c.aboutPullQuote }}
          </blockquote>
          
          <!-- Live typography specimen specs -->
          <div class="glass-panel flex flex-col gap-4 relative mt-2" aria-hidden="true">
            <div class="crop-mark crop-mark-tl"></div>
            <div class="crop-mark crop-mark-tr"></div>
            <div class="crop-mark crop-mark-bl"></div>
            <div class="crop-mark crop-mark-br"></div>

            <span class="font-mono text-[9px] text-tertiary tracking-widest uppercase">Live Font Specimen Matrix</span>
            <div class="flex flex-col gap-3">
              <div class="flex justify-between items-baseline border-b border-rule pb-2">
                <span class="font-mono text-[10px] text-tertiary">Inter Variable (System)</span>
                <span class="font-bold text-lg leading-none tracking-tight">Aa Bb Cc 123</span>
              </div>
              <div class="flex justify-between items-baseline border-b border-rule pb-2">
                <span class="font-mono text-[10px] text-tertiary">JetBrains Mono (Specs)</span>
                <span class="font-mono text-sm leading-none">Aa Bb Cc 123</span>
              </div>
              <div class="flex justify-between items-baseline pb-1">
                <span class="font-mono text-[10px] text-tertiary">Fraunces Variable (Quote)</span>
                <span class="font-serif italic text-lg leading-none">Aa Bb Cc 123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
