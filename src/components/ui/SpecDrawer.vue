<script setup>
import { onMounted, onUnmounted } from 'vue'
import { X, ArrowUpRight, Sparkles, BookOpen } from 'lucide-vue-next'

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
      <div 
        class="w-full max-w-[650px] h-full bg-[var(--surface-panel)] border-l-2 border-[var(--comic-border)] flex flex-col shadow-comic-lg overflow-hidden" 
        @click.stop
      >
        <!-- Header -->
        <div class="flex justify-between items-center p-6 md:p-8 border-b-2 border-[var(--comic-border)] bg-[var(--canvas-bg)] shrink-0">
          <div>
            <span class="font-mono text-xs font-black text-[var(--brand-coral)] uppercase tracking-wider block mb-1">
              // PROJECT ARCHIVE LOG
            </span>
            <h2 id="drawer-title" class="text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink-primary)]">
              {{ activeProject.title }}
            </h2>
          </div>
          <button 
            type="button" 
            class="w-10 h-10 rounded-xl border-2 border-[var(--comic-border)] bg-[var(--surface-panel)] text-[var(--ink-primary)] hover:bg-[var(--brand-coral)] hover:text-white transition-all flex items-center justify-center shadow-[1.5px_1.5px_0px_var(--comic-border)]" 
            @click="emit('close')" 
            aria-label="Close details"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">
          <!-- Screenshot Frame -->
          <div class="w-full aspect-video rounded-xl overflow-hidden border-2 border-[var(--comic-border)] bg-[var(--surface-subtle)] flex items-center justify-center relative shadow-comic">
            <img
              v-if="activeProject.screenshot"
              :src="activeProject.screenshot"
              :alt="activeProject.title + ' screenshot'"
              class="w-full h-full object-cover"
              decoding="async"
            />
            <div v-else class="text-5xl font-black text-[var(--ink-muted)] font-mono" aria-hidden="true">
              {{ monogramFor(activeProject.title) }}
            </div>
            <div class="absolute top-3 right-3 font-mono text-xs font-black px-2.5 py-1 rounded bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
              {{ activeProject.year }}
            </div>
          </div>
          
          <!-- Metadata Pill Badges -->
          <div class="grid grid-cols-3 gap-3 border-b-2 border-[var(--comic-border)] pb-5">
            <div class="flex flex-col gap-0.5">
              <span class="font-mono text-[11px] font-black uppercase tracking-wider text-[var(--ink-muted)]">{{ c.drawerYear || 'Year' }}</span>
              <span class="text-sm font-black text-[var(--ink-primary)]">{{ activeProject.year }}</span>
            </div>
            <div class="flex flex-col gap-0.5 col-span-2">
              <span class="font-mono text-[11px] font-black uppercase tracking-wider text-[var(--ink-muted)]">{{ c.drawerRole || 'Role' }}</span>
              <span class="text-sm font-black text-[var(--brand-coral)]">{{ activeProject.role }}</span>
            </div>
          </div>

          <!-- Tags List -->
          <div v-if="activeProject.tags?.length" class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in activeProject.tags"
              :key="tag"
              class="comic-tag text-xs"
            >
              {{ tag }}
            </span>
          </div>
          
          <!-- Case Study Arc (Story / Problem / Outcome) -->
          <div class="flex flex-col gap-5 pt-2">
            <div v-if="activeProject.caseStudy?.constraint" class="comic-panel p-4 bg-[var(--canvas-bg)] border-2 border-[var(--comic-border)]">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="font-mono text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--brand-coral)] text-white border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
                  {{ c.drawerConstraint || 'The Constraint' }}
                </span>
              </div>
              <p class="text-[var(--ink-muted)] text-sm sm:text-base leading-relaxed">{{ activeProject.caseStudy.constraint }}</p>
            </div>

            <div v-if="activeProject.caseStudy?.decision" class="comic-panel p-4 bg-[var(--canvas-bg)] border-2 border-[var(--comic-border)]">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="font-mono text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
                  {{ c.drawerDecision || 'The Decision' }}
                </span>
              </div>
              <p class="text-[var(--ink-muted)] text-sm sm:text-base leading-relaxed">{{ activeProject.caseStudy.decision }}</p>
            </div>

            <div v-if="activeProject.caseStudy?.outcome" class="comic-panel p-4 bg-[var(--canvas-bg)] border-2 border-[var(--comic-border)]">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="font-mono text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--brand-mint)] text-slate-950 border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
                  {{ c.drawerOutcome || 'The Outcome' }}
                </span>
              </div>
              <p class="text-[var(--ink-muted)] text-sm sm:text-base leading-relaxed">{{ activeProject.caseStudy.outcome }}</p>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="mt-4 flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-[var(--comic-border)]">
            <a
              v-if="activeProject.liveUrl"
              :href="activeProject.liveUrl"
              target="_blank"
              rel="noreferrer"
              class="btn-comic-primary flex-1 py-3 text-center"
            >
              <span>{{ c.drawerLiveSite || 'Live Site' }}</span>
              <ArrowUpRight class="w-4 h-4 ml-1" aria-hidden="true" />
            </a>
            <a
              v-if="activeProject.link && activeProject.link !== activeProject.liveUrl"
              :href="activeProject.link"
              target="_blank"
              rel="noreferrer"
              class="btn-comic-secondary flex-1 py-3 text-center"
            >
              <span>{{ c.drawerViewSource || 'View Source' }}</span>
              <ArrowUpRight class="w-4 h-4 ml-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
