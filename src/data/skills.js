/**
 * Skills & Services Data
 * Bilingual support: Indonesian & English
 */

export const skillsData = {
  id: [
    {
      id: 'frontend',
      category: 'Frontend',
      title: 'UI Development',
      description: 'Interface responsif dengan React, Vue, dan modern CSS. Fokus pada user experience dan accessibility.',
      tags: ['React', 'Vue.js', 'Tailwind', 'TypeScript']
    },
    {
      id: 'backend',
      category: 'Backend',
      title: 'API & Server',
      description: 'Building scalable APIs dengan Node.js, Express, dan database management yang solid untuk production.',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'REST/GraphQL']
    },
    {
      id: 'product',
      category: 'Product',
      title: 'Product Design',
      description: 'Dari ideation hingga launch. User research, flow design, dan MVP strategy untuk sustainable growth.',
      tags: ['Figma', 'Research', 'MVP', 'Strategy']
    },
    {
      id: 'fullstack',
      category: 'Fullstack',
      title: 'Full-stack Development',
      description: 'End-to-end product development dari database hingga frontend deployment di production environment.',
      tags: ['Next.js', 'Full-stack', 'DevOps', 'Cloud']
    },
    {
      id: 'performance',
      category: 'Performance',
      title: 'Optimization & SEO',
      description: 'Web Vitals optimization, SEO configuration, dan strategic caching untuk maximum performance.',
      tags: ['Core Web Vitals', 'SEO', 'Caching', 'Monitoring']
    },
    {
      id: 'testing',
      category: 'Quality',
      title: 'Testing & QA',
      description: 'Automated testing, unit tests, dan E2E testing untuk reliable dan maintainable codebase.',
      tags: ['Vitest', 'E2E', 'CI/CD', 'QA']
    },
    {
      id: 'mentoring',
      category: 'Leadership',
      title: 'Team & Mentoring',
      description: 'Code review standards, documentation culture, dan engineering mentorship untuk team growth.',
      tags: ['Leadership', 'Mentoring', 'Documentation', 'Code Review']
    }
  ],
  en: [
    {
      id: 'frontend',
      category: 'Frontend',
      title: 'UI Development',
      description: 'Responsive interfaces with React, Vue, and modern CSS. Focused on user experience and accessibility.',
      tags: ['React', 'Vue.js', 'Tailwind', 'TypeScript']
    },
    {
      id: 'backend',
      category: 'Backend',
      title: 'API & Server',
      description: 'Scalable APIs with Node.js, Express, and solid database management for production environments.',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'REST/GraphQL']
    },
    {
      id: 'product',
      category: 'Product',
      title: 'Product Design',
      description: 'From ideation to launch. User research, flow design, and MVP strategy for sustainable growth.',
      tags: ['Figma', 'Research', 'MVP', 'Strategy']
    },
    {
      id: 'fullstack',
      category: 'Fullstack',
      title: 'Full-stack Development',
      description: 'End-to-end product development from database to frontend deployment in production environment.',
      tags: ['Next.js', 'Full-stack', 'DevOps', 'Cloud']
    },
    {
      id: 'performance',
      category: 'Performance',
      title: 'Optimization & SEO',
      description: 'Web Vitals optimization, SEO configuration, and strategic caching for maximum performance.',
      tags: ['Core Web Vitals', 'SEO', 'Caching', 'Monitoring']
    },
    {
      id: 'testing',
      category: 'Quality',
      title: 'Testing & QA',
      description: 'Automated testing, unit tests, and E2E testing for reliable and maintainable codebase.',
      tags: ['Vitest', 'E2E', 'CI/CD', 'QA']
    },
    {
      id: 'mentoring',
      category: 'Leadership',
      title: 'Team & Mentoring',
      description: 'Code review standards, documentation culture, and engineering mentorship for team growth.',
      tags: ['Leadership', 'Mentoring', 'Documentation', 'Code Review']
    }
  ]
}

export function getSkillsByLanguage(language = 'id') {
  return skillsData[language] || skillsData.id
}
