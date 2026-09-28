<script setup>
import { computed } from 'vue'
import {
  Bot,
  Server,
  LayoutGrid,
  Activity,
  Layers
} from 'lucide-vue-next'

const props = defineProps({
  c: { type: Object, required: true },
  profile: { type: Object, required: true }
})

const iconMap = {
  'ai-agentic': Bot,
  'backend-distributed': Server,
  'frontend-craft': LayoutGrid,
  'systems-kernel': Activity
}

const colorMap = {
  'ai-agentic': 'var(--brand-coral)',
  'backend-distributed': 'var(--brand-mint)',
  'frontend-craft': 'var(--brand-sun)',
  'systems-kernel': 'var(--brand-sky)'
}

const techMap = {
  'ai-agentic': ['TypeScript', 'Prompt Protocols', 'Multi-Host Plugins', 'Token Optimization', 'AI Guardrails', 'AST Tooling'],
  'backend-distributed': ['NestJS', 'Laravel', 'FastAPI', 'PostgreSQL', 'Prisma ORM', 'Docker', 'Redis', 'Webhooks'],
  'frontend-craft': ['Vue 3 (Composition API)', 'Next.js', 'React', 'Tailwind CSS', 'GSAP', 'Lenis Scroll', 'TypeScript'],
  'systems-kernel': ['Go (Golang)', 'OpenWrt', 'Linux tc subsystem', 'SQM QoS', 'Embedded Linux', 'Networking']
}

const capabilities = computed(() => {
  const items = props.c.skillsItems || []
  return items.map((item) => ({
    ...item,
    icon: iconMap[item.id] || Bot,
    badgeColor: colorMap[item.id] || 'var(--brand-mint)',
    technologies: techMap[item.id] || []
  }))
})
</script>

<template>
  <section id="skills" class="section-container" aria-labelledby="skills-heading">
    <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--comic-border)]/20 pb-6">
      <div>
        <span class="comic-chapter-badge bg-[var(--brand-sun)] text-slate-950 mb-4">
          <Layers class="w-3.5 h-3.5 text-slate-950" />
          {{ c.skillsMeta }}
        </span>
        <h2 id="skills-heading" class="display-section">{{ c.skillsTitle }}</h2>
      </div>
      <p class="text-[var(--ink-muted)] text-xs sm:text-sm font-mono mt-4 md:mt-0 font-medium">
        {{ c.skillsSub || 'Keahlian & Bidang Utama' }}
      </p>
    </div>

    <!-- Clean Panel Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div
        v-for="item in capabilities"
        :key="item.id"
        class="comic-panel p-6 sm:p-7 flex flex-col justify-between bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)]"
      >
        <div>
          <!-- Category & Badge -->
          <div class="flex items-center justify-between mb-4">
            <span class="font-mono text-xs font-bold text-[var(--ink-muted)]">
              {{ item.category }}
            </span>
            <span
              class="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]"
              :style="{ backgroundColor: item.badgeColor, color: item.badgeColor === 'var(--brand-coral)' ? '#fff' : '#14151F' }"
            >
              {{ item.badge }}
            </span>
          </div>

          <!-- Header Icon + Title -->
          <div class="flex items-start gap-3.5 mb-3">
            <div class="w-10 h-10 rounded-xl bg-[var(--surface-subtle)] border border-[var(--comic-border)] flex items-center justify-center text-[var(--brand-coral)] shrink-0 shadow-[1px_1px_0px_var(--comic-border)]">
              <component :is="item.icon" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-xl sm:text-2xl font-black tracking-tight text-[var(--ink-primary)]">
                {{ item.title }}
              </h3>
            </div>
          </div>

          <!-- Description -->
          <p class="text-[var(--ink-muted)] text-xs sm:text-sm leading-relaxed mb-6">
            {{ item.description }}
          </p>
        </div>

        <!-- Technologies Sticker Tags -->
        <div class="pt-3 border-t border-[var(--comic-border)]/15">
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in item.technologies"
              :key="tech"
              class="comic-tag text-[10px] sm:text-[11px]"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
