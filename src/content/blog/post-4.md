
---
title: "Launch a LaTeX Astro Blog in ~15–20 Minutes (Astro + Netlify)"
description: "Clone a starter, deploy to Netlify, and write posts with $...$ and $$...$$ math in under 20 minutes."
pubDate: 2025-12-01
author: "Joel"
theme: "galaxy-donut"
tags: ["Astro", "Math", "LaTeX", "Netlify", "Build Log"]


This is a practical, start-to-finish workflow to get a clean Astro blog online with LaTeX math rendering.

The aim is simple: **clone → deploy → write**. If you want to build from scratch, I include a short “from-scratch” path at the end.

---

## What you’ll have at the end

- A deployed Astro blog on Netlify
- Markdown posts with **inline math** using `$...$`
- Display equations using `$$...$$`
- A predictable content structure with Astro Content Collections

---

## 1) Clone the starter (2 minutes)

```bash
git clone https://github.com/CuteLoop/astro-blog-starter astro-latex-blog
cd astro-latex-blog
npm install
npm run dev
````

Open the local server URL Astro prints (usually `http://localhost:4321/`).

If the home page loads and you see the cosmic-paper theme, you are ready to deploy.

---

## 2) Verify LaTeX is enabled (2 minutes)

In this starter, MathJax is loaded in the global layout (typically `src/layouts/BaseLayout.astro`). You should see something like:

* MathJax config for `$` and `$$`
* The MathJax script include

Test quickly by adding this to any page or post content:

Inline: `$a^2 + b^2 = c^2$`

Display:

$$
a^2 + b^2 = c^2
$$

If it renders as typeset math (not literal dollar signs), you’re good.

---

## 3) Deploy to Netlify (8–10 minutes)

### Option A: “Import from Git” (recommended)

1. Push your clone to your GitHub account:

   ```bash
   git remote remove origin
   git remote add origin https://github.com/CuteLoop/astro-blog-starter
   git add -A
   git commit -m "Initial commit"
   git push -u origin main
   ```
2. Go to Netlify → **Add new site** → **Import an existing project**
3. Select your GitHub repo
4. Set:

   * **Build command:** `npm run build`
   * **Publish directory:** `dist`

Netlify will build and deploy.

### Option B: Netlify CLI (fast if you like terminal)

```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --build --prod
```

---

## 4) Add a first post (3 minutes)

Create a new file in your content collection. Typical path:

`src/content/blog/my-first-math-post.md`

Example:

```md
---
title: "A Small Math Post"
description: "Testing LaTeX support."
pubDate: 2025-12-25
author: "Joel"
theme: "starry-night"
tags: ["Math", "Notes"]
---

Inline math: $e^{i\pi} + 1 = 0$.

Display math:

$$
\int_0^1 x^n \, dx = \frac{1}{n+1}.
$$
```

Commit and push. Netlify will redeploy automatically.

---

## LaTeX guidelines for Astro + Markdown

### Use `$...$` and `$$...$$`

This matters because Astro templates and some Markdown/HTML contexts can conflict with certain delimiter styles.

**Use:**

* `$...$` for inline math
* `$$...$$` for display math

Avoid relying on `\[ ... \]` in `.astro` templates. It may work in Markdown, but `$` and `$$` are more predictable.

### Prefer `\(...\)` / `\[...\]` only if you need them

MathJax can support them, but standardizing on `$`/`$$` reduces edge cases.

### Watch for accidental parsing in code blocks

If you write dollar signs inside fenced code blocks, MathJax is usually configured to skip `pre`/`code`. That is good. Keep math out of code blocks unless you explicitly want literal text.

### Keep display math on its own lines

This avoids weird whitespace or Markdown paragraph wrapping:

```md
$$
a^2 + b^2 = c^2
$$
```

---

## If you want to build the blog from scratch (short path)

If you want to understand the moving pieces rather than cloning a starter:

1. Create Astro:

   ```bash
   npm create astro@latest
   cd <project>
   npm install
   ```

2. Add Content Collections for blog posts:

   * Create `src/content/blog/`
   * Add `src/content/config.ts` with a schema
   * Create `src/pages/[...slug].astro` to render posts

3. Add MathJax in your base layout:

   * Put MathJax config in `<head>`
   * Set delimiters to `$` and `$$`
   * Include the MathJax script

4. Deploy to Netlify:

   * build: `npm run build`
   * publish: `dist`

If you want a reference implementation, use this repo as the “known-good” baseline and compare the file layout.

---

## Closing

Once this is deployed, the fastest way to iterate is:

* write posts in `src/content/blog/`
* use `$` and `$$` for math
* push → Netlify auto-deploy

Next upgrades usually are: theorem/proof blocks, TikZ-to-SVG figures, and macro tooling. Those can be layered on without changing the deployment model.

````

---

## Netlify config (recommended)

Create `netlify.toml` at the repo root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
````

Node 22 is what you’re already using locally; this reduces “works on my machine” drift.

---

## Quick Astro references to link inside the post (no raw URLs in your Markdown)

If you want to reference Astro docs without pasting URLs inline (your preference may vary), you can just refer to:

* “Astro Content Collections documentation”
* “Netlify Astro deployment guide”
* “MathJax v3 configuration for TeX input”

(If you want, tell me whether you’re OK including raw links in posts; otherwise I’ll keep it reference-style.)

---

## One last practical note about MathJax

MathJax renders in the browser. That means:

* your deployed static HTML is simple (fast)
* math typesetting happens after page load
* if you later add client-side navigation, you may need to trigger re-typesetting on route changes (not necessary for a plain static blog without SPA transitions)

---

If you paste your repo URL (GitHub) I can tailor the “Clone” section and the exact file paths to match your current structure (content folder names, slug route file, etc.).
