# DESIGN.md — Portofolio Farid Eka Aprilian
## Versi: 2.0 — Editorial Magazine (Redesain Nol)

---

## 1. Design Intent & Product Personality

Portofolio ini bukan daftar proyek. Ia adalah argumen visual bahwa Farid adalah developer yang berpikir seperti desainer — memiliki selera kurasi, pemahaman hierarki, dan kepekaan terhadap ritme visual. Kepribadian produk: **percaya diri, editorial, punya pendapat**.

Redesain ini bergerak dari dark cinematic yang klise menuju **editorial magazine terang** — estetika majalah cetak Indonesia kelas atas (referensi: Nirmana, Basis, I:DENTITY) dengan layout asimetris, tipografi display yang tidak takut mencolok, dan aksen warna yang vibrant di atas latar kertas putih bersih.

---

## 2. Audience & Use-Context Signals

- **Hiring manager / recruiter** yang ingin cepat menilai kaliber dan selera
- **Potential collaborator** yang mencari developer serius dengan taste desain
- **Dibuka di desktop** (primary), mobile tetap fungsional
- Konteks buka: portofolio di-share lewat LinkedIn/email, bukan organic search

---

## 3. Visual Direction & Distinctive Moves

**Anchor:** Majalah editorial cetak Indonesia kelas atas — grid kolom asimetris, nomor chapter raksasa ter-crop di tepi, tipografi display besar di atas kertas putih, aksen warna berani.

**Tiga sinyal product-specific yang terlihat dari viewport pertama:**
1. Nomor `01` raksasa (20vw+) terpotong di tepi kanan — bukan dekorasi, ini marker chapter.
2. Garis horizontal merah yang "menarik diri" kiri→kanan sebelum teks muncul (*line strike reveal*).
3. Layout dua kolom asimetris di hero: teks kiri sempit, ruang putih kanan besar — seperti spread majalah.

---

## 4. Color, Typography, Spacing & Density

### Palette
| Token | Nilai | Peran |
|---|---|---|
| `--paper` | `#FAFAF7` | Background utama, kertas bersih |
| `--paper-warm` | `#F0EDE3` | Surface sekunder, panel |
| `--ink` | `#1A1A16` | Teks utama |
| `--ink-muted` | `#6B6B60` | Teks sekunder, metadata |
| `--accent-red` | `#E84A2F` | CTA primer, marker chapter, line strike |
| `--accent-blue` | `#0057FF` | Link aktif, tag teknis, status |
| `--accent-yellow` | `#F5C842` | Highlight dekoratif, detail |
| `--rule` | `#D4D0C4` | Garis pembatas kolom |

### Typography
- **Display / Chapter number:** `Bebas Neue` — bold condensed, dipakai untuk nomor chapter raksasa dan label uppercase
- **Editorial Headline:** `Fraunces` — serif dengan optical sizing, italic untuk opini dan quotes
- **Body / Metadata:** `Manrope` — bersih, terbaca kecil, weight 400–800

### Spacing
- Base 8px grid
- Section padding: `clamp(80px, 12vw, 160px)` vertikal
- Horizontal padding: `clamp(24px, 6vw, 80px)`

---

## 5. Token Architecture

Semua tokens di CSS custom properties pada `:root`. Tailwind extend menggunakan alias yang sama. Tidak ada hardcode hex di komponen.

---

## 6. Responsive Recomposition Plan

- **Mobile:** Single column, nomor chapter kecil (6rem), horizontal scroll proyek menjadi swipe. CTA muncul di bawah teks.
- **Tablet:** Grid 2-kolom muncul untuk career section, horizontal scroll proyek tetap aktif.
- **Desktop:** Layout asimetris penuh. Chapter number raksasa aktif. Horizontal project track terlihat lebih dari 2 proyek sekaligus.

---

## 7. Motion, Interaction & Feedback

| Trigger | Behaviour |
|---|---|
| Page load | Headline dipecah per-kata, masuk stagger dari bawah (60ms delay/kata) |
| Scroll masuk section | Garis merah menarik diri kiri→kanan, lalu teks fade-in |
| Hover tombol | Scale 1.04, warna background berubah, custom cursor membesar |
| Drag/klik project track | Slide horizontal smooth, snap ke proyek berikutnya |
| Mouse move (desktop) | Custom cursor dot kecil mengikuti pointer |
| `prefers-reduced-motion` | Semua animasi dinonaktifkan, konten langsung terlihat |

---

## 8. Component Language

- **Tidak ada card dengan shadow soft** — semua panel menggunakan border `1px solid var(--rule)` atau warna background berbeda
- **Tombol:** border penuh + warna fill saat hover, bukan shadow
- **Tag teknis:** Background `--accent-blue` tipis, text `--accent-blue` bold, border `--accent-blue`
- **Ornamen:** Garis `--rule` horizontal/vertikal sebagai pembatas kolom — bukan dekorasi, tapi grid marker

---

## 9. Source Boundaries

- Anchor: majalah editorial Indonesia — dikutip sebagai constraint, bukan di-copy
- Tidak ada referensi dari portofolio lain atau dark-mode template
- Data proyek dari `src/data/projects.js` — tidak diubah strukturnya

---

## 10. Accessibility Non-Negotiables

- WCAG 2.2 AA — semua teks dan komponen interaktif
- Focus ring visible: `3px solid var(--accent-blue)` offset 4px
- Custom cursor tidak mengganggu pointer bawaan browser
- Semua animasi punya `prefers-reduced-motion` fallback

---

## 11. Anti-Patterns to Avoid

- ❌ Dark background dengan teks glowing
- ❌ Grid wallpaper sebagai filler
- ❌ Card dengan soft shadow berjejer
- ❌ Hero teks besar centered di tengah
- ❌ Gradient ungu/biru generik
- ❌ "Minimal portfolio" yang kosong tanpa keputusan visual

---

## 12. Implementation Notes

- GSAP digunakan untuk word-stagger dan ScrollTrigger line reveal
- Horizontal scroll project menggunakan CSS `overflow-x: scroll` + `scroll-snap-type` (tanpa library tambahan)
- Custom cursor menggunakan satu `div#cursor` di luar `#app`, digerakkan dengan `mousemove` event
