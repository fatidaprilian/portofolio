/**
 * KEYBOARD TRAVERSAL & FOCUS ORDER AUDIT
 * Reference: skill/frontend/accessibility.md - Keyboard navigation baseline
 * 
 * Manual test plan for end-to-end keyboard navigation (Tab key)
 * Expected: Logical flow through interactive elements
 */

export const keyboardAuditPlan = {
  title: 'Keyboard Navigation Test — Tab Order Verification',
  
  testSequence: [
    {
      step: 1,
      element: 'Language Toggle Button',
      location: 'Top-right fixed position',
      method: 'Click or Tab from load',
      expected: 'Focus ring visible (2px outline, warm brown #8f5d3f)',
      notes: 'First focusable element, aria-label switches language'
    },
    {
      step: 2,
      element: 'Scroll to Top Button',
      location: 'Bottom-right, appears after scroll > 340px',
      method: 'Tab or scroll down > 340px then Tab',
      expected: 'Focus ring visible, button shows ChevronUp icon',
      notes: 'Conditional: only appears when scrollY > 340px'
    },
    {
      step: 3,
      element: 'BottomDock Navigation',
      location: 'Fixed bottom bar (mobile: 0-640px width, desktop: 960px+)',
      method: 'Tab through multiple times',
      expected: 'Each NavItem (4-5 buttons) has focus-visible ring',
      notes: 'aria-current="page" on active item, aria-label on each'
    },
    {
      step: 4,
      element: 'ProjectGrid Links',
      location: 'Main content area, projects grid',
      method: 'Tab through featured project + standard projects',
      expected: 'Focus ring (2px #8f5d3f/60) on each project card link',
      notes: 'Featured project + 4 standard projects = 5 interactive links'
    },
    {
      step: 5,
      element: 'Contact Section CTA',
      location: 'Above footer',
      method: 'Tab and reach Contact section',
      expected: 'Focus visible on contact action (email/form)',
      notes: 'Primary CTA likely uses standard button/link semantics'
    },
    {
      step: 6,
      element: 'ClosingCtaStrip CTA',
      location: 'Between Contact and Footer',
      method: 'Tab toward bottom',
      expected: 'Focus on primary action button',
      notes: 'High-contrast warm brown background section'
    },
    {
      step: 7,
      element: 'Footer Navigation Links',
      location: 'Bottom of page (3 columns: Home, Work, Contact + GitHub, Email, LinkedIn)',
      method: 'Tab through all footer links',
      expected: '6+ links with focus-visible (underline or outline)',
      notes: 'Includes internal anchors (#home, #work, #contact) + external links'
    },
    {
      step: 8,
      element: 'REVERSE TAB (Shift+Tab)',
      location: 'From footer back to top',
      method: 'Shift+Tab through entire page',
      expected: 'Reverse order matches Tab order (no focus trap)',
      notes: 'Verify no elements skip backward'
    }
  ],

  focusStyleExpectations: {
    language_toggle: {
      selector: '[type="button"][aria-label*="Switch"]',
      currentCss: 'border border-white/[0.14] transition',
      needed: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f5d3f]'
    },
    scroll_to_top: {
      selector: '.scroll-top-button',
      currentCss: 'Likely has button baseline, check for focus-visible',
      needed: 'focus-visible:ring-2 focus-visible:ring-[#8f5d3f]/60'
    },
    bottom_dock_items: {
      selector: 'BottomDock button',
      currentCss: 'focus-visible:ring-2 focus-visible:ring-[#8f5d3f]/60 (from commit)',
      status: '[IMPLEMENTED]'
    },
    project_links: {
      selector: 'ProjectGrid a',
      currentCss: 'focus-visible:ring-2 focus-visible:ring-[#8f5d3f]/60 (from commit)',
      status: '[IMPLEMENTED]'
    },
    footer_links: {
      selector: 'footer a',
      currentCss: 'underline-link class (needs verification)',
      needed: 'focus-visible with clear outline'
    }
  },

  focusOrderOptimization: {
    issue: 'Fixed positioned elements (language toggle, scroll-to-top) may not follow natural DOM tab order',
    solution: 'Verify via manual Tab navigation that flow is logical despite fixed positioning',
    note: 'Both elements use z-index > main content, but should still be reachable'
  },

  accessibilityMarkers: {
    ariaLabels: [
      'Language toggle: aria-label="Switch to English/Bahasa Indonesia" [OK]',
      'Scroll to top: aria-label="Scroll to top" [OK]',
      'BottomDock items: aria-label per nav item [OK]',
      'Footer links: Some use href anchors (#home, #work, #contact)'
    ],
    
    skipLink: {
      status: '[NOT IMPLEMENTED]',
      purpose: 'Allow keyboard users to bypass fixed navigation + skip to main content',
      priority: 'HIGH for WCAG 2.1 Level AA',
      implementation: 'Add hidden-until-focused link in App.vue template'
    }
  },

  testingInstructions: `
  MANUAL KEYBOARD TEST (Do this before skip-link implementation):
  
  1. Open portfolio in browser (npm run dev or dist build served)
  2. Press TAB key repeatedly and note:
     - Does focus ring appear on ALL interactive elements?
     - Is the order logical top→bottom, left→right?
     - Does any element trap focus (Shift+Tab gets stuck)?
  3. Press Shift+Tab to reverse navigate — verify backward order works
  4. Test on mobile (if available): fixed dock should still be tabbable
  5. Check for color contrast: Are focus rings visible against current background?
  
  EXPECTED PASS CRITERIA:
  [OK] All interactive elements are focusable
  [OK] Tab order matches visual/logical reading order
  [OK] No focus traps (unless intended modal behavior)
  [OK] Focus ring is visible (WCAG AA requires 3:1 contrast minimum)
  [OK] Mobile: Bottom dock buttons accessible via keyboard
  `,

  nextSteps: [
    'Verify language toggle has focus-visible (may need CSS fix)',
    'Verify scroll-to-top has focus-visible (may need CSS fix)',
    'Record any focus order issues (tabindex attribute usage)',
    'Then implement skip-link in App.vue for content-first access'
  ]
}

export default keyboardAuditPlan
