<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { getCareerProfileByLanguage } from './data/careerProfile'
import { getProjectsByLanguage } from './data/projects'

// Component imports representing the premium modular system
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Works from './components/Works.vue'
import Skills from './components/Skills.vue'
import Experience from './components/Experience.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import SpecDrawer from './components/SpecDrawer.vue'

// -----------------------------------------------------------------
// State & Core Config
// -----------------------------------------------------------------
const currentYear = new Date().getFullYear()
const lang = ref('id')
const themePref = ref('auto') // auto | light | dark
const resolvedTheme = ref('light')
const themeAnnouncement = ref('')
const activeProject = ref(null) // Holds selected project for slide-in drawer
const activeSection = ref('home')

// -----------------------------------------------------------------
// Copy (Bilingual & Normal Portfolio Sectioning)
// -----------------------------------------------------------------
const copy = {
  id: {
    skip: 'Lewati ke konten utama',
    issue: 'Karya Pilihan',
    eyebrow: 'Desainer UI/UX & Pengembang Kreatif',
    coverHeadline: ['Membangun antarmuka ', 'yang hidup dan ', { italic: 'bermakna.' }],
    coverBody:
      'Saya menjembatani kode performa tinggi dan desain visual yang matang. Membuat produk digital interaktif yang intuitif, aksesibel, dan dirancang dengan ketelitian penuh.',
    ctaView: 'Lihat Portfolio',
    ctaContact: 'Hubungi Saya',
    
    homeLabel: 'Beranda',
    aboutLabel: 'Tentang',
    worksLabel: 'Proyek',
    skillsLabel: 'Keahlian',
    experienceLabel: 'Pengalaman',
    contactLabel: 'Kontak',
    
    aboutTitle: 'Membuat produk digital dengan alasan.',
    aboutBodyP1:
      'Bagi saya, antarmuka adalah media komunikasi. Setiap elemen di layar harus memiliki alasan, hierarki visual yang jelas, dan ritme yang menuntun pembaca secara intuitif.',
    aboutBodyP2:
      'Dengan menggabungkan kepekaan visual seorang desainer grafis dan ketelitian teknis seorang developer, saya memastikan produk digital tidak hanya memukau tetapi juga aksesibel, berkinerja tinggi, dan mantap dirawat.',
    aboutPullQuote: '“Detail halus yang tidak didekorasikan secara berlebih adalah cara terbaik menunjukkan keahlian.”',
    
    worksTitle: 'Karya Pilihan',
    worksMeta: 'Koleksi Proyek',
    ctaDetails: 'Detail Kasus',
    
    skillsTitle: 'Peralatan Teknis & Desain',
    skillsMeta: 'Teknologi dan Perangkat Kerja',
    
    experienceTitle: 'Perjalanan Karir',
    experienceMeta: 'Professional Milestones',
    
    contactTitle: 'Mari Bekerja Sama',
    contactMeta: 'Terbuka untuk diskusi',
    contactBody:
      'Jika Anda membutuhkan desainer-developer yang peduli pada alur produk, detail mikro, dan arsitektur engineering yang solid, silakan kirim pesan.',
    sendEmail: 'Kirim Email',
    phone: 'Telepon',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    
    colophonLabel: 'Kolofon',
    colophonTitle: 'Spesifikasi Teknis Situs',
    colophonBody: [
      ['Tipografi', 'Inter (System/Controls), JetBrains Mono (Specs/Data), Fraunces (Italics commentary).'],
      ['Pembangunan', 'Vue 3, Vite, Tailwind CSS, Lenis smooth scrolling, GSAP orchestration.'],
      ['Aksesibilitas', 'Memenuhi standar kontras WCAG 2.2 AA floor, mendukung penuh keyboard dan reduced motion.'],
      ['Skema Warna', 'Sistem token OKLCH semantik dengan dual mode derived (Alabaster Prism & Obsidian Cyber).'],
    ],
    footerLeft: 'Portfolio 2026 / dirancang di browser',
    themeLabels: { auto: 'Auto', light: 'Light', dark: 'Dark' },
    
    formName: 'Nama Lengkap',
    formEmail: 'Alamat Email',
    formMessage: 'Pesan Anda',
    formSend: 'Kirim Pesan',
    formSending: 'Mengirim...',
    formSuccess: 'Pesan Anda berhasil dikirim!',
    formError: 'Gagal mengirim pesan. Silakan coba lagi.'
  },
  en: {
    skip: 'Skip to main content',
    issue: 'Selected Works',
    eyebrow: 'UI/UX Designer & Creative Developer',
    coverHeadline: ['Crafting interfaces ', 'that are alive and ', { italic: 'purposeful.' }],
    coverBody:
      'I bridge high-performance engineering and visual system authority. Designing interactive digital products that are intuitive, accessible, and structured with absolute care.',
    ctaView: 'View Portfolio',
    ctaContact: 'Get in Touch',
    
    homeLabel: 'Home',
    aboutLabel: 'About',
    worksLabel: 'Works',
    skillsLabel: 'Skills',
    experienceLabel: 'Experience',
    contactLabel: 'Contact',
    
    aboutTitle: 'Designing digital products with intent.',
    aboutBodyP1:
      'For me, an interface is a communication space. Every element on the screen must have an architectural reason, clear visual hierarchy, and rhythm that guides readers.',
    aboutBodyP2:
      'Combining the visual sensibilities of a designer with the precision code of a developer, I ensure digital products are not only beautiful but also accessible, highly performant, and maintainable.',
    aboutPullQuote: '“A subtle detail that is never over-decorated is the quietest way to show skill.”',
    
    worksTitle: 'Selected Works',
    worksMeta: 'Project Index',
    ctaDetails: 'Case Details',
    
    skillsTitle: 'Technical & Creative Stack',
    skillsMeta: 'Technologies and Instruments',
    
    experienceTitle: 'Professional Timeline',
    experienceMeta: 'Career Index',
    
    contactTitle: 'Let\'s Collaborate',
    contactMeta: 'Open for discussions',
    contactBody:
      'If you need a developer who cares deeply about product flows, micro-interactions, and robust engineering architecture, let\'s start talking.',
    sendEmail: 'Send Email',
    phone: 'Phone',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    
    colophonLabel: 'Colophon',
    colophonTitle: 'Sitemap Specs',
    colophonBody: [
      ['Typography', 'Inter (System/Controls), JetBrains Mono (Specs/Data), Fraunces (Italics commentary).'],
      ['Build', 'Vue 3, Vite, Tailwind CSS, Lenis smooth scrolling, GSAP orchestration.'],
      ['Accessibility', 'Contrast pass WCAG 2.2 AA floor, supports full keyboard navigation and reduced motion.'],
      ['Color space', 'OKLCH semantic role tokens with dual derived modes (Alabaster Prism & Obsidian Cyber).'],
    ],
    footerLeft: 'Portfolio 2026 / printed in browser',
    themeLabels: { auto: 'Auto', light: 'Light', dark: 'Dark' },
    
    formName: 'Full Name',
    formEmail: 'Email Address',
    formMessage: 'Your Message',
    formSend: 'Send Message',
    formSending: 'Sending...',
    formSuccess: 'Your message was sent successfully!',
    formError: 'Failed to send message. Please try again.'
  }
}

