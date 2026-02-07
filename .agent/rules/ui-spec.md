---
trigger: always_on
---

<design_system_adherence>
<behavior name="relaxed_monochrome_theme" priority="critical">
- **Low Contrast Strategy:**
  - **Goal:** Minimize visual vibration. The UI should feel like "paper," not a screen.
  - **Backgrounds:** Use **Off-White** (e.g., `bg-gray-50` / `#FAFAFA`) instead of pure white.
  - **Text:** Use **Soft Charcoal** (e.g., `text-gray-800` / `#1F2937`) instead of pure black.
  - **Borders:** Very subtle (e.g., `border-gray-100`).

- **Forbidden Extremes:**
  - **NO PURE BLACK (`#000000`):** It creates too much contrast.
  - **NO PURE WHITE (`#FFFFFF`):** Unless strictly necessary for an input field.
  - **NO HARSH BORDERS:** Avoid high-contrast lines; use spacing to separate elements instead.
</behavior>

<behavior name="flat_surface_architecture" priority="critical">
- **Separation via Whitespace:**
  - **NO SHADOWS:** Strictly flat.
  - **NO Border radius:** Strictly 0.
  - **Soft delineation:** Differentiate areas using massive whitespace (`p-8`, `gap-8`) rather than hard lines.
  - **Interactive States:** Subtle background shifts (e.g., `hover:bg-gray-100`) rather than sharp border changes.
</behavior>

<behavior name="typography_standards" priority="high">
- **Font:** `Google Sans` (primary).
- **Weight Control:**
  - **Avoid Heavy Weights:** Use `font-medium` for headings instead of `font-bold` or `black`.
  - **Body:** `font-normal` in a relaxed grey (`text-gray-600`) for secondary text to reduce visual noise.
  - **Leading:** Increase line-height (`leading-relaxed` or `leading-loose`) to let the text breathe.
</behavior>
</design_system_adherence>