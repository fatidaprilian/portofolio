<script setup>
import { onMounted, onUnmounted } from 'vue'
import { X, ArrowUpRight, ShieldCheck, Cpu, Code2 } from 'lucide-vue-next'

const props = defineProps({
  activeProject: { type: Object, required: true },
  c: { type: Object, required: true }
})

const emit = defineEmits(['close'])

const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const monogramFor = (title) => {
  const cleaned = title.replace(/[^a-z]/gi, '')
  return cleaned.slice(0, 2).toUpperCase() || 'PR'
}
</script>

<template>
  <Transition name="fade">
    <div 
      class="fixed inset-0 z-[200] flex justify-end bg-black/60 backdrop-blur-sm" 
      @click="emit('close')"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <div class="w-full max-w-[650px] h-full bg-[var(--surface-1)] border-l border-[var(--hairline)] flex flex-col shadow-2xl overflow-hidden" @click.stop>
        <div class="flex justify-between items-center p-6 md:p-8 border-b border-[var(--hairline)] shrink-0">
          <h2 id="drawer-title" class="text-2xl font-bold tracking-tight text-[var(--ink-primary)]">{{ activeProject.title }}</h2>
          <button 
            type="button" 
            class="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--surface-2)] text-[var(--ink-primary)] hover:bg-[var(--surface-canvas)] hover:text-[var(--accent-blue)] transition-colors duration-300" 
            @click="emit('close')" 
            aria-label="Close details"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8">
          <div class="w-full aspect-video rounded-xl overflow-hidden border border-[var(--hairline)] bg-[var(--surface-canvas)] flex items-center justify-center relative">
            <img
              v-if="activeProject.screenshot"
              :src="activeProject.screenshot"
              :alt="activeProject.title + ' screenshot'"
              class="w-full h-full object-cover"
              decoding="async"
            />
            <div v-else class="text-6xl font-bold text-[var(--ink-muted)]" aria-hidden="true">
              {{ monogramFor(activeProject.title) }}
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-[var(--surface-1)]/40 to-transparent pointer-events-none"></div>
          </div>
          
          <div class="grid grid-cols-3 gap-4 border-b border-[var(--hairline)] pb-6">
            <div class="flex flex-col gap-1">
              <span class="font-mono text-xs uppercase tracking-wider text-[var(--ink-muted)]">Year</span>
              <span class="text-sm font-semibold text-[var(--ink-primary)]">{{ activeProject.year }}</span>
            </div>
            <div class="flex flex-col gap-1 col-span-2">
              <span class="font-mono text-xs uppercase tracking-wider text-[var(--ink-muted)]">Role</span>
              <span class="text-sm font-semibold text-[var(--ink-primary)]">{{ activeProject.role }}</span>
            </div>
          </div>
          
          <div class="flex flex-col gap-6">
            <div v-if="activeProject.caseStudy?.constraint" class="flex flex-col gap-2">
              <span class="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)]">Constraint</span>
              <p class="text-[var(--ink-muted)] text-base leading-relaxed">{{ activeProject.caseStudy.constraint }}</p>
            </div>
            <div v-if="activeProject.caseStudy?.decision" class="flex flex-col gap-2">
              <span class="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)]">Decision</span>
              <p class="text-[var(--ink-muted)] text-base leading-relaxed">{{ activeProject.caseStudy.decision }}</p>
            </div>
            <div v-if="activeProject.caseStudy?.outcome" class="flex flex-col gap-2">
              <span class="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)]">Outcome</span>
              <p class="text-[var(--ink-muted)] text-base leading-relaxed">{{ activeProject.caseStudy.outcome }}</p>
            </div>
          </div>
          
          <div class="mt-4 flex flex-col md:flex-row gap-4">
            <a
              v-if="activeProject.liveUrl"
              :href="activeProject.liveUrl"
              target="_blank"
              rel="noreferrer"
              class="btn-primary flex-1"
            >
              <span>Live Site</span>
              <ArrowUpRight class="w-4 h-4 ml-1" aria-hidden="true" />
            </a>
            <a
              v-if="activeProject.link && activeProject.link !== activeProject.liveUrl"
              :href="activeProject.link"
              target="_blank"
              rel="noreferrer"
              class="btn-secondary flex-1"
            >
              <span>View Source</span>
              <ArrowUpRight class="w-4 h-4 ml-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
