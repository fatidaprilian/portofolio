const projectSource = [
  {
    title: 'Dermascope',
    year: '2026',
    plateCode: 'PR.0126',
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
    caseStudy: {
      id: {
        constraint: 'Akurasi analisis harus tinggi, tetapi biaya model tetap harus terkontrol saat trafik naik.',
        decision: 'Membangun AI gateway berlapis dengan fallback provider dan aturan confidence per tipe tugas.',
        outcome: 'Alur tetap stabil saat provider error dan proses dokumen panjang tetap responsif untuk pengguna.'
      },
      en: {
        constraint: 'Analysis accuracy had to remain high while model cost stayed controlled during traffic spikes.',
        decision: 'Implemented a layered AI gateway with provider fallback and confidence rules per task type.',
        outcome: 'Flows stayed stable during provider outages and long-document tasks remained responsive.'
      }
    },
    productContext: {
      id: 'Dermascope dirancang sebagai modular monolith dengan batas modul jelas untuk menjaga kecepatan iterasi, akurasi analisis, dan privasi dokumen siswa.',
      en: 'Dermascope is designed as a modular monolith with clear module boundaries to preserve delivery speed, analysis accuracy, and student document privacy.'
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
    title: 'Agentic Core',
    year: '2026',
    plateCode: 'PR.0226',
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
    caseStudy: {
      id: {
        constraint: 'Tim butuh output konsisten lintas sesi tanpa kualitas engineering yang berubah-ubah.',
        decision: 'Menyusun rulebook terstruktur, profile stack, dan checklist review berbasis evidence.',
        outcome: 'Alur kerja agent menjadi repeatable dan review lebih cepat karena standar sudah eksplisit.'
      },
      en: {
        constraint: 'The team needed consistent outputs across sessions without drifting engineering quality.',
        decision: 'Built a structured rulebook, stack profiles, and evidence-based review checklists.',
        outcome: 'Agent workflows became repeatable and review cycles sped up with explicit standards.'
      }
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
    title: 'Vespa Storefront',
    year: '2026',
    plateCode: 'PR.0925',
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
    caseStudy: {
      id: {
        constraint: 'Flow katalog dan checkout harus cepat meski komponen UI berkembang cepat.',
        decision: 'Pisahkan smart-presentational layer dan susun komponen reusable berbasis state boundaries.',
        outcome: 'Perubahan fitur baru lebih aman tanpa merusak ritme interaksi pengguna utama.'
      },
      en: {
        constraint: 'Catalog and checkout flows had to stay fast while UI components evolved quickly.',
        decision: 'Separated smart and presentational layers with reusable components across state boundaries.',
        outcome: 'New feature changes became safer without breaking key interaction rhythm.'
      }
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
    title: 'CertiFlow',
    year: '2025',
    plateCode: 'PR.0625',
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
    caseStudy: {
      id: {
        constraint: 'Lifecycle credential butuh integritas data tinggi dengan modul yang mudah di-maintain.',
        decision: 'Menetapkan service boundary per domain dan validasi ketat di setiap input boundary.',
        outcome: 'Perubahan domain lebih terisolasi dan stabilitas data lintas modul meningkat.'
      },
      en: {
        constraint: 'Credential lifecycle required high data integrity with maintainable module boundaries.',
        decision: 'Defined service boundaries per domain and applied strict validation at input boundaries.',
        outcome: 'Domain changes became more isolated and cross-module data stability improved.'
      }
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
    title: 'Ticket Conductor',
    year: '2026',
    plateCode: 'PR.0326',
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
    caseStudy: {
      id: {
        constraint: 'Eksperimen harus cepat, tapi hasil tetap dapat diulang saat kondisi berubah.',
        decision: 'Menyusun script dengan guard input dan langkah retry terukur untuk titik rawan gagal.',
        outcome: 'Eksperimen lebih aman dipakai ulang pada skenario mirip tanpa setup ulang panjang.'
      },
      en: {
        constraint: 'Experiments had to move fast while staying repeatable under changing conditions.',
        decision: 'Added input guards and measured retry steps for failure-prone execution points.',
        outcome: 'Experiments became safer to reuse in similar scenarios without lengthy setup.'
      }
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
  },
  {
    title: 'Airdrop Hunter',
    year: '2026',
    plateCode: 'PR.0426',
    type: 'standard',
    accent: 'prism',
    link: 'https://github.com/fatidaprilian/airdrophunter',
    role: {
      id: 'AI Automation & Analytics',
      en: 'AI Automation & Analytics'
    },
    summary: {
      id: 'Platform pemantauan kanal Telegram otomatis yang menyaring postingan menggunakan AI untuk mengekstrak tugas airdrop terstruktur secara real-time.',
      en: 'An automated Telegram channel monitor that leverages AI to filter posts and extract structured airdrop tasks in real-time.'
    },
    keyPoints: {
      id: ['Monitoring Telegram real-time', 'Ekstraksi tugas berbasis AI', 'Checklist harian & pelacakan deadline'],
      en: ['Real-time Telegram monitoring', 'AI-driven task extraction', 'Daily checklist & deadline tracking']
    },
    caseStudy: {
      id: {
        constraint: 'Kanal Telegram publik sangat bising dengan spam, membuat identifikasi tugas valid menjadi sangat lambat.',
        decision: 'Membangun pipa pemrosesan pesan otomatis dengan integrasi LLM untuk klasifikasi spam dan ekstraksi metadata terstruktur.',
        outcome: 'Menyaring lebih dari 90% kebisingan spam dan memberikan checklist tugas harian yang bersih untuk pengguna.'
      },
      en: {
        constraint: 'Public Telegram channels are highly noisy with spam, making identification of valid tasks very slow.',
        decision: 'Built an automated message processing pipeline integrated with an LLM for spam classification and structured metadata extraction.',
        outcome: 'Filtered out over 90% of spam noise, providing users with a clean, actionable daily task checklist.'
      }
    },
    preview: {
      id: {
        eyebrow: 'AI Automation Snapshot',
        headline: 'Mengubah kebisingan Telegram menjadi tugas terstruktur yang dapat ditindaklanjuti.'
      },
      en: {
        eyebrow: 'AI Automation Snapshot',
        headline: 'Turning noisy Telegram chat feeds into clean, actionable tasks.'
      }
    },
    tags: ['TypeScript', 'AI Integration', 'Telegram Bot', 'Automation']
  },
  {
    title: 'Aura SQM',
    year: '2026',
    plateCode: 'PR.0526',
    type: 'standard',
    accent: 'bark',
    link: 'https://github.com/fatidaprilian/aura-sqm',
    role: {
      id: 'Network Traffic Control',
      en: 'Network Traffic Control'
    },
    summary: {
      id: 'Sistem kontrol lalu lintas jaringan dinamis berbasis Golang yang dirancang untuk optimasi bandwidth dan pengurangan latensi di lingkungan OpenWrt.',
      en: 'A dynamic network traffic control system built in Go, designed for bandwidth optimization and latency reduction in OpenWrt environments.'
    },
    keyPoints: {
      id: ['Optimasi SQM berbasis Go', 'Interaksi kernel tc langsung', 'Ringan untuk hardware embedded'],
      en: ['Go-based SQM optimization', 'Direct kernel tc interaction', 'Lightweight for embedded hardware']
    },
    caseStudy: {
      id: {
        constraint: 'Perangkat embedded OpenWrt memiliki keterbatasan CPU/RAM untuk menjalankan logika kontrol traffic yang rumit.',
        decision: 'Mengembangkan daemon ultra-ringan berbasis Go yang berinteraksi langsung dengan subsistem tc (traffic control) kernel Linux.',
        outcome: 'Mengurangi latensi jaringan secara signifikan tanpa memberikan beban overhead pada CPU router.'
      },
      en: {
        constraint: 'Embedded OpenWrt hardware has limited CPU/RAM resources for executing complex traffic control logic.',
        decision: 'Developed an ultra-lightweight Go-based daemon interacting directly with the Linux kernel tc (traffic control) subsystem.',
        outcome: 'Significantly reduced network latency and bufferbloat without adding overhead to the router CPU.'
      }
    },
    preview: {
      id: {
        eyebrow: 'System Daemon Snapshot',
        headline: 'Kontrol lalu lintas jaringan tingkat kernel yang ultra-efisien.'
      },
      en: {
        eyebrow: 'System Daemon Snapshot',
        headline: 'Ultra-efficient, kernel-level network traffic management.'
      }
    },
    tags: ['Go', 'Networking', 'OpenWrt', 'Linux Kernel']
  }
]

export const getProjectsByLanguage = (language = 'id') => {
  const supportedLanguage = language === 'en' ? 'en' : 'id'

  return projectSource.map((projectItem) => ({
    title: projectItem.title,
    year: projectItem.year,
    plateCode: projectItem.plateCode,
    type: projectItem.type,
    accent: projectItem.accent,
    link: projectItem.link,
    tags: projectItem.tags,
    role: projectItem.role[supportedLanguage],
    summary: projectItem.summary[supportedLanguage],
    keyPoints: projectItem.keyPoints[supportedLanguage],
    preview: projectItem.preview[supportedLanguage],
    productContext: projectItem.productContext?.[supportedLanguage] ?? null,
    impactMetrics: projectItem.impactMetrics?.[supportedLanguage] ?? [],
    caseStudy: projectItem.caseStudy?.[supportedLanguage] ?? null
  }))
}
