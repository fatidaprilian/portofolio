<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Mail, Phone, Linkedin, MessageCircle, Copy, Check, Clock } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true },
  profile: { type: Object, required: true }
})

const formState = ref({ name: '', email: '', message: '' })
const formStatus = ref(null) // 'sending' | 'success' | 'error'
const emailCopied = ref(false)
const currentTimeJakarta = ref('')

let clockTimer = null

const updateJakartaTime = () => {
  try {
    const now = new Date()
    currentTimeJakarta.value = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now)
  } catch (_) {
    currentTimeJakarta.value = 'UTC+7'
  }
}

const copyEmailToClipboard = async () => {
  try {
    await navigator.clipboard.writeText('faridaprilian214@gmail.com')
    emailCopied.value = true
    setTimeout(() => {
      emailCopied.value = false
    }, 2500)
  } catch (_) {}
}

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

onMounted(() => {
  updateJakartaTime()
  clockTimer = setInterval(updateJakartaTime, 1000)
})

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
})
</script>

<template>
  <section id="contact" class="section-container" aria-labelledby="contact-heading">
    <div class="mb-12">
      <span class="pill-tag inline-block mb-4">{{ c.contactMeta }}</span>
      <h2 id="contact-heading" class="display-section">{{ c.contactTitle }}</h2>
    </div>

    <div class="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2 select-none text-left font-bold uppercase tracking-tighter leading-[0.85] text-[clamp(3.5rem,7vw,6.5rem)] text-[var(--ink-primary)]">
          <span>LET'S</span>
          <span class="text-[var(--accent-blue)]">BUILD</span>
          <span>TOGETHER</span>
        </div>

        <p class="text-lg text-[var(--ink-muted)] leading-relaxed max-w-md">{{ c.contactBody }}</p>
        
        <!-- Live Jakarta Timezone Capsule Widget -->
        <div class="spotlight-card p-4 rounded-xl flex items-center justify-between border border-[var(--hairline)] max-w-md">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[var(--surface-canvas)] flex items-center justify-center text-[var(--accent-blue)]">
              <Clock class="w-4 h-4" />
            </div>
            <div class="flex flex-col">
              <span class="font-mono text-[11px] text-[var(--ink-muted)] uppercase tracking-wider">
                {{ c.contactLocation || 'Jakarta, Indonesia (WIB / UTC+7)' }}
              </span>
              <span class="font-mono text-sm font-bold text-[var(--ink-primary)]">
                {{ currentTimeJakarta }} WIB
              </span>
            </div>
          </div>
          <span class="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>

        <!-- Direct Contact Links -->
        <div class="flex flex-col gap-3 max-w-md">
          <!-- Copy Email Action -->
          <div class="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-1)] border border-[var(--hairline)]">
            <a :href="`mailto:${profile.contactActions.emailValue}`" class="flex items-center gap-3 text-[var(--ink-primary)] hover:text-[var(--accent-blue)] font-medium text-sm transition-colors">
              <div class="w-8 h-8 rounded-full bg-[var(--surface-canvas)] flex items-center justify-center shrink-0">
                <Mail class="w-4 h-4" />
              </div>
              <span class="truncate">{{ profile.contactActions.emailValue }}</span>
            </a>
            <button
              type="button"
              class="p-2 rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-canvas)] transition-colors text-xs font-mono flex items-center gap-1.5 shrink-0"
              @click="copyEmailToClipboard"
              :aria-label="c.contactCopyEmailAction || 'Copy Email'"
            >
              <Check v-if="emailCopied" class="w-3.5 h-3.5 text-emerald-400" />
              <Copy v-else class="w-3.5 h-3.5" />
              <span :class="emailCopied ? 'text-emerald-400 font-bold' : ''">
                {{ emailCopied ? (c.contactEmailCopied || 'Copied!') : (c.contactCopyEmailAction || 'Copy') }}
              </span>
            </button>
          </div>

          <!-- WhatsApp Direct -->
          <a
            :href="`https://wa.me/${profile.contactActions.callValue}`"
            target="_blank"
            rel="noreferrer"
            class="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-1)] hover:bg-[var(--surface-2)] border border-[var(--hairline)] hover:border-[var(--accent-blue)] text-[var(--ink-primary)] font-medium text-sm transition-colors"
          >
            <div class="w-8 h-8 rounded-full bg-[var(--surface-canvas)] flex items-center justify-center shrink-0 text-emerald-400">
              <MessageCircle class="w-4 h-4" />
            </div>
            <span>{{ c.contactWhatsapp || 'Chat via WhatsApp' }}</span>
          </a>

          <!-- LinkedIn -->
          <a
            href="https://linkedin.com/in/farid-aprilian"
            target="_blank"
            rel="noreferrer"
            class="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-1)] hover:bg-[var(--surface-2)] border border-[var(--hairline)] hover:border-[var(--accent-blue)] text-[var(--ink-primary)] font-medium text-sm transition-colors"
          >
            <div class="w-8 h-8 rounded-full bg-[var(--surface-canvas)] flex items-center justify-center shrink-0 text-sky-400">
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
