# Portofolio
Farid Eka Aprilian's personal portfolio built with Vue.js, Tailwind CSS, and Framer Motion / Lenis for studio-grade interactions.

## Stack
- Vue 3
- Vite
- Tailwind CSS
- Lenis (Virtual Smooth Scroll)
- Custom Magnetic Physics Cursor

## Scripts
- \`npm run dev\` for local development
- \`npm run build\` to build for production
- \`npm run avatar:sync\` to refresh local GitHub avatar in \`public/avatar-github.jpg\`

## Avatar Update Workflow
- Website uses local avatar file (\`public/avatar-github.jpg\`) for reliability on slow networks.
- You do not need to sync avatar on every push.
- Run \`npm run avatar:sync\` only when you change your GitHub profile photo (or when you want to refresh it).
- Commit the updated \`public/avatar-github.jpg\` and \`public/avatar-meta.json\`.
