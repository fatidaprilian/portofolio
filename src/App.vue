<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Phone } from 'lucide-vue-next'
import { getCareerProfileByLanguage } from './data/careerProfile'
import { getProjectsByLanguage } from './data/projects'
import Ornament from './components/Ornament.vue'

// -----------------------------------------------------------------
// State
// -----------------------------------------------------------------
const currentYear = new Date().getFullYear()
const lang = ref('id')
const themePref = ref('auto') // auto | light | dark
const resolvedTheme = ref('light')
const themeAnnouncement = ref('')

// -----------------------------------------------------------------
// Copy (bilingual)
// -----------------------------------------------------------------
const copy = {
  id: {
    skip: 'Lewati ke konten utama',
    issue: 'Catalog 2026',
    edition: 'Edition I',
    eyebrow: 'Catalog of Selected Rooms',
    coverHeadline: ['Karya yang dibaca ', 'seperti ', { italic: 'pameran kecil.' }],
    coverBody:
      'Saya membangun produk web sebagai sebuah katalog: setiap proyek punya wall label, curator’s note, dan plat sendiri. Bukan rapi karena minimalis — rapi karena dikurasi.',
    ctaView: 'Buka denah ruang',
    ctaGithub: 'GitHub',
    roomI: 'Room I',
    roomII: 'Room II',
    roomIII: 'Room III',
    roomIV: 'Room IV',
    roomV: 'Room V',
    roomVI: 'Room VI',
    intentLabel: 'Curator’s Note · Room II',
    intentTitle: 'Sikap, bukan sekadar portofolio.',
    intentBodyP1:
      'Bagi saya, antarmuka punya pendapat. Kalau kode punya arsitektur, layar juga harus punya hierarki, ritme, dan alasan. Halaman ini ditata seperti katalog pameran kecil supaya setiap proyek bisa berdiri di ruangnya sendiri.',
    intentBodyP2:
      'Tidak ada kartu yang berbaris seragam, tidak ada hero yang berlomba mencolok. Yang ada wall label, plate panel, dan curator’s note. Pembaca yang lambat akan menemukan lebih banyak.',
    intentPullQuote: '“Detail yang tidak dijelaskan di mana pun adalah cara halus untuk menunjukkan ketelitian.”',
    intentMetaTitle: 'Editorial premise',
    intentMetaItems: [
      ['Anchor', 'Exhibition Catalog'],
      ['Voice', 'Curator'],
      ['Reading', 'Slow on purpose'],
    ],
    methodLabel: 'Method · Room III',
    methodTitle: 'Empat sudut yang saya pegang setiap kali memulai ruang baru.',
    methodMeta: '04 Beats',
    floorLabel: 'Floor Plan · Room IV',
    floorTitle: 'Denah ruang. Setiap baris satu proyek.',
    floorMeta: 'Selected works',
    floorHead: ['Room', 'Plate', 'Title', '', 'Note'],
    constraint: 'Constraint',
    decision: 'Decision',
    outcome: 'Outcome',
    source: 'View source',
    careerLabel: 'Biography · Room V',
    careerTitle: 'Linimasa kerja, dibaca sebagai indeks.',
    careerMeta: 'Career index',
    skillLabel: 'Stack technical',
    educationLabel: 'Pendidikan',
    contactLabel: 'Back wall · Room VI',
    contactTitle: 'Mau buka ruang berikutnya bareng?',
    contactBody:
      'Kalau butuh developer yang ikut memikirkan produk, motion, dan struktur engineering dengan rasa katalog, saya terbuka untuk ngobrol.',
    contactMeta: 'Open for collaboration',
    sendEmail: 'Kirim email',
    phone: 'Telepon',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    colophonLabel: 'Colophon',
    colophonTitle: 'Catatan teknis dan kunci plate code.',
    colophonBody: [
      ['Type', 'Fraunces (Undercase, OFL), Inter (Rasmus Andersson, OFL), JetBrains Mono (JetBrains, OFL).'],
      ['Build', 'Vue 3, Vite, Tailwind, Lenis. Tanpa cursor kustom, tanpa marquee logo, tanpa scroll text reveal per kata.'],
      ['Photography', 'Saat ini setiap ruang menampilkan plate panel tipografis. Foto installation view akan menggantikan plat ini bertahap.'],
      ['Plate code', 'PR.MMYY menandai bulan dan tahun proyek dimulai. Hanya colophon ini yang menjelaskannya.'],
      ['Color space', 'Token semantik OKLCH, dengan dua mode terderivasi (bukan invert).'],
    ],
    footerLeft: 'Catalog 2026 / printed in browser',
    themeLabels: { auto: 'Auto', light: 'Light', dark: 'Dark' },
    methodBeats: [
      { num: '01', title: 'Intent', body: 'Membaca tujuan produk dan batasan sebelum memilih bentuk visual atau teknis.' },
      { num: '02', title: 'System', body: 'Membentuk alur, state, dan struktur supaya UI tidak hanya terlihat bagus.' },
      { num: '03', title: 'Motion', body: 'Gerak dipakai untuk continuity, feedback, dan hierarchy, bukan dekorasi.' },
      { num: '04', title: 'Proof', body: 'Hasil akhir tetap bisa dilacak lewat repository, constraint, keputusan, dan outcome.' },
    ],
  },
  en: {
    skip: 'Skip to main content',
    issue: 'Catalog 2026',
    edition: 'Edition I',
    eyebrow: 'Catalog of Selected Rooms',
    coverHeadline: ['Work read ', 'like a small ', { italic: 'exhibition.' }],
    coverBody:
      'I build web products as a catalog: every project gets a wall label, a curator’s note, and its own plate. Not tidy because it is minimal — tidy because it is curated.',
    ctaView: 'Open the floor plan',
    ctaGithub: 'GitHub',
    roomI: 'Room I',
    roomII: 'Room II',
    roomIII: 'Room III',
    roomIV: 'Room IV',
    roomV: 'Room V',
    roomVI: 'Room VI',
    intentLabel: 'Curator’s Note · Room II',
    intentTitle: 'A point of view, not just a portfolio.',
    intentBodyP1:
      'For me, an interface has an opinion. If code has architecture, a screen should have hierarchy, rhythm, and reasons. This page is composed like a small show catalog so every project can stand in its own room.',
    intentBodyP2:
      'No tile of uniform cards, no hero competing for loudness. Just wall labels, plate panels, and curator’s notes. The slow reader finds more here.',
    intentPullQuote: '“A detail that is never explained anywhere is a quiet way to show care.”',
    intentMetaTitle: 'Editorial premise',
    intentMetaItems: [
      ['Anchor', 'Exhibition Catalog'],
      ['Voice', 'Curator'],
      ['Reading', 'Slow on purpose'],
    ],
    methodLabel: 'Method · Room III',
    methodTitle: 'Four corners I hold whenever I open a new room.',
    methodMeta: '04 Beats',
    floorLabel: 'Floor Plan · Room IV',
    floorTitle: 'The floor plan. One row per project.',
    floorMeta: 'Selected works',
    floorHead: ['Room', 'Plate', 'Title', '', 'Note'],
    constraint: 'Constraint',
    decision: 'Decision',
    outcome: 'Outcome',
    source: 'View source',
    careerLabel: 'Biography · Room V',
    careerTitle: 'Career timeline, read as an index.',
    careerMeta: 'Career index',
    skillLabel: 'Technical stack',
    educationLabel: 'Education',
    contactLabel: 'Back wall · Room VI',
    contactTitle: 'Want to open the next room together?',
    contactBody:
      'If you need a developer who thinks about product, motion, and engineering structure with a curatorial sensibility, I am open to talk.',
    contactMeta: 'Open for collaboration',
    sendEmail: 'Send email',
    phone: 'Phone',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    colophonLabel: 'Colophon',
    colophonTitle: 'Production notes and plate code key.',
    colophonBody: [
      ['Type', 'Fraunces (Undercase, OFL), Inter (Rasmus Andersson, OFL), JetBrains Mono (JetBrains, OFL).'],
      ['Build', 'Vue 3, Vite, Tailwind, Lenis. No custom cursor, no logo marquee, no per-word scroll reveal.'],
      ['Photography', 'For now each room shows a typeset plate panel. Installation views will replace these plates over time.'],
      ['Plate code', 'PR.MMYY marks the month and year a project commenced. Only this colophon decodes it.'],
      ['Color space', 'OKLCH semantic tokens with two derived modes (not an inverted single image).'],
    ],
    footerLeft: 'Catalog 2026 / printed in browser',
    footerCenter: 'No cursor. No marquee. No template.',
    themeLabels: { auto: 'Auto', light: 'Light', dark: 'Dark' },
    methodBeats: [
      { num: '01', title: 'Intent', body: 'Read product goals and constraints before choosing visual or technical form.' },
      { num: '02', title: 'System', body: 'Shape flow, state, and structure so the UI is not only good looking.' },
      { num: '03', title: 'Motion', body: 'Motion is for continuity, feedback, and hierarchy, not decoration.' },
      { num: '04', title: 'Proof', body: 'Final output stays traceable through repository, constraint, decision, and outcome.' },
    ],
  },
}