const c = computed(() => copy[lang.value])
const projects = computed(() => getProjectsByLanguage(lang.value))
const profile = computed(() => getCareerProfileByLanguage(lang.value))

// -----------------------------------------------------------------
// Theme Management (Dual Mode derived oklch)
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
  themeAnnouncement.value = `${c.value.themeLabels[pref]} theme active`
}

let mediaQuery = null
const onSchemeChange = () => {
  if (themePref.value === 'auto') applyTheme('auto')
}

// -----------------------------------------------------------------
// Language Switcher
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
// Smooth Scroll (Lenis)
// -----------------------------------------------------------------
let lenis = null
let lenisRaf = null

const initLenis = () => {
  if (isReducedMotion()) return
  lenis = new Lenis({
    duration: 1.1,
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
// Focus-Managed Navigation Scrolls
// -----------------------------------------------------------------
const goToSection = (id) => {
  activeSection.value = id
  const target = document.getElementById(id)
  if (!target) return
  
  if (lenis && !isReducedMotion()) {
    lenis.scrollTo(target, { offset: -80 })
  } else {
    target.scrollIntoView({ behavior: isReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }

  // Centering focus on target heading for optimal screen reader access
  window.setTimeout(() => {
    const heading = target.querySelector('h1, h2')
    if (heading) {
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
    }
  }, 400)
}

// -----------------------------------------------------------------
// Intersection Observer for Active Navigation
// -----------------------------------------------------------------
let observer = null
const initIntersectionObserver = () => {
  const sections = ['home', 'about', 'works', 'skills', 'experience', 'contact']
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' }
  )

  sections.forEach((secId) => {
    const el = document.getElementById(secId)
    if (el) observer.observe(el)
  })
}

// -----------------------------------------------------------------
// Intro Animation sequence
// -----------------------------------------------------------------
const playOpeningSequence = () => {
  if (isReducedMotion()) return
  const root = document.querySelector('#home')
  if (!root) return
  const tl = gsap.timeline({ defaults: { ease: 'cubic-bezier(0.22, 1, 0.36, 1)' } })
  tl.from(root.querySelector('.hero-headline'), { y: 36, opacity: 0, duration: 0.85 })
    .from(root.querySelector('.hero-desc'), { y: 20, opacity: 0, duration: 0.6 }, '-=0.45')
    .from(root.querySelector('.hero-actions'), { y: 16, opacity: 0, duration: 0.5 }, '-=0.35')
    .from(root.querySelector('.portrait-wrapper'), { scale: 0.92, opacity: 0, duration: 0.75 }, '-=0.7')
}

// -----------------------------------------------------------------
// Lifecycle
// -----------------------------------------------------------------
onMounted(async () => {
  // Restore language preference
  try {
    const savedLang = localStorage.getItem('portfolio-lang')
    if (savedLang === 'id' || savedLang === 'en') lang.value = savedLang
  } catch (_) {}

  // Restore theme preference
  let pref = 'auto'
  try {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved === 'auto' || saved === 'light' || saved === 'dark') pref = saved
  } catch (_) {}
  applyTheme(pref)

  // System theme changes listener
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', onSchemeChange)
  else mediaQuery.addListener(onSchemeChange)

  initLenis()
  initIntersectionObserver()
  await nextTick()
  playOpeningSequence()
})

onUnmounted(() => {
  if (lenisRaf) cancelAnimationFrame(lenisRaf)
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (mediaQuery) {
    if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', onSchemeChange)
    else mediaQuery.removeListener(onSchemeChange)
  }
})

watch(lang, () => {
  themeAnnouncement.value = `${c.value.themeLabels[themePref.value]} theme active`
})
</script>

<template>
  <a href="#home" class="sr-only focus:not-sr-only fixed top-4 left-4 z-50 bg-black text-white px-4 py-2 rounded-md font-semibold outline-none">{{ c.skip }}</a>

  <span class="sr-only" role="status" aria-live="polite">
    {{ themeAnnouncement }}
  </span>

  <!-- ========== Drifting Shaders Canvas ========== -->
  <div class="fluid-backdrop" aria-hidden="true">
    <div class="blob blob-one"></div>
    <div class="blob blob-two"></div>
    <div class="blob blob-three"></div>
  </div>

  <!-- ========== Premium Top Navigation Header ========== -->
  <Navbar
    :c="c"
    :themePref="themePref"
    :lang="lang"
    :activeSection="activeSection"
    @goToSection="goToSection"
    @applyTheme="applyTheme"
    @toggleLang="toggleLang"
  />

  <!-- ========== Main Content Sections ========== -->
  <main id="main-content">
    <Hero :c="c" @goToSection="goToSection" />
    
    <About :c="c" />
    
    <Works :c="c" :projects="projects" @selectProject="(p) => activeProject = p" />
    
    <Skills :c="c" :profile="profile" />
    
    <Experience :c="c" :profile="profile" />
    
    <Contact :c="c" :profile="profile" />
  </main>

  <!-- ========== Colophon Specifications & Global Footers ========== -->
  <Footer :c="c" :currentYear="currentYear" />

  <!-- ========== Slide-In Spec Sheet Drawer ========== -->
  <SpecDrawer
    v-if="activeProject"
    :activeProject="activeProject"
    :c="c"
    @close="activeProject = null"
  />
</template>

<style>
/* CSS transition definitions for drawer overlays */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active .spec-drawer, .fade-leave-active .spec-drawer {
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.fade-enter-from .spec-drawer, .fade-leave-to .spec-drawer {
  transform: translateX(100%);
}
</style>
