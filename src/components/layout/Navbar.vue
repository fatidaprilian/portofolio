<script setup>
defineProps({
  c: { type: Object, required: true },
  themePref: { type: String, required: true },
  lang: { type: String, required: true },
  activeSection: { type: String, required: true }
})

const emit = defineEmits(['goToSection', 'applyTheme', 'toggleLang'])
</script>

<template>
  <header class="top-nav" role="banner">
    <button type="button" class="font-bold text-lg tracking-tight text-[var(--ink-primary)] flex gap-1" @click="emit('goToSection', 'home')" aria-label="Farid Eka Aprilian Home">
      <span>FARID EKA</span><span class="text-[var(--ink-muted)]">APRILIAN</span>
    </button>

    <nav class="hidden md:flex items-center gap-6" role="navigation" aria-label="Main Navigation">
      <button 
        type="button" 
        :class="['nav-link', { 'is-active text-[var(--ink-primary)]': activeSection === 'home' }]" 
        @click="emit('goToSection', 'home')"
      >
        {{ c.homeLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active text-[var(--ink-primary)]': activeSection === 'about' }]" 
        @click="emit('goToSection', 'about')"
      >
        {{ c.aboutLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active text-[var(--ink-primary)]': activeSection === 'works' }]" 
        @click="emit('goToSection', 'works')"
      >
        {{ c.worksLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active text-[var(--ink-primary)]': activeSection === 'skills' }]" 
        @click="emit('goToSection', 'skills')"
      >
        {{ c.skillsLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active text-[var(--ink-primary)]': activeSection === 'experience' }]" 
        @click="emit('goToSection', 'experience')"
      >
        {{ c.experienceLabel }}
      </button>
    </nav>

    <div class="flex items-center gap-4">
      <div class="hidden md:flex bg-[var(--surface-1)] border border-[var(--hairline)] rounded-full p-1 gap-1">
        <button
          type="button"
          :class="['px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300', themePref === 'auto' ? 'bg-[var(--surface-canvas)] text-[var(--ink-primary)] shadow-sm border border-[var(--hairline)]' : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)] border border-transparent']"
          @click="emit('applyTheme', 'auto')"
        >
          {{ c.themeLabels.auto }}
        </button>
        <button
          type="button"
          :class="['px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300', themePref === 'light' ? 'bg-[var(--surface-canvas)] text-[var(--ink-primary)] shadow-sm border border-[var(--hairline)]' : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)] border border-transparent']"
          @click="emit('applyTheme', 'light')"
        >
          {{ c.themeLabels.light }}
        </button>
        <button
          type="button"
          :class="['px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300', themePref === 'dark' ? 'bg-[var(--surface-canvas)] text-[var(--ink-primary)] shadow-sm border border-[var(--hairline)]' : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)] border border-transparent']"
          @click="emit('applyTheme', 'dark')"
        >
          {{ c.themeLabels.dark }}
        </button>
      </div>

      <button type="button" class="btn-primary" @click="emit('goToSection', 'contact')">
        {{ c.contactLabel }}
      </button>

      <button type="button" class="nav-link font-bold" @click="emit('toggleLang')" aria-label="Switch language">
        {{ lang === 'id' ? 'EN' : 'ID' }}
      </button>
    </div>
  </header>
</template>
