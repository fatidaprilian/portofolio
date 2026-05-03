<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-vue-next'
import { getCareerProfileByLanguage } from './data/careerProfile'
import { getProjectsByLanguage } from './data/projects'
import Hero from './components/Hero.vue'

// ─── State ───────────────────────────────────────────
const currentYear = new Date().getFullYear()
const lang = ref('id')
const activeChapter = ref('home')
const scrollProgress = ref(0)
const isScrolled = ref(false)
const scrollWrapper = ref(null)
const trackIndex = ref(0)
const isDragging = ref(false)

const chapterIds = ['home', 'process', 'projects', 'career', 'contact']

// ─── Copy ─────────────────────────────────────────────
const copy = {
  id: {
    skip: 'Lewati ke konten utama',
    eyebrow: 'Creative Developer Portfolio',
    role: 'Designer-minded developer',
    heroLine1: 'Produk yang',
    heroLine2: 'bercerita',
    heroLine3: 'sendiri.',
    heroBody: 'Saya membangun web product dengan rasa desain, struktur teknis, dan proof-of-work yang bisa diperiksa.',
    ctaView: 'Lihat Proyek',
    ctaGithub: 'GitHub',
    processNum: '02',
    processLabel: 'Process',
    processTitle: 'Dari brief ke sistem yang bisa dipakai.',
    processBody: 'Setiap chapter kerja dibaca sebagai adegan: konteks, constraint, keputusan, dan hasil.',
    projectsNum: '03',
    projectsLabel: 'Projects',
    projectsTitle: 'Proyek sebagai chapter,',
    projectsTitleEm: 'bukan kartu katalog.',
    openingCredits: 'Opening Credits',
    technicalBreakdown: 'Technical Breakdown',
    constraint: 'Constraint',
    decision: 'Decision',
    outcome: 'Outcome',
    source: 'Lihat Source',
    careerNum: '04',
    careerLabel: 'Career',
    careerTitle: 'Timeline',
    careerTitleEm: 'produksi.',
    careerBody: 'Perjalanan, riset, dan stack sebagai continuity notes.',
    contactNum: '05',
    contactLabel: 'Contact',
    contactTitle: 'Mari mulai',
    contactTitleEm: 'kolaborasi.',
    contactBody: 'Kalau butuh developer yang bisa ikut mikir produk, motion, dan struktur engineering.',
    sendEmail: 'Kirim Email',
    phone: 'Telepon',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    footerText: 'Dibangun dengan Vue — disusun sebagai editorial.',
    rail: { home: 'Opening', process: 'Process', projects: 'Projects', career: 'Career', contact: 'Contact' },
    beats: [
      { num: '01', title: 'Intent', body: 'Membaca tujuan produk dan batasan sebelum memilih bentuk visual atau teknis.' },
      { num: '02', title: 'System', body: 'Membentuk alur, state, dan struktur supaya UI tidak hanya terlihat bagus.' },
      { num: '03', title: 'Motion', body: 'Gerak dipakai untuk continuity, feedback, dan hierarchy — bukan dekorasi.' },
      { num: '04', title: 'Proof', body: 'Hasil akhir tetap bisa dilacak lewat repository, constraint, keputusan, dan outcome.' },
    ],
  },
  en: {
    skip: 'Skip to main content',
    eyebrow: 'Creative Developer Portfolio',
    role: 'Designer-minded developer',
    heroLine1: 'Products that',
    heroLine2: 'tell their own',
    heroLine3: 'story.',
    heroBody: 'I build web products with design taste, technical structure, and inspectable proof-of-work.',
    ctaView: 'View Projects',
    ctaGithub: 'GitHub',
    processNum: '02',
    processLabel: 'Process',
    processTitle: 'From brief to usable system.',
    processBody: 'Every work chapter is read as a scene: context, constraint, decision, and outcome.',
    projectsNum: '03',
    projectsLabel: 'Projects',
    projectsTitle: 'Projects as chapters,',
    projectsTitleEm: 'not catalogue cards.',
    openingCredits: 'Opening Credits',
    technicalBreakdown: 'Technical Breakdown',
    constraint: 'Constraint',
    decision: 'Decision',
    outcome: 'Outcome',
    source: 'View Source',
    careerNum: '04',
    careerLabel: 'Career',
    careerTitle: 'Production',
    careerTitleEm: 'timeline.',
    careerBody: 'Experience, research, and stack as continuity notes.',
    contactNum: '05',
    contactLabel: 'Contact',
    contactTitle: 'Let\'s start',
    contactTitleEm: 'collaborating.',
    contactBody: 'If you need a developer who thinks through product, motion, and engineering structure.',
    sendEmail: 'Send Email',
    phone: 'Phone',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    footerText: 'Built with Vue — staged as editorial.',
    rail: { home: 'Opening', process: 'Process', projects: 'Projects', career: 'Career', contact: 'Contact' },
    beats: [
      { num: '01', title: 'Intent', body: 'Read product goals and constraints before choosing visual or technical form.' },
      { num: '02', title: 'System', body: 'Shape flow, state, and structure so the UI is not only good looking.' },
      { num: '03', title: 'Motion', body: 'Motion for continuity, feedback, and hierarchy — not empty decoration.' },
      { num: '04', title: 'Proof', body: 'Final result stays traceable through repository, constraint, decision, and outcome.' },
    ],
  },
}

