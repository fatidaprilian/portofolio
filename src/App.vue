<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
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
import CustomCursor from './components/CustomCursor.vue'

gsap.registerPlugin(ScrollTrigger)

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
const showPreloader = ref(true)
const counterRef = ref(null)

// -----------------------------------------------------------------
// Copy (Bilingual & Normal Portfolio Sectioning)
// -----------------------------------------------------------------
const copy = {
  id: {
    skip: 'Lewati ke konten utama',
    issue: 'Pilihan Karya',
    eyebrow: 'Desain & Pengembangan Web',
    coverHeadline: ['Halo, saya Farid Eka.', 'Full-Stack & Agentic Engineer.'],
    coverBody:
      'Saya membangun sistem web berskala produksi dan arsitektur AI agentic. Berfokus pada integrasi kokoh dan antarmuka yang dirancang dengan niat.',
    ctaView: 'Lihat Portfolio',
    ctaContact: 'Hubungi Saya',
    ctaDownloadCv: 'Unduh CV',



    
    homeLabel: 'Beranda',
    aboutLabel: 'Tentang',
    worksLabel: 'Karya',
    skillsLabel: 'Keahlian',
    experienceLabel: 'Pengalaman',
    contactLabel: 'Kontak',
    
    aboutTitle: 'Mendesain produk digital dengan tujuan.',
    aboutBodyP1:
      'Bagi saya, tampilan antarmuka adalah ruang untuk berkomunikasi. Setiap elemen di layar harus memiliki alasan, susunan yang jelas, dan alur yang menuntun pembaca secara alami.',
    aboutBodyP2:
      'Dengan menggabungkan panduan visual dan kode pemrograman yang rapi, saya memastikan produk digital tidak hanya menarik tetapi juga mudah digunakan, cepat, dan mudah dirawat ke depannya.',
    aboutPullQuote: '“Detail halus yang tidak berlebihan adalah cara terbaik menunjukkan keahlian.”',
    
    worksTitle: 'Pilihan Karya',
    worksMeta: 'Daftar Proyek',
    ctaDetails: 'Lihat Detail',
    
    skillsTitle: 'Peralatan Teknis & Desain',
    skillsMeta: 'Teknologi yang Digunakan',
    
    experienceTitle: 'Perjalanan Karir',
    experienceMeta: 'Riwayat Pekerjaan',
    
    contactTitle: 'Mari Bekerja Sama',
    contactMeta: 'Terbuka untuk diskusi',
    contactBody:
      'Jika Anda membutuhkan rekan kerja yang peduli pada alur produk, detail desain, dan sistem kode yang kokoh, silakan kirim pesan.',
    sendEmail: 'Kirim Email',
    phone: 'Telepon',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    
    colophonLabel: 'Informasi Situs',
    colophonTitle: 'Spesifikasi Pembuatan',
    colophonBody: [
      ['Tipografi', 'Inter (Sistem), JetBrains Mono (Data), Fraunces (Kutipan).'],
      ['Teknologi', 'Vue 3, Vite, Tailwind CSS, Lenis (scroll halus), GSAP (animasi).'],
      ['Aksesibilitas', 'Memenuhi standar kontras yang baik, mendukung penggunaan keyboard.'],
      ['Skema Warna', 'Sistem warna OKLCH dengan pilihan mode Terang & Gelap.'],
    ],
    footerLeft: 'Portfolio 2026 / dirancang di browser',
    themeLabels: { auto: 'Otomatis', light: 'Terang', dark: 'Gelap' },
    
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
    eyebrow: 'Web Design & Development',
    coverHeadline: ['Hi, I\'m Farid Eka.', 'Full-Stack & Agentic Engineer.'],
    coverBody:
      'I build production-grade web systems and agentic AI architectures. Focused on robust integrations and intentionally designed interfaces.',
    ctaView: 'View Portfolio',
    ctaContact: 'Get in Touch',
    ctaDownloadCv: 'Download CV',



    
    homeLabel: 'Home',
    aboutLabel: 'About',
    worksLabel: 'Works',
    skillsLabel: 'Skills',
    experienceLabel: 'Experience',
    contactLabel: 'Contact',
    
    aboutTitle: 'Designing digital products with purpose.',
    aboutBodyP1:
      'For me, an interface is a communication space. Every element on the screen must have a clear reason, logical hierarchy, and a natural flow that guides the user.',
    aboutBodyP2:
      'By combining visual guidelines with clean code, I ensure digital products are not only beautiful but also accessible, fast, and easy to maintain.',
    aboutPullQuote: '“A subtle detail that is never over-decorated is the quietest way to show skill.”',
    
    worksTitle: 'Selected Works',
    worksMeta: 'Project List',
    ctaDetails: 'View Details',
    
    skillsTitle: 'Technical & Design Tools',
    skillsMeta: 'Technologies Used',
    
    experienceTitle: 'Career Timeline',
    experienceMeta: 'Work History',
    
    contactTitle: 'Let\'s Collaborate',
    contactMeta: 'Open for discussions',
    contactBody:
      'If you need a collaborator who cares deeply about product flows, design details, and robust code systems, let\'s start talking.',
    sendEmail: 'Send Email',
    phone: 'Phone',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    
    colophonLabel: 'Site Information',
    colophonTitle: 'Build Specifications',
    colophonBody: [
      ['Typography', 'Inter (System), JetBrains Mono (Data), Fraunces (Quotes).'],
      ['Technologies', 'Vue 3, Vite, Tailwind CSS, Lenis (smooth scroll), GSAP (animation).'],
      ['Accessibility', 'Meets good contrast standards, fully supports keyboard navigation.'],
      ['Color Scheme', 'OKLCH color system with Light & Dark mode options.'],
    ],
    footerLeft: 'Portfolio 2026 / designed in browser',
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

const lenisTicker = (time) => {
  if (lenis) lenis.raf(time * 1000)
}

const initLenis = () => {
  if (isReducedMotion()) return
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  })

  // Sync scroll events with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Use GSAP ticker to run Lenis raf loop
  gsap.ticker.add(lenisTicker)

  // Set lag smoothing to 0 to prevent synchronization jumps
  gsap.ticker.lagSmoothing(0)
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
  
  // Fade in nav immediately
  gsap.to('header.top-nav', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
  
  // Initialize mask children starts to translateY(115%) and rotated in 3D
  gsap.set(root.querySelectorAll('.mask-reveal-child'), { y: '115%', rotationX: -60, transformPerspective: 800, transformOrigin: "50% 100%" })
  
  tl.from(root.querySelector('.section-kicker'), { y: 15, opacity: 0, duration: 0.7 })
    .to(root.querySelectorAll('.mask-reveal-child'), { y: '0%', rotationX: 0, duration: 1.2, stagger: 0.12, ease: "power4.out" }, '-=0.45')
    .from(root.querySelector('.hero-desc'), { y: 20, rotationX: -30, opacity: 0, transformPerspective: 800, transformOrigin: "50% 0%", duration: 0.8, ease: "power3.out" }, '-=0.8')
    .from(root.querySelector('.hero-actions'), { y: 12, opacity: 0, duration: 0.5 }, '-=0.5')
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
  showPreloader.value = false
  playOpeningSequence()
})

onUnmounted(() => {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
  gsap.ticker.remove(lenisTicker)
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

  <CustomCursor />
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
