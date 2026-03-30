const projectSource = [
  {
    title: 'bumbuserbaguna',
    year: '2026',
    type: 'featured',
    accent: 'copper',
    link: 'https://github.com/fatidaprilian/bumbuserbaguna',
    role: {
      id: 'Frontend Product',
      en: 'Frontend Product'
    },
    summary: {
      id: 'Produk web dengan pendekatan frontend modern untuk pengalaman user yang jelas, cepat, dan maintainable.',
      en: 'A web product built with a modern frontend approach for clarity, speed, and long-term maintainability.'
    },
    keyPoints: {
      id: ['UI modular', 'Alur user terukur', 'Struktur komponen rapi'],
      en: ['Modular UI', 'Measurable user flow', 'Clean component structure']
    },
    tags: ['TypeScript', 'Frontend', 'Product']
  },
  {
    title: 'Agentic-Senior-Core',
    year: '2026',
    type: 'standard',
    accent: 'bark',
    link: 'https://github.com/fatidaprilian/Agentic-Senior-Core',
    role: {
      id: 'AI Workflow Kit',
      en: 'AI Workflow Kit'
    },
    summary: {
      id: 'Starter pack workflow untuk coding agent dengan aturan engineering yang ketat dan reusable.',
      en: 'A starter workflow pack for coding agents with strict, reusable engineering guardrails.'
    },
    keyPoints: {
      id: ['Agent workflow', 'Engineering guardrails', 'Reusable setup'],
      en: ['Agent workflow', 'Engineering guardrails', 'Reusable setup']
    },
    tags: ['JavaScript', 'Automation', 'Developer Tools']
  },
  {
    title: 'ecommercevespa-client',
    year: '2026',
    type: 'standard',
    accent: 'clay',
    link: 'https://github.com/fatidaprilian/ecommercevespa-client',
    role: {
      id: 'Frontend System',
      en: 'Frontend System'
    },
    summary: {
      id: 'Client storefront untuk flow e-commerce dengan fokus di performance, struktur, dan iterasi cepat.',
      en: 'A storefront client for e-commerce flows, focused on performance, structure, and fast iteration.'
    },
    keyPoints: {
      id: ['Catalog UX', 'Checkout flow', 'Component architecture'],
      en: ['Catalog UX', 'Checkout flow', 'Component architecture']
    },
    tags: ['TypeScript', 'Vue', 'E-commerce']
  },
  {
    title: 'digital-credential-platform',
    year: '2025',
    type: 'standard',
    accent: 'bark',
    link: 'https://github.com/fatidaprilian/digital-credential-platform',
    role: {
      id: 'Platform Backend',
      en: 'Platform Backend'
    },
    summary: {
      id: 'Platform untuk mengelola credential lifecycle dengan service boundary yang jelas.',
      en: 'A platform for managing credential lifecycle with clearly defined service boundaries.'
    },
    keyPoints: {
      id: ['Domain modeling', 'Service layer', 'Data reliability'],
      en: ['Domain modeling', 'Service layer', 'Data reliability']
    },
    tags: ['TypeScript', 'Backend', 'Platform']
  },
  {
    title: 'EcommerceSparepartVespa',
    year: '2025',
    type: 'standard',
    accent: 'copper',
    link: 'https://github.com/fatidaprilian/EcommerceSparepartVespa',
    role: {
      id: 'Commerce Backend',
      en: 'Commerce Backend'
    },
    summary: {
      id: 'Platform spare part berbasis Laravel dengan alur transaksi dan katalog produk yang terstruktur.',
      en: 'A Laravel-based spare part platform with structured transaction flow and product catalog management.'
    },
    keyPoints: {
      id: ['Laravel architecture', 'Catalog structure', 'Commerce operations'],
      en: ['Laravel architecture', 'Catalog structure', 'Commerce operations']
    },
    tags: ['PHP', 'Laravel', 'Commerce']
  },
  {
    title: 'war-tiket-bot',
    year: '2026',
    type: 'standard',
    accent: 'clay',
    link: 'https://github.com/fatidaprilian/war-tiket-bot',
    role: {
      id: 'Automation Script',
      en: 'Automation Script'
    },
    summary: {
      id: 'Eksperimen automation bot dengan pendekatan praktikal untuk kebutuhan spesifik.',
      en: 'An automation bot experiment built with a practical approach for specific use cases.'
    },
    keyPoints: {
      id: ['Automation flow', 'Fast iteration', 'Script reliability'],
      en: ['Automation flow', 'Fast iteration', 'Script reliability']
    },
    tags: ['TypeScript', 'Automation', 'Experiment']
  }
]

export const getProjectsByLanguage = (language = 'id') => {
  const supportedLanguage = language === 'en' ? 'en' : 'id'

  return projectSource.map((projectItem) => ({
    title: projectItem.title,
    year: projectItem.year,
    type: projectItem.type,
    accent: projectItem.accent,
    link: projectItem.link,
    tags: projectItem.tags,
    role: projectItem.role[supportedLanguage],
    summary: projectItem.summary[supportedLanguage],
    keyPoints: projectItem.keyPoints[supportedLanguage]
  }))
}
