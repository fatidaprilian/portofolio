<script setup>
const props = defineProps({
  language: {
    type: String,
    default: 'id'
  }
})

const copyByLanguage = {
  id: {
    sectionLabel: '/ Architecture Snapshot',
    sectionTitle: 'Bagaimana saya mengambil keputusan teknis.',
    sectionIntro: 'Bukan hanya apa yang dibangun, tetapi kenapa keputusan itu dipilih dan bagaimana dampaknya ke delivery.',
    cards: [
      {
        title: 'Boundary Before Features',
        problemLabel: 'Problem',
        solutionLabel: 'Solution',
        impactLabel: 'Impact',
        problemText: 'Fitur bertambah cepat sering membuat kode saling tarik antar modul.',
        solutionText: 'Saya tetapkan service boundary sejak awal agar perubahan tetap terlokalisasi.',
        impactText: 'Iterasi jadi lebih aman dan velocity tim tetap stabil saat scope naik.'
      },
      {
        title: 'Validation At The Edge',
        problemLabel: 'Problem',
        solutionLabel: 'Solution',
        impactLabel: 'Impact',
        problemText: 'Input eksternal yang tidak tervalidasi memicu bug berulang di layer bisnis.',
        solutionText: 'Semua input divalidasi di boundary sebelum menyentuh business logic.',
        impactText: 'Error produksi turun dan debugging jadi lebih terarah.'
      },
      {
        title: 'Outcome-Oriented Delivery',
        problemLabel: 'Problem',
        solutionLabel: 'Solution',
        impactLabel: 'Impact',
        problemText: 'Delivery sering terlihat selesai, tapi dampak bisnis belum jelas.',
        solutionText: 'Saya memetakan target dampak per fitur sejak planning dan review.',
        impactText: 'Rilis lebih terukur dan stakeholder mudah menilai nilai hasil kerja.'
      }
    ]
  },
  en: {
    sectionLabel: '/ Architecture Snapshot',
    sectionTitle: 'How I make technical decisions.',
    sectionIntro: 'Not only what gets built, but why each decision is selected and how it affects delivery.',
    cards: [
      {
        title: 'Boundary Before Features',
        problemLabel: 'Problem',
        solutionLabel: 'Solution',
        impactLabel: 'Impact',
        problemText: 'Fast feature growth often causes modules to leak responsibilities.',
        solutionText: 'I define service boundaries early so changes stay localized.',
        impactText: 'Iteration stays safer and team velocity remains stable as scope grows.'
      },
      {
        title: 'Validation At The Edge',
        problemLabel: 'Problem',
        solutionLabel: 'Solution',
        impactLabel: 'Impact',
        problemText: 'Unvalidated external input repeatedly creates business-layer defects.',
        solutionText: 'All external input is validated at boundaries before business logic.',
        impactText: 'Production errors drop and debugging becomes more directed.'
      },
      {
        title: 'Outcome-Oriented Delivery',
        problemLabel: 'Problem',
        solutionLabel: 'Solution',
        impactLabel: 'Impact',
        problemText: 'Delivery may look complete while business impact remains unclear.',
        solutionText: 'I map impact targets per feature during planning and review.',
        impactText: 'Releases become measurable and stakeholders can assess value quickly.'
      }
    ]
  }
}

const getActiveCopy = () => copyByLanguage[props.language] ?? copyByLanguage.id
</script>

<template>
  <section class="py-18 md:py-24 border-y border-[#d7c2a8]/60 bg-[linear-gradient(165deg,#f6e8d7_0%,#f1dfcb_45%,#ecd8c2_100%)]">
    <div class="section-shell">
      <div class="max-w-3xl" data-reveal>
        <p class="text-[0.62rem] uppercase tracking-[0.23em] text-muted mb-3">{{ getActiveCopy().sectionLabel }}</p>
        <h2 class="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.92] text-text tracking-wide">{{ getActiveCopy().sectionTitle }}</h2>
        <p class="mt-4 text-sm md:text-base text-[#5f4a3d] leading-relaxed">{{ getActiveCopy().sectionIntro }}</p>
      </div>

      <div class="mt-9 grid md:grid-cols-3 gap-4 md:gap-5">
        <article
          v-for="(snapshotCard, snapshotCardIndex) in getActiveCopy().cards"
          :key="snapshotCard.title"
          class="rounded-2xl border border-[#ccb096]/65 bg-[#f9eedf]/82 p-5 md:p-6"
          data-reveal
          :style="{ '--reveal-delay': `${snapshotCardIndex * 70}ms` }"
        >
          <h3 class="font-display text-2xl md:text-3xl leading-[0.95] text-[#412d22] tracking-wide">{{ snapshotCard.title }}</h3>
          <div class="mt-5 space-y-3.5">
            <p class="text-sm leading-relaxed text-[#5b4639]">
              <span class="block text-[0.6rem] uppercase tracking-[0.2em] text-[#8a6a57] mb-1">{{ snapshotCard.problemLabel }}</span>
              {{ snapshotCard.problemText }}
            </p>
            <p class="text-sm leading-relaxed text-[#5b4639]">
              <span class="block text-[0.6rem] uppercase tracking-[0.2em] text-[#8a6a57] mb-1">{{ snapshotCard.solutionLabel }}</span>
              {{ snapshotCard.solutionText }}
            </p>
            <p class="text-sm leading-relaxed text-[#4d3629]">
              <span class="block text-[0.6rem] uppercase tracking-[0.2em] text-[#7a5641] mb-1">{{ snapshotCard.impactLabel }}</span>
              {{ snapshotCard.impactText }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
