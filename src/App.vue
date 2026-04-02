<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { ChevronUp } from 'lucide-vue-next'
import Hero from './components/Hero.vue'
import MarqueeStats from './components/MarqueeStats.vue'
import CapabilityMatrix from './components/CapabilityMatrix.vue'
import CareerStory from './components/CareerStory.vue'
import StudioApproach from './components/StudioApproach.vue'
import ArchitectureSnapshot from './components/ArchitectureSnapshot.vue'
import ProjectGrid from './components/ProjectGrid.vue'
import Contact from './components/Contact.vue'
import ClosingCtaStrip from './components/ClosingCtaStrip.vue'
import BottomDock from './components/BottomDock.vue'
import CustomCursor from './components/CustomCursor.vue'
import Lenis from '@studio-freight/lenis'

const currentYear = new Date().getFullYear()
// Initialize from sessionStorage immediately to avoid single-frame flash
const isPageLoading = ref(
  typeof window !== 'undefined' ? !sessionStorage.getItem('portfolio-loader-seen') : true
)
const loadingProgressPercentage = ref(0)
const currentLanguage = ref('id')
const isScrollTopVisible = ref(false)
const activeGreetingIndex = ref(0)
const shuffledGreetings = ref([])
const isFontLoaded = ref(false)

const greetings = [
  'Hello',
  'Halo',
  'Nǐ hǎo',
  'Bonjour',
  'Hola',
  'Ciao',
  'Guten Tag',
  'Namaste',
  'Konnichiwa',
  'Annyeong',
  'Salam',
  'Sawasdee',
  'Merhaba',
  'Shalom',
  'Aloha'
]

const shuffleGreetingOrder = (greetingItems) => {
  const firstItem = greetingItems[0]
  const restItems = [...greetingItems.slice(1)]
  for (let currentIndex = restItems.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1))
    const currentItem = restItems[currentIndex]
    restItems[currentIndex] = restItems[randomIndex]
    restItems[randomIndex] = currentItem
  }
  return [firstItem, ...restItems]
}

const copyByLanguage = {
  id: {
    preparingPortfolio: 'Menyiapkan portofolio',
    footerTagline: 'Dibuat dengan Vue, dirancang dengan mindset produk.',
    quickLinks: 'Navigasi',
    connect: 'Hubungi',
    home: 'Beranda',
    work: 'Proyek',
    contact: 'Kontak',
    repositories: 'Repositori'
  },
  en: {
    preparingPortfolio: 'Preparing portfolio',
    footerTagline: 'Built with Vue, crafted with product mindset.',
    quickLinks: 'Quick Links',
    connect: 'Connect',
    home: 'Home',
    work: 'Work',
    contact: 'Contact',
    repositories: 'Repositories'
  }
}

let revealObserver
let sectionScrollObserver
let loadingProgressInterval
let loadingDoneTimeout
let loadingGreetingInterval
let loadingGreetingTimeout
let revealSafetyTimeout
let lenisInstance = null
let lenisAnimationFrameId = null

let isAppScrollScheduled = false

const updateScrollUiState = () => {
  if (isAppScrollScheduled) return
  isAppScrollScheduled = true
  requestAnimationFrame(() => {
    isScrollTopVisible.value = window.scrollY > 340
    isAppScrollScheduled = false
  })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const clearLoadingTimers = () => {
  if (loadingProgressInterval) { clearInterval(loadingProgressInterval); loadingProgressInterval = null }
  if (loadingDoneTimeout) { clearTimeout(loadingDoneTimeout); loadingDoneTimeout = null }
  if (loadingGreetingInterval) { clearInterval(loadingGreetingInterval); loadingGreetingInterval = null }
  if (loadingGreetingTimeout) { clearTimeout(loadingGreetingTimeout); loadingGreetingTimeout = null }
}

const initializeRevealObservers = () => {
  const revealElements = document.querySelectorAll('[data-reveal]')
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.01, rootMargin: '80px 0px 12% 0px' }
  )
  revealElements.forEach((elementItem) => revealObserver.observe(elementItem))

  const sectionElements = document.querySelectorAll('[data-scroll-section]')
  sectionScrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview')
          sectionScrollObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.01, rootMargin: '80px 0px 20% 0px' }
  )
  sectionElements.forEach((sectionElement) => sectionScrollObserver.observe(sectionElement))

  // Safety net: force all sections visible after 4s to prevent invisible content
  revealSafetyTimeout = setTimeout(() => {
    document.querySelectorAll('[data-scroll-section]:not(.is-inview)').forEach((sectionElement) => {
      sectionElement.classList.add('is-inview')
    })
    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((revealElement) => {
      revealElement.classList.add('is-visible')
    })
  }, 4000)
}

