Below is a “design doc + implementation plan” you can drop into your repo (e.g., `docs/math-and-figures-pipeline.md`). It is written so you can return in a few days and execute it with minimal re-derivation.

````md
# Math + Environments + TikZ Figures Pipeline (Astro Blog)
**Project:** Cosmic Paper (Astro static blog)  
**Goal:** Author posts in Markdown with:
1) `$...$` and `$$...$$` math rendered by MathJax (with shared macros)
2) LaTeX-like theorem/proof blocks authored as `:::theorem` / `:::proof` in Markdown
3) TikZ figures authored as `.tex` compiled to SVG and embedded in posts
4) A GitHub Actions CI pipeline that builds figures + site and deploys to GitHub Pages

---

## 0. Non-goals (explicit)
- Full LaTeX-to-HTML for arbitrary documents (too large scope)
- Supporting *all* TeX macro forms or packages inside MathJax
- Supporting `\begin{proof}` directly inside Markdown as a first iteration  
  (we will use `:::` blocks; we can add `\begin{}` parsing later if needed)

---

## 1. High-level architecture

### 1.1 Three separate transformations
This system has three concerns that must remain decoupled:

#### A) Markdown → HTML (build time)
- Astro (remark/rehype pipeline) turns Markdown content into HTML.
- Our custom “environment blocks” plugin converts `:::proof` etc. into semantic HTML containers.

#### B) HTML → rendered math (runtime in browser)
- MathJax runs in the client and typesets `$...$` / `$$...$$`.
- MathJax uses macros injected via `window.MathJax.tex.macros`.

#### C) TikZ → SVG (build time, local & CI)
- TikZ sources compiled to PDF via `latexmk`
- PDF converted to SVG via `pdf2svg` (or Inkscape as fallback)
- SVGs placed under `public/figures/` and referenced as normal images

These are independent pipelines that happen in a defined order:
- Figures build step runs before `astro build`.
- Markdown build step runs during `astro build`.
- MathJax typesetting happens in the browser after HTML is loaded.

---

## 2. Authoring experience requirements

### 2.1 Math syntax
- Inline math: `$a^2 + b^2 = c^2$`
- Display math: `$$ a^2 + b^2 = c^2 $$`
- Avoid `\[ ... \]` inside `.astro` templates because `{}` conflicts with Astro/JS parsing.
- In Markdown posts, `\[ \]` may work, but standardize on `$`/`$$`.

### 2.2 Environment blocks (Theorem/Proof/etc.)
Use Markdown “directive-like” blocks:

```md
:::theorem[Pythagorean Theorem]
In a right triangle with legs $a,b$ and hypotenuse $c$, we have $a^2+b^2=c^2$.
:::

:::proof
Narrative text, then math:

$$
a^2+b^2=c^2.
$$
:::
````

Supported in MVP:

* `:::theorem[Optional Title]`
* `:::lemma[Optional Title]`
* `:::definition[Optional Title]`
* `:::proposition[Optional Title]`
* `:::corollary[Optional Title]`
* `:::proof` (no title by default; optional later)
* `:::remark[Optional Title]`

### 2.3 TikZ figure inclusion

TikZ source file lives in `src/figures/` and compiles to:

* `public/figures/<name>.svg`

Usage in Markdown:

```md
![A square dissection proof](/figures/pythagoras-dissection.svg)
```

---

## 3. Repository structure (proposed)

```
src/
  components/
  content/
    blog/
  layouts/
  latex/
    macros.ts        # MathJax macro object (source of truth for runtime)
    macros.tex       # Human-friendly LaTeX macro definitions (optional, for automation later)
  markdown/
    envBlocks.ts     # remark plugin implementing :::theorem / :::proof
  figures/
    pythagoras-dissection.tex
public/
  figures/           # generated SVG output (committed or generated in CI)
scripts/
  build-figures.mjs  # compiles TikZ -> PDF -> SVG
docs/
  math-and-figures-pipeline.md  # this document
