<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const props = defineProps({
  language: {
    type: String,
    default: 'id'
  }
})

const emit = defineEmits(['toggle-language'])

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSectionId = ref('home')

const navItemsByLanguage = {
  id: [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Project' },
    { id: 'contact', label: 'Kontak' }
  ],
  en: [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' }
  ]
}

const getCurrentNavItems = () => navItemsByLanguage[props.language] ?? navItemsByLanguage.id

let sectionObserver

const checkScroll = () => {
  isScrolled.value = window.scrollY > 12
}

const observeSections = () => {
  const sectionElements = getCurrentNavItems()
    .map((navigationItem) => document.getElementById(navigationItem.id))
    .filter(Boolean)

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSectionId.value = entry.target.id
        }
      })
    },
    { rootMargin: '-30% 0px -50% 0px', threshold: 0.05 }
  )

  sectionElements.forEach((sectionElement) => sectionObserver.observe(sectionElement))
}

onMounted(() => {
  checkScroll()
  window.addEventListener('scroll', checkScroll)
  observeSections()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
  if (sectionObserver) {
    sectionObserver.disconnect()
  }
})

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    isMobileMenuOpen.value = false
  }
}

const getPrimaryButtonLabel = () => (props.language === 'en' ? 'Start a project' : 'Hubungi saya')
const getLanguageButtonLabel = () => (props.language === 'en' ? 'ID' : 'EN')
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-4 md:px-8 pt-4 md:pt-6">
    <nav
      class="mx-auto max-w-7xl rounded-2xl transition-all duration-300 control-surface"
      :class="isScrolled
        ? 'shadow-[0_16px_44px_-26px_rgba(88,56,41,0.34)] border-[#b59073]'
        : 'shadow-none'"
    >
      <div class="flex items-center justify-between px-5 py-3.5 md:px-7">
        <button
          type="button"
          @click="scrollToSection('home')"
          class="font-display text-lg md:text-xl tracking-tight text-text inline-flex items-center gap-2"
        >
          <span>Farid</span>
          <span class="text-[10px] px-2 py-1 rounded-full border border-[#b59073] text-muted uppercase tracking-[0.2em]">Studio</span>
        </button>

        <div class="hidden md:flex items-center gap-3">
          <button
            v-for="item in getCurrentNavItems()"
            :key="item.id"
            type="button"
            @click="scrollToSection(item.id)"
            class="relative px-3 py-2 text-sm font-medium transition rounded-md"
            :class="activeSectionId === item.id ? 'text-text' : 'text-muted hover:text-text'"
          >
            {{ item.label }}
            <span
              class="absolute left-3 right-3 -bottom-[1px] h-[1px] bg-accent transition-transform duration-300"
              :class="activeSectionId === item.id ? 'scale-x-100' : 'scale-x-0'"
            ></span>
          </button>

          <button
            type="button"
            @click="scrollToSection('contact')"
            class="ml-1 rounded-xl bg-accent hover:bg-accent-hover text-[#f8f1e5] text-sm font-semibold px-4 py-2.5 transition active:scale-[0.98]"
          >
            {{ getPrimaryButtonLabel() }}
          </button>

          <button
            type="button"
            @click="emit('toggle-language')"
            class="rounded-xl border border-[#ba9b80] px-3 py-2 text-xs font-semibold tracking-[0.16em] text-[#5a4032] hover:bg-[#ead6bf]/70 transition"
          >
            {{ getLanguageButtonLabel() }}
          </button>
        </div>

        <button
          type="button"
          class="md:hidden text-muted hover:text-text transition"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Menu v-if="!isMobileMenuOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden border-t border-[#cfb79c] px-4 pb-4 pt-3 space-y-2">
          <button
            v-for="item in getCurrentNavItems()"
            :key="item.id"
            type="button"
            @click="scrollToSection(item.id)"
            class="w-full text-left rounded-xl px-4 py-3 text-sm font-medium transition"
            :class="activeSectionId === item.id ? 'text-text bg-[#ead3bb]/60' : 'text-muted hover:text-text hover:bg-[#ead3bb]/45'"
          >
            {{ item.label }}
          </button>
          <button
            type="button"
            @click="scrollToSection('contact')"
            class="w-full rounded-xl bg-accent hover:bg-accent-hover text-[#f8f1e5] text-sm font-semibold px-4 py-3 transition"
          >
            {{ getPrimaryButtonLabel() }}
          </button>

          <button
            type="button"
            @click="emit('toggle-language')"
            class="w-full rounded-xl border border-[#ba9b80] px-4 py-3 text-sm font-semibold tracking-[0.1em] text-[#5a4032] hover:bg-[#ead6bf]/70 transition"
          >
            {{ props.language === 'en' ? 'Switch to Indonesian' : 'Switch to English' }}
          </button>
        </div>
      </transition>
    </nav>
  </header>
</template>
