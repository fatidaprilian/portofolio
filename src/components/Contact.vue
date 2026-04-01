<script setup>
import { ref } from 'vue'
import { Send, Mail, MapPin, ArrowUpRight } from 'lucide-vue-next'
import MagneticHover from './MagneticHover.vue'

const props = defineProps({
  language: {
    type: String,
    default: 'id'
  }
})

const form = ref({ name: '', email: '', message: '' })
const errors = ref({})
const isSubmitting = ref(false)
const isSuccess = ref(false)
const serverError = ref('')

const copyByLanguage = {
  id: {
    bigLine1: 'MARI',
    bigLine2: 'DISKUSI',
    tagline: 'Terbuka untuk freelance & kolaborasi strategis.',
    sectionLabel: 'Kontak',
    sectionDescription: 'Ceritakan konteks bisnis, target, dan timeline agar diskusi lebih fokus.',
    responseTime: 'Waktu respons: 24–48 jam',
    nameLabel: 'Nama', emailLabel: 'Email', briefLabel: 'Konteks Proyek',
    namePlaceholder: 'Nama Anda', emailPlaceholder: 'anda@email.com', briefPlaceholder: 'Scope, timeline, goals',
    sending: 'Mengirim...', sendMessage: 'Kirim pesan →',
    successMessage: 'Terima kasih! Saya balas secepatnya.',
    nameRequired: 'Isi nama kamu dulu ya.',
    emailRequired: 'Email belum diisi.',
    emailInvalid: 'Format email perlu dicek.',
    messageRequired: 'Ceritakan scope project-nya.'
  },
  en: {
    bigLine1: "LET'S",
    bigLine2: 'TALK',
    tagline: 'Open to freelance & strategic collaboration.',
    sectionLabel: 'Contact',
    sectionDescription: 'Share your business context, goals, and timeline to keep the discussion focused.',
    responseTime: 'Typical response: 24–48 hours',
    nameLabel: 'Name', emailLabel: 'Email', briefLabel: 'Project brief',
    namePlaceholder: 'Your name', emailPlaceholder: 'your@email.com', briefPlaceholder: 'Scope, timeline, goals',
    sending: 'Sending...', sendMessage: 'Send message →',
    successMessage: 'Thanks! I\'ll reply as soon as possible.',
    nameRequired: 'Please enter your name.',
    emailRequired: 'Email is required.',
    emailInvalid: 'Check the email format.',
    messageRequired: 'Please share a short project scope.'
  }
}

const getActiveCopy = () => copyByLanguage[props.language] ?? copyByLanguage.id

const validate = () => {
  const activeCopy = getActiveCopy()
  const validationErrors = {}

  if (!form.value.name) validationErrors.name = activeCopy.nameRequired
  if (!form.value.email) {
    validationErrors.email = activeCopy.emailRequired
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    validationErrors.email = activeCopy.emailInvalid
  }
  if (!form.value.message) validationErrors.message = activeCopy.messageRequired

  errors.value = validationErrors
  return Object.keys(validationErrors).length === 0
}

const resetFormState = () => {
  form.value = { name: '', email: '', message: '' }
  isSuccess.value = true
  setTimeout(() => { isSuccess.value = false }, 5000)
}

