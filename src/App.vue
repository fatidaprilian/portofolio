<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-vue-next'
import { getCareerProfileByLanguage } from './data/careerProfile'
import { getProjectsByLanguage } from './data/projects'

const currentYear = new Date().getFullYear()
const lang = ref('id')
const activeSection = ref('home')
const scrollProgress = ref(0)
const isScrolled = ref(false)
const isLoading = ref(true)
const isContentReady = ref(false)
const loaderProgress = ref(9)
const loaderStage = ref('Checking paper stock')

const sectionIds = ['home', 'intent', 'process', 'projects', 'career', 'contact']
const loaderStages = [
  'Checking paper stock',
  'Drawing registration marks',
  'Composing type columns',
  'Binding project spreads',
  'Opening Issue 01',
]

const copy = {
  id: {
    skip: 'Lewati ke konten utama',
    issue: 'Issue 01',
    prepress: 'Pre-Press Check',
    ready: 'Issue ready',
    folio: 'Portofolio Farid Eka Aprilian',
    eyebrow: 'Creative Developer Portfolio',
    role: 'Designer-minded developer',
    heroLine1: 'Produk yang',
    heroLine2: 'berpikir seperti',
    heroLine3: 'editorial.',
    heroBody:
      'Saya membangun web product dengan rasa desain, struktur teknis, dan proof-of-work yang bisa diperiksa.',
    ctaView: 'Buka proyek',
    ctaGithub: 'GitHub',
    intentLabel: 'Editor Note',
    intentTitle: 'Bukan sekadar portfolio. Ini argumen visual.',
    intentQuote:
      'Kalau kode punya arsitektur, interface juga harus punya sikap.',
    intentBody:
      'Setiap bagian dibuat seperti halaman majalah: ada hirarki, ritme, aksen, dan bukti kerja. Tujuannya bukan ramai, tapi punya keputusan.',
    processLabel: 'Typesetting Grid',
    processTitle: 'Cara kerja dibentuk sebagai sistem editorial.',
    projectsLabel: 'Feature Spreads',
    projectsTitle: 'Project sebagai artikel utama, bukan kartu katalog.',
    openingCredits: 'Opening Credits',
    constraint: 'Constraint',
    decision: 'Decision',
    outcome: 'Outcome',
    source: 'Lihat Source',
    careerLabel: 'Issue Index',
    careerTitle: 'Timeline produksi dan stack.',
    contactLabel: 'Back Cover',
    contactTitle: 'Frame berikutnya bisa kita mulai.',
    contactBody:
      'Kalau butuh developer yang bisa ikut mikir produk, motion, dan struktur engineering, saya terbuka untuk ngobrol.',
    sendEmail: 'Kirim Email',
    phone: 'Telepon',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    footerText: 'Dibangun dengan Vue, disusun sebagai editorial issue.',
    rail: {
      home: 'Cover',
      intent: 'Note',
      process: 'Process',
      projects: 'Work',
      career: 'Index',
      contact: 'Back',
    },
    beats: [
      { num: '01', title: 'Intent', body: 'Membaca tujuan produk dan batasan sebelum memilih bentuk visual atau teknis.' },
      { num: '02', title: 'System', body: 'Membentuk alur, state, dan struktur supaya UI tidak hanya terlihat bagus.' },
      { num: '03', title: 'Motion', body: 'Gerak dipakai untuk continuity, feedback, dan hierarchy, bukan dekorasi.' },
      { num: '04', title: 'Proof', body: 'Hasil akhir tetap bisa dilacak lewat repository, constraint, keputusan, dan outcome.' },
    ],
  },
  en: {
    skip: 'Skip to main content',
    issue: 'Issue 01',
    prepress: 'Pre-Press Check',
    ready: 'Issue ready',
    folio: 'Farid Eka Aprilian Portfolio',
    eyebrow: 'Creative Developer Portfolio',
    role: 'Designer-minded developer',
    heroLine1: 'Products that',
    heroLine2: 'think like',
    heroLine3: 'editorial.',
    heroBody:
      'I build web products with design taste, technical structure, and inspectable proof-of-work.',
    ctaView: 'Open projects',
    ctaGithub: 'GitHub',
    intentLabel: 'Editor Note',
    intentTitle: 'Not just a portfolio. A visual argument.',
    intentQuote:
      'If code has architecture, an interface should have a point of view.',
    intentBody:
      'Every section behaves like a magazine page: hierarchy, rhythm, accent, and evidence. The goal is not noise, but decisions.',
    processLabel: 'Typesetting Grid',
    processTitle: 'The working method becomes an editorial system.',
    projectsLabel: 'Feature Spreads',
    projectsTitle: 'Projects as feature articles, not catalogue cards.',
    openingCredits: 'Opening Credits',
    constraint: 'Constraint',
    decision: 'Decision',
    outcome: 'Outcome',
    source: 'View Source',
    careerLabel: 'Issue Index',
    careerTitle: 'Production timeline and stack.',
    contactLabel: 'Back Cover',
    contactTitle: 'The next frame can start here.',
    contactBody:
      'If you need a developer who can think through product, motion, and engineering structure, I am open to talk.',
    sendEmail: 'Send Email',
    phone: 'Phone',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    footerText: 'Built with Vue, composed as an editorial issue.',
    rail: {
      home: 'Cover',
      intent: 'Note',
      process: 'Process',
      projects: 'Work',
      career: 'Index',
      contact: 'Back',
    },
    beats: [
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

const railSections = computed(() =>
  sectionIds.map((id, index) => ({
    id,
    label: c.value.rail[id],
    num: String(index + 1).padStart(2, '0'),
  }))
)

const heroWords = computed(() => {
  const lines = [c.value.heroLine1, c.value.heroLine2, c.value.heroLine3]

  return lines.flatMap((line, lineIndex) => {
    const words = line.split(' ')

    return words.map((word, wordIndex) => ({
      text: `${word}${wordIndex === words.length - 1 ? '' : '\u00A0'}`,
      key: `${lineIndex}-${wordIndex}-${word}`,
      accent: lineIndex === 1,
      lineBreak: wordIndex === words.length - 1,
    }))
  })
})

let lenis = null
let lenisRaf = null
let scrollRafId = null
let sceneObserver = null
let cursorEl = null
let cursorRafId = null
let mouseX = -100
let mouseY = -100
let currentX = -100
let currentY = -100
let gsapContext = null
let matchMediaContext = null

const isReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const wait = (ms) => new Promise((resolve) => {
  window.setTimeout(resolve, ms)
})

const waitForFrame = () => new Promise((resolve) => {
  requestAnimationFrame(() => requestAnimationFrame(resolve))
})

const withTimeout = (promise, timeoutMs) => Promise.race([
  promise,
  wait(timeoutMs),
])

const preloadImage = (src, timeoutMs = 1400) => new Promise((resolve) => {
  const image = new Image()
  let done = false

  const finish = () => {
    if (done) return
    done = true
    image.onload = null
    image.onerror = null
    resolve()
  }

  window.setTimeout(finish, timeoutMs)
  image.onload = finish
  image.onerror = finish
  image.decoding = 'async'
  image.src = src
})

const setLoaderStep = (index, progress) => {
  loaderStage.value = loaderStages[index] ?? loaderStages[loaderStages.length - 1]
  loaderProgress.value = progress
}

const updateScroll = () => {
  if (scrollRafId) return

  scrollRafId = requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0
    isScrolled.value = window.scrollY > 36
    scrollRafId = null
  })
}

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (!element) return
  element.scrollIntoView({ behavior: isReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}

const toggleLang = () => {
  lang.value = lang.value === 'id' ? 'en' : 'id'
  localStorage.setItem('portfolio-lang', lang.value)
}

const animateCursor = () => {
  currentX += (mouseX - currentX) * 0.18
  currentY += (mouseY - currentY) * 0.18

  if (cursorEl) {
    cursorEl.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`
  }

  cursorRafId = requestAnimationFrame(animateCursor)
}

const onMouseMove = (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
}

const setCursorHover = (value) => {
  if (cursorEl) cursorEl.classList.toggle('is-hovering', value)
}

const initCursor = () => {
  cursorEl = document.getElementById('cursor')
  if (!cursorEl || !window.matchMedia('(pointer: fine)').matches) return

  window.addEventListener('mousemove', onMouseMove)
  animateCursor()

  document.querySelectorAll('a, button, .feature-spread').forEach((element) => {
    element.addEventListener('mouseenter', () => setCursorHover(true))
    element.addEventListener('mouseleave', () => setCursorHover(false))
  })
}

const initSectionObserver = () => {
  sceneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const id = entry.target.getAttribute('id')
        if (id && sectionIds.includes(id)) {
          activeSection.value = id
        }
        entry.target.classList.add('is-scene-visible')
      })
    },
    { threshold: 0.28, rootMargin: '-8% 0px -42% 0px' }
  )

  document.querySelectorAll('[data-scene]').forEach((element) => sceneObserver.observe(element))
}

const showAllMotionTargets = () => {
  document.querySelectorAll('[data-reveal], .cover-word, .issue-section').forEach((element) => {
    element.classList.add('is-visible')
  })
}

const initAnimations = () => {
  showAllMotionTargets()

  if (isReducedMotion()) {
    return
  }

  gsap.registerPlugin(ScrollTrigger)
  gsapContext = gsap.context(() => {
    gsap.fromTo('.cover-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.75, ease: 'power3.out' })
    gsap.fromTo(
      '.cover-word',
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.78, stagger: 0.055, ease: 'power4.out', delay: 0.08 }
    )
    gsap.fromTo(
      '.cover-meta, .cover-actions, .cover-proof',
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.45 }
    )

    gsap.utils.toArray('[data-motion="column-reflow"]').forEach((section) => {
      gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
      })
        .from(section.querySelector('.section-strike'), { scaleX: 0, duration: 0.65, ease: 'power3.out' })
        .from(section.querySelectorAll('.editor-column'), {
          y: 46,
          opacity: 0,
          duration: 0.72,
          stagger: 0.12,
          ease: 'power3.out',
        }, '-=0.22')
        .from(section.querySelector('.pull-quote'), {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.78,
          ease: 'power4.inOut',
        }, '-=0.35')
    })

    gsap.utils.toArray('[data-motion="rule-grid"]').forEach((section) => {
      gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })
        .from(section.querySelector('.section-strike'), { scaleX: 0, duration: 0.65, ease: 'power3.out' })
        .from(section.querySelectorAll('.beat-cell'), {
          y: 34,
          opacity: 0,
          duration: 0.58,
          stagger: { amount: 0.42, from: 'start' },
          ease: 'power3.out',
        }, '-=0.12')
    })

    gsap.utils.toArray('.feature-spread').forEach((spread, index) => {
      const direction = index % 2 === 0 ? -1 : 1
      gsap.timeline({
        scrollTrigger: { trigger: spread, start: 'top 74%', once: true },
      })
        .from(spread.querySelector('.spread-number'), {
          xPercent: 18 * direction,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        })
        .from(spread.querySelector('.spread-text'), {
          y: 48,
          opacity: 0,
          duration: 0.72,
          ease: 'power3.out',
        }, '-=0.36')
        .from(spread.querySelector('.spread-breakdown'), {
          x: 54 * direction,
          rotate: 1.2 * direction,
          opacity: 0,
          duration: 0.78,
          ease: 'power3.out',
        }, '-=0.48')
        .from(spread.querySelectorAll('.tag-chip'), {
          y: 18,
          opacity: 0,
          duration: 0.42,
          stagger: 0.045,
          ease: 'power2.out',
        }, '-=0.22')
    })

    gsap.utils.toArray('[data-motion="index"]').forEach((section) => {
      gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })
        .from(section.querySelector('.section-strike'), { scaleX: 0, duration: 0.65, ease: 'power3.out' })
        .from(section.querySelectorAll('.index-row'), {
          x: -42,
          opacity: 0,
          duration: 0.56,
          stagger: 0.09,
          ease: 'power3.out',
        }, '-=0.18')
        .from(section.querySelectorAll('.skill-ticket'), {
          y: 24,
          opacity: 0,
          duration: 0.48,
          stagger: 0.06,
          ease: 'power3.out',
        }, '-=0.24')
    })

    gsap.utils.toArray('[data-motion="back-cover"]').forEach((section) => {
      gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 74%', once: true },
      })
        .from(section.querySelector('.back-cover-card'), {
          y: 54,
          opacity: 0,
          duration: 0.76,
          ease: 'power3.out',
        })
        .from(section.querySelector('.contact-sticker'), {
          scale: 0.7,
          rotate: -8,
          opacity: 0,
          duration: 0.62,
          ease: 'back.out(1.6)',
        }, '-=0.36')
    })
  })

  matchMediaContext = gsap.matchMedia()
  matchMediaContext.add('(min-width: 900px)', () => {
    gsap.utils.toArray('.issue-section').forEach((section, index) => {
      gsap.to(section.querySelector('.chapter-ghost'), {
        yPercent: index % 2 === 0 ? -8 : 8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      })
    })
  })

  ScrollTrigger.refresh()
}

const initLenis = () => {
  if (isReducedMotion()) return

  lenis = new Lenis({
    duration: 1.08,
    easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
  })

  lenis.on('scroll', ScrollTrigger.update)

  const run = (time) => {
    if (!lenis) return
    lenis.raf(time)
    lenisRaf = requestAnimationFrame(run)
  }

  lenisRaf = requestAnimationFrame(run)
}

const prepareEntry = async () => {
  document.documentElement.classList.add('is-preloading')
  setLoaderStep(0, 9)

  const minimumDuration = wait(isReducedMotion() ? 450 : 1750)

  try {
    setLoaderStep(1, 28)
    await nextTick()
    await waitForFrame()

    setLoaderStep(2, 52)
    if (document.fonts?.ready) {
      await withTimeout(document.fonts.ready, 1700)
    }

    setLoaderStep(3, 78)
    await preloadImage('/avatar-github.jpg')
    await waitForFrame()

    setLoaderStep(4, 92)
    await minimumDuration
  } finally {
    isContentReady.value = true
    loaderProgress.value = 100
    loaderStage.value = c.value.ready
    await wait(isReducedMotion() ? 80 : 520)
    isLoading.value = false
    document.documentElement.classList.remove('is-preloading')
    await waitForFrame()
    initAnimations()
    updateScroll()
  }
}

onMounted(() => {
  const saved = localStorage.getItem('portfolio-lang')
  if (saved === 'id' || saved === 'en') lang.value = saved

  initLenis()
  initCursor()
  initSectionObserver()
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('resize', updateScroll)
  prepareEntry()
})

onUnmounted(() => {
  document.documentElement.classList.remove('is-preloading')
  window.removeEventListener('scroll', updateScroll)
  window.removeEventListener('resize', updateScroll)
  window.removeEventListener('mousemove', onMouseMove)
  if (scrollRafId) cancelAnimationFrame(scrollRafId)
  if (cursorRafId) cancelAnimationFrame(cursorRafId)
  if (lenisRaf) cancelAnimationFrame(lenisRaf)
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
  if (sceneObserver) sceneObserver.disconnect()
  if (matchMediaContext) matchMediaContext.revert()
  if (gsapContext) gsapContext.revert()
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<template>
  <div id="cursor" aria-hidden="true"></div>

  <div
    class="editorial-app"
    :class="{ 'is-loading': isLoading, 'is-ready': !isLoading }"
    :style="{ '--scroll-progress': `${scrollProgress}%` }"
    :aria-busy="isLoading ? 'true' : 'false'"
  >
    <Transition name="loader-fade">
      <section v-if="isLoading" class="prepress-loader" aria-live="polite" aria-label="Loading portfolio">
        <div class="loader-marks" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="loader-sheet">
          <p class="loader-kicker">{{ c.prepress }}</p>
          <h1>{{ c.issue }}</h1>
          <div class="loader-strike" aria-hidden="true">
            <span :style="{ width: `${loaderProgress}%` }"></span>
          </div>
          <div class="loader-meta">
            <span>{{ loaderStage }}</span>
            <strong>{{ loaderProgress }}%</strong>
          </div>
          <p class="loader-folio">{{ c.folio }}</p>
        </div>
      </section>
    </Transition>

    <a href="#main-content" class="skip-link">{{ c.skip }}</a>

    <div class="progress-bar" aria-hidden="true"></div>

    <nav class="site-nav" :class="{ 'is-scrolled': isScrolled }" aria-label="Primary navigation">
      <button type="button" class="brand-mark" @click="scrollToSection('home')" aria-label="Go to cover">
        <span>FA</span>
        <small>{{ c.issue }}</small>
      </button>

      <div class="nav-actions">
        <a href="https://github.com/fatidaprilian" target="_blank" rel="noreferrer" class="nav-icon-btn" :aria-label="c.github">
          <Github aria-hidden="true" />
        </a>
        <button type="button" class="lang-btn" @click="toggleLang" aria-label="Switch language">
          {{ lang === 'id' ? 'EN' : 'ID' }}
        </button>
      </div>
    </nav>

    <aside class="issue-rail" aria-label="Issue sections">
      <button
        v-for="section in railSections"
        :key="section.id"
        type="button"
        class="rail-item"
        :class="{ 'is-active': activeSection === section.id }"
        @click="scrollToSection(section.id)"
      >
        <span>{{ section.num }}</span>
        <strong>{{ section.label }}</strong>
      </button>
    </aside>

    <main
      id="main-content"
      class="issue-main"
      :inert="isLoading"
      :aria-hidden="isLoading ? 'true' : 'false'"
    >
      <section id="home" class="cover-section issue-section" data-scene>
        <span class="chapter-ghost" aria-hidden="true">01</span>
        <div class="cover-grid">
          <div class="cover-meta">
            <span class="cover-strike"></span>
            <p>{{ c.eyebrow }}</p>
          </div>

          <div class="cover-copy">
            <p class="role-tag">{{ c.role }}</p>
            <h1 class="cover-title">
              <span
                v-for="word in heroWords"
                :key="word.key"
                class="word-wrap"
                :class="{ 'is-accent': word.accent, 'is-break': word.lineBreak }"
              >
                <span class="cover-word">{{ word.text }}</span>
              </span>
            </h1>
            <p class="cover-body">{{ c.heroBody }}</p>

            <div class="cover-actions">
              <button type="button" class="btn-primary" @click="scrollToSection('projects')">
                <ArrowDown class="btn-icon" aria-hidden="true" />
                {{ c.ctaView }}
              </button>
              <a href="https://github.com/fatidaprilian" target="_blank" rel="noreferrer" class="btn-secondary">
                <Github class="btn-icon" aria-hidden="true" />
                {{ c.ctaGithub }}
              </a>
            </div>
          </div>

          <div class="cover-proof">
            <figure class="cover-proof-figure">
              <img
                src="/avatar-github.jpg"
                alt="Farid Eka Aprilian GitHub profile portrait"
                decoding="async"
                fetchpriority="high"
              />
            </figure>
            <div class="cover-proof-meta">
              <span>{{ c.issue }}</span>
              <strong>{{ projects.length }}</strong>
              <p>repository-backed feature spreads</p>
            </div>
          </div>
        </div>
      </section>

      <section id="intent" class="issue-section editor-note-section" data-scene data-motion="column-reflow">
        <span class="chapter-ghost" aria-hidden="true">02</span>
        <div class="section-shell editor-note-grid">
          <div class="section-header">
            <p class="section-label">{{ c.intentLabel }}</p>
            <span class="section-strike" aria-hidden="true"></span>
            <h2>{{ c.intentTitle }}</h2>
          </div>

          <blockquote class="pull-quote editor-column">{{ c.intentQuote }}</blockquote>
          <p class="editor-column note-body">{{ c.intentBody }}</p>
          <div class="editor-column note-stamp" aria-hidden="true">
            <span>Opinionated</span>
            <strong>Layout / Motion / Code</strong>
          </div>
        </div>
      </section>

      <section id="process" class="issue-section process-section" data-scene data-motion="rule-grid">
        <span class="chapter-ghost" aria-hidden="true">03</span>
        <div class="section-shell">
          <div class="section-header section-header-wide">
            <p class="section-label">{{ c.processLabel }}</p>
            <span class="section-strike" aria-hidden="true"></span>
            <h2>{{ c.processTitle }}</h2>
          </div>

          <div class="beats-grid">
            <article v-for="beat in c.beats" :key="beat.num" class="beat-cell">
              <span>{{ beat.num }}</span>
              <h3>{{ beat.title }}</h3>
              <p>{{ beat.body }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="projects" class="issue-section projects-intro" data-scene>
        <span class="chapter-ghost" aria-hidden="true">04</span>
        <div class="section-shell project-intro-grid">
          <p class="section-label">{{ c.projectsLabel }}</p>
          <h2>{{ c.projectsTitle }}</h2>
          <p>{{ c.projectsLabel }} / {{ projects.length }} selected works / GitHub source evidence</p>
        </div>
      </section>

      <section
        v-for="(project, index) in projects"
        :key="project.title"
        class="feature-spread issue-section"
        :class="`spread-variant-${(index % 3) + 1}`"
        :data-page="String(index + 5).padStart(2, '0')"
      >
        <span class="spread-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>

        <div class="spread-text">
          <p class="spread-kicker">{{ c.openingCredits }} / {{ project.year }}</p>
          <h2>{{ project.title }}</h2>
          <p>{{ project.summary }}</p>
          <div class="spread-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag-chip">{{ tag }}</span>
          </div>
          <a :href="project.link" target="_blank" rel="noreferrer" class="text-link">
            {{ c.source }}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div class="spread-breakdown" v-if="project.caseStudy">
          <article>
            <span>{{ c.constraint }}</span>
            <p>{{ project.caseStudy.constraint }}</p>
          </article>
          <article>
            <span>{{ c.decision }}</span>
            <p>{{ project.caseStudy.decision }}</p>
          </article>
          <article>
            <span>{{ c.outcome }}</span>
            <p>{{ project.caseStudy.outcome }}</p>
          </article>
        </div>
      </section>

      <section id="career" class="issue-section career-section" data-scene data-motion="index">
        <span class="chapter-ghost" aria-hidden="true">10</span>
        <div class="section-shell career-layout">
          <div class="section-header">
            <p class="section-label">{{ c.careerLabel }}</p>
            <span class="section-strike" aria-hidden="true"></span>
            <h2>{{ c.careerTitle }}</h2>
          </div>

          <div class="index-list">
            <article v-for="(item, index) in profile.timelineItems" :key="`${item.period}-${item.title}`" class="index-row">
              <span class="index-page">{{ String(index + 11).padStart(2, '0') }}</span>
              <div>
                <p>{{ item.period }}</p>
                <h3>{{ item.title }}</h3>
                <small>{{ item.role }}</small>
              </div>
              <p>{{ item.description }}</p>
            </article>
          </div>

          <div class="skill-ticket-grid">
            <article v-for="group in profile.skillGroups" :key="group.category" class="skill-ticket">
              <span>{{ group.category }}</span>
              <p>{{ group.items.join(' / ') }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" class="issue-section contact-section" data-scene data-motion="back-cover">
        <span class="chapter-ghost" aria-hidden="true">99</span>
        <div class="section-shell back-cover-card">
          <span class="contact-sticker">{{ c.contactLabel }}</span>
          <h2>{{ c.contactTitle }}</h2>
          <p>{{ c.contactBody }}</p>

          <div class="contact-actions">
            <a :href="`mailto:${profile.contactActions.emailValue}`" class="btn-primary">
              <Mail class="btn-icon" aria-hidden="true" />
              {{ c.sendEmail }}
            </a>
            <a href="https://linkedin.com/in/farid-aprilian" target="_blank" rel="noreferrer" class="btn-secondary">
              <Linkedin class="btn-icon" aria-hidden="true" />
              {{ c.linkedin }}
            </a>
            <a :href="`tel:${profile.contactActions.callValue}`" class="btn-secondary">
              <Phone class="btn-icon" aria-hidden="true" />
              {{ c.phone }}
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <span>{{ c.footerText }}</span>
      <span>{{ currentYear }}</span>
    </footer>
  </div>
</template>
