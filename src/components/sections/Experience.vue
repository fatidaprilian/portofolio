<script setup>
import { GraduationCap, Award, Briefcase } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true },
  profile: { type: Object, required: true }
})
</script>

<template>
  <section id="experience" class="section-container" aria-labelledby="experience-heading">
    <!-- Work Experience Section -->
    <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--comic-border)]/20 pb-6">
      <div>
        <span class="comic-chapter-badge bg-[var(--brand-mint)] text-slate-950 mb-4">
          <Briefcase class="w-3.5 h-3.5 text-slate-950" />
          {{ c.experienceMeta }}
        </span>
        <h2 id="experience-heading" class="display-section">{{ c.experienceTitle }}</h2>
      </div>
      <p class="text-[var(--ink-muted)] text-xs sm:text-sm font-medium mt-4 md:mt-0">
        {{ c.experienceSub || 'Perjalanan Karir & Profesional' }}
      </p>
    </div>

    <!-- Career Timeline Items as Comic Panels -->
    <div class="flex flex-col gap-5 mb-16" role="list">
      <div
        v-for="item in profile.timelineItems"
        :key="`${item.period}-${item.title}`"
        class="comic-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-start justify-between bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] gap-6"
        role="listitem"
      >
        <div class="flex flex-col gap-2 max-w-3xl">
          <div class="flex flex-wrap items-center gap-3">
            <h3 class="text-xl sm:text-2xl font-black text-[var(--ink-primary)] tracking-tight">{{ item.title }}</h3>
            <span v-if="item.impact" class="font-mono text-[11px] font-bold text-slate-950 bg-[var(--brand-mint)] border border-[var(--comic-border)] px-2.5 py-0.5 rounded shadow-[1px_1px_0px_var(--comic-border)]">
              {{ item.impact }}
            </span>
          </div>
          
          <span class="font-bold text-[var(--brand-coral)] text-sm sm:text-base">{{ item.role }}</span>
          <p class="text-[var(--ink-muted)] mt-1 text-xs sm:text-sm leading-relaxed">{{ item.description }}</p>

          <!-- Technology Badges -->
          <div v-if="item.technologies?.length" class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[var(--comic-border)]/15">
            <span
              v-for="tech in item.technologies"
              :key="tech"
              class="comic-tag text-[10px] sm:text-[11px]"
            >
              {{ tech }}
            </span>
          </div>
        </div>
        
        <div class="self-start shrink-0">
          <span class="font-mono text-xs font-bold text-slate-950 bg-[var(--brand-sun)] border border-[var(--comic-border)] px-3 py-1.5 rounded-lg shadow-[1px_1px_0px_var(--comic-border)]">
            {{ item.period }}
          </span>
        </div>
      </div>
    </div>

    <!-- Education & Certifications Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-[var(--comic-border)]/20">
      
      <!-- Academic Education -->
      <div v-if="profile.educationItems?.length" class="flex flex-col gap-6">
        <div class="flex items-center gap-2">
          <GraduationCap class="w-5 h-5 text-[var(--brand-coral)]" />
          <h3 class="text-2xl font-black text-[var(--ink-primary)] tracking-tight">
            {{ c.educationTitle || profile.educationLabel || 'Pendidikan Formal' }}
          </h3>
        </div>

        <div class="flex flex-col gap-4">
          <div
            v-for="edu in profile.educationItems"
            :key="edu.institution"
            class="comic-panel p-6 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] flex flex-col gap-2"
          >
            <div class="flex justify-between items-start gap-4">
              <h4 class="text-base sm:text-lg font-black text-[var(--ink-primary)]">{{ edu.institution }}</h4>
              <span class="font-mono text-xs font-bold text-[var(--ink-muted)] bg-[var(--surface-subtle)] border border-[var(--comic-border)] px-2.5 py-0.5 rounded shrink-0">{{ edu.period }}</span>
            </div>
            <p class="text-[var(--brand-mint)] text-xs sm:text-sm font-bold">{{ edu.degree }}</p>
            <p v-if="edu.details" class="text-[var(--ink-muted)] text-xs leading-relaxed mt-1">{{ edu.details }}</p>
          </div>
        </div>
      </div>

      <!-- Certifications Section -->
      <div v-if="profile.certificationsItems?.length" class="flex flex-col gap-6">
        <div class="flex items-center gap-2">
          <Award class="w-5 h-5 text-[var(--brand-sun)]" />
          <h3 class="text-2xl font-black text-[var(--ink-primary)] tracking-tight">
            {{ c.certificationsTitle || profile.certificationsLabel || 'Sertifikasi & Lisensi' }}
          </h3>
        </div>

        <div class="flex flex-col gap-4">
          <div
            v-for="cert in profile.certificationsItems"
            :key="cert.title"
            class="comic-panel p-6 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] flex flex-col gap-2"
          >
            <div class="flex justify-between items-start gap-4">
              <h4 class="text-base sm:text-lg font-black text-[var(--ink-primary)]">{{ cert.title }}</h4>
              <span class="font-mono text-xs font-bold text-[var(--ink-muted)] bg-[var(--surface-subtle)] border border-[var(--comic-border)] px-2.5 py-0.5 rounded shrink-0">{{ cert.period }}</span>
            </div>
            <p class="text-[var(--ink-muted)] text-xs sm:text-sm font-medium">{{ cert.issuer }}</p>
            <span class="inline-self-start font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">{{ cert.status }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
