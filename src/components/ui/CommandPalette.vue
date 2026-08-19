<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  Search,
  Command,
  ArrowRight,
  FolderGit2,
  Mail,
  Download,
  Moon,
  Sun,
  Languages,
  Check,
  X,
  Compass
} from 'lucide-vue-next'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  c: { type: Object, required: true },
  projects: { type: Array, required: true },
  themePref: { type: String, required: true },
  lang: { type: String, required: true }
})

const emit = defineEmits([
  'close',
  'goToSection',
  'selectProject',
  'applyTheme',
  'toggleLang'
])

const searchQuery = ref('')
const selectedIndex = ref(0)
const inputRef = ref(null)
const listContainerRef = ref(null)
const emailCopied = ref(false)

const sections = [
  { id: 'home', labelKey: 'homeLabel', icon: Compass },
  { id: 'about', labelKey: 'aboutLabel', icon: Compass },
  { id: 'works', labelKey: 'worksLabel', icon: FolderGit2 },
  { id: 'skills', labelKey: 'skillsLabel', icon: Compass },
  { id: 'experience', labelKey: 'experienceLabel', icon: Compass },
  { id: 'contact', labelKey: 'contactLabel', icon: Mail }
]

const filteredItems = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  const items = []

  // 1. Navigation items
  sections.forEach((sec) => {
    const label = props.c[sec.labelKey] || sec.id
    if (!q || label.toLowerCase().includes(q) || sec.id.toLowerCase().includes(q)) {
      items.push({
        id: `nav-${sec.id}`,
        group: props.lang === 'id' ? 'Navigasi' : 'Navigation',
        label: label,
        sublabel: `#${sec.id}`,
        icon: sec.icon,
        action: () => {
          emit('goToSection', sec.id)
          emit('close')
        }
      })
    }
  })

  // 2. Project items
  props.projects.forEach((proj) => {
    const titleMatch = proj.title.toLowerCase().includes(q)
    const tagsMatch = proj.tags?.some((t) => t.toLowerCase().includes(q))
    if (!q || titleMatch || tagsMatch) {
      items.push({
        id: `proj-${proj.title}`,
        group: props.lang === 'id' ? 'Proyek' : 'Projects',
        label: proj.title,
        sublabel: proj.role || proj.year,
        icon: FolderGit2,
        badge: proj.year,
        action: () => {
          emit('selectProject', proj)
          emit('close')
        }
      })
    }
  })

  // 3. Quick Actions
  const actions = [
    {
      id: 'act-copy-email',
      group: props.lang === 'id' ? 'Aksi' : 'Actions',
      label: props.c.cmdCopyEmail,
      sublabel: 'faridaprilian214@gmail.com',
      icon: Mail,
      action: async () => {
        try {
          await navigator.clipboard.writeText('faridaprilian214@gmail.com')
          emailCopied.value = true
          setTimeout(() => {
            emailCopied.value = false
            emit('close')
          }, 800)
        } catch (_) {
          emit('close')
        }
      }
    },
    {
      id: 'act-download-cv',
      group: props.lang === 'id' ? 'Aksi' : 'Actions',
      label: props.c.cmdDownloadResume,
      sublabel: 'PDF Document',
      icon: Download,
      action: () => {
        window.open('/cv.pdf', '_blank')
        emit('close')
      }
    },
    {
      id: 'act-toggle-theme',
      group: props.lang === 'id' ? 'Aksi' : 'Actions',
      label: props.c.cmdToggleTheme,
      sublabel: `Current: ${props.themePref}`,
      icon: props.themePref === 'dark' ? Sun : Moon,
      action: () => {
        const next = props.themePref === 'dark' ? 'light' : 'dark'
        emit('applyTheme', next)
      }
    },
    {
      id: 'act-toggle-lang',
      group: props.lang === 'id' ? 'Aksi' : 'Actions',
      label: props.c.cmdToggleLang,
      sublabel: props.lang === 'id' ? 'Bahasa Indonesia -> English' : 'English -> Bahasa Indonesia',
      icon: Languages,
      action: () => {
        emit('toggleLang')
      }
    }
  ]

  actions.forEach((act) => {
    if (!q || act.label.toLowerCase().includes(q) || act.sublabel.toLowerCase().includes(q)) {
      items.push(act)
    }
  })

  return items
})

const handleKeyDown = (e) => {
  if (!props.isOpen) return

  if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (filteredItems.value.length > 0) {
      selectedIndex.value = (selectedIndex.value + 1) % filteredItems.value.length
      scrollToSelected()
    }
    return
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (filteredItems.value.length > 0) {
      selectedIndex.value =
        (selectedIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length
      scrollToSelected()
    }
    return
  }

  if (e.key === 'Enter') {
    e.preventDefault()
    const active = filteredItems.value[selectedIndex.value]
    if (active) {
      active.action()
    }
  }
}

const scrollToSelected = () => {
  nextTick(() => {
    const list = listContainerRef.value
    if (!list) return
    const activeEl = list.querySelector(`[data-index="${selectedIndex.value}"]`)
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' })
    }
  })
}

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      searchQuery.value = ''
      selectedIndex.value = 0
      nextTick(() => {
        inputRef.value?.focus()
      })
    }
  }
)

