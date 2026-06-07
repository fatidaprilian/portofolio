<script setup>
defineProps({
  c: { type: Object, required: true },
  currentYear: { type: Number, required: true }
})
</script>

<template>
  <section id="colophon" class="section-container border-t border-[var(--hairline)]" aria-labelledby="colophon-heading">
    <div class="mb-12">
      <span class="pill-tag inline-block mb-4">{{ c.colophonLabel }}</span>
      <h2 id="colophon-heading" class="text-3xl md:text-4xl font-bold tracking-tight text-[var(--ink-primary)]">{{ c.colophonTitle }}</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="(row, idx) in c.colophonBody" :key="idx" class="flex flex-col gap-2">
        <dt class="font-mono text-xs text-[var(--ink-muted)] uppercase tracking-wider">{{ row[0] }}</dt>
        <dd class="text-sm text-[var(--ink-primary)] leading-relaxed">{{ row[1] }}</dd>
      </div>
    </div>
  </section>

  <footer class="border-t border-[var(--hairline)] py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--ink-muted)]" role="contentinfo">
    <span>{{ c.footerLeft }}</span>
    <span>© {{ currentYear }} Farid Eka Aprilian</span>
  </footer>
</template>
