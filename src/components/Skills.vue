<script setup>
defineProps({
  c: { type: Object, required: true },
  profile: { type: Object, required: true }
})
</script>

<template>
  <section id="skills" class="section-container" aria-labelledby="skills-heading">
    <div class="section-header">
      <span class="section-kicker">{{ c.skillsMeta }}</span>
      <h2 id="skills-heading" class="section-title">{{ c.skillsTitle }}</h2>
    </div>

    <div class="skills-matrix">
      <span 
        v-for="group in profile.skillGroups" 
        :key="group.category"
        class="flex flex-wrap gap-3"
      >
        <span 
          v-for="skill in group.items" 
          :key="skill" 
          class="skill-capsule"
        >
          {{ skill }}
        </span>
      </span>
    </div>
  </section>
</template>
