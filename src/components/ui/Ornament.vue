<script setup>
// Decorative ornament library. All ornaments are aria-hidden and
// purely visual; remove with no semantic loss. Color is inherited
// via currentColor so they tint with the surrounding ink.
defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <!-- Classical printer's fleuron (trefoil with center bead) -->
  <svg
    v-if="name === 'fleuron'"
    class="ornament ornament-fleuron"
    viewBox="0 0 80 20"
    aria-hidden="true"
    focusable="false"
  >
    <g fill="currentColor">
      <path d="M22 10 Q14 4 4 10 Q14 16 22 10 Q14 13 22 10 Z" />
      <path d="M58 10 Q66 4 76 10 Q66 16 58 10 Q66 13 58 10 Z" />
      <circle cx="40" cy="10" r="2.4" />
      <circle cx="30" cy="10" r="1.2" />
      <circle cx="50" cy="10" r="1.2" />
    </g>
  </svg>

  <!-- Asterism: classical three-star triangle, used as section break -->
  <svg
    v-else-if="name === 'asterism'"
    class="ornament ornament-asterism"
    viewBox="0 0 60 32"
    aria-hidden="true"
    focusable="false"
  >
    <g fill="currentColor">
      <path d="M30 2 L31.6 7.4 L37 8 L33 11.4 L34.2 16.6 L30 13.8 L25.8 16.6 L27 11.4 L23 8 L28.4 7.4 Z" />
      <path d="M12 18 L13.2 22 L17.4 22.4 L14.4 25 L15.4 29 L12 27 L8.6 29 L9.6 25 L6.6 22.4 L10.8 22 Z" />
      <path d="M48 18 L49.2 22 L53.4 22.4 L50.4 25 L51.4 29 L48 27 L44.6 29 L45.6 25 L42.6 22.4 L46.8 22 Z" />
    </g>
  </svg>

  <!-- Manicule: stylized pointing-hand classical printer's mark -->
  <svg
    v-else-if="name === 'manicule'"
    class="ornament ornament-manicule"
    viewBox="0 0 36 24"
    aria-hidden="true"
    focusable="false"
  >
    <g fill="currentColor">
      <!-- cuff -->
      <path d="M2 9 L8 9 L8 15 L2 15 Z M2 8 L8 8 L8 7 L2 7 Z M2 16 L8 16 L8 17 L2 17 Z" />
      <!-- palm -->
      <path d="M8 7 L17 7 L17 9 L8 9 Z M8 15 L17 15 L17 17 L8 17 Z M8 9 L13 9 L13 15 L8 15 Z" />
      <!-- pointing finger -->
      <path d="M13 10.5 Q14 10 18 10 L26 10 Q28 10 28 11 L28 13 Q28 14 26 14 L18 14 Q14 14 13 13.5 Z" />
      <!-- index pad -->
      <path d="M28 10.8 L32 11.4 Q33 11.6 33 12 Q33 12.4 32 12.6 L28 13.2 Z" />
      <!-- thumb -->
      <path d="M11 7 Q12 4 14 4 Q15 4 15 6 L15 9 L11 9 Z" />
    </g>
  </svg>

  <!-- Wax-seal style stamp with FA monogram + catalog year (Roman) -->
  <svg
    v-else-if="name === 'wax-seal'"
    class="ornament ornament-wax-seal"
    viewBox="0 0 100 100"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <path id="seal-arc-top" d="M 12,50 A 38,38 0 0 1 88,50" />
      <path id="seal-arc-bottom" d="M 14,50 A 36,36 0 0 0 86,50" />
    </defs>
    <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="1" />
    <circle cx="50" cy="50" r="38" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="0.7" stroke-dasharray="2 3" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="0.5" />
    <text font-family="JetBrains Mono Variable, ui-monospace, monospace" font-size="6.5" letter-spacing="2.5" fill="currentColor">
      <textPath href="#seal-arc-top" startOffset="50%" text-anchor="middle">CATALOG · MMXXVI</textPath>
    </text>
    <text font-family="JetBrains Mono Variable, ui-monospace, monospace" font-size="5" letter-spacing="3" fill="currentColor" fill-opacity="0.78">
      <textPath href="#seal-arc-bottom" startOffset="50%" text-anchor="middle" side="right">CURATED · ENGRAVED</textPath>
    </text>
    <text x="50" y="56" text-anchor="middle" font-family="Fraunces Variable, ui-serif, serif" font-style="italic" font-size="22" font-weight="520" fill="currentColor">
      FA
    </text>
    <!-- tiny stars flanking the monogram -->
    <g fill="currentColor" fill-opacity="0.7">
      <circle cx="32" cy="50" r="0.9" />
      <circle cx="68" cy="50" r="0.9" />
    </g>
  </svg>

  <!-- Hand-drawn-feeling wavy rule. Replaces a straight border in
       one or two strategic places to suggest letterpress imperfection. -->
  <svg
    v-else-if="name === 'wave-rule'"
    class="ornament ornament-wave"
    viewBox="0 0 600 12"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M0 6 Q 30 3.4 60 6 T 120 6 T 180 6 T 240 6 T 300 6 T 360 6 T 420 6 T 480 6 T 540 6 T 600 6"
      fill="none"
      stroke="currentColor"
      stroke-width="0.9"
      stroke-linecap="round"
    />
  </svg>

  <!-- Oversized italic Fraunces ampersand. Used as a typographic
       ornament in one place per page; Fraunces' italic & is a
       genuine signature glyph. -->
  <span
    v-else-if="name === 'ampersand'"
    class="ornament ornament-ampersand"
    aria-hidden="true"
  >&amp;</span>
</template>
