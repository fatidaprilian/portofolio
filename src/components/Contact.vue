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
  // Simulating transmission latency
  await new Promise((resolve) => setTimeout(resolve, 1200))
  formStatus.value = 'success'
  formState.value = { name: '', email: '', message: '' }
  setTimeout(() => {
    formStatus.value = null
  }, 4000)
}

const initContactReveal = () => {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReduced) return

  // Set initial hidden state under masks
  gsap.set('.contact-mask-child', { y: '115%' })

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: '#contact',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('.contact-mask-child', {
        y: '0%',
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.14
      })
    },
    once: true
  })
}

onMounted(() => {
  setTimeout(() => {
    initContactReveal()
  }, 150)
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
})
</script>

<template>
  <section id="contact" class="section-container" aria-labelledby="contact-heading">
    <div class="section-header">
      <span class="section-kicker">{{ c.contactMeta }}</span>
      <h2 id="contact-heading" class="section-title">{{ c.contactTitle }}</h2>
    </div>

    <div class="glass-panel contact-panel">
      <div class="contact-info">
        <!-- Cinematic Giant Display Header -->
        <div class="contact-big-title flex flex-col gap-1 select-none text-left tracking-tighter uppercase font-black leading-none mb-6">
          <div class="mask-reveal">
            <span class="contact-mask-child block text-[clamp(2.5rem,7vw,5.5rem)]">LET'S</span>
          </div>
          <div class="mask-reveal">
            <span class="contact-mask-child text-outline-stroke block text-[clamp(2.5rem,7vw,5.5rem)]">BUILD</span>
          </div>
          <div class="mask-reveal">
            <span class="contact-mask-child block text-[clamp(2.5rem,7vw,5.5rem)]">TOGETHER</span>
          </div>
        </div>

        <p class="mb-6">{{ c.contactBody }}</p>
        
        <div class="contact-links">
          <a :href="`mailto:${profile.contactActions.emailValue}`" class="contact-link-item">
            <Mail class="w-4 h-4 contact-link-icon" />
            <span>{{ profile.contactActions.emailValue }}</span>
          </a>
          <a :href="`tel:${profile.contactActions.callValue}`" class="contact-link-item">
            <Phone class="w-4 h-4 contact-link-icon" />
            <span>{{ profile.contactActions.callValue }}</span>
          </a>
          <a href="https://linkedin.com/in/farid-aprilian" target="_blank" rel="noreferrer" class="contact-link-item">
            <Linkedin class="w-4 h-4 contact-link-icon" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="handleFormSubmit">
        <div class="form-group">
          <label for="form-name" class="form-label">{{ c.formName }}</label>
          <input 
            id="form-name" 
            type="text" 
            class="form-input" 
            v-model="formState.name"
            required 
          />
        </div>
        <div class="form-group">
          <label for="form-email" class="form-label">{{ c.formEmail }}</label>
          <input 
            id="form-email" 
            type="email" 
            class="form-input" 
            v-model="formState.email"
            required 
          />
        </div>
        <div class="form-group">
          <label for="form-message" class="form-label">{{ c.formMessage }}</label>
          <textarea 
            id="form-message" 
            class="form-textarea" 
            v-model="formState.message"
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          class="btn-premium justify-center w-full"
          :disabled="formStatus === 'sending'"
        >
          {{ formStatus === 'sending' ? c.formSending : c.formSend }}
        </button>

        <!-- Dynamic accessibility logs feedback -->
        <div v-if="formStatus === 'success'" class="form-message is-success" role="status">
          {{ c.formSuccess }}
        </div>
        <div v-if="formStatus === 'error'" class="form-message is-error" role="status">
          {{ c.formError }}
        </div>
      </form>
    </div>
  </section>
</template>
