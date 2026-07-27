<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { getCareerProfileByLanguage } from './data/careerProfile'
import { getProjectsByLanguage } from './data/projects'

// Component imports representing the premium modular system
import Navbar from './components/layout/Navbar.vue'
import Hero from './components/sections/Hero.vue'
import About from './components/sections/About.vue'
import Works from './components/sections/Works.vue'
import Skills from './components/sections/Skills.vue'
import Experience from './components/sections/Experience.vue'
import Contact from './components/sections/Contact.vue'
import Footer from './components/layout/Footer.vue'
import SpecDrawer from './components/ui/SpecDrawer.vue'
import CustomCursor from './components/ui/CustomCursor.vue'
import { copy } from './data/locales.js'

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
