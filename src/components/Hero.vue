<script setup>
import { ArrowDown } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true }
})

const emit = defineEmits(['goToSection'])
</script>



<template>
  <section id="home" class="max-w-[1200px] mx-auto w-full px-4 md:px-8 py-6 md:py-12 relative" aria-labelledby="home-heading">
    <!-- Fine corner crop marks on the section level for premium visual detailing -->
    <div class="crop-mark crop-mark-tl"></div>
    <div class="crop-mark crop-mark-tr"></div>
    <div class="crop-mark crop-mark-bl"></div>
    <div class="crop-mark crop-mark-br"></div>

    <div class="glass-panel p-0 overflow-hidden flex flex-col lg:flex-row items-stretch">
      <!-- COLUMN 1: Technical Coordinate Axis Sidebar (Implicit Authority) -->
      <div class="hidden lg:flex coord-axis py-6" aria-hidden="true">
        <span class="coord-item">SYS_INDEX // 001</span>
        <span class="coord-item">LAT_40.7128N // LON_74.0060W</span>
        <span class="coord-item">RENDER_KINETIC // STABLE</span>
      </div>

      <!-- COLUMN 2: Center Main Narrative Workspace Grid -->
      <div class="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center relative border-r border-rule gap-y-6">
        <div class="crop-mark crop-mark-tr"></div>
        <div class="crop-mark crop-mark-br"></div>

        <div>
          <span class="section-kicker tracking-widest font-mono text-[10px] opacity-75 mb-4 block uppercase">{{ c.eyebrow }}</span>
          <h1 id="home-heading" class="hero-headline flex flex-col gap-1 my-4">
            <span class="mask-reveal">
              <span class="mask-reveal-child block">FARID EKA</span>
            </span>
            <span class="mask-reveal">
              <span class="mask-reveal-child text-outline-stroke block">APRILIAN_</span>
            </span>
          </h1>
          <p class="hero-desc text-secondary leading-relaxed max-w-xl text-sm md:text-base">{{ c.coverBody }}</p>
        </div>

        <!-- Technical layout separator line -->
        <div class="w-16 h-px bg-rule" aria-hidden="true"></div>

        <div class="hero-actions flex flex-wrap gap-4">
          <button type="button" class="btn-premium" @click="emit('goToSection', 'works')">
            {{ c.ctaView }}
            <ArrowDown class="w-4 h-4" aria-hidden="true" />
          </button>
          <button type="button" class="btn-secondary" @click="emit('goToSection', 'contact')">
            {{ c.ctaContact }}
          </button>
        </div>


      </div>

      <!-- COLUMN 3: Right Portrait Layout (Asymmetric Crosshairs and Crop Vectors) -->
      <div class="p-6 lg:p-8 flex justify-center items-center relative min-w-[280px] lg:min-w-[340px] bg-surface-sunken/20">
        <div class="crop-mark crop-mark-tl"></div>
        <div class="crop-mark crop-mark-bl"></div>

        <div class="portrait-wrapper relative">
          <!-- Multi-ring crosshair vector system -->
          <div class="target-circle"></div>
          <div class="target-lines" aria-hidden="true"></div>
          
          <div class="portrait-container">
            <img src="/avatar-github.jpg" alt="Farid Eka Aprilian UI/UX designer portrait" decoding="async" fetchpriority="high" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
