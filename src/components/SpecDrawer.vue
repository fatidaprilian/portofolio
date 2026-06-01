<script setup>
import { X, ArrowUpRight } from 'lucide-vue-next'

defineProps({
  activeProject: { type: Object, required: true },
  c: { type: Object, required: true }
})

const emit = defineEmits(['close'])

const monogramFor = (title) => {
  const cleaned = title.replace(/[^a-z]/gi, '')
  return cleaned.slice(0, 2).toUpperCase() || 'PR'
}
</script>

<template>
  <Transition name="fade">
    <div 
      class="spec-drawer-backdrop" 
      @click="emit('close')"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <div class="spec-drawer" @click.stop>
        <div class="spec-drawer-header">
          <h2 id="drawer-title" class="spec-drawer-title">{{ activeProject.title }}</h2>
          <button 
            type="button" 
            class="btn-close" 
            @click="emit('close')" 
            aria-label="Close details"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="spec-drawer-body">
          <div class="spec-drawer-hero">
            <img
              v-if="activeProject.screenshot"
              :src="activeProject.screenshot"
              :alt="activeProject.title + ' screenshot'"
              class="spec-drawer-screenshot"
              decoding="async"
            />
            <div v-else class="spec-drawer-monogram" aria-hidden="true">
              {{ monogramFor(activeProject.title) }}
            </div>
          </div>
          
          <div class="spec-drawer-metadata">
            <div class="spec-metadata-item">
              <span class="spec-metadata-label">Year</span>
              <span class="spec-metadata-val">{{ activeProject.year }}</span>
            </div>
            <div class="spec-metadata-item">
              <span class="spec-metadata-label">Role</span>
              <span class="spec-metadata-val">{{ activeProject.role }}</span>
            </div>
            <div class="spec-metadata-item">
              <span class="spec-metadata-label">Code</span>
              <span class="spec-metadata-val">{{ activeProject.plateCode }}</span>
            </div>
          </div>
          
          <div class="spec-drawer-log">
            <div class="spec-log-item" v-if="activeProject.caseStudy?.constraint">
              <span class="spec-log-kicker">Constraint</span>
              <p class="spec-log-desc">{{ activeProject.caseStudy.constraint }}</p>
            </div>
            <div class="spec-log-item" v-if="activeProject.caseStudy?.decision">
              <span class="spec-log-kicker">Decision</span>
              <p class="spec-log-desc">{{ activeProject.caseStudy.decision }}</p>
            </div>
            <div class="spec-log-item" v-if="activeProject.caseStudy?.outcome">
              <span class="spec-log-kicker">Outcome</span>
              <p class="spec-log-desc">{{ activeProject.caseStudy.outcome }}</p>
            </div>
          </div>
          
          <div class="mt-4 flex gap-3">
            <a
              v-if="activeProject.liveUrl"
              :href="activeProject.liveUrl"
              target="_blank"
              rel="noreferrer"
              class="btn-premium w-full justify-center"
            >
              <span>Live Site</span>
              <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              :href="activeProject.link"
              target="_blank"
              rel="noreferrer"
              class="w-full justify-center"
              :class="activeProject.liveUrl ? 'btn-outline' : 'btn-premium'"
            >
              <span>View Source</span>
              <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
