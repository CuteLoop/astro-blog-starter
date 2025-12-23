Below is a **clean, formalized design/style document** you can place directly in your repository under `docs/`. It is written to be both **human-readable** and **actionable**, the kind of document you would keep long-term and evolve slowly.

I recommend the filename:

```
docs/design-system.md
```

(or `docs/style-guide.md` if you prefer)

---

````md
# Design System — Cosmic Paper Theme

## Purpose

This document defines the visual and stylistic system for the site.
It exists to ensure consistency, readability, and long-term maintainability
as the site grows in content and complexity.

The goal is **simple, minimal, paper-first design** set against a
**cosmic background**, with color used sparingly and intentionally.

This is not a decorative theme.  
It is a reading and thinking environment.

---

## Design Philosophy

**Concept:**  
> *A clean paper notebook floating in deep space.*

The site balances two contrasting ideas:

1. **Paper**
   - Calm, readable, minimal
   - Optimized for long-form text
   - Feels like notes, essays, or a research notebook

2. **Cosmos**
   - Deep, dark background
   - Quiet and expansive
   - Color appears like distant stars, not noise

The background sets the mood.  
The content does the talking.

---

## Core Principles

### 1. Paper-first readability
- Text is always high-contrast.
- Long-form reading is comfortable.
- Light surfaces are used for content blocks.

### 2. Color as punctuation
- Color is never decorative filler.
- Color highlights meaning:
  - links
  - emphasis
  - metadata
  - subtle UI affordances
- Use color sparingly.

### 3. Minimal geometry
- Rectangles with soft rounding.
- Borders instead of shadows.
- Avoid visual clutter.

### 4. Space equals calm
- Generous margins.
- Comfortable line height.
- Nothing feels cramped or loud.

---

## Visual Layers

The site is designed in layers:

1. **Cosmic Background**
   - Dark, deep blue
   - Sets atmosphere

2. **Paper Surface**
   - Light container for content
   - Houses text, posts, and notes

3. **Ink**
   - Primary text and headings

4. **Sprinkles**
   - Rare accent colors
   - Used intentionally

---

## Color System

### Base (Cosmic Background)

```css
--bg-space: #0b1020;
--bg-space-soft: #0f172a;
````

### Paper Surface

```css
--paper: #f8fafc;
--paper-border: #e5e7eb;
```

### Ink (Text)

```css
--ink-main: #0f172a;
--ink-muted: #475569;
```

### Sprinkles (Accent Colors)

```css
--sprinkle-pink:   #f472b6;
--sprinkle-green:  #4ade80;
--sprinkle-yellow: #facc15;
--sprinkle-blue:   #60a5fa;
--sprinkle-red:    #f87171;
```

**Rule:**

> Never use more than one sprinkle color per component.

---

## Typography

### Philosophy

* Neutral and unobtrusive
* Designed for reading, not branding
* Notes > posters

### Defaults

* System UI font stack
* One font family
* No decorative headings

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

---

## Layout Structure

Conceptual structure:

```
[ Cosmic Background ]
    └── Header (quiet, dark)
    └── Paper Container (centered)
         ├── Title
         ├── Metadata
         ├── Content
    └── Footer (subtle)
```

The **paper container** is the primary visual focus.

---

## Containers

### Content Container

* Centered
* Light background
* Soft border
* Rounded corners

Guidelines:

* Max width: ~70–75ch
* Padding: generous
* Margin: separates content from background

---

## Headings

* Calm hierarchy
* No excessive size jumps
* Slight negative letter-spacing for clarity

---

## Links

Links are one of the primary “sprinkles”.

* Default: blue
* Hover: pink
* Always readable
* Always intentional

---

## Code Blocks

* Subtle contrast
* No rainbow syntax highlighting
* Reads like annotations, not fireworks

---

## Sprinkles Usage Guide

Sprinkles appear in small doses:

* Links
* Icons
* Section markers
* Callouts

### Example: Callout

```css
.note {
  border-left: 4px solid var(--sprinkle-green);
  padding-left: 1rem;
}
```

---

## What We Avoid (Non-goals)

* ❌ Starfield background images
* ❌ Animated particles
* ❌ Heavy gradients
* ❌ Excessive shadows
* ❌ Multiple fonts
* ❌ Color-heavy sections
* ❌ Decorative noise

The site should feel **quiet**, not impressive.

---

## Intended Emotional Tone

* Thoughtful
* Calm
* Curious
* Slightly playful
* Academically grounded

Color is used as delight, not distraction.

---

## Evolution Guidelines

* Change styles slowly.
* Prefer refinement over redesign.
* Add components only when the content demands them.
* Keep the reading experience sacred.

---

## Status

This design system is:

* **Stable**
* **Minimal**
* **Open to slow evolution**

All future UI decisions should reference this document.

```

---

### Next natural step
Once this doc is committed, the **next correct move** is to:

1. Refactor `BaseLayout` to implement the paper container exactly once
2. Build `PostLayout` using only the rules in this document

If you want, next I can:
- Translate this doc into **design tokens + CSS variables only**
- Or help you **audit existing CSS against this spec** and trim it down
```
