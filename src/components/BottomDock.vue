<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  language: {
    type: String,
    default: 'id'
  }
})

const copyByLanguage = {
  id: {
    skills: 'Keahlian',
    about: 'Tentang',
    portfolio: 'Portofolio',
    contact: 'Kontak',
    home: 'Beranda'
  },
  en: {
    skills: 'Skills',
    about: 'About',
    portfolio: 'Portfolio',
    contact: 'Contact',
    home: 'Home'
  }
}

const navItems = computed(() => {
  const activeCopy = copyByLanguage[props.language] ?? copyByLanguage.id
  return [
    { id: 'home', label: activeCopy.home },
    { id: 'skills', label: activeCopy.skills },
    { id: 'about', label: activeCopy.about },
    { id: 'work', label: activeCopy.portfolio },
    { id: 'contact', label: activeCopy.contact, isPrimary: true }
  ]
})

const activeSectionId = ref('home')
const activeIndex = ref(0)
const isDockFocused = ref(false)
const dockButtonElements = ref([])
const activePillStyle = ref({ transform: 'translateX(0px)', width: '0px', opacity: 0 })

let sectionObserver

const observeSections = () => {
  const targetSectionIds = navItems.value.map((item) => item.id)
  const targetSections = targetSectionIds
    .map((targetId) => document.getElementById(targetId))
    .filter(Boolean)

  if (targetSections.length === 0) {
    return
  }

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSectionId.value = entry.target.id
          const nextActiveIndex = navItems.value.findIndex((item) => item.id === entry.target.id)
          if (nextActiveIndex >= 0) {
            activeIndex.value = nextActiveIndex
          }
        }
      })
    },
    { threshold: 0, rootMargin: '-40% 0px -40% 0px' }
  )

  targetSections.forEach((sectionElement) => sectionObserver.observe(sectionElement))
}

const syncActivePillPosition = () => {
  const activeButton = dockButtonElements.value[activeIndex.value]
  if (!activeButton) {
    return
  }

  activePillStyle.value = {
    transform: `translateX(${activeButton.offsetLeft}px)`,
    width: `${activeButton.offsetWidth}px`,
    opacity: 1
  }
}

let isDockScrollScheduled = false

const updateDockFocusState = () => {
  if (isDockScrollScheduled) return
  isDockScrollScheduled = true
  requestAnimationFrame(() => {
    isDockFocused.value = window.scrollY > 24
    isDockScrollScheduled = false
  })
}

const scrollToSection = (sectionId) => {
  const sectionElement = document.getElementById(sectionId)
  if (!sectionElement) {
    return
  }

  sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  activeSectionId.value = sectionId
  const nextActiveIndex = navItems.value.findIndex((item) => item.id === sectionId)
  if (nextActiveIndex >= 0) {
    activeIndex.value = nextActiveIndex
    syncActivePillPosition()
  }
}

onMounted(() => {
  observeSections()
  nextTick(() => {
    syncActivePillPosition()
  })
  updateDockFocusState()
  window.addEventListener('scroll', updateDockFocusState)
  window.addEventListener('resize', syncActivePillPosition)
})

onUnmounted(() => {
  if (sectionObserver) {
    sectionObserver.disconnect()
  }
  window.removeEventListener('scroll', updateDockFocusState)
  window.removeEventListener('resize', syncActivePillPosition)
})

watch(activeIndex, () => {
  nextTick(() => {
    syncActivePillPosition()
  })
})

watch(
  navItems,
  () => {
    nextTick(() => {
      syncActivePillPosition()
    })
  },
  { deep: true }
)
</script>

<template>
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-3 w-full max-w-[820px] pointer-events-none">
    <div class="bottom-dock pointer-events-auto mx-auto w-fit max-w-full overflow-x-auto relative" :class="isDockFocused ? 'bottom-dock-focused' : ''">
      <span class="bottom-dock-active-pill" :style="activePillStyle"></span>
      <button
        v-for="(item, itemIndex) in navItems"
        :key="item.id"
        type="button"
        @click="scrollToSection(item.id)"
        :ref="(elementReference) => { if (elementReference) dockButtonElements[itemIndex] = elementReference }"
        class="bottom-dock-item"
        :class="[
          item.isPrimary ? 'bottom-dock-item-primary' : 'bottom-dock-item-neutral',
          activeSectionId === item.id ? 'bottom-dock-item-active' : ''
        ]"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