watch(searchQuery, () => {
  selectedIndex.value = 0
})

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Transition name="palette-fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[300] flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-md"
      @click="emit('close')"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmd-palette-title"
    >
      <div
        class="w-full max-w-xl bg-[var(--surface-1)] border border-[var(--hairline)] rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-transform duration-200"
        @click.stop
      >
        <!-- Search Input Bar -->
        <div class="relative flex items-center px-4 py-3.5 border-b border-[var(--hairline)] bg-[var(--surface-canvas)]">
          <Search class="w-5 h-5 text-[var(--ink-muted)] shrink-0 mr-3" aria-hidden="true" />
          <input
            ref="inputRef"
            id="cmd-palette-title"
            v-model="searchQuery"
            type="text"
            class="w-full bg-transparent text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] text-base font-normal focus:outline-none"
            :placeholder="c.cmdPrompt"
            autocomplete="off"
            spellcheck="false"
          />
          <button
            type="button"
            class="p-1 rounded-md text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-1)] transition-colors ml-2"
            @click="emit('close')"
            aria-label="Close command palette"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Search Results List -->
        <div
          ref="listContainerRef"
          class="max-h-[380px] overflow-y-auto p-2 flex flex-col gap-1"
          role="listbox"
        >
          <div
            v-if="filteredItems.length === 0"
            class="py-10 text-center text-[var(--ink-muted)] text-sm"
          >
            {{ lang === 'id' ? 'Tidak ada hasil yang cocok.' : 'No matching results found.' }}
          </div>

          <template v-else>
            <div
              v-for="(item, index) in filteredItems"
              :key="item.id"
              :data-index="index"
              :class="[
                'group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-150',
                selectedIndex === index
                  ? 'bg-[var(--ink-primary)] text-[var(--ink-inverse)]'
                  : 'text-[var(--ink-primary)] hover:bg-[var(--surface-2)]'
              ]"
              role="option"
              :aria-selected="selectedIndex === index"
              @click="item.action"
              @mouseenter="selectedIndex = index"
            >
              <div class="flex items-center gap-3 min-w-0">
                <component
                  :is="item.icon"
                  :class="[
                    'w-4 h-4 shrink-0 transition-colors',
                    selectedIndex === index ? 'text-[var(--ink-inverse)]' : 'text-[var(--ink-muted)] group-hover:text-[var(--ink-primary)]'
                  ]"
                />
                <div class="flex flex-col min-w-0">
                  <span class="text-sm font-semibold truncate leading-tight">{{ item.label }}</span>
                  <span
                    :class="[
                      'text-xs truncate leading-tight font-mono',
                      selectedIndex === index ? 'opacity-75 text-[var(--ink-inverse)]' : 'text-[var(--ink-muted)]'
                    ]"
                  >
                    {{ item.sublabel }}
                  </span>
                </div>
              </div>

              <div class="flex items-center gap-2 shrink-0 ml-3">
                <span
                  v-if="item.badge"
                  :class="[
                    'font-mono text-[10px] px-2 py-0.5 rounded border',
                    selectedIndex === index
                      ? 'border-white/30 text-[var(--ink-inverse)]'
                      : 'border-[var(--hairline)] text-[var(--ink-muted)] bg-[var(--surface-canvas)]'
                  ]"
                >
                  {{ item.badge }}
                </span>
                <span
                  v-if="item.id === 'act-copy-email' && emailCopied"
                  class="font-mono text-xs flex items-center gap-1 text-emerald-400 font-bold"
                >
                  <Check class="w-3.5 h-3.5" />
                  Copied!
                </span>
                <ArrowRight
                  :class="[
                    'w-4 h-4 transition-transform',
                    selectedIndex === index ? 'translate-x-0.5 opacity-100' : 'opacity-0'
                  ]"
                />
              </div>
            </div>
          </template>
        </div>

        <!-- Footer Key Hints -->
        <div class="px-4 py-2.5 border-t border-[var(--hairline)] bg-[var(--surface-canvas)] flex items-center justify-between text-xs font-mono text-[var(--ink-muted)]">
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1">
              <kbd class="px-1.5 py-0.5 rounded bg-[var(--surface-1)] border border-[var(--hairline)] text-[10px]">↑</kbd>
              <kbd class="px-1.5 py-0.5 rounded bg-[var(--surface-1)] border border-[var(--hairline)] text-[10px]">↓</kbd>
              Navigate
            </span>
            <span class="flex items-center gap-1">
              <kbd class="px-1.5 py-0.5 rounded bg-[var(--surface-1)] border border-[var(--hairline)] text-[10px]">↵</kbd>
              Select
            </span>
          </div>
          <span class="flex items-center gap-1">
            <kbd class="px-1.5 py-0.5 rounded bg-[var(--surface-1)] border border-[var(--hairline)] text-[10px]">ESC</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.palette-fade-enter-active,
.palette-fade-leave-active {
  transition: opacity 0.2s ease;
}
.palette-fade-enter-from,
.palette-fade-leave-to {
  opacity: 0;
}
.palette-fade-enter-active > div,
.palette-fade-leave-active > div {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
}
.palette-fade-enter-from > div {
  transform: scale(0.96) translateY(-8px);
  opacity: 0;
}
.palette-fade-leave-to > div {
  transform: scale(0.96) translateY(-8px);
  opacity: 0;
}
</style>
