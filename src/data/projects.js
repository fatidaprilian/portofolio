const projectSource = [
  {
    title: 'Agentic Senior Core',
    year: '2026',
    plateCode: 'PR.0126',
    type: 'featured',
    accent: 'copper',
    link: 'https://github.com/fatidaprilian/Agentic-Senior-Core',
    liveUrl: 'https://www.npmjs.com/package/@ryuenn3123/agentic-senior-core',
    screenshot: '/agenticsenior.png',
    role: {
      id: 'Creator & Maintainer',
      en: 'Creator & Maintainer'
    },
    summary: {
      id: 'Plugin open-source yang memberikan aturan engineering bersama untuk AI coding agent (Claude Code, Cursor, Codex, Copilot, dan 20+ host lainnya) agar tidak over-building pada request sederhana.',
      en: 'Open-source plugin that gives AI coding agents (Claude Code, Cursor, Codex, Copilot, and 20+ other hosts) a shared set of engineering rules, so they stop over-building simple requests.'
    },
    keyPoints: {
      id: [
        'Dipublikasikan sebagai @ryuenn3123/agentic-senior-core di npm',
        'Digunakan di 20+ alat AI coding dengan pengguna nyata',
        'Benchmark internal: 30% lebih sedikit token & 42% lebih hemat biaya'
      ],
      en: [
        'Published as @ryuenn3123/agentic-senior-core on npm',
        'Used inside 20+ different AI coding tools',
        'Internal benchmarks: 30% fewer tokens & 42% lower cost'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'AI coding agent sering memproduksi kode berlebihan (over-building) dan memboroskan token pada instruksi sederhana.',
        decision: 'Menyusun set aturan engineering terstruktur (Agentic Senior Core) yang dapat di-load oleh 20+ host AI coding tool.',
        outcome: 'Mengurangi konsumsi token hingga 30% dan menghemat biaya hingga 42% pada tugas pengkodean kompleks.'
      },
      en: {
        constraint: 'AI coding agents frequently over-engineer simple requests and waste excessive tokens.',
        decision: 'Designed a shared set of engineering rules (Agentic Senior Core) compatible across 20+ AI coding environments.',
        outcome: 'Reduced token consumption by 30% and lowered cost by 42% on complex coding tasks.'
      }
    },
    preview: {
      id: {
        eyebrow: 'Open-Source npm Package',
        headline: 'Engineering guardrails untuk 20+ AI coding tools.'
      },
      en: {
        eyebrow: 'Open-Source npm Package',
        headline: 'Engineering guardrails for 20+ AI coding tools.'
      }
    },
    tags: ['TypeScript', 'npm Package', 'AI Architecture', 'Open Source']
  },
  {
    title: 'Jakarta Scooter Shop',
    year: '2026',
    plateCode: 'PR.0226',
    type: 'featured',
    accent: 'clay',
    link: 'https://jakartascootershop.com',
    liveUrl: 'https://jakartascootershop.com',
    screenshot: '/vespasite.png',
    role: {
      id: 'Fullstack E-commerce & ERP Integration',
      en: 'Fullstack E-commerce & ERP Integration'
    },
    summary: {
      id: 'Platform e-commerce dibangun dengan NestJS dan Next.js, mensinkronkan stok dan harga secara real-time dengan Accurate ERP client menggunakan reservasi atomik dan validasi webhook.',
      en: 'Built with NestJS and Next.js, synced stock and pricing in real time with client’s Accurate ERP using atomic reservations and webhook validation to prevent overselling.'
    },
    keyPoints: {
      id: [
        'Sinkronisasi real-time stok & harga dengan Accurate ERP',
        'Reservasi stok atomik & validasi webhook untuk cegah overselling',
        'Integrasi Midtrans Snap dengan kalkulasi total order di server'
      ],
      en: [
        'Real-time stock & pricing sync with Accurate ERP',
        'Atomic stock reservation & webhook validation preventing overselling',
        'Integrated Midtrans Snap with server-side order total calculation'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Mencegah overselling akibat selisih data stok ERP serta menutup celah manipulasi harga di sisi client saat checkout.',
        decision: 'Mengimplementasikan reservasi stok atomik dengan verifikasi webhook ERP dan perhitungan total transaksi eksklusif di server sebelum memanggil Midtrans Snap.',
        outcome: 'Sistem e-commerce berjalan stabil di lingkungan produksi tanpa risiko overselling maupun manipulasi harga.'
      },
      en: {
        constraint: 'Prevent stock overselling from ERP delays and eliminate client-side price tampering during checkout.',
        decision: 'Implemented atomic stock reservation verified via ERP webhooks and server-side calculation for Midtrans Snap.',
        outcome: 'Production e-commerce storefront operating securely with zero overselling or price manipulation risks.'
      }
    },
    preview: {
      id: {
        eyebrow: 'Fullstack E-commerce & ERP',
        headline: 'Sinkronisasi real-time ERP Accurate & checkout aman Midtrans.'
      },
      en: {
        eyebrow: 'Fullstack E-commerce & ERP',
        headline: 'Real-time Accurate ERP sync & secure Midtrans checkout.'
      }
    },
    tags: ['NestJS', 'Next.js', 'Accurate ERP', 'Midtrans', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    title: 'Digital Credential Platform',
    year: '2025',
    plateCode: 'PR.0325',
    type: 'standard',
    accent: 'bark',
    link: 'https://github.com/fatidaprilian/digital-credential-platform',
    role: {
      id: 'Solo Developer',
      en: 'Solo Developer'
    },
    summary: {
      id: 'Platform penerbitan sertifikat sebagai NFT dengan login berbasis wallet untuk pemegang kredensial dan JWT untuk institusi. Data tersimpan di blockchain Polygon & IPFS.',
      en: 'Platform for issuing certificates as NFTs, with wallet-based login for credential holders and JWT login for institutions. Stored records on Polygon blockchain & IPFS.'
    },
    keyPoints: {
      id: [
        'Verifikasi kredensial langsung secara on-chain di Polygon',
        'Autentikasi ganda: Wallet (pemegang) & JWT (institusi)',
        'Backend NestJS, Prisma, PostgreSQL & IPFS'
      ],
      en: [
        'Direct on-chain Polygon verification without middleman',
        'Dual authentication: Wallet (holders) & JWT (institutions)',
        'NestJS, Prisma, PostgreSQL & IPFS backend'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Kredensial harus dapat diverifikasi keabsahannya oleh pemberi kerja secara langsung tanpa perlu menghubungi pihak pengeluar.',
        decision: 'Mencatat hash kredensial di blockchain Polygon dan menyimpan file di IPFS, didukung backend NestJS, Prisma, dan PostgreSQL.',
        outcome: 'Pemberi kerja dapat memverifikasi keaslian sertifikat secara mandiri langsung dari blockchain.'
      },
      en: {
        constraint: 'Employers needed direct credential verification without reaching out to the issuing institution.',
        decision: 'Recorded certificate entries on Polygon blockchain and stored files on IPFS using NestJS, Prisma, and PostgreSQL.',
        outcome: 'Employers can verify certificate authenticity directly on-chain.'
      }
    },
    preview: {
      id: {
        eyebrow: 'Blockchain & Web3 Platform',
        headline: 'Verifikasi ijazah & sertifikat digital langsung on-chain.'
      },
      en: {
        eyebrow: 'Blockchain & Web3 Platform',
        headline: 'Direct on-chain digital credential verification.'
      }
    },
    tags: ['NestJS', 'Next.js', 'Prisma', 'PostgreSQL', 'Polygon', 'IPFS', 'Solidity']
  },
  {
    title: 'Serba Serbi',
    year: '2026',
    plateCode: 'PR.0426',
    type: 'standard',
    accent: 'copper',
    link: 'https://github.com/fatidaprilian/serbaserbi',
    liveUrl: 'https://serbaserbi.faridekaaprilian.dev/',
    screenshot: '/serbaserbi.jpeg',
    role: {
      id: 'Freelance Web App / Legal & Financial Suite',
      en: 'Freelance Web App / Legal & Financial Suite'
    },
    summary: {
      id: 'Aplikasi web yang dirancang khusus untuk freelancer Indonesia untuk mengelola dokumen hukum dan keuangan (Faktur, Penawaran, dan Kontrak) secara mulus dengan dukungan mata uang ganda (IDR & USD) serta pembuatan PDF profesional yang siap cetak langsung di browser.',
      en: 'A web application designed specifically for Indonesian freelancers to manage their legal and financial documents (Invoices, Quotations, and Contracts) seamlessly with dual currency (IDR & USD) and print-ready PDF generation directly in the browser.'
    },
    keyPoints: {
      id: [
        'Manajemen Invoice, Quotation, & Kontrak Freelancer',
        'Dukungan Multi-Mata Uang Ganda (IDR & USD)',
        'Generasi dokumen PDF profesional langsung di browser'
      ],
      en: [
        'Freelancer Invoice, Quotation & Contract Management',
        'Dual Currency Support (IDR & USD)',
        'Print-ready professional PDF generation directly in-browser'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Freelancer di Indonesia sering kesulitan mengelola dokumen legal & finansial yang rapi dan profesional tanpa biaya berlangganan software mahal.',
        decision: 'Membangun aplikasi web Serba Serbi untuk mengelola Faktur, Penawaran, dan Kontrak secara mulus dengan dukungan IDR & USD serta penyerahan PDF langsung di browser.',
        outcome: 'Memudahkan freelancer menerbitkan dokumen legal & keuangan siap cetak dengan alur kerja yang sangat cepat.'
      },
      en: {
        constraint: 'A web application designed specifically for Indonesian freelancers to manage their legal and financial documents (Invoices, Quotations, and Contracts) seamlessly.',
        decision: 'Built Serba Serbi to support dual currency (IDR & USD) and generate professional, print-ready PDF documents directly in the browser.',
        outcome: 'Streamlined invoice and contract management for freelancers with client-side PDF export.'
      }
    },
    preview: {
      id: {
        eyebrow: 'Freelancer Financial Suite',
        headline: 'Manajemen Invoice, Quotation, & Kontrak untuk Freelancer Indonesia.'
      },
      en: {
        eyebrow: 'Freelancer Financial Suite',
        headline: 'Legal & financial document management for Indonesian freelancers.'
      }
    },
    tags: ['React', 'Next.js', 'PDF Generation', 'Financial Suite', 'TypeScript']
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
        constraint: 'Perangkat embedded OpenWrt memiliki keterbatasan CPU/RAM untuk menjalankan logika kontrol traffic.',
        decision: 'Mengembangkan daemon ultra-ringan berbasis Go yang berinteraksi langsung dengan subsistem tc kernel Linux.',
        outcome: 'Mengurangi latensi jaringan secara signifikan tanpa beban overhead pada CPU router.'
      },
      en: {
        constraint: 'Embedded OpenWrt hardware has limited CPU/RAM resources for executing traffic control logic.',
        decision: 'Developed an ultra-lightweight Go-based daemon interacting directly with the Linux kernel tc subsystem.',
        outcome: 'Significantly reduced network latency and bufferbloat without router CPU overhead.'
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
    liveUrl: projectItem.liveUrl ?? null,
    screenshot: projectItem.screenshot ?? null,
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

