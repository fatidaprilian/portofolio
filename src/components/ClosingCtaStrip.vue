<script setup>
const props = defineProps({
  language: {
    type: String,
    default: 'id'
  }
})

const copyByLanguage = {
  id: {
    marqueeText: 'Siap bangun sesuatu yang benar-benar di-launch',
    ctaTitle: 'Punya scope project yang jelas?',
    ctaDescription: 'Saya siap bantu dari struktur sampai delivery. Kirim konteks bisnis, target, dan timeline supaya langsung bisa eksekusi.',
    primaryAction: 'Mulai diskusi',
    secondaryAction: 'Lihat GitHub'
  },
  en: {
    marqueeText: 'Let us build something that actually ships',
    ctaTitle: 'Do you already have a clear project scope?',
    ctaDescription: 'I can help from architecture to delivery. Share your business context, target, and timeline so we can execute quickly.',
    primaryAction: 'Start discussion',
    secondaryAction: 'View GitHub'
  }
}

const getActiveCopy = () => copyByLanguage[props.language] ?? copyByLanguage.id
</script>

<template>
  <section class="pb-14 md:pb-16">
    <div class="section-shell">
      <div class="closing-strip rounded-2xl overflow-hidden border border-[#c9ad92]">
        <div class="closing-marquee-wrap border-b border-[#c9ad92]/80">
          <div class="closing-marquee-track">
            <div class="closing-marquee-group">
              <span
                v-for="index in 7"
                :key="`id-1-${index}`"
                class="closing-marquee-item"
              >
                {{ getActiveCopy().marqueeText }}
              </span>
            </div>
            <div class="closing-marquee-group" aria-hidden="true">
              <span
                v-for="index in 7"
                :key="`id-2-${index}`"
                class="closing-marquee-item"
              >
                {{ getActiveCopy().marqueeText }}
              </span>
            </div>
          </div>
        </div>

        <div class="px-5 py-6 md:px-8 md:py-8 lg:px-10">
          <div class="grid md:grid-cols-12 gap-5 md:gap-6 items-center">
            <div class="md:col-span-8">
              <h3 class="font-display text-3xl md:text-4xl leading-tight text-text">{{ getActiveCopy().ctaTitle }}</h3>
              <p class="mt-2.5 text-sm md:text-base text-[#5f483b] max-w-2xl">{{ getActiveCopy().ctaDescription }}</p>
            </div>
            <div class="md:col-span-4 flex md:justify-end gap-3 flex-wrap">
              <a
                href="#contact"
                class="inline-flex items-center justify-center rounded-xl bg-accent hover:bg-accent-hover text-[#f8f1e5] font-semibold px-5 py-3 transition"
              >
                {{ getActiveCopy().primaryAction }}
              </a>
              <a
                href="https://github.com/fatidaprilian"
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center justify-center rounded-xl border border-[#b99375] text-[#5b4133] hover:bg-[#ead3bb]/65 font-semibold px-5 py-3 transition"
              >
                {{ getActiveCopy().secondaryAction }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
