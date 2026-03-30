<script setup>
import { getCareerProfileByLanguage } from '../data/careerProfile'

const props = defineProps({
  language: {
    type: String,
    default: 'id'
  }
})

const getProfile = () => getCareerProfileByLanguage(props.language)
</script>

<template>
  <section id="about" class="pb-20 md:pb-24">
    <div class="section-shell">

      <!-- Section header -->
      <div class="mb-12 md:mb-16" data-reveal>
        <p class="text-xs uppercase tracking-[0.24em] text-muted">{{ getProfile().heroLabel }}</p>
        <h2 class="mt-3 font-display text-5xl md:text-6xl lg:text-7xl text-text leading-none tracking-wide">
          {{ getProfile().heroTitle }}
        </h2>
        <p class="mt-5 text-[#5b4639] leading-relaxed max-w-2xl">
          {{ getProfile().heroSummary }}
        </p>
      </div>

      <!-- Main grid -->
      <div class="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">

        <!-- Left: quick info sidebar -->
        <aside class="lg:col-span-4 space-y-5 lg:sticky lg:top-24" data-reveal>
          <!-- Quick facts -->
          <div class="panel rounded-2xl p-5 md:p-6 space-y-3">
            <p class="text-xs uppercase tracking-[0.2em] text-muted">Quick Facts</p>
            <ul class="space-y-2 mt-3">
              <li
                v-for="factItem in getProfile().quickFacts"
                :key="factItem"
                class="text-sm text-[#62493d] flex items-start gap-2"
              >
                <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"></span>
                <span>{{ factItem }}</span>
              </li>
            </ul>
          </div>

          <!-- Contact info -->
          <div class="panel-soft rounded-2xl p-5 md:p-6 space-y-3 text-sm text-[#4f372b]">
            <p class="text-xs uppercase tracking-[0.2em] text-muted">Contact</p>
            <div class="space-y-2 mt-3">
              <p>
                <span class="font-semibold text-[#3e2c23]">{{ getProfile().contactActions.callLabel }}</span><br/>
                <span class="text-[#6a4f40]">{{ getProfile().contactActions.callValue }}</span>
              </p>
              <p>
                <span class="font-semibold text-[#3e2c23]">{{ getProfile().contactActions.emailLabel }}</span><br/>
                <a :href="`mailto:${getProfile().contactActions.emailValue}`" class="text-accent underline-link">{{ getProfile().contactActions.emailValue }}</a>
              </p>
              <p>
                <span class="font-semibold text-[#3e2c23]">{{ getProfile().contactActions.linkedinLabel }}</span><br/>
                <a :href="`https://${getProfile().contactActions.linkedinValue}`" target="_blank" rel="noreferrer" class="text-accent underline-link">{{ getProfile().contactActions.linkedinValue }}</a>
              </p>
            </div>
          </div>

          <!-- Education -->
          <div class="panel rounded-2xl p-5 md:p-6">
            <p class="text-xs uppercase tracking-[0.2em] text-muted mb-4">{{ getProfile().educationLabel }}</p>
            <div class="space-y-4">
              <div
                v-for="educationItem in getProfile().educationItems"
                :key="educationItem.period + educationItem.institution"
                class="border-l-2 border-[#c9a98d] pl-4"
              >
                <p class="text-xs uppercase tracking-[0.1em] text-[#85624e]">{{ educationItem.period }}</p>
                <h4 class="mt-1 text-base font-semibold text-text leading-tight">{{ educationItem.institution }}</h4>
                <p class="mt-0.5 text-sm text-[#5d473a]">{{ educationItem.degree }}</p>
              </div>
            </div>
          </div>
        </aside>

        <!-- Right: experience + skills -->
        <div class="lg:col-span-8 space-y-6">

          <!-- Experience Timeline — giant year watermark style -->
          <article class="rounded-2xl p-6 md:p-7" data-reveal>
            <p class="text-xs uppercase tracking-[0.22em] text-muted mb-8">{{ getProfile().timelineLabel }}</p>
            <div class="space-y-0">
              <div
                v-for="(timelineItem, i) in getProfile().timelineItems"
                :key="timelineItem.period + timelineItem.title"
                class="relative border-t border-[#c9b297]/50 py-8 overflow-hidden group"
                :class="i === getProfile().timelineItems.length - 1 ? 'border-b border-[#c9b297]/50' : ''"
              >
                <!-- Giant year watermark — bottom-right, purely decorative -->
                <div class="absolute right-2 bottom-1 font-display text-4xl md:text-[3rem] leading-none text-[#c9b297]/10 md:text-[#c9b297]/18 select-none pointer-events-none group-hover:text-[#c9b297]/30 transition-colors duration-500">
                  {{ timelineItem.period.split('–')[0].trim().split('—')[0].trim() }}
                </div>

                <div class="relative z-10 grid md:grid-cols-12 gap-4">
                  <div class="md:col-span-3">
                    <p class="text-xs uppercase tracking-[0.14em] text-[#86634e] font-medium">{{ timelineItem.period }}</p>
                    <p class="mt-1.5 text-sm text-[#6d4f3f]">{{ timelineItem.role }}</p>
                  </div>
                  <div class="md:col-span-9">
                    <h3 class="font-display text-2xl md:text-4xl text-text tracking-wide leading-none">{{ timelineItem.title }}</h3>
                    <p class="mt-2 md:mt-3 text-sm md:text-base text-[#5b4639] leading-relaxed">{{ timelineItem.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- FAQ -->
          <article class="panel rounded-2xl p-6 md:p-7" data-reveal style="--reveal-delay: 60ms;">
            <p class="text-xs uppercase tracking-[0.22em] text-muted mb-6">{{ getProfile().faqLabel }}</p>
            <div class="space-y-0">
              <div
                v-for="(faqItem, i) in getProfile().faqItems"
                :key="faqItem.question"
                class="border-t border-[#d7c2a8]/60 py-5"
                :class="i === getProfile().faqItems.length - 1 ? 'border-b border-[#d7c2a8]/60' : ''"
              >
                <h4 class="text-base font-semibold text-[#4b3529]">{{ faqItem.question }}</h4>
                <p class="mt-2 text-sm md:text-base text-[#5f493c] leading-relaxed">{{ faqItem.answer }}</p>
              </div>
            </div>
          </article>

          <!-- Skills -->
          <article class="panel rounded-2xl p-6 md:p-7" data-reveal style="--reveal-delay: 100ms;">
            <p class="text-xs uppercase tracking-[0.22em] text-muted mb-6">{{ getProfile().skillsLabel }}</p>
            <div class="space-y-5">
              <div
                v-for="skillGroup in getProfile().skillGroups"
                :key="skillGroup.category"
              >
                <h4 class="text-xs font-semibold uppercase tracking-[0.14em] text-[#674c3c] mb-3">{{ skillGroup.category }}</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skillItem in skillGroup.items"
                    :key="skillItem"
                    class="text-xs text-[#5c463a] border border-[#ccb298]/60 rounded-lg px-3 py-1.5 bg-[#f1dfcc]/60"
                  >
                    {{ skillItem }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