const c = computed(() => copy[lang.value])
const projects = computed(() => getProjectsByLanguage(lang.value))
const profile = computed(() => getCareerProfileByLanguage(lang.value))

// Roman plate numbering for floor plan rows
const romanList = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
const romanFor = (index) => romanList[index] ?? String(index + 1)

// Project monogram (first 2 letters) used on typeset plate panels
const monogramFor = (title) => {
  const cleaned = title.replace(/[^a-z]/gi, '')
  return cleaned.slice(0, 2).toUpperCase() || 'PR'
}

// -----------------------------------------------------------------
// Theme management — tri-state with no-flash inline script in index.html
// -----------------------------------------------------------------
const isReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const applyTheme = (pref) => {
  themePref.value = pref
  const matches = window.matchMedia('(prefers-color-scheme: dark)').matches
  const next = pref === 'auto' ? (matches ? 'dark' : 'light') : pref
  resolvedTheme.value = next
  document.documentElement.setAttribute('data-theme', next)
  document.documentElement.setAttribute('data-theme-pref', pref)
  try {
    localStorage.setItem('portfolio-theme', pref)
  } catch (_) {
    // localStorage unavailable; ignore
  }
  themeAnnouncement.value = `${c.value.themeLabels[pref]} theme`
}

let mediaQuery = null
const onSchemeChange = () => {
  if (themePref.value === 'auto') applyTheme('auto')
}

