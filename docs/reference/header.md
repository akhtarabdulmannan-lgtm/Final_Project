# Reference Measurement: Header & Navigation

Recorded from direct inspection and computed CSS of https://forzainc.tech/

---

## 1. Visual Specifications (Measured)

### Dimensions & Header Heights
- **Default (Over Hero / Top of Page)**:
  - Vertical padding: `py-5` (`1.25rem` / `20px` top and bottom)
  - Total computed height: `76px`
  - Background: `bg-transparent` (`rgba(0, 0, 0, 0)`)
  - Border: `border-b border-transparent`
  - Shadow: None
- **Scrolled State (`window.scrollY > 30px`)**:
  - Vertical padding: `py-3.5` (`0.875rem` / `14px` top and bottom)
  - Total computed height: `64px`
  - Background: `bg-ink-soft/90` (`rgba(28, 25, 23, 0.90)`)
  - Backdrop filter: `backdrop-blur-md` (`blur(8px)`)
  - Border: `border-b border-white/[0.08]`
  - Shadow: `shadow-2xl shadow-black/60`
- **Transition**:
  - Property: `transition-[background-color,border-color,backdrop-filter,padding]`
  - Duration: `300ms` (`duration-300`)
  - Easing: `cubic-bezier(0, 0, 0.2, 1)` (`ease-out`)
- **Max Width & Containment**:
  - Container shell: `max-w-[1180px]` centered (`mx-auto`)
  - Horizontal padding: `px-5` (`20px`) on mobile, `px-8` (`32px`) on tablet/desktop (`md:px-8`)

---

## 2. Wordmark / Brand Element (Measured)
- **Wrapper**: `<a href="/" class="inline-flex min-h-11 min-w-11 items-center" aria-label="Ventics Inc. home">`
- **Font Family**: `var(--font-logo)` (`Outfit`, sans-serif)
- **Weight**: `font-extrabold` (`800`)
- **Letter Spacing**: `0.16em` (mobile `sm:hidden`) to `0.20em` (`sm:text-[1.08rem] sm:tracking-[0.2em]`)
- **Font Size**: `0.98rem` (`15.68px`) on mobile, `1.08rem` (`17.28px`) on desktop
- **Chevron Glyph**:
  - SVG viewport: `0 0 64 80`
  - Inline height: `0.84em`
  - Margin: `margin-left: 0.04em`
  - Vertical alignment: `transform: translateY(-0.015em)`

---

## 3. Desktop Navigation (`lg:flex`) (Measured)
- **Container**: `<nav aria-label="Primary" class="hidden items-center gap-6 lg:flex lg:gap-8">`
- **Links (5 Total)**:
  1. `Products` (`/#products`)
  2. `Clients` (`/clients`)
  3. `Journal` (`/journal`)
  4. `Approach` (`/#approach`)
  5. `About` (`/about`)
- **Typography & Hit Targets**:
  - Font size: `0.84rem` (`13.44px`)
  - Weight: `500` (Medium)
  - Min touch height: `min-h-11` (`44px`)
  - Color: `text-paper/82` (`rgba(242, 239, 233, 0.82)`)
  - Hover state: `hover:text-paper` (`#F2EFE9`)
  - Transition: `transition-colors duration-150`

---

## 4. Product Dropdown Panel (Measured & Inferred)

### Trigger Button (`lg:block`)
- **Element**: `<button type="button" aria-expanded="false" aria-haspopup="menu" aria-controls="product-dropdown">`
- **Shape & Sizing**:
  - Min height: `min-h-11` (`44px`)
  - Border: `border border-paper/40`
  - Radius: `rounded-full` (`border-radius: 9999px`)
  - Padding: `px-3.5` (`14px`)
  - Text: `text-[0.8rem]` (`12.8px`), whitespace-nowrap, `text-paper`
  - Hover: `hover:border-paper hover:bg-paper/5`

