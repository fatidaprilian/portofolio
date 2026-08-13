<script setup>
defineProps({
  c: { type: Object, required: true },
  profile: { type: Object, required: true }
})
</script>

<template>
  <section id="experience" class="section-container" aria-labelledby="experience-heading">
    <!-- Work Experience Section -->
    <div class="mb-8">
      <span class="pill-tag inline-block mb-4">{{ c.experienceMeta }}</span>
      <h2 id="experience-heading" class="display-section">{{ c.experienceTitle }}</h2>
    </div>

    <div class="flex flex-col border-t border-[var(--hairline)] mb-16" role="list">
      <div
        v-for="item in profile.timelineItems"
        :key="`${item.period}-${item.title}`"
        class="list-row group hover:bg-[var(--surface-1)] transition-colors duration-300 p-4 md:p-6 -mx-4 md:-mx-6 rounded-xl cursor-default flex flex-col md:flex-row md:items-center justify-between border-b border-[var(--hairline)]"
        role="listitem"
      >
        <div class="flex flex-col gap-1">
          <h3 class="text-xl md:text-2xl font-bold text-[var(--ink-primary)] tracking-tight">{{ item.title }}</h3>
          <span class="text-[var(--ink-muted)] text-sm md:text-base font-medium">{{ item.role }}</span>
          <p class="text-[var(--ink-muted)] mt-2 max-w-2xl leading-relaxed">{{ item.description }}</p>
        </div>
        
        <div class="self-start md:self-center shrink-0 mt-4 md:mt-0">
          <span class="font-mono text-sm text-[var(--ink-muted)] bg-[var(--surface-1)] px-3 py-1 rounded-md">{{ item.period }}</span>
        </div>
      </div>
    </div>

    <!-- Education & Certifications Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4 border-t border-[var(--hairline)]">
      <!-- Education Section -->
      <div v-if="profile.educationItems?.length" class="flex flex-col gap-6">
        <div>
          <span class="pill-tag inline-block mb-2">{{ profile.educationLabel || 'Pendidikan' }}</span>
          <h3 class="text-2xl font-bold text-[var(--ink-primary)] tracking-tight">Academic Education</h3>
        </div>

        <div class="flex flex-col gap-4">
          <div
            v-for="edu in profile.educationItems"
            :key="edu.institution"
            class="surface-card p-6 flex flex-col gap-2 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)]"
          >
            <div class="flex justify-between items-start">
              <h4 class="text-lg font-bold text-[var(--ink-primary)]">{{ edu.institution }}</h4>
              <span class="font-mono text-xs text-[var(--ink-muted)] bg-[var(--surface-canvas)] px-2.5 py-1 rounded-md shrink-0">{{ edu.period }}</span>
            </div>
            <p class="text-[var(--accent-blue)] text-sm font-semibold">{{ edu.degree }}</p>
            <p v-if="edu.details" class="text-[var(--ink-muted)] text-xs leading-relaxed mt-1">{{ edu.details }}</p>
          </div>
        </div>
      </div>

      <!-- Certifications Section -->
      <div v-if="profile.certificationsItems?.length" class="flex flex-col gap-6">
        <div>
          <span class="pill-tag inline-block mb-2">{{ profile.certificationsLabel || 'Sertifikasi' }}</span>
          <h3 class="text-2xl font-bold text-[var(--ink-primary)] tracking-tight">Certifications & Courses</h3>
        </div>

        <div class="flex flex-col gap-4">
          <div
            v-for="cert in profile.certificationsItems"
            :key="cert.title"
            class="surface-card p-6 flex flex-col gap-2 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)]"
          >
            <div class="flex justify-between items-start">
              <h4 class="text-lg font-bold text-[var(--ink-primary)]">{{ cert.title }}</h4>
              <span class="font-mono text-xs text-[var(--ink-muted)] bg-[var(--surface-canvas)] px-2.5 py-1 rounded-md shrink-0">{{ cert.period }}</span>
            </div>
            <p class="text-[var(--ink-muted)] text-sm font-medium">{{ cert.issuer }}</p>
            <span class="inline-self-start font-mono text-xs text-emerald-500 font-medium mt-1">{{ cert.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

