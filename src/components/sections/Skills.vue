<script setup>
import { computed } from 'vue'
import {
  Bot,
  Server,
  LayoutGrid,
  Activity,
  Terminal,
  Database,
  Cpu,
  Layers
} from 'lucide-vue-next'

const props = defineProps({
  c: { type: Object, required: true },
  profile: { type: Object, required: true }
})

const bentoCapabilities = computed(() => [
  {
    id: 'ai-agentic',
    code: 'MOD.01 // AGENTIC_CORE',
    icon: Bot,
    title: 'AI Architecture & Agentic Systems',
    description:
      'Designing engineering guardrails, multi-host tool plugins, and prompt/skill protocols that eliminate LLM over-building and slash token consumption.',
    badge: 'Creator @ryuenn3123/agentic-senior-core',
    technologies: ['TypeScript', 'Prompt Engineering', 'Multi-Host Plugins', 'Token Optimization', 'AI Guardrails', 'AST Tooling'],
    metrics: '20+ AI Host Tools Adopted'
  },
  {
    id: 'backend-distributed',
    code: 'MOD.02 // BACKEND_DATA',
    icon: Server,
    title: 'Distributed Backend & Data Systems',
    description:
      'Architecting resilient service boundaries, atomic transaction reservations, Accurate ERP webhook sync, and clean data migrations.',
    badge: 'Production-Grade',
    technologies: ['NestJS', 'Laravel', 'FastAPI', 'PostgreSQL', 'Prisma ORM', 'Docker', 'Redis', 'Webhooks'],
    metrics: 'Zero-Overselling ERP Architecture'
  },
  {
    id: 'frontend-craft',
    code: 'MOD.03 // UI_ENGINEERING',
    icon: LayoutGrid,
    title: 'Modern Frontend & Interface Craft',
    description:
      'Building accessible, fast, and memorable user experiences with fluid micro-interactions, OKLCH design systems, and responsive layouts.',
    badge: 'WCAG 2.2 AA Compliant',
    technologies: ['Vue 3 (Composition API)', 'Next.js', 'React', 'Tailwind CSS', 'GSAP', 'Lenis Scroll', 'TypeScript'],
    metrics: 'Sub-second Interactive Load'
  },
  {
    id: 'systems-kernel',
    code: 'MOD.04 // SYSTEM_DAEMON',
    icon: Activity,
    title: 'Systems & Network Engineering',
    description:
      'Crafting lightweight daemon binaries in Go for embedded OpenWrt routing, bufferbloat reduction, and direct Linux kernel tc subsystem interaction.',
    badge: 'Low-Latency Systems',
    technologies: ['Go (Golang)', 'OpenWrt', 'Linux tc subsystem', 'SQM QoS', 'Embedded Linux', 'Networking'],
    metrics: 'Kernel-Level Bandwidth Optimization'
  }
])
</script>

<template>
  <section id="skills" class="section-container" aria-labelledby="skills-heading">
    <div class="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--hairline)] pb-6">
      <div>
        <span class="pill-tag inline-block mb-4">{{ c.skillsMeta }}</span>
        <h2 id="skills-heading" class="display-section">{{ c.skillsTitle }}</h2>
      </div>
      <p class="text-[var(--ink-muted)] text-sm font-mono mt-4 md:mt-0">
        // 4 ARCHITECTURAL DOMAINS
      </p>
    </div>

    <!-- Bento Matrix Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div
        v-for="bento in bentoCapabilities"
        :key="bento.id"
        class="spotlight-card p-6 md:p-8 flex flex-col justify-between group cursor-default"
      >
        <div>
          <!-- Top Row: Module Code + Live Badge -->
          <div class="flex items-center justify-between mb-5">
            <span class="font-mono text-xs text-[var(--ink-muted)] tracking-wider">
              {{ bento.code }}
            </span>
            <span class="font-mono text-[11px] font-semibold text-[var(--accent-blue)] bg-[var(--surface-canvas)] border border-[var(--hairline)] px-2.5 py-1 rounded-full">
              {{ bento.badge }}
            </span>
          </div>

          <!-- Header Icon + Title -->
          <div class="flex items-start gap-4 mb-4">
            <div class="w-11 h-11 rounded-xl bg-[var(--surface-canvas)] border border-[var(--hairline)] flex items-center justify-center text-[var(--ink-primary)] shrink-0 group-hover:border-[var(--accent-blue)] group-hover:text-[var(--accent-blue)] transition-colors duration-300">
              <component :is="bento.icon" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-xl md:text-2xl font-bold tracking-tight text-[var(--ink-primary)]">
                {{ bento.title }}
              </h3>
            </div>
          </div>

          <!-- Description -->
          <p class="text-[var(--ink-muted)] text-sm md:text-base leading-relaxed mb-6">
            {{ bento.description }}
          </p>
        </div>

        <!-- Bottom: Technologies Pill Tags & Metrics -->
        <div>
          <div class="flex flex-wrap gap-2 mb-5">
            <span
              v-for="tech in bento.technologies"
              :key="tech"
              class="font-mono text-xs text-[var(--ink-primary)] bg-[var(--surface-canvas)] border border-[var(--hairline)] px-2.5 py-1 rounded-md"
            >
              {{ tech }}
            </span>
          </div>

          <div class="pt-4 border-t border-[var(--hairline)]/60 flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
            <span>IMPACT:</span>
            <span class="text-[var(--ink-primary)] font-medium">{{ bento.metrics }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