```

---

## 4. MathJax integration details

### 4.1 `src/latex/macros.ts` (runtime macros)

This file exports a JS object compatible with MathJax v3.

Example:

```ts
export const mathjaxMacros: Record<string, any> = {
  RR: "\\mathbb{R}",
  norm: ["\\lVert #1 \\rVert", 1],
  inner: ["\\langle #1, #2 \\rangle", 2],
  abs: ["\\lvert #1 \\rvert", 1],
};
```

Notes:

* Keys omit the leading backslash.
* A string means “no arguments”.
* `[template, nArgs]` defines a macro with arguments.

### 4.2 Inject macros in `BaseLayout.astro`

In `BaseLayout.astro`:

* Import `mathjaxMacros`
* Serialize into `window.MathJax.tex.macros`

Implementation pattern:

```astro
---
import { mathjaxMacros } from "../latex/macros";
---

<script is:inline>
  window.MathJax = {
    tex: {
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
      processEscapes: true,
      macros: { /* injected */ }
    },
    options: { skipHtmlTags: ["script","noscript","style","textarea","pre","code"] }
  };
</script>
```

We must carefully inject the JS object. Astro supports serializing via `JSON.stringify`, but note that backslashes must be preserved.
Plan:

* Build the object in JS, serialize with `JSON.stringify`, and assign it in the inline script.

Potential gotcha:

* Some macro bodies need double escaping (`\\`) in TS strings. That’s expected.

---

## 5. Markdown environment blocks plugin

### 5.1 Why we need a plugin

Markdown does not natively recognize `:::theorem`. We implement a remark plugin to:

* detect these blocks
* wrap content in an HTML structure with classes
* optionally render a title

### 5.2 Output HTML contract (MVP)

For `:::theorem[Pythagorean Theorem] ... :::`:

```html
<section class="env env-theorem">
  <div class="env-heading">
    <span class="env-label">Theorem</span>
    <span class="env-title">Pythagorean Theorem</span>
  </div>
  <div class="env-body">
    ...content html...
  </div>
</section>
```

For `:::proof ... :::`:

```html
<section class="env env-proof">
  <div class="env-heading">
    <span class="env-label">Proof</span>
  </div>
  <div class="env-body">
    ...content html...
  </div>
