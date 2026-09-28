<script setup>
import { ArrowUp } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true },
  currentYear: { type: Number, required: true }
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="border-t-2 border-[var(--comic-border)] bg-[var(--surface-panel)] py-8 px-6 md:px-12 relative z-10" role="contentinfo">
    <div class="max-w-[1220px] mx-auto flex flex-col md:flex-row justify-between items-center gap-5 text-xs sm:text-sm font-bold text-[var(--ink-muted)]">
      
      <!-- Brand & Tagline -->
      <div class="flex items-center gap-2 text-center md:text-left">
        <span class="font-black text-base text-[var(--ink-primary)] tracking-tight">
          FARID EKA<span class="text-[var(--brand-coral)] font-black">;</span>
        </span>
        <span class="text-[var(--comic-border)]">•</span>
        <span class="text-[var(--ink-muted)]">{{ c.footerLeft }}</span>
      </div>

      <!-- Back to Top Button -->
      <div>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-[var(--comic-border)] bg-[var(--canvas-bg)] hover:bg-[var(--brand-coral)] hover:text-white text-[var(--ink-primary)] font-mono text-xs font-black shadow-[1.5px_1.5px_0px_var(--comic-border)] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          @click="scrollToTop"
          aria-label="Scroll back to top"
        >
          <ArrowUp class="w-3.5 h-3.5" />
          <span>{{ c.backToTop || 'Kembali ke atas' }}</span>
        </button>
      </div>

      <!-- Copyright Statement -->
      <div class="font-mono text-xs text-center md:text-right">
        <span>© {{ currentYear }} <strong class="text-[var(--ink-primary)]">Farid Eka Aprilian</strong>. All rights reserved.</span>
      </div>

    </div>
  </footer>
</template>
