<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Mail, Github, Linkedin, Copy, Check, Clock, Video, ArrowUpRight, Send, MessageCircle } from 'lucide-vue-next'

const props = defineProps({
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
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (accessKey && accessKey.trim() !== '') {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.value.name,
          email: formState.value.email,
          message: formState.value.message,
          subject: `Portfolio Contact from ${formState.value.name}`
        })
      })
      const result = await response.json()
      if (result.success) {
        formStatus.value = 'success'
        formState.value = { name: '', email: '', message: '' }
      } else {
        fallbackToMailto()
      }
    } catch (_) {
      fallbackToMailto()
    }
  } else {
    fallbackToMailto()
  }

  setTimeout(() => {
    formStatus.value = null
  }, 5000)
}

const fallbackToMailto = () => {
  const subject = encodeURIComponent(`Inquiry from ${formState.value.name}`)
  const body = encodeURIComponent(`Name: ${formState.value.name}\nEmail: ${formState.value.email}\n\nMessage:\n${formState.value.message}`)
  window.location.href = `mailto:faridaprilian214@gmail.com?subject=${subject}&body=${body}`
  formStatus.value = 'success'
  formState.value = { name: '', email: '', message: '' }
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
    <div class="mb-10">
      <span class="comic-chapter-badge bg-[var(--brand-coral)] text-white mb-4">
        <MessageCircle class="w-3.5 h-3.5" />
        {{ c.contactMeta }}
      </span>
      <h2 id="contact-heading" class="display-section">{{ c.contactTitle }}</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      <!-- Left Column: Friendly Pitch & Channels -->
      <div class="lg:col-span-6 flex flex-col gap-6">
        
        <div class="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink-primary)] tracking-tight leading-tight">
          <span>Mari Mulai Diskusi</span><br />
          <span class="text-[var(--brand-coral)]">Untuk Proyek Anda;</span>
        </div>

        <p class="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed max-w-lg">
          {{ c.contactBody }}
        </p>
        
        <!-- Live Jakarta Timezone Capsule Widget -->
        <div class="comic-panel p-4 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] flex items-center justify-between max-w-md shadow-comic">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-[var(--surface-subtle)] border border-[var(--comic-border)] flex items-center justify-center text-[var(--brand-coral)] shrink-0">
              <Clock class="w-4 h-4" />
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-bold text-[var(--ink-muted)]">
                {{ c.contactLocation || 'Jakarta, Indonesia (WIB / UTC+7)' }}
              </span>
              <span class="font-mono text-sm font-bold text-[var(--ink-primary)]">
                {{ currentTimeJakarta }} WIB
              </span>
            </div>
          </div>
          <span class="font-mono text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>

        <!-- Direct Contact Links -->
        <div class="flex flex-col gap-3 max-w-md">
          <!-- Copy Email Action -->
          <div class="comic-panel p-3 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] flex items-center justify-between">
            <a :href="`mailto:${profile.contactActions.emailValue}`" class="flex items-center gap-3 text-[var(--ink-primary)] hover:text-[var(--brand-coral)] font-bold text-sm transition-colors truncate">
              <div class="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] border border-[var(--comic-border)] flex items-center justify-center shrink-0">
                <Mail class="w-4 h-4 text-[var(--brand-coral)]" />
              </div>
              <span class="truncate">{{ profile.contactActions.emailValue }}</span>
            </a>
            <button
              type="button"
              class="p-2 rounded-lg text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] border border-[var(--comic-border)] transition-colors text-xs font-mono font-bold flex items-center gap-1.5 shrink-0 ml-2"
              @click="copyEmailToClipboard"
              :aria-label="c.contactCopyEmailAction || 'Copy Email'"
            >
              <Check v-if="emailCopied" class="w-3.5 h-3.5 text-emerald-600" />
              <Copy v-else class="w-3.5 h-3.5" />
              <span>
                {{ emailCopied ? (c.contactEmailCopied || 'Copied!') : (c.contactCopyEmailAction || 'Copy') }}
              </span>
            </button>
          </div>

          <!-- Google Meet / Video Call -->
          <a
            :href="profile.contactActions.meetingUrl || 'https://calendar.app.google/yND5q1Mz91fp9CP8A'"
            target="_blank"
            rel="noreferrer"
            class="comic-panel p-3 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] hover:border-[var(--brand-coral)] flex items-center justify-between transition-all"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] border border-[var(--comic-border)] flex items-center justify-center shrink-0 text-emerald-600">
                <Video class="w-4 h-4" />
              </div>
              <div class="flex flex-col">
                <span class="font-bold text-sm text-[var(--ink-primary)]">{{ profile.contactActions.meetingLabel || 'Jadwalkan Panggilan (Google Meet)' }}</span>
                <span class="text-xs text-[var(--ink-muted)]">30 menit diskusi teknis</span>
              </div>
            </div>
            <ArrowUpRight class="w-4 h-4 text-[var(--ink-muted)] shrink-0" />
          </a>

          <!-- GitHub Profile -->
          <a
            :href="`https://${profile.contactActions.githubValue || 'github.com/fatidaprilian'}`"
            target="_blank"
            rel="noreferrer"
            class="comic-panel p-3 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] hover:border-[var(--brand-coral)] flex items-center justify-between transition-all"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] border border-[var(--comic-border)] flex items-center justify-center shrink-0 text-[var(--ink-primary)]">
                <Github class="w-4 h-4" />
              </div>
              <span class="font-bold text-sm text-[var(--ink-primary)]">GitHub Profile (@fatidaprilian)</span>
            </div>
            <ArrowUpRight class="w-4 h-4 text-[var(--ink-muted)] shrink-0" />
          </a>

          <!-- LinkedIn -->
          <a
            href="https://linkedin.com/in/farid-aprilian"
            target="_blank"
            rel="noreferrer"
            class="comic-panel p-3 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] hover:border-[var(--brand-coral)] flex items-center justify-between transition-all"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] border border-[var(--comic-border)] flex items-center justify-center shrink-0 text-sky-600">
                <Linkedin class="w-4 h-4" />
              </div>
              <span class="font-bold text-sm text-[var(--ink-primary)]">LinkedIn Profile (farid-aprilian)</span>
            </div>
            <ArrowUpRight class="w-4 h-4 text-[var(--ink-muted)] shrink-0" />
          </a>
        </div>
      </div>

      <!-- Right Column: Clean Form -->
      <div class="lg:col-span-6 w-full">
        <form class="comic-panel p-6 sm:p-8 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] shadow-comic flex flex-col gap-4" @submit.prevent="handleFormSubmit">
          <div class="border-b border-[var(--comic-border)]/20 pb-3 flex items-center justify-between">
            <h3 class="font-black text-sm text-[var(--ink-primary)]">
              {{ c.formTitle || 'Kirim Pesan Langsung' }}
            </h3>
            <span class="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)]">
              {{ c.formBadge || 'PESAN' }}
            </span>
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="form-name" class="font-bold text-xs sm:text-sm text-[var(--ink-primary)]">{{ c.formName }}</label>
            <input 
              id="form-name" 
              type="text" 
              class="bg-[var(--canvas-bg)] border-[1.5px] border-[var(--comic-border)] focus:border-[var(--brand-coral)] focus:outline-none rounded-xl px-4 py-2.5 text-[var(--ink-primary)] w-full font-medium transition-colors" 
              v-model="formState.name"
              required 
            />
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="form-email" class="font-bold text-xs sm:text-sm text-[var(--ink-primary)]">{{ c.formEmail }}</label>
            <input 
              id="form-email" 
              type="email" 
              class="bg-[var(--canvas-bg)] border-[1.5px] border-[var(--comic-border)] focus:border-[var(--brand-coral)] focus:outline-none rounded-xl px-4 py-2.5 text-[var(--ink-primary)] w-full font-medium transition-colors" 
              v-model="formState.email"
              required 
            />
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="form-message" class="font-bold text-xs sm:text-sm text-[var(--ink-primary)]">{{ c.formMessage }}</label>
            <textarea 
              id="form-message" 
              rows="4"
              class="bg-[var(--canvas-bg)] border-[1.5px] border-[var(--comic-border)] focus:border-[var(--brand-coral)] focus:outline-none rounded-xl px-4 py-2.5 text-[var(--ink-primary)] w-full font-medium resize-none transition-colors" 
              v-model="formState.message"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="btn-comic-primary w-full py-3.5 text-sm sm:text-base mt-2"
            :disabled="formStatus === 'sending'"
          >
            <Send class="w-4 h-4 mr-1.5" />
            <span>{{ formStatus === 'sending' ? c.formSending : c.formSend }}</span>
          </button>

          <div v-if="formStatus === 'success'" class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500 text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200 text-center" role="status">
            {{ c.formSuccess }}
          </div>
          <div v-if="formStatus === 'error'" class="p-3 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-500 text-xs sm:text-sm font-bold text-red-900 dark:text-red-200 text-center" role="status">
            {{ c.formError }}
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
