<script setup>
const props = defineProps({
  language: {
    type: String,
    default: 'id'
  }
})

const statsByLanguage = {
  id: [
    'Pengembangan Web Fullstack',
    'Ekosistem TypeScript & PHP',
    'Sistem Commerce & Produk',
    'Frontend Siap Produksi',
    'Backend Terstruktur',
    'Riset Arsitektur AI',
  ],
  en: [
    'Fullstack Web Development',
    'TypeScript & PHP Ecosystem',
    'Commerce & Product Systems',
    'Production-Ready Frontend',
    'Structured Backend Delivery',
    'AI Architecture Research',
  ]
}

const getActiveStats = () => statsByLanguage[props.language] ?? statsByLanguage.id
</script>

<template>
  <section class="pb-16 md:pb-20">
    <div class="overflow-hidden marquee-dark-wrap py-3 md:py-4">
      <div class="marquee-track">
        <div class="marquee-group">
          <span
            v-for="item in getActiveStats()"
            :key="`first-${item}`"
            class="marquee-item"
          >
            {{ item }}
          </span>
        </div>
        <div class="marquee-group" aria-hidden="true">
          <span
            v-for="item in getActiveStats()"
            :key="`second-${item}`"
            class="marquee-item"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