const c = computed(() => copy[lang.value])
const projects = computed(() => getProjectsByLanguage(lang.value))
const profile = computed(() => getCareerProfileByLanguage(lang.value))
const railChapters = computed(() =>
  chapterIds.map((id, i) => ({ id, label: c.value.rail[id], num: String(i + 1).padStart(2, '0') }))
)
const trackTotal = computed(() => projects.value.length)

// ─── Helpers ──────────────────────────────────────────
const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const splitIntoWords = (text) =>
  text.split(' ').map((w) => ({ word: w + '\u00A0' }))

// ─── Scroll state ─────────────────────────────────────
let scrollRafId = null
const updateScroll = () => {
  if (scrollRafId) return
  scrollRafId = requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0
    isScrolled.value = window.scrollY > 40
    scrollRafId = null
  })
}

// ─── Navigation ───────────────────────────────────────
const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  
  if (isReducedMotion()) {
    el.scrollIntoView({ behavior: 'auto', block: 'start' })
    return
  }

  const offsetLeft = el.offsetLeft
  window.scrollTo({ top: offsetLeft, behavior: 'smooth' })
}

const toggleLang = () => {
  lang.value = lang.value === 'id' ? 'en' : 'id'
  localStorage.setItem('portfolio-lang', lang.value)
}

// Track navigation removed in favor of horizontal scroll

// ─── Custom cursor ────────────────────────────────────
let cursorEl = null
let cursorRafId = null
let mouseX = -100, mouseY = -100
let curX = -100, curY = -100

const animateCursor = () => {
  curX += (mouseX - curX) * 0.15
  curY += (mouseY - curY) * 0.15
  if (cursorEl) cursorEl.style.transform = `translate(calc(${curX}px - 50%), calc(${curY}px - 50%))`
  cursorRafId = requestAnimationFrame(animateCursor)
}

const onMouseMove = (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const setCursorHover = (v) => {
  if (cursorEl) cursorEl.classList.toggle('is-hovering', v)
}

// ─── Observers ────────────────────────────────────────
let sceneObs = null
let revealObs = null

const initObservers = () => {
  sceneObs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      const id = e.target.id
      if (e.isIntersecting) {
        if (id && chapterIds.includes(id)) activeChapter.value = id
        e.target.classList.add('is-scene-visible')
      }
    }),
    { threshold: 0.2, rootMargin: '-10% 0px -40% 0px' }
  )
  document.querySelectorAll('[data-scene]').forEach((el) => sceneObs.observe(el))

  revealObs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible')
        revealObs.unobserve(e.target)
      }
    }),
    { threshold: 0.06 }
  )
  document.querySelectorAll('[data-reveal]').forEach((el) => revealObs.observe(el))

  // Fallback reveal
  setTimeout(() => {
    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) =>
      el.classList.add('is-visible')
    )
  }, 2600)
}

// ─── Word stagger (hero) ──────────────────────────────
const triggerHeroWords = () => {
  if (isReducedMotion()) {
    document.querySelectorAll('.word-reveal-inner').forEach((el) => el.classList.add('is-visible'))
    document.querySelectorAll('.eyebrow-line').forEach((el) => el.classList.add('is-drawn'))
    return
  }
  setTimeout(() => {
    document.querySelectorAll('.eyebrow-line').forEach((el) => el.classList.add('is-drawn'))
  }, 200)
  document.querySelectorAll('.word-reveal-inner').forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), 300 + i * 60)
  })
}

// ─── Lenis & GSAP ─────────────────────────────────────
let lenis = null
let lenisRaf = null

