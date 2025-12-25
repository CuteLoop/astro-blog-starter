
---
title: "Cauchy–Schwarz: Why Geometry Works"
author: "Joel"
description: "The inequality that makes angles, projections, and Pythagoras possible, and opens the door to analysis and PDEs."
pubDate: 2025-12-23
tags: ["analysis", "linear algebra", "geometry", "inequalities", "math-notes"]
---



There is a single inequality that quietly bridges **geometry and analysis**.

It explains why projections behave, why angles exist, and why lengths add the way they do. Long before it becomes a technical tool in analysis or PDEs, it is already doing conceptual work.

That inequality belongs in any serious mathematical toolkit.

## The inequality

That inequality is **Cauchy–Schwarz**.

For vectors $x,y \in \mathbb{R}^n$,
$$
|x \cdot y| \le |x|,|y|.
$$

At first glance, this looks like an algebraic bound. In reality, it encodes a geometric constraint.

## Intuition: projections and shadows

The dot product $x \cdot y$ measures how much of $x$ lies in the direction of $y$.

More precisely, the projection of $x$ onto the line spanned by $y$ has length
$$
\left|\frac{x \cdot y}{|y|}\right|.
$$

Cauchy–Schwarz says that this projected length can never exceed the length of $x$:
$$
\left|\frac{x \cdot y}{|y|}\right| \le |x|.
$$

Geometrically, a shadow cannot be longer than the object casting it.

This perspective suggests a natural proof, by asking which point on a line is closest to a given vector.

## Proof via optimization

Fix vectors $x,y \in \mathbb{R}^n$ with $y \neq 0$, and consider
$$
f(t) = |x - t y|^2.
$$

This represents the squared distance from $x$ to the point $t y$ on the line through $y$. Since it is a squared length, we have $f(t) \ge 0$ for all real $t$.

Expanding,
$$
f(t) = |x|^2 - 2t(x \cdot y) + t^2 |y|^2.
$$

This quadratic is minimized when
$$
t = \frac{x \cdot y}{|y|^2}.
$$

Substituting this value back gives
$$
0 \le |x|^2 - \frac{(x \cdot y)^2}{|y|^2}.
$$

Rearranging,
$$
(x \cdot y)^2 \le |x|^2 |y|^2,
$$
which is exactly the Cauchy–Schwarz inequality.

Geometrically, the inequality says nothing more mysterious than this:
**the closest point on a line really is the closest**.

## Angles from inner products

A key consequence is that Cauchy–Schwarz allows us to define angles.

Indeed, it implies
$$
-1 \le \frac{x \cdot y}{|x|,|y|} \le 1.
$$

This makes it natural to define the angle $\theta$ between $x$ and $y$ by
$$
\cos \theta := \frac{x \cdot y}{|x|,|y|}.
$$

Cauchy–Schwarz guarantees that this definition makes sense. Without it, the notion of angle would not be stable.

## Pythagoras as a corollary

Orthogonality corresponds to a right angle, $\theta = \pi/2$, so $x \cdot y = 0$.

Let $u$ and $v$ be perpendicular vectors with lengths $a$ and $b$. Then
$$
|u + v|^2
= (u+v)\cdot(u+v)
= |u|^2 + |v|^2
= a^2 + b^2.
$$

If $u+v$ represents the hypotenuse of a right triangle, this gives
$$
c^2 = a^2 + b^2.
$$

Pythagoras is simply the statement that **orthogonal directions do not interfere**.

## Why this inequality matters

Cauchy–Schwarz is not just a geometric fact. It is a structural one.

It underlies norm control, energy estimates, and stability arguments throughout analysis and PDEs. Whenever a quantity is bounded by projecting onto something simpler, Cauchy–Schwarz is nearby.

It is also the gateway to an entire web of inequalities, including Young, Hölder, AM–GM, weighted inequalities, and beyond.

That story begins in **Part II**.