### Dropdown Menu Card
- **Position**: `absolute right-0 top-full pt-2.5`
- **Width**: `w-[17.5rem]` (`280px`)
- **Card Styling**:
  - Background: `bg-paper` (`#F2EFE9`)
  - Border: `border border-line` (`rgba(26, 26, 26, 0.08)`)
  - Radius: `rounded-xl` (`12px`)
  - Padding: `p-3` (`12px`)
  - Shadow: `shadow-2xl`
  - Text color: `text-ink` (`#1A1A1A`)
- **3 Grouped Sections**:
  1. **Platform / Primary Group**:
     - Kicker: `font-mono text-[10px] uppercase tracking-[0.14em] text-faint px-2 pb-1`
     - Links: Overview, Models, Neural Systems, Deployment, Contact Architects
     - Link item: `flex min-h-11 items-center justify-between text-sm text-ink rounded-lg px-2 hover:bg-paper-2` with `arrow-up-right` icon (`14x14`)
  2. **Resources Group**:
     - Kicker: `Resources` (`font-mono text-[10px] uppercase tracking-[0.14em] text-faint px-2 pb-1`)
     - Links: Architecture Whitepaper, API Reference, Developer Docs
  3. **Log in Group**:
     - Kicker: `Log in` (`font-mono text-[10px] uppercase tracking-[0.14em] text-faint px-2 pb-1`)
     - Link: Console Login with `arrow-up-right` icon

---

## 5. Mobile Full-Screen Menu (`lg:hidden`) (Measured)

### Hamburger Trigger Button
- **Touch Target**: `min-h-11 min-w-11` (`44px × 44px`)
- **Labeling**: Dynamic accessible label: "Menu" when closed, "Close" when open
- **Icon**: Two horizontal bars morphing to `X` icon

### Mobile Drawer Overlay
- **Positioning**: `fixed inset-0 top-0 z-40`
- **Background**: `bg-ink-soft/95` (`rgba(28, 25, 23, 0.95)`) + `backdrop-blur-xl`
- **Padding**: `pt-24 px-6 pb-12`
- **Layout**: `flex flex-col overflow-y-auto`
- **Main Nav Links**:
  - Typography: `text-[clamp(1.5rem,7vw,2rem)] leading-none tracking-tight text-paper`
  - Item height: `min-h-11` (`44px`)
  - Stagger animation: `translateY(12px)` -> `0` with `40ms` stagger delay
- **Lower Sub-Groups (`border-t border-paper/15 pt-6 space-y-5 max-w-xs`)**:
  - Group 1: Platform links (Overview, Models, Neural Systems)
  - Group 2: Resources (Docs, Whitepaper, FAQ)
  - Group 3: Log in (Console Login)

---

## 6. Interaction & Accessibility Matrix

| Behavior / Feature | Verification Status | Implementation Detail |
| :--- | :--- | :--- |
| **Scroll Background Transition** | **VERIFIED** | Threshold `30px`. Throttled listener updates `isScrolled` boolean. |
| **Skip-to-Content Link** | **VERIFIED** | `sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[60] bg-paper text-ink px-4 py-2 rounded-md shadow-lg`. |
| **Active In-Page Highlighting**| **VERIFIED** | IntersectionObserver watches `#products` and `#approach` (`#principles`), highlighting active desktop link. |
| **Dropdown Outside Click** | **VERIFIED** | Pointer-down document listener dismisses dropdown when clicking outside card or trigger. |
| **Dropdown Escape Key** | **VERIFIED** | Keydown listener closes menu and restores focus to trigger button. |
| **Dropdown Roving Focus** | **ASSUMED** | Arrow Down/Up navigates through menu items; Home/End jumps to first/last item. |
| **Mobile Scroll Lock** | **VERIFIED** | `document.body.style.overflow = "hidden"` while mobile menu is open. |
| **Mobile Focus Trap** | **VERIFIED** | Tab cycle confined within mobile drawer when active. |
| **Reduced Motion Preference** | **VERIFIED** | `@media (prefers-reduced-motion: reduce)` disables dropdown and drawer motion transitions. |
