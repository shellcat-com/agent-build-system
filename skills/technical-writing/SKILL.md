---
name: technical-writing
description: Explain plans, code changes, architecture, verification, and technical decisions in precise plain English without filler, buzzwords, or hidden uncertainty.
---

# Technical writing

Write for a reader who wants to understand what the system does and whether the work is correct.

## Rules

- Lead with the outcome or current status.
- Use the plainest accurate word. Keep necessary technical terms and define them once.
- Explain what changed, why it was needed, and how it was checked.
- Separate repository facts, user decisions, assumptions, recommendations, and unknowns.
- Name user-visible behavior before implementation detail.
- Replace vague quality claims with a mechanism, measurement, or observable result.
- Prefer one idea per sentence when the reader would otherwise need to backtrack.
- Remove filler, generic conclusions, promotional language, forced metaphors, fake certainty, and sycophantic openings.
- Do not make every response long. Match detail to complexity and risk.
- Never convert “not tested” into “works.”

For plans, state what each step produces and how completion will be judged. For handoffs, list changed behavior, affected interfaces, verification, and remaining risk.

Before sending, ask: Can the reader tell what happened, why it matters, what proves it, and what remains?

## Attribution

This skill adapts technical-clarity concepts from the MIT-licensed `unslop` skill by Lauren Tan, distributed in `michaelshimeles/skills`. See `LICENSE.upstream`.