const submitForm = async () => {
  if (!validate()) return
  isSubmitting.value = true
  serverError.value = ''
  
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  
  if (!accessKey && import.meta.env.DEV) {
    // Development-only bypass when access key is not configured
    await new Promise(resolve => setTimeout(resolve, 1500))
    isSubmitting.value = false
    resetFormState()
    return
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...form.value
      })
    })
    
    const responseBody = await response.json()
    if (response.status === 200) {
      resetFormState()
    } else {
      serverError.value = responseBody.message || 'Error occurred while sending.'
    }
  } catch (networkError) {
    serverError.value = 'Network error. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="contact" class="border-t border-[#d7c2a8]/60">
    <div class="grid lg:grid-cols-2 min-h-[85vh]">

      <!-- LEFT: Giant "LET'S TALK" typographic block -->
      <div class="relative flex flex-col justify-between p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#d7c2a8]/60 bg-[#f0dccd]/40 overflow-hidden">
        <!-- Big decorative background number -->
        <div class="absolute -bottom-8 -left-4 font-display text-[22rem] leading-none text-[#d7beaa]/25 select-none pointer-events-none">01</div>

        <div class="relative z-10">
          <p class="text-[0.6rem] md:text-xs uppercase tracking-[0.26em] text-muted mb-5">{{ getActiveCopy().sectionLabel }}</p>
          <!-- Giant display text -->
          <div class="mb-0">
            <p class="font-display text-[clamp(4.5rem,12vw,9rem)] text-text leading-[0.88] tracking-wide">{{ getActiveCopy().bigLine1 }}</p>
            <p class="font-display text-[clamp(4.5rem,12vw,9rem)] text-[#a56a43] leading-[0.88] tracking-wide">{{ getActiveCopy().bigLine2 }}</p>
          </div>
        </div>

        <!-- Bottom: contact info -->
        <div class="relative z-10 mt-12 space-y-5">
          <p class="text-[#5b4639] text-sm leading-relaxed max-w-xs">{{ getActiveCopy().tagline }}</p>
          <div class="space-y-3 text-sm text-[#4f372b]">
            <a href="mailto:faridaprilian214@gmail.com" class="flex items-center gap-3 group">
              <Mail class="w-4 h-4 text-accent flex-shrink-0" />
              <span class="underline-link group-hover:text-[#2f211a] transition">faridaprilian214@gmail.com</span>
            </a>
            <div class="flex items-center gap-3">
              <MapPin class="w-4 h-4 text-accent flex-shrink-0" />
              <span>Indonesia · GMT+7</span>
            </div>
            <a href="https://github.com/fatidaprilian" target="_blank" rel="noreferrer" class="flex items-center gap-3 group">
              <ArrowUpRight class="w-4 h-4 text-accent flex-shrink-0" />
              <span class="underline-link group-hover:text-[#2f211a] transition">github.com/fatidaprilian</span>
            </a>
          </div>
          <p class="text-xs text-muted">{{ getActiveCopy().responseTime }}</p>
        </div>
      </div>

      <!-- RIGHT: Minimal form -->
      <div class="flex items-center p-8 md:p-12 lg:p-16" data-reveal>
        <form @submit.prevent="submitForm" class="w-full space-y-6">
          <!-- Name -->
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold uppercase tracking-[0.16em] text-[#5a4336]">{{ getActiveCopy().nameLabel }}</label>
            <input
              v-model="form.name"
              type="text"
              :placeholder="getActiveCopy().namePlaceholder"
              class="w-full border-b bg-transparent pb-3 text-[#3a2b23] placeholder:text-[#b09484] outline-none transition-colors text-sm focus:border-[#a56a43]"
              :class="errors.name ? 'border-rose-400' : 'border-[#c9a98d]'"
            />
            <p v-if="errors.name" class="text-xs text-rose-400">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold uppercase tracking-[0.16em] text-[#5a4336]">{{ getActiveCopy().emailLabel }}</label>
            <input
              v-model="form.email"
              type="email"
              :placeholder="getActiveCopy().emailPlaceholder"
              class="w-full border-b bg-transparent pb-3 text-[#3a2b23] placeholder:text-[#b09484] outline-none transition-colors text-sm focus:border-[#a56a43]"
              :class="errors.email ? 'border-rose-400' : 'border-[#c9a98d]'"
            />
            <p v-if="errors.email" class="text-xs text-rose-400">{{ errors.email }}</p>
          </div>

          <!-- Brief -->
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold uppercase tracking-[0.16em] text-[#5a4336]">{{ getActiveCopy().briefLabel }}</label>
            <textarea
              v-model="form.message"
              rows="5"
              :placeholder="getActiveCopy().briefPlaceholder"
              class="w-full border-b bg-transparent pb-3 text-[#3a2b23] placeholder:text-[#b09484] outline-none transition-colors text-sm focus:border-[#a56a43] resize-none"
              :class="errors.message ? 'border-rose-400' : 'border-[#c9a98d]'"
            ></textarea>
            <p v-if="errors.message" class="text-xs text-rose-400">{{ errors.message }}</p>
          </div>

          <!-- Submit -->
          <MagneticHover wrapperClass="block w-full">
            <button
              type="submit"
              class="w-full border border-[#a56a43] text-[#a56a43] hover:bg-[#a56a43] hover:text-[#f8f1e5] font-semibold text-sm px-6 py-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              :disabled="isSubmitting"
            >
              <Send class="w-4 h-4" />
              {{ isSubmitting ? getActiveCopy().sending : getActiveCopy().sendMessage }}
            </button>
          </MagneticHover>

          <div v-if="isSuccess" class="rounded-lg border border-[#a56a43]/30 bg-[#a56a43]/10 text-[#5a3a28] text-sm px-4 py-3">
            {{ getActiveCopy().successMessage }}
          </div>
          <div v-if="serverError" class="rounded-lg border border-red-500/30 bg-red-500/10 text-red-700 text-sm px-4 py-3">
            {{ serverError }}
          </div>
        </form>
      </div>

    </div>
  </section>
</template>
