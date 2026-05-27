<script setup>
defineProps({
  c: { type: Object, required: true },
  currentYear: { type: Number, required: true }
})
</script>

<template>
  <!-- Technical Colophon specs -->
  <section id="colophon" class="section-container" aria-labelledby="colophon-heading">
    <div class="section-header">
      <span class="section-kicker">{{ c.colophonLabel }}</span>
      <h2 id="colophon-heading" class="section-title">{{ c.colophonTitle }}</h2>
    </div>

    <div class="colophon-matrix">
      <aside class="margin-specs" aria-hidden="true">
        <span class="font-mono text-[10px] text-tertiary">Site specifications</span>
      </aside>
      <div class="colophon-body">
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-12">
          <div v-for="(row, idx) in c.colophonBody" :key="idx" class="border-t border-rule pt-3">
            <dt class="font-mono text-[10px] text-tertiary uppercase tracking-wider mb-1">{{ row[0] }}</dt>
            <dd class="text-sm text-secondary">{{ row[1] }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>

  <!-- Global Footer -->
  <footer class="portfolio-footer" role="contentinfo">
    <span>{{ c.footerLeft }}</span>
    <span class="theme-announcement font-mono text-[10px]" aria-hidden="true">
      OKLCH Semantics derived
    </span>
    <span>© {{ currentYear }} Farid Eka Aprilian</span>
  </footer>
</template>
