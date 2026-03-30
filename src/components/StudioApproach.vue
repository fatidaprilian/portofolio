<script setup>
const props = defineProps({
  language: {
    type: String,
    default: 'id'
  },
  dark: {
    type: Boolean,
    default: false
  }
})

const copyByLanguage = {
  id: {
    sectionLabel: 'Core Disciplines',
    sectionTitle: 'Struktur sebagai fondasi,\nrasa sebagai pembeda.',
    philosophyItems: [
      {
        step: 'Observe',
        description: 'Saya mulai dengan memahami produk, konteks, dan bagaimana sesuatu sebenarnya bekerja. Keputusan teknis datang setelah pemahaman terbentuk.'
      },
      {
        step: 'Distil',
        description: 'Saya membuang noise, mengurangi kompleksitas, dan menyisakan hanya yang benar-benar penting untuk produk berjalan.'
      },
      {
        step: 'Build',
        description: 'Bentuk muncul dari kejelasan — struktur, komponen, dan keputusan teknis yang tepat menghasilkan produk yang bisa di-maintain jangka panjang.'
      }
    ],
    disciplineItems: [
      {
        number: '01',
        title: 'Frontend Engineering',
        description: 'Antarmuka yang tidak hanya menarik secara visual, tapi juga konsisten, responsif, dan siap scale secara produk.',
        bulletPoints: ['UI system terstruktur', 'Interaksi halus dan jelas', 'Performant di mobile']
      },
      {
        number: '02',
        title: 'Backend Architecture',
        description: 'Arsitektur backend disusun untuk maintainability jangka panjang: boundary jelas, validasi rapi, dan alur data yang bisa diandalkan.',
        bulletPoints: ['Service boundary jelas', 'Data flow terukur', 'Maintainability jangka panjang']
      },
      {
        number: '03',
        title: 'Full Product Delivery',
        description: 'Dari discovery sampai release, fokus saya adalah memastikan produk punya nilai nyata dan tetap efisien dikembangkan setelah launch.',
        bulletPoints: ['Scope realistis', 'Eksekusi terarah', 'Outcome terukur']
      }
    ]
  },
  en: {
    sectionLabel: 'Core Disciplines',
    sectionTitle: 'Structure as foundation,\ntaste as differentiation.',
    philosophyItems: [
      {
        step: 'Observe',
        description: 'I start by understanding the product, its context, and how things actually work. Technical decisions come after understanding is formed.'
      },
      {
        step: 'Distil',
        description: 'I remove noise, reduce complexity, and keep only what truly matters for the product to function well.'
      },
      {
        step: 'Build',
        description: 'Form emerges from clarity — structure, components, and precise technical decisions produce a product that can be maintained long-term.'
      }
    ],
    disciplineItems: [
      {
        number: '01',
        title: 'Frontend Engineering',
        description: 'Interfaces that are not only visually refined but also consistent, responsive, and ready to scale as products grow.',
        bulletPoints: ['Structured UI system', 'Clear and smooth interactions', 'Strong mobile performance']
      },
      {
        number: '02',
        title: 'Backend Architecture',
        description: 'Backend architecture designed for long-term maintainability with clear boundaries, solid validation, and reliable data flow.',
        bulletPoints: ['Clear service boundaries', 'Measurable data flow', 'Long-term maintainability']
      },
      {
        number: '03',
        title: 'Full Product Delivery',
        description: 'From discovery to release, focused on delivering real product value while keeping implementation efficient after launch.',
        bulletPoints: ['Realistic scope', 'Focused execution', 'Measurable outcomes']
      }
    ]
  }
}

const getActiveCopy = () => copyByLanguage[props.language] ?? copyByLanguage.id
</script>

<template>
  <section
    class="pb-20 md:pb-28 pt-20 md:pt-28"
    :class="dark ? 'text-[#f0ebe4]' : 'text-text'"
  >
    <div class="section-shell">

      <!-- Header -->
      <div class="mb-14 md:mb-16" data-reveal>
        <p
          class="text-xs uppercase tracking-[0.24em]"
          :class="dark ? 'text-[rgba(240,235,228,0.42)]' : 'text-muted'"
        >{{ getActiveCopy().sectionLabel }}</p>
        <h2
          class="mt-4 font-display text-5xl md:text-6xl lg:text-7xl leading-none tracking-wide whitespace-pre-line"
          :class="dark ? 'text-[#f0ebe4]' : 'text-text'"
        >
          {{ getActiveCopy().sectionTitle }}
        </h2>
      </div>

      <!-- Philosophy strip: Observe / Distil / Build -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-px mb-14 md:mb-16 rounded-2xl overflow-hidden"
        :class="dark
          ? 'bg-white/[0.06] border border-white/[0.07]'
          : 'bg-[#d7c2a8]/40 border border-[#d7c2a8]/40'"
        data-reveal
      >
        <div
          v-for="(item, index) in getActiveCopy().philosophyItems"
          :key="item.step"
          class="p-6 md:p-8"
          :class="dark ? 'bg-[#0f0d0b]' : 'bg-background/90'"
        >
          <p
            class="font-display text-4xl md:text-5xl tracking-wide mb-4"
            :class="dark ? 'text-[#c88e66]' : 'text-[#a56a43]'"
          >{{ item.step }}</p>
          <p
            class="text-sm leading-relaxed"
            :class="dark ? 'text-[rgba(240,235,228,0.52)]' : 'text-[#5b4639]'"
          >{{ item.description }}</p>
        </div>
      </div>

      <!-- Discipline cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        <article
          v-for="(discipline, index) in getActiveCopy().disciplineItems"
          :key="discipline.title"
          class="rounded-2xl p-6 md:p-7 interactive-card border"
          :class="dark
            ? 'bg-white/[0.04] border-white/[0.07]'
            : 'panel'"
          data-reveal
          :style="{ '--reveal-delay': `${index * 80}ms` }"
        >
          <p
            class="font-display text-4xl tracking-wide"
            :class="dark ? 'text-[#a56a43]' : 'text-[#8a5f45]'"
          >{{ discipline.number }}</p>
          <h3
            class="mt-4 font-display text-2xl md:text-3xl leading-tight tracking-wide"
            :class="dark ? 'text-[#f0ebe4]' : 'text-text'"
          >{{ discipline.title }}</h3>
          <p
            class="mt-3 text-sm md:text-base leading-relaxed"
            :class="dark ? 'text-[rgba(240,235,228,0.52)]' : 'text-[#5b4639]'"
          >{{ discipline.description }}</p>

          <ul class="mt-6 space-y-2">
            <li
              v-for="point in discipline.bulletPoints"
              :key="point"
              class="text-sm flex items-start gap-2"
              :class="dark ? 'text-[rgba(240,235,228,0.55)]' : 'text-[#624c3f]'"
            >
              <span
                class="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                :class="dark ? 'bg-[#c88e66]' : 'bg-accent'"
              ></span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
