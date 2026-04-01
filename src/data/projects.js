const projectSource = [
  {
    title: 'bumbuserbaguna',
    year: '2026',
    type: 'featured',
    accent: 'copper',
    link: 'https://github.com/fatidaprilian/bumbuserbaguna',
    role: {
      id: 'Platform Product Engineering',
      en: 'Platform Product Engineering'
    },
    summary: {
      id: 'Platform produktivitas akademik end-to-end untuk drafting, validasi struktur, sitasi, presentasi, dan cek orisinalitas dalam satu alur.',
      en: 'An end-to-end academic productivity platform covering drafting, structure validation, citations, presentation generation, and originality checks in one flow.'
    },
    keyPoints: {
      id: ['Tool suite bertingkat untuk SMP sampai kampus', 'Deteksi exact, near-duplicate, dan paraphrase similarity', 'Reliability dengan graceful degradation saat AI provider bermasalah'],
      en: ['Tiered tool suite from middle school to campus', 'Exact, near-duplicate, and paraphrase similarity detection', 'Reliability with graceful degradation during AI provider issues']
    },
    productContext: {
      id: 'Bumbuserbaguna dirancang sebagai modular monolith dengan batas modul jelas untuk menjaga kecepatan iterasi, akurasi analisis, dan privasi dokumen siswa.',
      en: 'Bumbuserbaguna is designed as a modular monolith with clear module boundaries to preserve delivery speed, analysis accuracy, and student document privacy.'
    },
    impactMetrics: {
      id: ['Report 10 halaman < 2 menit', 'Draft presentasi < 3 menit', 'Target false-positive dispute < 5%'],
      en: ['10-page report in < 2 minutes', 'Presentation draft in < 3 minutes', 'False-positive dispute target < 5%']
    },
    preview: {
      id: {
        eyebrow: 'Academic Platform Snapshot',
        headline: 'One-stop academic assistant dari drafting sampai originality audit.'
      },
      en: {
        eyebrow: 'Academic Platform Snapshot',
        headline: 'A one-stop academic assistant from drafting to originality audits.'
      }
    },
    tags: ['TypeScript', 'Modular Monolith', 'AI Gateway', 'Education']
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
    preview: {
      id: {
        eyebrow: 'Workflow Snapshot',
        headline: 'Toolkit agentic untuk engineering flow yang konsisten.'
      },
      en: {
        eyebrow: 'Workflow Snapshot',
        headline: 'An agentic toolkit for consistent engineering workflows.'
      }
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
    preview: {
      id: {
        eyebrow: 'Storefront Snapshot',
        headline: 'Flow katalog ke checkout dengan ritme interaksi yang rapi.'
      },
      en: {
        eyebrow: 'Storefront Snapshot',
        headline: 'Catalog-to-checkout flow with a cleaner interaction rhythm.'
      }
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
    preview: {
      id: {
        eyebrow: 'Platform Snapshot',
        headline: 'Boundary service yang rapi untuk lifecycle kredensial digital.'
      },
      en: {
        eyebrow: 'Platform Snapshot',
        headline: 'Clear service boundaries for digital credential lifecycle.'
      }
    },
    tags: ['TypeScript', 'Backend', 'Platform']
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
    preview: {
      id: {
        eyebrow: 'Experiment Snapshot',
        headline: 'Eksperimen automasi yang cepat tapi tetap terukur.'
      },
      en: {
        eyebrow: 'Experiment Snapshot',
        headline: 'Fast automation experiments with measurable execution.'
      }
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
    keyPoints: projectItem.keyPoints[supportedLanguage],
    preview: projectItem.preview[supportedLanguage],
    productContext: projectItem.productContext?.[supportedLanguage] ?? null,
    impactMetrics: projectItem.impactMetrics?.[supportedLanguage] ?? []
  }))
}