</section>
```

This is intentionally simple: CSS can make it look like LaTeX theorem boxes.

### 5.3 Implementation approach

Use `remark` plugin with one of:

* `remark-directive` (recommended)
* or parse “fenced” tokens manually (harder)

Plan (recommended):

1. Install `remark-directive`
2. In `envBlocks.ts`, transform `containerDirective` nodes (`:::`) into HAST/HTML nodes
3. Wire plugin into `astro.config.mjs` under `markdown.remarkPlugins`

---

## 6. Styling contract for environments (CSS)

Add to `global.css`:

* `.env` base style (border, padding, subtle background)
* `.env-heading` (label + title)
* `.env-proof .env-heading` slightly different styling

Also ensure math overflow handling already exists:

* `mjx-container { overflow-x: auto; }`

---

## 7. TikZ → SVG pipeline

### 7.1 Build script responsibilities

A Node script `scripts/build-figures.mjs` should:

1. scan `src/figures/*.tex`
2. for each file:

   * compile using `latexmk -pdf -interaction=nonstopmode`
   * generate a PDF in a temp directory
   * convert PDF → SVG using `pdf2svg`
3. write final SVG to `public/figures/<name>.svg`

### 7.2 Minimal TeX wrapper requirement

TikZ files should be compilable standalone, so each `.tex` should be a complete LaTeX document:

```tex
\documentclass[tikz,border=2pt]{standalone}
\usepackage{tikz}
\begin{document}
\begin{tikzpicture}
...
\end{tikzpicture}
\end{document}
```

Optional: share TikZ macros via `src/figures/preamble.tex` and `\input{...}`.

### 7.3 Output policy: commit SVGs or build-only?

Two options:

**Option A (recommended initially): commit SVGs**

* fast, reliable on GitHub Pages
* local dev doesn’t require LaTeX toolchain
* CI still verifies they’re up to date later

**Option B: build SVGs in CI only**

* repo stays clean
* but CI must install LaTeX + pdf2svg
* local preview may not show images unless you run the build step

MVP plan: Option A for the first week; revisit later.

---

## 8. GitHub Actions CI plan (GitHub Pages)

### 8.1 Steps

1. Checkout
2. Setup Node + npm install
3. Install LaTeX + pdf2svg dependencies (if building figures in CI)
4. Run `npm run build:figures`
5. Run `npm run build`
6. Upload `dist/` to Pages

### 8.2 Dependencies on Ubuntu runners

* `texlive-latex-base`, `texlive-latex-recommended`, `texlive-pictures`, `texlive-latex-extra`
* `latexmk`
* `pdf2svg`

This is heavy. If it’s too slow, switch to a Docker-based figure build step.

---

## 9. Implementation plan (coding tasks)

### Phase 0: Standardize math delimiters

* Use `$` and `$$` in Markdown.
* Ensure BaseLayout config is:

```js
inlineMath: [["$", "$"]],
displayMath: [["$$", "$$"]],
```

### Phase 1: Macro system (MathJax)

1. Create `src/latex/macros.ts` exporting `mathjaxMacros`
2. Update `BaseLayout.astro` to import and inject macros
3. Add 3–5 canonical macros you will use often:

   * `\RR`, `\ZZ`, `\NN`
   * `\norm{}`, `\inner{}{}`, `\abs{}`
4. Verify:

   * inline macro works in post
   * display math renders without overflow

Deliverable: macros work site-wide.

### Phase 2: Environment blocks plugin

1. `npm i remark-directive` (and possibly `unist-util-visit`)
2. Implement `src/markdown/envBlocks.ts`
3. Wire into `astro.config.mjs` under `markdown.remarkPlugins`
4. Add CSS styles for `.env` blocks
5. Write a test post with all environments

Deliverable: `:::theorem` and `:::proof` render into styled blocks.

### Phase 3: TikZ figure pipeline (local)

1. Add `scripts/build-figures.mjs`
2. Add `npm run build:figures` and `npm run dev:figures` (optional)
3. Create one sample figure: `src/figures/pythagoras-dissection.tex`
4. Generate `public/figures/pythagoras-dissection.svg`
5. Embed in post and confirm responsive behavior

Deliverable: TikZ → SVG works locally.

### Phase 4: CI integration (GitHub Pages)

1. Add `.github/workflows/pages.yml`
2. Choose Option A or B (commit SVGs vs generate)
3. If generating:

   * install LaTeX packages + pdf2svg
   * run build figures before Astro build
4. Deploy

Deliverable: pushes build and deploy correctly.

### Phase 5: Automation: macros.tex → macros.ts (optional, later)

Implement a small converter script:

* parse only `\newcommand{\X}{...}` and `\newcommand{\X}[n]{...}`
* emit `src/latex/macros.ts`
* run `npm run build:macros` before build
* keep `macros.tex` as source of truth

This step is explicitly deferred until the pipeline is stable.

---

## 10. Debug checklist (when things break)

### 10.1 Math not rendering

* Confirm MathJax script is in `<head>`
* Confirm delimiters are `$` / `$$` (not `\[`)
* Confirm Markdown is producing text nodes with `$...$`
* Confirm `skipHtmlTags` isn’t skipping your container

### 10.2 Environments not transforming

* Confirm remark plugin is wired in `astro.config.mjs`
* Confirm the syntax matches exactly `:::theorem[...]`
* Inspect output HTML for `.env` wrapper

### 10.3 SVG not appearing

* Confirm file exists in `public/figures/`
* Confirm URL uses `/figures/name.svg` (leading slash)
* Check dev server logs for 404

### 10.4 CI fails building figures

* Check LaTeX deps installed
* Check `latexmk` exit code and logs
* Confirm `standalone` class available (`texlive-latex-extra`)

---

## 11. Acceptance criteria (MVP)

* A post can include:

  * at least 5 custom macros
  * `:::theorem` and `:::proof` blocks styled
  * one TikZ-generated SVG figure
* Local dev: `npm run dev` works without errors
* Build: `npm run build` succeeds
* CI: site deploys and renders math + SVG

---

## 12. Next upgrades (after MVP)

* Add numbering for theorem/lemma environments per post (client or build time)
* Add cross-references for theorem labels (requires more parsing)
* Add `\begin{proof}` parsing support (optional, more fragile)
* Improve TikZ caching so only changed figures rebuild
* Add “math re-typeset on client navigation” if you later introduce SPA transitions

```

If you want, I can also give you the *exact* code skeletons for:
- `src/markdown/envBlocks.ts`
- `scripts/build-figures.mjs`
- `astro.config.mjs` wiring
- `pages.yml` (GitHub Pages) with LaTeX deps

…but the doc above is intentionally the “come back later and implement” blueprint.
::contentReference[oaicite:0]{index=0}
```