// -----------------------------------------------------------------
// Lang
// -----------------------------------------------------------------
const toggleLang = () => {
  lang.value = lang.value === 'id' ? 'en' : 'id'
  try {
    localStorage.setItem('portfolio-lang', lang.value)
  } catch (_) {
    // ignore
  }
}

// -----------------------------------------------------------------
// Smooth scroll (Lenis) — disabled when reduced-motion
// -----------------------------------------------------------------
let lenis = null
let lenisRaf = null

const initLenis = () => {
  if (isReducedMotion()) return
  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
  const run = (time) => {
    if (!lenis) return
    lenis.raf(time)
    lenisRaf = requestAnimationFrame(run)
  }
  lenisRaf = requestAnimationFrame(run)
}

// -----------------------------------------------------------------
// Anchor navigation with focus management — moves focus to <h1> of
// the destination room. This is the interaction-design signature.
// -----------------------------------------------------------------
const goToRoom = (id) => {
  const target = document.getElementById(id)
  if (!target) return
  if (lenis && !isReducedMotion()) {
    lenis.scrollTo(target, { offset: -64 })
  } else {
    target.scrollIntoView({ behavior: isReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }
  // Move focus to the first heading in the room for screen readers
  window.setTimeout(() => {
    const heading = target.querySelector('h1, h2')
    if (heading) {
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
    }
  }, 380)
}

// -----------------------------------------------------------------
// Opening sequence — once per session, <= 1.2s, three elements.
// GSAP is restricted to this orchestration only.
// -----------------------------------------------------------------
const playOpeningSequence = () => {
  if (isReducedMotion()) return
  const root = document.querySelector('#cover')
  if (!root) return
  const tl = gsap.timeline({ defaults: { ease: 'cubic-bezier(0.22, 1, 0.36, 1)' } })
  tl.from(root.querySelector('.eyebrow'), { y: 18, opacity: 0, duration: 0.55 })
    .from(root.querySelector('h1'), { y: 28, opacity: 0, duration: 0.7 }, '-=0.32')
    .from(root.querySelector('.cover-body'), { y: 18, opacity: 0, duration: 0.55 }, '-=0.4')
    .from(root.querySelector('.cover-actions'), { y: 14, opacity: 0, duration: 0.45 }, '-=0.35')
    .from(root.querySelector('.plate-cover'), { opacity: 0, duration: 0.6 }, '-=0.6')
}

// -----------------------------------------------------------------
// Lifecycle
// -----------------------------------------------------------------
onMounted(async () => {
  // Restore lang
  try {
    const savedLang = localStorage.getItem('portfolio-lang')
    if (savedLang === 'id' || savedLang === 'en') lang.value = savedLang
  } catch (_) {
    /* ignore */
  }

  // Restore theme pref (the no-flash script already set the resolved theme)
  let pref = 'auto'
  try {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved === 'auto' || saved === 'light' || saved === 'dark') pref = saved
  } catch (_) {
    /* ignore */
  }
  applyTheme(pref)

  // React to system theme changes when in auto mode
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', onSchemeChange)
  else mediaQuery.addListener(onSchemeChange)

  initLenis()
  await nextTick()
  playOpeningSequence()
})

onUnmounted(() => {
  if (lenisRaf) cancelAnimationFrame(lenisRaf)
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
  if (mediaQuery) {
    if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', onSchemeChange)
    else mediaQuery.removeListener(onSchemeChange)
  }
})

// Re-announce on language change
watch(lang, () => {
  themeAnnouncement.value = `${c.value.themeLabels[themePref.value]} theme`
})
</script>

<template>
  <a href="#cover" class="skip-link">{{ c.skip }}</a>

  <span class="sr-only" role="status" aria-live="polite" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;">
    {{ themeAnnouncement }}
  </span>

  <div class="catalog-app">
    <!-- ========== Top frame ========== -->
    <header class="catalog-frame" role="banner">
      <button type="button" class="brand-mark" @click="goToRoom('cover')" aria-label="Cover">
        <span>Farid Aprilian</span>
        <span class="brand-mono">FA · {{ c.issue }}</span>
      </button>

      <div class="frame-meta" aria-hidden="true">
        Plate {{ resolvedTheme === 'dark' ? 'B' : 'A' }} · {{ projects.length }} rooms · {{ currentYear }}
      </div>

      <div class="frame-actions">
        <div class="theme-segment" role="group" aria-label="Theme preference">
          <button
            type="button"
            :class="{ 'is-active': themePref === 'auto' }"
            @click="applyTheme('auto')"
            aria-label="Auto theme"
          >
            {{ c.themeLabels.auto }}
          </button>
          <button
            type="button"
            :class="{ 'is-active': themePref === 'light' }"
            @click="applyTheme('light')"
            aria-label="Light theme"
          >
            {{ c.themeLabels.light }}
          </button>
          <button
            type="button"
            :class="{ 'is-active': themePref === 'dark' }"
            @click="applyTheme('dark')"
            aria-label="Dark theme"
          >
            {{ c.themeLabels.dark }}
          </button>
        </div>

        <button type="button" class="lang-toggle" @click="toggleLang" aria-label="Switch language">
          {{ lang === 'id' ? 'EN' : 'ID' }}
        </button>
      </div>
    </header>

    <main class="catalog-main" id="main-content">
      <!-- ========== Room I — Cover ========== -->
      <section id="cover" class="room cover-room" aria-labelledby="cover-heading">
        <div class="folio-bar" aria-hidden="true">
          <span class="folio-numeral">I</span>
          <span class="folio-kicker">Cover · Plate PR.0526</span>
          <span class="folio-page">01 / 06</span>
        </div>

        <div class="plate-spread">
          <div class="plate-label" aria-hidden="true">Catalog 2026 — Edition I — Plate I</div>

          <figure class="plate-frame plate-cover" data-tone="copper">
            <div class="cover-portrait">
              <img src="/avatar-github.jpg" alt="Farid Eka Aprilian portrait" decoding="async" fetchpriority="high" />
            </div>
            <Ornament name="ampersand" />
            <figcaption class="cover-stamp">
              <span class="cover-stamp-left">Catalog 2026 · Plate I</span>
              <span class="cover-stamp-right">
                PR.0526<sup class="dagger" aria-hidden="true">†</sup>
              </span>
            </figcaption>
          </figure>

          <div class="cover-headline">
            <p class="eyebrow">{{ c.eyebrow }}</p>
            <h1 id="cover-heading">
              <template v-for="(part, i) in c.coverHeadline" :key="i">
                <em v-if="typeof part === 'object'">{{ part.italic }}</em>
                <span v-else>{{ part }}</span>
              </template>
            </h1>
            <p class="cover-body">{{ c.coverBody }}</p>
            <div class="cover-actions">
              <button type="button" class="btn" @click="goToRoom('floor-plan')">
                <ArrowDown class="btn-icon" aria-hidden="true" />
                {{ c.ctaView }}
              </button>
              <a href="https://github.com/fatidaprilian" target="_blank" rel="noreferrer" class="btn btn-ghost">
                <Github class="btn-icon" aria-hidden="true" />
                {{ c.ctaGithub }}
              </a>
            </div>
            <p class="cover-footnote">
              <button type="button" class="footnote-link" @click="goToRoom('colophon')">
                <span aria-hidden="true">†</span>
                <span>{{ lang === 'id' ? 'kunci plate code di colophon' : 'plate code key in the colophon' }}</span>
              </button>
            </p>
          </div>

          <div class="plate-rule" aria-hidden="true"></div>
        </div>
      </section>

      <!-- ========== Room II — Curator's Note ========== -->
      <section id="intent" class="room" aria-labelledby="intent-heading">
        <Ornament name="wave-rule" class="section-wave" />

        <div class="folio-bar" aria-hidden="true">
          <span class="folio-numeral">II</span>
          <span class="folio-kicker">{{ c.intentLabel }}</span>
          <span class="folio-page">02 / 06</span>
        </div>

        <div class="room-header">
          <span class="room-numeral-large">{{ c.intentLabel }}</span>
          <h2 id="intent-heading">{{ c.intentTitle }}</h2>
          <span class="room-header-meta">PR.0526 · 02 / 06</span>
        </div>

        <div class="editor-note">
          <aside class="margin-note" aria-hidden="true">
            <Ornament name="manicule" class="margin-manicule" />
            <span>{{ c.intentMetaTitle }}</span>
          </aside>
          <div class="editor-body">
            <p class="first-paragraph">{{ c.intentBodyP1 }}</p>
            <blockquote class="pull-quote">{{ c.intentPullQuote }}</blockquote>
            <p>{{ c.intentBodyP2 }}</p>
          </div>
          <div class="editor-meta">
            <dl>
              <template v-for="(item, idx) in c.intentMetaItems" :key="idx">
                <dt>{{ item[0] }}</dt>
                <dd>{{ item[1] }}</dd>
              </template>
            </dl>
          </div>
        </div>
      </section>

      <!-- ========== Room III — Method beats ========== -->
      <section id="method" class="room" data-tone="sunken" aria-labelledby="method-heading">
        <div class="folio-bar" aria-hidden="true">
          <span class="folio-numeral">III</span>
          <span class="folio-kicker">{{ c.methodLabel }}</span>
          <span class="folio-page">03 / 06</span>
        </div>

        <div class="room-header">
          <span class="room-numeral-large">{{ c.methodLabel }}</span>
          <h2 id="method-heading">{{ c.methodTitle }}</h2>
          <span class="room-header-meta">{{ c.methodMeta }} · 03 / 06</span>
        </div>

        <div class="method-beats">
          <article v-for="beat in c.methodBeats" :key="beat.num">
            <span>{{ beat.num }}</span>
            <h3>{{ beat.title }}</h3>
            <p>{{ beat.body }}</p>
          </article>
        </div>
      </section>

      <!-- ========== Room IV — Floor Plan (project index) ========== -->
      <section id="floor-plan" class="room" aria-labelledby="floor-heading">
        <div class="asterism-divider" aria-hidden="true">
          <Ornament name="asterism" />
        </div>

        <div class="folio-bar" aria-hidden="true">
          <span class="folio-numeral">IV</span>
          <span class="folio-kicker">{{ c.floorLabel }}</span>
          <span class="folio-page">04 / 06</span>
        </div>

        <div class="room-header">
          <span class="room-numeral-large">{{ c.floorLabel }}</span>
          <h2 id="floor-heading">{{ c.floorTitle }}</h2>
          <span class="room-header-meta">{{ c.floorMeta }} · 04 / 06</span>
        </div>

        <nav class="floor-plan" aria-label="Project index">
          <div class="floor-plan-head" aria-hidden="true">
            <span>{{ c.floorHead[0] }}</span>
            <span>{{ c.floorHead[1] }}</span>
            <span>{{ c.floorHead[2] }}</span>
            <span></span>
            <span>{{ c.floorHead[4] }}</span>
          </div>

          <a
            v-for="(project, index) in projects"
            :key="project.title"
            :href="`#project-${index}`"
            class="room-row"
            @click.prevent="goToRoom(`project-${index}`)"
          >
            <span class="room-numeral">Room {{ romanFor(index + 1) }}</span>
            <span class="room-plate-code">{{ project.plateCode }}</span>
            <span class="room-title">
              <span class="room-title-text">{{ project.title }}</span>
              <span class="leader-dots" aria-hidden="true"></span>
            </span>
            <span></span>
            <span class="room-meta">
              <span class="meta-year">{{ project.year }}</span>
              {{ project.summary }}
            </span>
          </a>
        </nav>
      </section>

      <!-- ========== Project rooms (one plate spread per project) ========== -->
      <section
        v-for="(project, index) in projects"
        :id="`project-${index}`"
        :key="`project-room-${index}`"
        class="room"
        :data-tone="index % 2 === 1 ? 'sunken' : null"
        :aria-labelledby="`project-${index}-heading`"
      >
        <div class="folio-bar" aria-hidden="true">
          <span class="folio-numeral">{{ romanFor(index + 1) }}</span>
          <span class="folio-kicker">Plate {{ project.plateCode }} · {{ project.title }}</span>
          <span class="folio-page">Room {{ romanFor(index + 1) }} of {{ projects.length }}</span>
        </div>

        <div class="plate-spread">
          <div class="plate-label" aria-hidden="true">
            Room {{ romanFor(index + 1) }} · {{ project.plateCode }}
          </div>

          <figure class="plate-frame plate-typeset" :data-tone="project.accent || 'copper'">
            <div class="plate-glyph" aria-hidden="true">{{ monogramFor(project.title) }}</div>
            <figcaption class="plate-foot">
              <span>{{ project.plateCode }}</span>
              <span>{{ project.year }} · {{ project.role }}</span>
            </figcaption>
          </figure>

          <div class="plate-caption">
            <dl class="wall-label">
              <dt>Year</dt>
              <dd>{{ project.year }}</dd>
              <dt>Role</dt>
              <dd>{{ project.role }}</dd>
              <dt>Plate</dt>
              <dd>{{ project.plateCode }}</dd>
            </dl>

            <h2 :id="`project-${index}-heading`" class="plate-title">
              {{ project.title }}
            </h2>

            <p class="plate-summary">{{ project.summary }}</p>

            <a :href="project.link" target="_blank" rel="noreferrer" class="text-link plate-source">
              {{ c.source }}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <div class="plate-rule" aria-hidden="true"></div>
        </div>

        <div v-if="project.caseStudy" class="curator-note">
          <aside class="margin-note" aria-hidden="true">
            <span class="margin-roman">{{ romanFor(index + 1) }}</span>
            <span v-if="index === 0" class="margin-fleuron">
              <Ornament name="fleuron" />
            </span>
            <span>Curator’s note</span>
          </aside>

          <div class="curator-body">
            <article>
              <span class="curator-kicker"><em>i.</em> {{ c.constraint }}</span>
              <p>{{ project.caseStudy.constraint }}</p>
            </article>
            <article>
              <span class="curator-kicker"><em>ii.</em> {{ c.decision }}</span>
              <p>{{ project.caseStudy.decision }}</p>
            </article>
            <article>
              <span class="curator-kicker"><em>iii.</em> {{ c.outcome }}</span>
              <p>{{ project.caseStudy.outcome }}</p>
            </article>
          </div>

          <div class="curator-meta">
            <span>Stack</span>
            <div class="tag-row">
              <span v-for="tag in project.tags" :key="tag" class="tag-chip">{{ tag }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ========== Room V — Career index ========== -->
      <section id="career" class="room" aria-labelledby="career-heading">
        <div class="folio-bar" aria-hidden="true">
          <span class="folio-numeral">V</span>
          <span class="folio-kicker">{{ c.careerLabel }}</span>
          <span class="folio-page">05 / 06</span>
        </div>

        <div class="room-header">
          <span class="room-numeral-large">{{ c.careerLabel }}</span>
          <h2 id="career-heading">{{ c.careerTitle }}</h2>
          <span class="room-header-meta">{{ c.careerMeta }} · 05 / 06</span>
        </div>

        <div class="career-rows" role="list">
          <article
            v-for="(item, index) in profile.timelineItems"
            :key="`${item.period}-${item.title}`"
            class="room-row"
            role="listitem"
          >
            <span class="room-numeral">Entry {{ String(index + 1).padStart(2, '0') }}</span>
            <span class="career-period">{{ item.period }}</span>
            <span class="room-title">
              {{ item.title }}
              <span class="career-role">{{ item.role }}</span>
            </span>
            <span></span>
            <span class="room-meta">{{ item.description }}</span>
          </article>
        </div>

        <div class="skill-list">
          <aside class="margin-note" aria-hidden="true">{{ c.skillLabel }}</aside>
          <div class="skill-body">
            <article v-for="group in profile.skillGroups" :key="group.category">
              <span>{{ group.category }}</span>
              <p>{{ group.items.join(' · ') }}</p>
            </article>
          </div>
          <div class="curator-meta">
            <span>{{ c.educationLabel }}</span>
            <ul class="ledger-list" role="list">
              <li v-for="edu in profile.educationItems" :key="edu.institution" class="ledger-row">
                <span class="ledger-tier">{{ edu.tier }}</span>
                <span class="ledger-period">{{ edu.period }}</span>
                <span class="ledger-institution">{{ edu.institution }}</span>
                <span class="ledger-degree">{{ edu.degree }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ========== Room VI — Back wall (contact) ========== -->
      <section id="contact" class="room" data-tone="sunken" aria-labelledby="contact-heading">
        <div class="folio-bar" aria-hidden="true">
          <span class="folio-numeral">VI</span>
          <span class="folio-kicker">{{ c.contactLabel }}</span>
          <span class="folio-page">06 / 06</span>
        </div>

        <div class="room-header">
          <span class="room-numeral-large">{{ c.contactLabel }}</span>
          <h2 id="contact-heading">{{ c.contactTitle }}</h2>
          <span class="room-header-meta">{{ c.contactMeta }} · 06 / 06</span>
        </div>

        <div class="editor-note">
          <aside class="margin-note" aria-hidden="true">Closing</aside>
          <div class="editor-body">
            <p class="first-paragraph">{{ c.contactBody }}</p>
            <div class="contact-actions">
              <a :href="`mailto:${profile.contactActions.emailValue}`" class="btn">
                <Mail class="btn-icon" aria-hidden="true" />
                {{ c.sendEmail }}
              </a>
              <a href="https://linkedin.com/in/farid-aprilian" target="_blank" rel="noreferrer" class="btn btn-ghost">
                <Linkedin class="btn-icon" aria-hidden="true" />
                {{ c.linkedin }}
              </a>
              <a :href="`tel:${profile.contactActions.callValue}`" class="btn btn-ghost">
                <Phone class="btn-icon" aria-hidden="true" />
                {{ c.phone }}
              </a>
            </div>
          </div>
          <div class="editor-meta">
            <dl>
              <dt>Email</dt>
              <dd>{{ profile.contactActions.emailValue }}</dd>
              <dt>Phone</dt>
              <dd>{{ profile.contactActions.callValue }}</dd>
              <dt>LinkedIn</dt>
              <dd>{{ profile.contactActions.linkedinValue }}</dd>
            </dl>
          </div>
        </div>
      </section>

      <!-- ========== Colophon ========== -->
      <section id="colophon" class="room" aria-labelledby="colophon-heading">
        <div class="folio-bar" aria-hidden="true">
          <span class="folio-numeral">·</span>
          <span class="folio-kicker">{{ c.colophonLabel }}</span>
          <span class="folio-page">end · {{ currentYear }}</span>
        </div>

        <div class="room-header">
          <span class="room-numeral-large">{{ c.colophonLabel }}</span>
          <h2 id="colophon-heading">{{ c.colophonTitle }}</h2>
          <span class="room-header-meta">{{ currentYear }}</span>
        </div>

        <div class="colophon-list">
          <aside class="margin-note" aria-hidden="true">
            <Ornament name="wax-seal" class="margin-seal" />
            <span>About this site</span>
          </aside>
          <div class="colophon-body">
            <dl>
              <template v-for="(row, idx) in c.colophonBody" :key="idx">
                <dt>{{ row[0] }}</dt>
                <dd>{{ row[1] }}</dd>
              </template>
            </dl>
          </div>
          <div class="colophon-key">
            <strong>PR.MMYY key</strong>
            <span>PR — project</span>
            <span>MM — month commenced</span>
            <span>YY — year commenced</span>
          </div>
        </div>
      </section>
    </main>

    <footer class="catalog-footer">
      <span class="footer-start">{{ c.footerLeft }}</span>
      <span class="footer-center">{{ c.footerCenter }}</span>
      <span class="footer-end">© {{ currentYear }} FA</span>
    </footer>
  </div>
</template>
