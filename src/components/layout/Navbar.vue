<script setup>
import { Search } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true },
  themePref: { type: String, required: true },
  lang: { type: String, required: true },
  activeSection: { type: String, required: true }
})

const emit = defineEmits(['goToSection', 'applyTheme', 'toggleLang', 'openCmdPalette'])
</script>

<template>
  <header class="top-nav" role="banner">
    <div class="flex items-center gap-4 sm:gap-6">
      <!-- Comic Title with Semicolon Accent -->
      <button
        type="button"
        class="font-black text-xl tracking-tight text-[var(--ink-primary)] flex items-center gap-1 group"
        @click="emit('goToSection', 'home')"
        aria-label="Farid Eka Aprilian Home"
      >
        <span>FARID EKA</span><span class="text-[var(--brand-coral)] font-black text-2xl leading-none">;</span>
        <span class="hidden sm:inline-block font-mono text-[10px] font-extrabold uppercase tracking-wider bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)] px-1.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_var(--comic-border)] ml-1">
          DEV-LOG
        </span>
      </button>

      <!-- Quick Index Trigger -->
      <button
        type="button"
        class="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface-panel)] hover:bg-[var(--surface-subtle)] border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)] text-xs text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-all"
        @click="emit('openCmdPalette')"
        aria-label="Open Navigator"
      >
        <Search class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
        <span class="font-bold text-[var(--ink-primary)]">{{ c.cmdBadge || 'Index' }}</span>
        <kbd class="font-mono text-[10px] font-bold bg-[var(--canvas-bg)] border border-[var(--comic-border)] px-1.5 py-0.5 rounded text-[var(--ink-muted)]">⌘K</kbd>
      </button>
    </div>

    <!-- Navigation Episodes -->
    <nav class="hidden lg:flex items-center gap-7" role="navigation" aria-label="Main Navigation">
      <button 
        type="button" 
        :class="['nav-link', { 'is-active text-[var(--brand-coral)]': activeSection === 'home' }]" 
        @click="emit('goToSection', 'home')"
      >
        {{ c.homeLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active text-[var(--brand-coral)]': activeSection === 'about' }]" 
        @click="emit('goToSection', 'about')"
      >
        {{ c.aboutLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active text-[var(--brand-coral)]': activeSection === 'works' }]" 
        @click="emit('goToSection', 'works')"
      >
        {{ c.worksLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active text-[var(--brand-coral)]': activeSection === 'skills' }]" 
        @click="emit('goToSection', 'skills')"
      >
        {{ c.skillsLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active text-[var(--brand-coral)]': activeSection === 'experience' }]" 
        @click="emit('goToSection', 'experience')"
      >
        {{ c.experienceLabel }}
      </button>
    </nav>

    <div class="flex items-center gap-3">
      <!-- Mobile Index Button -->
      <button
        type="button"
        class="sm:hidden p-2 rounded-xl bg-[var(--surface-panel)] border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)] text-[var(--ink-primary)]"
        @click="emit('openCmdPalette')"
        aria-label="Open Navigator"
      >
        <Search class="w-4 h-4 text-[var(--brand-coral)]" />
      </button>

      <!-- Theme Switcher (Day / Night Shift) -->
      <div class="hidden md:flex bg-[var(--surface-panel)] border border-[var(--comic-border)] rounded-xl p-1 gap-1 shadow-[1.5px_1.5px_0px_var(--comic-border)]">
        <button
          type="button"
          :class="[
            'px-2.5 py-1 rounded-lg text-xs font-bold transition-all',
            themePref === 'auto'
              ? 'bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
          ]"
          @click="emit('applyTheme', 'auto')"
        >
          {{ c.themeLabels.auto }}
        </button>
        <button
          type="button"
          :class="[
            'px-2.5 py-1 rounded-lg text-xs font-bold transition-all',
            themePref === 'light'
              ? 'bg-[var(--brand-coral)] text-white border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
          ]"
          @click="emit('applyTheme', 'light')"
        >
          {{ c.themeLabels.light }}
        </button>
        <button
          type="button"
          :class="[
            'px-2.5 py-1 rounded-lg text-xs font-bold transition-all',
            themePref === 'dark'
              ? 'bg-[var(--brand-mint)] text-slate-950 border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
          ]"
          @click="emit('applyTheme', 'dark')"
        >
          {{ c.themeLabels.dark }}
        </button>
      </div>

      <!-- Action Button -->
      <button type="button" class="btn-comic-primary text-xs sm:text-sm py-2 px-3.5 sm:px-5" @click="emit('goToSection', 'contact')">
        {{ c.contactLabel }}
      </button>

      <!-- Language Toggle -->
      <button
        type="button"
        class="font-mono text-xs font-black px-2.5 py-1.5 rounded-lg border border-[var(--comic-border)] bg-[var(--surface-panel)] hover:bg-[var(--surface-subtle)] shadow-[1.5px_1.5px_0px_var(--comic-border)] text-[var(--ink-primary)]"
        @click="emit('toggleLang')"
        aria-label="Switch language"
      >
        {{ lang === 'id' ? 'EN' : 'ID' }}
      </button>
    </div>
  </header>
</template>
