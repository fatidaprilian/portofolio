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
  <header class="portfolio-header" role="banner">
    <button type="button" class="nav-logo" @click="emit('goToSection', 'home')" aria-label="Farid Aprilian Home">
      <span>Farid Eka Aprilian</span>
    </button>

    <nav class="nav-menu" role="navigation" aria-label="Main Navigation">
      <button 
        type="button" 
        :class="['nav-link', { 'is-active': activeSection === 'home' }]" 
        @click="emit('goToSection', 'home')"
      >
        {{ c.homeLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active': activeSection === 'about' }]" 
        @click="emit('goToSection', 'about')"
      >
        {{ c.aboutLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active': activeSection === 'works' }]" 
        @click="emit('goToSection', 'works')"
      >
        {{ c.worksLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active': activeSection === 'skills' }]" 
        @click="emit('goToSection', 'skills')"
      >
        {{ c.skillsLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active': activeSection === 'experience' }]" 
        @click="emit('goToSection', 'experience')"
      >
        {{ c.experienceLabel }}
      </button>
      <button 
        type="button" 
        :class="['nav-link', { 'is-active': activeSection === 'contact' }]" 
        @click="emit('goToSection', 'contact')"
      >
        {{ c.contactLabel }}
      </button>
    </nav>

    <div class="flex items-center gap-4">
      <div class="theme-switch" role="group" aria-label="Theme preference">
        <button
          type="button"
          :class="{ 'is-active': themePref === 'auto' }"
          @click="emit('applyTheme', 'auto')"
          aria-label="Auto Theme"
        >
          {{ c.themeLabels.auto }}
        </button>
        <button
          type="button"
          :class="{ 'is-active': themePref === 'light' }"
          @click="emit('applyTheme', 'light')"
          aria-label="Light Theme"
        >
          {{ c.themeLabels.light }}
        </button>
        <button
          type="button"
          :class="{ 'is-active': themePref === 'dark' }"
          @click="emit('applyTheme', 'dark')"
          aria-label="Dark Theme"
        >
          {{ c.themeLabels.dark }}
        </button>
      </div>

      <button type="button" class="nav-link font-bold" @click="emit('toggleLang')" aria-label="Switch language">
        {{ lang === 'id' ? 'EN' : 'ID' }}
      </button>
    </div>
  </header>
</template>
