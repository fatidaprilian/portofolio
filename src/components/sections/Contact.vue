<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Mail, Phone, Linkedin } from 'lucide-vue-next'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps({
  c: { type: Object, required: true },
  profile: { type: Object, required: true }
})

const formState = ref({ name: '', email: '', message: '' })
const formStatus = ref(null) // 'sending' | 'success' | 'error'

let scrollTriggerInstance = null

const handleFormSubmit = async () => {
  if (!formState.value.name || !formState.value.email || !formState.value.message) {
    formStatus.value = 'error'
    return
  }
  formStatus.value = 'sending'
  await new Promise((resolve) => setTimeout(resolve, 1200))
  formStatus.value = 'success'
  formState.value = { name: '', email: '', message: '' }
  setTimeout(() => {
    formStatus.value = null
  }, 4000)
}

const initContactReveal = () => {
  // GSAP animation removed to guarantee visibility.
}

onMounted(() => {
  // No-op
})

onUnmounted(() => {
  // No-op
})
</script>

<template>
  <section id="contact" class="section-container" aria-labelledby="contact-heading">
    <div class="mb-12">
      <span class="pill-tag inline-block mb-4">{{ c.contactMeta }}</span>
      <h2 id="contact-heading" class="display-section">{{ c.contactTitle }}</h2>
    </div>

    <div class="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2 select-none text-left font-bold uppercase tracking-tighter leading-[0.85] text-[clamp(3.5rem,7vw,6.5rem)] text-[var(--ink-primary)]">
          <span>LET'S</span>
          <span class="text-[var(--accent-blue)]">BUILD</span>
          <span>TOGETHER</span>
        </div>

        <p class="text-lg text-[var(--ink-muted)] leading-relaxed max-w-md">{{ c.contactBody }}</p>
        
        <div class="flex flex-col gap-4 mt-4">
          <a :href="`mailto:${profile.contactActions.emailValue}`" class="flex items-center gap-3 text-[var(--ink-primary)] hover:text-[var(--accent-blue)] font-medium transition-colors duration-300">
            <div class="w-10 h-10 rounded-full bg-[var(--surface-1)] flex items-center justify-center shrink-0">
              <Mail class="w-4 h-4" />
            </div>
            <span>{{ profile.contactActions.emailValue }}</span>
          </a>
          <a :href="`tel:${profile.contactActions.callValue}`" class="flex items-center gap-3 text-[var(--ink-primary)] hover:text-[var(--accent-blue)] font-medium transition-colors duration-300">
            <div class="w-10 h-10 rounded-full bg-[var(--surface-1)] flex items-center justify-center shrink-0">
              <Phone class="w-4 h-4" />
            </div>
            <span>{{ profile.contactActions.callValue }}</span>
          </a>
          <a href="https://linkedin.com/in/farid-aprilian" target="_blank" rel="noreferrer" class="flex items-center gap-3 text-[var(--ink-primary)] hover:text-[var(--accent-blue)] font-medium transition-colors duration-300">
            <div class="w-10 h-10 rounded-full bg-[var(--surface-1)] flex items-center justify-center shrink-0">
              <Linkedin class="w-4 h-4" />
            </div>
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>

      <form class="surface-card flex flex-col gap-6" @submit.prevent="handleFormSubmit">
        <div class="flex flex-col gap-2">
          <label for="form-name" class="font-medium text-sm text-[var(--ink-muted)]">{{ c.formName }}</label>
          <input 
            id="form-name" 
            type="text" 
            class="bg-[var(--surface-canvas)] border border-[var(--hairline)] focus:border-[var(--accent-blue)] focus:outline-none rounded-xl px-4 py-3 text-[var(--ink-primary)] w-full transition-colors duration-300" 
            v-model="formState.name"
            required 
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="form-email" class="font-medium text-sm text-[var(--ink-muted)]">{{ c.formEmail }}</label>
          <input 
            id="form-email" 
            type="email" 
            class="bg-[var(--surface-canvas)] border border-[var(--hairline)] focus:border-[var(--accent-blue)] focus:outline-none rounded-xl px-4 py-3 text-[var(--ink-primary)] w-full transition-colors duration-300" 
            v-model="formState.email"
            required 
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="form-message" class="font-medium text-sm text-[var(--ink-muted)]">{{ c.formMessage }}</label>
          <textarea 
            id="form-message" 
            rows="4"
            class="bg-[var(--surface-canvas)] border border-[var(--hairline)] focus:border-[var(--accent-blue)] focus:outline-none rounded-xl px-4 py-3 text-[var(--ink-primary)] w-full resize-none transition-colors duration-300" 
            v-model="formState.message"
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          class="btn-primary w-full py-3 mt-2 text-[15px]"
          :disabled="formStatus === 'sending'"
        >
          {{ formStatus === 'sending' ? c.formSending : c.formSend }}
        </button>

        <div v-if="formStatus === 'success'" class="text-sm font-medium text-green-400 mt-2 text-center" role="status">
          {{ c.formSuccess }}
        </div>
        <div v-if="formStatus === 'error'" class="text-sm font-medium text-red-400 mt-2 text-center" role="status">
          {{ c.formError }}
        </div>
      </form>
    </div>
  </section>
</template>
