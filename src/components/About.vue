<script setup>
defineProps({
  c: { type: Object, required: true }
})
</script>

<template>
  <section id="about" class="section-container" aria-labelledby="about-heading">
    <div class="section-header">
      <span class="section-kicker">{{ c.aboutLabel }}</span>
      <h2 id="about-heading" class="section-title">{{ c.aboutTitle }}</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div class="flex flex-col gap-6">
        <p class="text-lg text-secondary leading-relaxed">{{ c.aboutBodyP1 }}</p>
        <p class="text-secondary leading-relaxed">{{ c.aboutBodyP2 }}</p>
      </div>
      
      <div>
        <blockquote class="philosophy-quote">
          {{ c.aboutPullQuote }}
        </blockquote>
        
        <!-- Live typography specimen specs -->
        <div class="glass-panel mt-6 flex flex-col gap-4" aria-hidden="true">
          <span class="font-mono text-xs text-tertiary tracking-wider uppercase">Live Font Specimen Matrix</span>
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
  </section>
</template>
