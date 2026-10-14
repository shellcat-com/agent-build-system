---
name: master-plan
description: Convert an approved product brief into a decision-complete implementation plan covering behavior, interfaces, design, engineering, verification, rollout, and rollback.
---

# Master plan

Use an approved brief. Resolve material product decisions before planning implementation.

Inspect current architecture and identify what will be reused, changed, or retired. Write `docs/plans/<feature>/02-master-plan.md` using the bundled template. Cover every meaningful loading, empty, error, offline, permission, success, accessibility, and reduced-motion state. Define interfaces, data flow, security, migration, tests, evidence, rollout, rollback, risk, and definition of done.

Write plain English first and exact technical names where they make execution unambiguous. The plan must leave no product or architecture decisions to task agents. Do not implement unless the user separately requests execution.