// ─── Lifecycle ────────────────────────────────────────
onMounted(() => {
  const saved = localStorage.getItem('portfolio-lang')
  if (saved === 'id' || saved === 'en') lang.value = saved

  // Custom cursor
  cursorEl = document.getElementById('cursor')
  if (cursorEl && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', onMouseMove)
    animateCursor()

    document.querySelectorAll('a, button, .project-card, .track-arrow, .nav-icon-btn').forEach((el) => {
      el.addEventListener('mouseenter', () => setCursorHover(true))
      el.addEventListener('mouseleave', () => setCursorHover(false))
    })
  }

  // Lenis smooth scroll
  if (!isReducedMotion()) {
    lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = (time) => { if (!lenis) return; lenis.raf(time); lenisRaf = requestAnimationFrame(raf) }
    lenisRaf = requestAnimationFrame(raf)
  }

  // GSAP
  if (!isReducedMotion()) {
    gsap.registerPlugin(ScrollTrigger)
    
    setTimeout(() => {
      const wrapper = scrollWrapper.value
      if (wrapper) {
        gsap.to(wrapper, {
          x: () => -(wrapper.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-scroll-container",
            pin: true,
            scrub: 1,
            end: () => "+=" + (wrapper.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true
          }
        })
      }
    }, 100)
  }

  initObservers()
  triggerHeroWords()
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('resize', updateScroll)

  // Drag events
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('mouseleave', stopDrag)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
  window.removeEventListener('resize', updateScroll)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('mouseleave', stopDrag)
  if (scrollRafId) cancelAnimationFrame(scrollRafId)
  if (cursorRafId) cancelAnimationFrame(cursorRafId)
  if (lenisRaf) cancelAnimationFrame(lenisRaf)
  if (lenis) { lenis.destroy(); lenis = null }
  if (sceneObs) sceneObs.disconnect()
  if (revealObs) revealObs.disconnect()
})
</script>

<template>
  <!-- Custom cursor -->
  <div id="cursor" aria-hidden="true"></div>

  <div class="editorial-app" :style="{ '--scroll-progress': `${scrollProgress}%` }">
    <a href="#main-content" class="skip-link">{{ c.skip }}</a>

    <!-- Progress bar (top) -->
    <div class="progress-bar" aria-hidden="true"></div>

    <!-- Nav -->
    <header class="site-nav" :class="{ 'is-scrolled': isScrolled }">
      <a href="#home" class="brand-mark" @click.prevent="scrollTo('home')">
        <span class="brand-dot"></span>
        Farid Eka Aprilian
      </a>
      <div class="nav-actions">
        <a
          href="https://github.com/fatidaprilian"
          target="_blank"
          rel="noreferrer"
          class="nav-icon-btn"
          :aria-label="c.github"
        >
          <Github />
        </a>
        <a
          href="https://linkedin.com/in/farid-aprilian"
          target="_blank"
          rel="noreferrer"
          class="nav-icon-btn"
          :aria-label="c.linkedin"
        >
          <Linkedin />
        </a>
        <button type="button" class="lang-btn" @click="toggleLang">
          {{ lang === 'id' ? 'EN' : 'ID' }}
        </button>
      </div>
    </header>

    <!-- Chapter rail (right side, desktop) -->
    <nav class="chapter-rail" aria-label="Portfolio chapters">
      <button
        v-for="ch in railChapters"
        :key="ch.id"
        type="button"
        class="rail-item"
        :class="{ 'is-active': activeChapter === ch.id }"
        @click="scrollTo(ch.id)"
      >
        {{ ch.label }}
      </button>
    </nav>

    <main id="main-content" class="horizontal-scroll-container">
      <div ref="scrollWrapper" class="horizontal-scroll-wrapper">
      <!-- ──────── HERO ──────── -->
      <Hero :c="c" @scroll-to="scrollTo" class="horizontal-section" />

      <!-- ──────── PROCESS ──────── -->
      <section id="process" class="horizontal-section page-section" data-scene>
        <div class="section-inner">
          <div class="section-label" data-reveal>
            <span class="section-num">{{ c.processNum }}</span>
            <span class="section-rule" aria-hidden="true"></span>
          </div>
          <h2 class="section-title" data-reveal>{{ c.processTitle }}</h2>
          <p class="section-body" data-reveal>{{ c.processBody }}</p>

          <div class="beats-grid">
            <div
              v-for="beat in c.beats"
              :key="beat.num"
              class="beat-cell"
              data-reveal
            >
              <span class="beat-num">{{ beat.num }}</span>
              <h3 class="beat-title">{{ beat.title }}</h3>
              <p class="beat-body">{{ beat.body }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ──────── PROJECTS ──────── -->
      <section 
        v-for="(project, idx) in projects" 
        :key="'proj-'+idx" 
        :id="idx === 0 ? 'projects' : ''" 
        class="horizontal-section page-section flex items-center justify-center" 
        data-scene
      >
        <div class="section-inner w-full">
           <div class="flex flex-col lg:flex-row gap-12 w-full">
              <!-- Left: Opening Credits -->
              <div class="flex-1 flex flex-col justify-center">
                 <span class="card-number mb-6 block text-8xl font-display text-paper-warm border-b border-rule pb-4">{{ String(idx + 1).padStart(2, '0') }}</span>
                 <span class="card-role text-accent-blue font-bold uppercase tracking-widest text-sm mb-4 block">{{ project.role }} · {{ project.year }}</span>
                 <h2 class="card-title text-5xl lg:text-7xl font-editorial font-semibold leading-tight text-ink mb-6">{{ project.title }}</h2>
                 <p class="card-summary text-lg text-ink-muted leading-relaxed max-w-xl">{{ project.summary }}</p>
                 <div class="mt-10">
                   <a :href="project.link" target="_blank" class="btn-primary inline-flex items-center gap-2">
                     {{ c.source }} <ArrowUpRight class="w-5 h-5" />
                   </a>
                 </div>
              </div>
              
              <!-- Right: Technical Breakdown -->
              <div class="flex-1 bg-paper-warm p-10 lg:p-14 border border-rule flex flex-col justify-center">
                 <h3 class="font-display text-3xl text-ink mb-8 border-b border-rule pb-6">{{ c.technicalBreakdown || 'Technical Breakdown' }}</h3>
                 <div v-if="project.caseStudy" class="space-y-8">
                    <div>
                      <span class="text-accent-red font-bold uppercase text-xs tracking-wider block mb-2">{{ c.constraint }}</span>
                      <p class="text-ink-muted leading-relaxed text-base">{{ project.caseStudy.constraint }}</p>
                    </div>
                    <div>
                      <span class="text-accent-red font-bold uppercase text-xs tracking-wider block mb-2">{{ c.decision }}</span>
                      <p class="text-ink-muted leading-relaxed text-base">{{ project.caseStudy.decision }}</p>
                    </div>
                    <div>
                      <span class="text-accent-red font-bold uppercase text-xs tracking-wider block mb-2">{{ c.outcome }}</span>
                      <p class="text-ink-muted leading-relaxed text-base">{{ project.caseStudy.outcome }}</p>
                    </div>
                 </div>
                 
                 <div class="card-tags flex flex-wrap gap-2 mt-10">
                   <span v-for="tag in project.tags" :key="tag" class="px-3 py-1 bg-ink/5 border border-ink/10 text-accent-blue text-xs font-bold uppercase tracking-wider rounded">{{ tag }}</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <!-- ──────── CAREER ──────── -->
      <section id="career" class="horizontal-section page-section" data-scene>
        <div class="section-inner">
          <div class="section-label" data-reveal>
            <span class="section-num">{{ c.careerNum }}</span>
            <span class="section-rule" aria-hidden="true"></span>
          </div>
          <h2 class="section-title" data-reveal>
            {{ c.careerTitle }} <em>{{ c.careerTitleEm }}</em>
          </h2>
          <p class="section-body" data-reveal>{{ c.careerBody }}</p>

          <div class="career-grid">
            <!-- Timeline -->
            <div class="timeline" data-reveal>
              <div
                v-for="item in profile.timelineItems"
                :key="`${item.period}-${item.title}`"
                class="timeline-item"
              >
                <span class="timeline-period">{{ item.period }}</span>
                <h3 class="timeline-title">{{ item.title }}</h3>
                <span class="timeline-role">{{ item.role }}</span>
                <p class="timeline-desc">{{ item.description }}</p>
              </div>
            </div>

            <!-- Skills -->
            <div class="skills-list" data-reveal>
              <div
                v-for="group in profile.skillGroups"
                :key="group.category"
                class="skill-group"
              >
                <span class="skill-group-label">{{ group.category }}</span>
                <p class="skill-group-items">{{ group.items.join(' · ') }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ──────── CONTACT ──────── -->
      <section id="contact" class="horizontal-section page-section" data-scene>
        <div class="section-inner">
          <div class="section-label" data-reveal>
            <span class="section-num">{{ c.contactNum }}</span>
            <span class="section-rule" aria-hidden="true"></span>
          </div>

          <div class="contact-inner" data-reveal>
            <h2 class="contact-title">
              {{ c.contactTitle }} <em>{{ c.contactTitleEm }}</em>
            </h2>
            <p class="contact-body">{{ c.contactBody }}</p>
            <div class="contact-actions">
              <a
                :href="`mailto:${profile.contactActions.emailValue}`"
                class="btn-primary"
              >
                <Mail class="btn-icon" aria-hidden="true" />
                {{ c.sendEmail }}
              </a>
              <a
                href="https://linkedin.com/in/farid-aprilian"
                target="_blank"
                rel="noreferrer"
                class="btn-secondary"
              >
                <Linkedin class="btn-icon" aria-hidden="true" />
                {{ c.linkedin }}
              </a>
              <a
                :href="`tel:${profile.contactActions.callValue}`"
                class="btn-secondary"
              >
                <Phone class="btn-icon" aria-hidden="true" />
                {{ c.phone }}
              </a>
            </div>
          </div>
        </div>
      </section>
      </div> <!-- end horizontal-scroll-wrapper -->
    </main>

    <footer class="site-footer">
      <span>{{ c.footerText }}</span>
      <span>{{ currentYear }}</span>
    </footer>
  </div>
</template>