const runPageLoader = () => {
  const hasSeenLoader = sessionStorage.getItem('portfolio-loader-seen')
  if (hasSeenLoader) {
    isPageLoading.value = false
    loadingProgressPercentage.value = 100
    // On refresh/return visit: force everything visible immediately.
    // Browser scroll restoration races with IntersectionObserver, so
    // relying on observers here causes invisible sections mid-page.
    document.querySelectorAll('[data-scroll-section]').forEach((sectionElement) => {
      sectionElement.classList.add('is-inview')
    })
    document.querySelectorAll('[data-reveal]').forEach((revealElement) => {
      revealElement.classList.add('is-visible')
    })
    return
  }

  shuffledGreetings.value = greetings
  activeGreetingIndex.value = 0

  loadingGreetingTimeout = setTimeout(() => {
    // Array guarantees 'Hello' is at index 0
    shuffledGreetings.value = shuffleGreetingOrder(greetings)
    // Instantly move to index 1 so we don't hold 'Hello' for +140ms extra
    activeGreetingIndex.value = 1
    
    loadingGreetingInterval = setInterval(() => {
      activeGreetingIndex.value = (activeGreetingIndex.value + 1) % shuffledGreetings.value.length
    }, 140)
  }, 500)

  loadingProgressInterval = setInterval(() => {
    if (loadingProgressPercentage.value >= 92) return
    const nextProgressValue = loadingProgressPercentage.value + 4
    loadingProgressPercentage.value = Math.min(nextProgressValue, 92)
  }, 70)

  loadingDoneTimeout = setTimeout(() => {
    loadingProgressPercentage.value = 100
    sessionStorage.setItem('portfolio-loader-seen', 'true')
    setTimeout(() => {
      isPageLoading.value = false
      clearLoadingTimers()
      // Initialize observers after preloader fully dismissed
      initializeRevealObservers()
    }, 200)
  }, 1500)
}

const getActiveCopy = () => copyByLanguage[currentLanguage.value]
const getActiveGreeting = () => shuffledGreetings.value[activeGreetingIndex.value] ?? 'Hello'

const toggleLanguage = () => {
  const nextLanguage = currentLanguage.value === 'id' ? 'en' : 'id'
  currentLanguage.value = nextLanguage
  localStorage.setItem('portfolio-language', nextLanguage)
}

onMounted(() => {
  if (typeof document !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => {
      isFontLoaded.value = true
    })
    // Safe fallback in case fonts API acts up
    setTimeout(() => { isFontLoaded.value = true }, 800)
  } else {
    isFontLoaded.value = true
  }

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!shouldReduceMotion) {
    // Initialize Lenis for smooth premium scroll
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    const runLenisFrame = (time) => {
      if (!lenisInstance) return
      lenisInstance.raf(time)
      lenisAnimationFrameId = requestAnimationFrame(runLenisFrame)
    }
    lenisAnimationFrameId = requestAnimationFrame(runLenisFrame)
  }

  const storedLanguage = localStorage.getItem('portfolio-language')
  if (storedLanguage === 'id' || storedLanguage === 'en') {
    currentLanguage.value = storedLanguage
  }

  runPageLoader()
  updateScrollUiState()
  window.addEventListener('scroll', updateScrollUiState)
  window.addEventListener('resize', updateScrollUiState)
})

onUnmounted(() => {
  clearLoadingTimers()
  window.removeEventListener('scroll', updateScrollUiState)
  window.removeEventListener('resize', updateScrollUiState)
  if (revealObserver) revealObserver.disconnect()
  if (sectionScrollObserver) sectionScrollObserver.disconnect()
  if (revealSafetyTimeout) clearTimeout(revealSafetyTimeout)
  if (lenisAnimationFrameId) cancelAnimationFrame(lenisAnimationFrameId)
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
})
</script>

