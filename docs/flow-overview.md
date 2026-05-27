# Flow and Layout Overview — Risograph Indie Zine Portfolio

This document provides a technical flow and layout map of the personal portfolio. The entire experience is delivered as a single-page interactive risograph zine divided into six distinct stages and a final colophon spec.

## 1. Interaction & Navigation Flow

The portfolio utilizes focus-managed anchor navigation. When clicking a navigational link (such as a floor plan row), the browser scrolls to the section via Lenis and dynamically moves standard keyboard focus to the first heading in the target section, ensuring excellent accessibility for screen readers.

```mermaid
graph TD
    A["Skip Link: Go to Main Content"] --> B["Stage I: Zine Cover"]
    
    SubGraph NavigationHeader ["Slim Top Frame Header"]
        H1["Brand Mark (Logo)"] --> B
        H2["Theme Selector (Auto / Light / Dark)"] --> H5["Apply Semantic OKLCH Theme"]
        H3["Language Selector (ID / EN)"] --> H6["Trigger reactive computed translations"]
    End

    B -->|"CTA: View Floor Plan"| E["Stage IV: Specimen Index Matrix"]
    B -->|"CTA: GitHub Link"| ExtGithub["External GitHub Profile"]

    C["Stage II: Curator Note & Specimen"] --> D["Stage III: Layout Parameters (Beats)"]
    D --> E
    
    E -->|"Click Spec Row (Spec I - X)"| F["Asymmetrical Spreads (Project Plates)"]
    F -->|"View Case Study Log"| F
    F -->|"View Source Link"| ExtSource["External Repository Source"]
    
    F --> G["Stage V: Milestone Registry (Timeline & Stack)"]
    G --> H["Stage VI: Transmission Desk (Contact)"]
    H -->|"Send Email"| Mailto["mailto:email"]
    H -->|"LinkedIn Link"| ExtLinkedIn["External LinkedIn"]
    H -->|"Phone Link"| Tel["tel:phone"]
    
    H --> I["Colophon Specification"]
```

## 2. Layout Structure & Responsive Recomposition

On viewport size mutations, the sections re-arrange dynamically from a complex multi-column grid layout (desktop) into a stacked reading format (mobile).

### Page Composition Map

```
+-------------------------------------------------------+
|  FA · Catalog 2026   [Spec Grid]   [Theme Auto]  [EN] | <-- Slim Header
+-------------------------------------------------------+
|                                                       |
|   FARID EKA                                +-------+  |
|   APRILIAN                                 |  / \  |  | <-- Stage I: Zine Cover
|   Karya yang dibaca seperti pameran.       | ( * ) |  |     (asymmetric poster +
|   [Open Floor Plan]  [GitHub]              |  \ /  |  |      offset halftone frame)
|                                            +-------+  |
+-------------------------------------------------------+
|                                                       |
|   STAGE II: CURATOR'S NOTE & TYPOGRAPHY SPECIMEN      | <-- Stage II: Designer commentary
|                                                       |
+-------------------------------------------------------+
|                                                       |
|   [ 01 Intent ]  [ 02 System ]  [ 03 Motion ]  [ 04 ] | <-- Stage III: Method beats
|                                                       |
+-------------------------------------------------------+
|                                                       |
|   +-----------------------+ +-----------------------+ | <-- Stage IV: 2x2 Asymmetric
|   | SPEC I: Project A     | | SPEC II: Project B    | |     Modular Specimen Index
|   +-----------------------+ +-----------------------+ |
|   | SPEC III: Project C   | | SPEC IV: Project D    | |
|   +-----------------------+ +-----------------------+ |
+-------------------------------------------------------+
|                                                       |
|   STAGE V: PROJECT SPREADS (3-Column Layout)          | <-- Project details, Monogram Plates,
|   - Design Token Specs | Plate Frame | Details        |     and Constraint-Decision logs
|                                                       |
+-------------------------------------------------------+
|                                                       |
|   STAGE VI: BIOGRAPHY & REGISTER TABLE                | <-- Career timeline index
|                                                       |
+-------------------------------------------------------+
|                                                       |
|   TRANSMISSION DESK & TOKEN METRICS                   | <-- Contact and Colophon key
|                                                       |
+-------------------------------------------------------+
```
