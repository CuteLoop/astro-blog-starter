
# Astro LaTeX Blog Starter

A minimal **Astro** blog starter with **LaTeX math support** via MathJax, designed for mathematicians, scientists, and technical writers.

Live demo (Netlify):  
👉 https://astro-latex.netlify.app/

---

## Features

- Astro + Content Collections
- Markdown posts with LaTeX math
  - Inline math: `$...$`
  - Display math: `$$...$$`
- Clean, readable layout (cosmic paper theme)
- Tag system
- Ready for Netlify deployment
- No framework lock-in, no client-side JS required for content

---

## Quick start

```bash
git clone <this-repo-url>
cd astro-latex-blog
npm install
npm run dev
````

Open the local URL printed by Astro (usually `http://localhost:4321`).

---

## Writing posts

Create Markdown files in:

```
src/content/blog/
```

Example:

```md
---
title: "My First Math Post"
description: "Testing LaTeX support."
pubDate: 2025-12-25
author: "Your Name"
tags: ["Math", "Notes"]
---

Inline math: $a^2 + b^2 = c^2$.

Display math:

$$
\int_0^1 x^n \, dx = \frac{1}{n+1}.
$$
```

### LaTeX guidelines

* Use `$...$` for inline math
* Use `$$...$$` for display math
* Avoid `\[...\]` inside `.astro` templates
* MathJax is loaded globally via the base layout
* Common error.
    moderately use {} braces as Astro tries to render them as javasciript and could bring errors.
    for example will error e^{i\pi} if not in a .md file
* Fix:  ``` <p set:html={`\\[ x^2 + e^{\\pi} + 1 = 0 \\]`}></p>
 ```
---

## Deployment (Netlify)

This repo is ready for **one-click Netlify deployment**.

**Build settings:**

* Build command: `npm run build`
* Publish directory: `dist`

Optional `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

---

## Tutorial post

A full walkthrough explaining how this blog is built and deployed in ~15–20 minutes:

📖 **Launch a LaTeX Astro Blog in 15–20 Minutes**
[https://astro-latex.netlify.app/blog/launch-a-latex-astro-blog/](https://astro-latex.netlify.app/blog/launch-a-latex-astro-blog/)

(This post is part of the demo site and uses this repository.)

---

## Intended audience

* Mathematicians
* Physicists
* Applied scientists
* Graduate students
* Technical bloggers who want LaTeX without heavy tooling

---

## License

MIT

---

## Status

This is a **starter template**, not a CMS.
Planned future extensions (not included yet):

* theorem / proof blocks
* TikZ → SVG pipeline
* LaTeX macro tooling
* CI-based figure rendering

Contributions and forks are welcome.

```

---

## Suggested GitHub repo settings

When you publish the repo, I recommend:

**Description**  
> Minimal Astro blog with LaTeX math support (MathJax). Ideal for math & science writing.

**Topics**
```

astro
latex
mathjax
markdown
blog
static-site
netlify

