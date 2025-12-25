
---
title: "Cauchy–Schwarz and the Web of Inequalities"
author: "Joel"
description: "How a single geometric inequality generates Young, Hölder, and the classical means, and becomes the grammar of analysis."
pubDate: 2025-12-24
tags: ["analysis", "inequalities", "pde", "functional-analysis", "math-notes"]
---



In Part I, Cauchy–Schwarz appeared as the inequality that makes geometry work.
In analysis, it plays a second role. It is a generator.

From it, and from closely related ideas, we obtain most of the inequalities that control integrals, energies, and nonlinear terms in PDEs. Rather than proving each inequality in isolation, we follow a single thread.

## 1. Young’s inequality: the analytic prototype

Cauchy–Schwarz controls projections.
Young’s inequality controls products.

### Statement

**Young’s inequality.**
Let $a,b \ge 0$ and let $p,q>1$ satisfy
$$
\frac{1}{p} + \frac{1}{q} = 1.
$$
Then
$$
ab \le \frac{a^p}{p} + \frac{b^q}{q}.
$$

Young’s inequality replaces a product by a sum of powers. This simple maneuver sits behind most estimates in analysis.

### Proof (optional)

<details>
<summary><strong>Hint</strong></summary>

Think in terms of convexity or optimization.

Consider the convex function $t \mapsto t^p/p$.
Use the tangent line inequality.
Or minimize $\frac{a^p}{p} + \frac{b^q}{q} - ab$ with respect to one variable.

</details>

<details>
<summary><strong>Proof</strong></summary>

Fix $a \ge 0$ and define
$$
\phi(b) = \frac{a^p}{p} + \frac{b^q}{q} - ab.
$$
Then
$$
\phi'(b) = b^{q-1} - a,
$$
so the minimum occurs at $b = a^{p-1}$. Substituting,
$$
\phi(b_{\min}) = \frac{a^p}{p} + \frac{a^p}{q} - a^p = 0.
$$
Thus $\phi(b) \ge 0$ for all $b \ge 0$, which proves the inequality.

</details>

## 2. Hölder’s inequality: controlling integrals

Young’s inequality is local. It controls a product at a single point.
Hölder’s inequality globalizes it.

### Statement

**Hölder’s inequality.**
Let $f \in L^p(\Omega)$ and $g \in L^q(\Omega)$, with
$$
\frac{1}{p} + \frac{1}{q} = 1.
$$
Then
$$
\int_\Omega |f g| \le |f|_p |g|_q.
$$

### Why it works

<details>
<summary><strong>Hint</strong></summary>

Apply Young’s inequality pointwise to $|f(x)|$ and $|g(x)|$.
Integrate over $\Omega$.
Rescale $f$ and $g$ so the constants match.

</details>

<details>
<summary><strong>Proof</strong></summary>

By Young’s inequality,
$$
|f(x) g(x)| \le \frac{|f(x)|^p}{p} + \frac{|g(x)|^q}{q}
$$
for almost every $x$. Integrating,
$$
\int |f g|
\le
\frac{1}{p} \int |f|^p + \frac{1}{q} \int |g|^q.
$$
Rescaling $f$ and $g$ by their $L^p$ and $L^q$ norms yields the stated inequality.

</details>

Hölder is Young applied everywhere at once.

## 3. Cauchy–Schwarz as the symmetric case

When $p = q = 2$, Hölder becomes
$$
\int |f g|
\le
\left( \int |f|^2 \right)^{1/2}
\left( \int |g|^2 \right)^{1/2}.
$$

This is exactly Cauchy–Schwarz.

Cauchy–Schwarz is not isolated. It sits at the symmetric center of Hölder’s family.
This closes the logical loop back to Part I.

## 4. A first analytic application

Let $u,v \in L^2(\Omega)$. Then
$$
\left| \int_\Omega u v \right| \le |u|_2,|v|_2.
$$

This single estimate underlies energy methods, weak formulations, and stability and uniqueness arguments in PDEs. We will return to it repeatedly.

## 5. Classical means as algebraic shadows

The same ideas also produce familiar inequalities from elementary algebra.

### Arithmetic–Geometric Mean

For $a,b \ge 0$,
$$
(a-b)^2 \ge 0
\quad \Rightarrow \quad
2ab \le a^2 + b^2.
$$
Taking square roots,
$$
\sqrt{ab} \le \frac{a+b}{2}.
$$

AM–GM is Cauchy–Schwarz in disguise.

### Weighted AM–GM

Let $\lambda \in (0,1)$. Applying Young with
$$
p = \frac{1}{\lambda},
\qquad
q = \frac{1}{1-\lambda},
$$
gives
$$
a^\lambda b^{1-\lambda}
\le
\lambda a + (1-\lambda)b.
$$

Weights appear naturally once exponents do.

### Harmonic–Arithmetic Mean

Applying Cauchy–Schwarz to the vectors
$$
(\sqrt{a}, \sqrt{b}),
\qquad
\left(\frac{1}{\sqrt{a}}, \frac{1}{\sqrt{b}}\right),
$$
yields
$$
\frac{2ab}{a+b}
\le
\frac{a+b}{2}.
$$

Many classical inequalities differ only by where the square root is hidden.

## 6. Unifying perspective

What looks like a zoo of inequalities is really a small ecosystem.

Young controls products.
Hölder controls integrals.
Cauchy–Schwarz sits at the symmetric center.
AM–GM and its variants are algebraic shadows of the same ideas.

In PDEs, these inequalities are not optional. They are the grammar of estimates.

In **Part III**, we see how this grammar is used in practice in analysis and PDEs.

