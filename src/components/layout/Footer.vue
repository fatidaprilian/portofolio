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
  <footer class="border-t-2 border-[var(--comic-border)] bg-[var(--surface-panel)] py-6 px-6 md:px-12 relative z-10" role="contentinfo">
    <div class="max-w-[1220px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-5 text-xs sm:text-sm font-bold text-[var(--ink-muted)]">
      
      <!-- Brand & Tagline -->
      <div class="flex items-center gap-2 text-center lg:text-left">
        <span class="font-black text-base text-[var(--ink-primary)] tracking-tight">
          FARID EKA<span class="text-[var(--brand-coral)] font-black">;</span>
        </span>
        <span class="text-[var(--comic-border)]">•</span>
        <span class="text-[var(--ink-muted)]">{{ c.footerLeft }}</span>
      </div>

      <!-- Center: FlyRank Horizontal Graduate Badge -->
      <div class="flex items-center justify-center transition-transform hover:-translate-y-0.5 duration-200">
        <a
          href="https://internship.flyrank.ai/verify?id=FR-D1-FBE8F-0F92A&amp;first_name=Farid"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Verify Farid Eka Aprilian's FlyRank AI Internship credential FR-D1-FBE8F-0F92A"
          style="box-sizing:border-box;margin:0;padding:0;border:0;background:none;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-style:normal;line-height:1.25;text-transform:none;float:none;-webkit-font-smoothing:antialiased;display:inline-flex;align-items:center;gap:14px;padding:12px 18px;background:#FFFFFF;border:1px solid #DDE4E7;border-radius:20px;box-shadow:0 1px 2px rgba(5,31,33,0.05);max-width:100%"
        >
          <svg width="40" height="40" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="display:block;flex:none;opacity:1;transform:none;max-width:none">
            <rect width="96" height="96" rx="22" fill="#051F21" />
            <path d="M28.2354 74.2202V67.9039C29.6419 68.4369 31.3724 68.7055 33.4311 68.7055C35.3235 68.7055 36.8153 68.2396 37.8979 67.3079C38.9805 66.3762 39.9566 64.8695 40.8218 62.792L42.6887 58.3139L29.8976 29.2879C35.0038 29.2879 39.6028 32.3307 41.5294 36.9893L47.0746 50.3985L56.0126 28.6038C57.9221 23.9452 62.5168 20.894 67.6187 20.894L50.0795 63.5936C48.4556 67.5933 46.5205 70.5102 44.2743 72.3484C42.0281 74.1867 39.1169 75.1058 35.5451 75.1058C32.6212 75.1058 30.1875 74.812 28.2354 74.2244V74.2202Z" fill="#54E399" />
          </svg>
          <span style="margin:0;padding:0;border:0;background:none;color:inherit;font-weight:400;font-style:normal;letter-spacing:normal;text-transform:none;text-decoration:none;white-space:normal;float:none;display:flex;flex-direction:column;gap:4px;min-width:0">
            <span style="margin:0;padding:0;border:0;background:none;color:inherit;font-weight:400;font-style:normal;letter-spacing:normal;text-transform:none;text-decoration:none;white-space:normal;float:none;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(5,31,33,0.5)">FlyRank AI Internship</span>
            <span style="margin:0;padding:0;border:0;background:none;color:inherit;font-weight:400;font-style:normal;letter-spacing:normal;text-transform:none;text-decoration:none;white-space:normal;float:none;font-size:15px;font-weight:600;color:#051F21;letter-spacing:-0.01em;white-space:nowrap">Verified credential</span>
            <span style="margin:0;padding:0;border:0;background:none;color:inherit;font-weight:400;font-style:normal;letter-spacing:normal;text-transform:none;text-decoration:none;white-space:normal;float:none;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;color:#1A7A4A">FR-D1-FBE8F-0F92A</span>
          </span>
          <span style="margin:0;padding:0;border:0;background:none;color:inherit;font-weight:400;font-style:normal;letter-spacing:normal;text-transform:none;text-decoration:none;white-space:normal;float:none;display:flex;align-items:center;gap:6px;margin-left:8px;padding:6px 12px;background:rgba(84,227,153,0.12);border:1px solid rgba(84,227,153,0.28);border-radius:9999px;font-size:12px;font-weight:600;color:#1A7A4A;flex:none">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="display:block;flex:none;opacity:1;transform:none;max-width:none">
              <circle cx="12" cy="12" r="10" stroke="#1A7A4A" stroke-width="1.5" />
              <path d="M7.9 12.3l2.8 2.8 5.4-5.8" stroke="#1A7A4A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>Verify
          </span>
        </a>
      </div>

      <!-- Right: Back to Top & Copyright -->
      <div class="flex items-center gap-4 text-center lg:text-right">
        <div class="font-mono text-xs hidden sm:block">
          <span>© {{ currentYear }} <strong class="text-[var(--ink-primary)]">Farid Eka Aprilian</strong></span>
        </div>

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

    </div>
  </footer>
</template>

