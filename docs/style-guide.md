# Design System — Cosmic Paper / Spaceship Window
**Project:** Astro Blog Starter  
**Purpose:** A minimal, highly readable blog framed as “looking out a spaceship window” into dessert-cosmic worlds.  
**Status:** Living document (update as the theme evolves).

---

## 1) Brand Concept
### Core metaphor
- Each page feels like **you’re inside a spaceship**, looking out a **window**.
- The **content** is a calm “paper/clipboard” panel (minimal, readable).
- The **background** is a cinematic “world” (cosmic dessert palettes, nebula glaze, sprinkle stars).
- Subtle **glass glare** adds the window feeling.
- Optional **marker notes** appear as small tags/labels (like writing on the glass).

### Design goals
- **Readable first:** posts must be comfortable to read for long sessions.
- **Minimal UI:** avoid heavy decoration on the content panel.
- **Distinct worlds:** each page can opt into a themed window view.
- **Small but joyful accents:** sprinkle colors used sparingly for highlights and “stars.”

---

## 2) Layout Guidelines (Standards we follow)
### 2.1 Reading measure (text width)
- Comfortable line length: **60–80 characters/line**
- Recommended blog body width: **~72–78ch**
- We default posts to **reading width** to preserve readability.

**Decision:**  
- **Posts + About:** `max-width: 76ch` (reading container)  
- **Home + Blog index:** wider container to “use space” and feel more cinematic.

### 2.2 Mobile gutters (show background rim)
- Typical mobile padding is 16px; we want the “window” to peek through.
- Keep a **thin rim** of background visible around the paper panel.

**Decision:**  
- Mobile outer gutter: **12px** (`0.75rem`)  
- Desktop outer gutter: **24–32px** (`1.5–2rem`)  
- Paper panel padding stays comfortable even as gutters shrink.

### 2.3 Desktop: avoid “too narrow” feeling
On large screens, a narrow column can feel like “2 of 4 columns used.”  
We handle this by varying layout per page type:

**Decision:**  
- Home + Blog index are **wider layouts** (hero + cards/list)  
- Post pages remain **reading layout** (best for long-form content)  
- Sidebars are **optional later** (TOC for posts), not assumed now.

---

## 3) Standard Page Layouts
### 3.1 Home (Wide)
**Goal:** cinematic intro + quick entry points
- Use **wide paper panel** for hero / intro.
- Follow with a **responsive grid** for sections:
  - Latest posts
  - Projects / notes
  - “Now” / about snippet

**Structure**
- Header (aligned)
- Hero panel (wide + paper)
- Section grid (wide)
- Footer

### 3.2 About (Reading)
**Goal:** narrative + credibility, calm and personal
- Use **reading-width** paper panel.
- Optional: small “facts” or “toolkit” cards inside.

**Structure**
- Header
- Paper panel (reading width)
- Sections: Story, Work, Interests, Links

### 3.3 Blog index (All posts) (Wide)
**Goal:** scannable list / grid
- Use **wide** paper panel.
- Posts appear as:
  - clean list (title + date + description), or
  - cards in 2 columns (desktop), 1 column (mobile)

**Structure**
- Header
- Intro line (short)
- Posts list/grid
- Footer

### 3.4 Blog post (Single post) (Reading)
**Goal:** maximum readability
- Use **reading-width** paper panel.
- Add a “post header” region:
  - Title
  - Date
  - Description (optional)
  - Author (optional)
  - Hero image (optional)

**Structure**
- Header
- Post header block (reading width)
- Prose content (reading width)
- Next/Previous (optional)
- Footer

---

## 4) Containers & Spacing Tokens
### Container sizes
- **Reading container:** `--container-max: 76ch`
- **Wide container:** `--container-wide: 72rem` (~1152px)

### Gutters
- **Mobile page gutter:** `0.75rem` (background rim visible)
- **Desktop gutter:** `1.5–2rem`

### Panel
- Border radius: ~ **14–18px**
- Backdrop blur: subtle (window feel)
- Shadow: soft, deep (floating clipboard)

---

## 5) Color & Worlds (The Window Views)
### Base environment (global)
- Deep space background gradients
- Sprinkle “stars” layer
- Glass glare overlay

### Sprinkle palette (accents only)
- Pink: `#f472b6`
- Green: `#4ade80`
- Yellow: `#facc15`
- Blue: `#60a5fa`
- Red: `#f87171`

### Worlds (page themes via `data-theme`)
Pages set `<html data-theme="...">` to swap background mood.

#### 5.1 `sprinkle-brownie`
Chocolate-ish darkness, candy sprinkles pop.
- `--space-a: #120b10`
- `--space-b: #1a1016`
- `--space-c: #081028`

Use for: playful “chocolate lab notebook” vibe.

#### 5.2 `sprinkle-field`
Dense sprinkle energy, still cosmic, still calm.
- `--space-a: #06111d`
- `--space-b: #081a2a`
- `--space-c: #0b1020`

Use for: high-energy sections (home or index).

#### 5.3 `galaxy-donut`
Purple-blue glaze nebula.
- `--space-a: #0b0820`
- `--space-b: #120a2a`
- `--space-c: #061a33`

Use for: blog posts, “cosmic glaze” feel.

#### 5.4 `blueberry-nebula`
Deep blue/purple with fruit red accents.
- `--space-a: #07081a`
- `--space-b: #0b0f2a`
- `--space-c: #121a3a`

Use for: about page, reflective content.

#### 5.5 `starry-night`
Swirly blue emphasis, classic night mood.
- `--space-a: #050a18`
- `--space-b: #061a34`
- `--space-c: #0a2a5a`

Use for: long reading sessions, calmer mood.

---

## 6) Typography
- System UI stack by default (fast, clean).
- H1: bold, slightly tight tracking, simple.
- Body: comfortable line-height (~1.65).

**Decision:**
- Keep typography minimal; let background be expressive.

---

## 7) UI Components
### 7.1 Header / Nav
- Align header content with page containers.
- Mobile: menu button toggles nav list.
- Desktop: nav always visible.

**Interaction rule:**
- On mobile click:
  - `aria-expanded` toggles
  - `.site-header` toggles `.menu-open`
  - nav links reveal beneath header row

### 7.2 Footer
- Low contrast, quiet.
- Social buttons are minimal chips.
- Footer aligns with page container.

### 7.3 “Marker on glass” tags
Used sparingly above headings for flavor:
- `.window-tag` (yellow highlight)
- `.window-tag.terminal` (green highlight)

---

## 8) Accessibility Rules
- Maintain adequate contrast on the paper panel.
- Nav button uses `aria-expanded` and `aria-controls`.
- Links are clearly distinguishable (underline + hover color).
- Icons are decorative with accessible labels on links.

---

## 9) Implementation Notes
### Recommended container usage per page
- **Home:** `container-wide + paper`
- **Blog index:** `container-wide + paper`
- **About:** `container (reading) + paper`
- **Post page:** `container (reading) + paper`

### Themes per page (suggested defaults)
- Home: `sprinkle-field` or `sprinkle-brownie`
- About: `blueberry-nebula`
- Blog index: `galaxy-donut`
- Post pages: `starry-night` or `galaxy-donut`

---

## 10) Future Extensions (Not required now)
- Post TOC side rail (desktop only)
- Tag filtering on blog index
- Per-post world setting in frontmatter (auto theme per post)
- Subtle animated stars (very light; avoid distraction)