<template>
  <div class="font-sans antialiased text-text relative min-h-screen">
    
    <!-- ─── Skip-link for keyboard navigation ─── -->
    <a href="#main-content" class="skip-link">
      {{ currentLanguage === 'id' ? 'Lewati ke konten utama' : 'Skip to main content' }}
    </a>

    <CustomCursor />

    <!-- ─── Preloader (dark) ─── -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isPageLoading" class="preloader fixed inset-0 z-[100] flex items-center justify-center">
        <div class="w-[min(440px,84vw)]">
          <p class="text-[0.65rem] tracking-[0.26em] uppercase text-white/35">Farid Eka Aprilian</p>
          <div class="mt-4 h-[72px] md:h-[88px] flex items-center relative overflow-hidden transition-opacity duration-300" :style="{ opacity: isFontLoaded ? 1 : 0 }">
            <transition name="hello-crossfade">
              <p :key="`hello-${activeGreetingIndex}`" class="hello-loading-word absolute inset-y-0 flex items-center whitespace-nowrap">{{ getActiveGreeting() }}</p>
            </transition>
          </div>
          <div class="mt-4 preloader-bar">
            <span class="preloader-bar-progress" :style="{ width: `${loadingProgressPercentage}%` }"></span>
          </div>
          <div class="mt-2.5 flex items-center justify-between text-xs text-white/30">
            <span>{{ getActiveCopy().preparingPortfolio }}</span>
            <span>{{ loadingProgressPercentage }}%</span>
          </div>
          <div class="mt-3 h-2 flex items-center">
            <span :key="`haptic-${activeGreetingIndex}`" class="hello-haptic-cue" aria-hidden="true"></span>
          </div>
        </div>
      </div>
    </transition>

    <!-- ─── Scroll to top ─── -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <button
        v-if="isScrollTopVisible"
        type="button"
        @click="scrollToTop"
        class="scroll-top-button"
        aria-label="Scroll to top"
      >
        <ChevronUp class="h-4 w-4" />
      </button>
    </transition>

    <!-- ─── Language toggle ─ aligned top-right at same level as hero label ─── -->
    <div class="fixed top-[30px] right-5 md:right-8 lg:right-10 z-50">
      <button
        type="button"
        @click="toggleLanguage"
        class="text-[0.62rem] tracking-[0.18em] uppercase font-semibold min-h-[44px] px-3.5 py-2 rounded-lg border border-white/[0.14] bg-black/55 text-white/55 hover:text-white/85 hover:border-white/[0.25] transition backdrop-blur-sm"
        :aria-label="`Switch to ${currentLanguage === 'id' ? 'English' : 'Bahasa Indonesia'}`"
      >
        {{ currentLanguage === 'id' ? 'EN' : 'ID' }}
      </button>
    </div>

    <!-- ─── Bottom dock nav ─── -->
    <BottomDock :language="currentLanguage" />

    <!-- ─── Main content ─── -->
    <main id="main-content">
      <!-- Hero: dark section, no scroll-section wrapper -->
      <div data-scroll-section class="scroll-section is-inview">
        <Hero :language="currentLanguage" />
      </div>

      <!-- Marquee stats: dark strip, lives in hero zone -->
      <div style="background-color: #0d0b0a;">
        <MarqueeStats :language="currentLanguage" />
      </div>

      <!-- Color bridge: dark → warm cream -->
      <div class="color-bridge"></div>

      <!-- Visual rhythm:
           Light warm → Light warm → DARK editorial → Light warm → Light warm -->
      <div data-scroll-section class="scroll-section">
        <CapabilityMatrix :language="currentLanguage" />
      </div>
      <div data-scroll-section class="scroll-section section-warm-alt">
        <CareerStory :language="currentLanguage" />
      </div>
      <div data-scroll-section class="scroll-section section-dark">
        <StudioApproach :language="currentLanguage" :dark="true" />
      </div>
      <div data-scroll-section class="scroll-section">
        <ArchitectureSnapshot :language="currentLanguage" />
      </div>
      <div data-scroll-section class="scroll-section">
        <ProjectGrid :language="currentLanguage" />
      </div>
      <div data-scroll-section class="scroll-section">
        <Contact :language="currentLanguage" />
      </div>
    </main>

    <!-- ─── Closing CTA ─── -->
    <div data-scroll-section class="scroll-section">
      <ClosingCtaStrip :language="currentLanguage" />
    </div>

    <!-- ─── Footer ─── -->
    <footer class="pb-28">
      <div class="section-shell">
        <div class="border-t border-[#c9b297] pt-8 grid md:grid-cols-3 gap-6">
          <div>
            <p class="font-display text-xl text-[#3e2c23] tracking-wide">Farid Eka Aprilian</p>
            <p class="text-xs text-muted mt-1">{{ getActiveCopy().footerTagline }}</p>
            <p class="text-xs text-muted mt-1">&copy; {{ currentYear }}</p>
          </div>

          <div class="text-sm text-[#4a352a] space-y-2">
            <p class="text-xs uppercase tracking-[0.16em] text-muted">{{ getActiveCopy().quickLinks }}</p>
            <a href="#home" class="block underline-link hover:text-[#2f211a] transition">{{ getActiveCopy().home }}</a>
            <a href="#work" class="block underline-link hover:text-[#2f211a] transition">{{ getActiveCopy().work }}</a>
            <a href="#contact" class="block underline-link hover:text-[#2f211a] transition">{{ getActiveCopy().contact }}</a>
          </div>

          <div class="text-sm text-[#4a352a] space-y-2">
            <p class="text-xs uppercase tracking-[0.16em] text-muted">{{ getActiveCopy().connect }}</p>
            <a href="https://github.com/fatidaprilian" target="_blank" rel="noreferrer" class="block underline-link hover:text-[#2f211a] transition">GitHub</a>
            <a href="mailto:faridaprilian214@gmail.com" class="block underline-link hover:text-[#2f211a] transition">Email</a>
            <a href="https://linkedin.com/in/farid-aprilian" target="_blank" rel="noreferrer" class="block underline-link hover:text-[#2f211a] transition">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
