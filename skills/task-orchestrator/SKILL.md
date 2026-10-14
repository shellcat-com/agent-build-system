---
name: task-orchestrator
description: Execute an approved master plan through dependency-aware task agents while preserving one vision, limiting conflicts, integrating results, and verifying the whole feature.
---

# Task orchestrator

The approved master plan is the source of truth. Split work, not vision.

Create Task 01 through Task N from real dependencies and file ownership. Use the bundled task packet for each assignment. The graph may contain any number of tasks, but run at most three concurrently. Concurrent tasks must be independent and must not edit the same files or shared contracts.

Delegate only after the user approves the brief, master plan, and task graph. The lead agent owns shared architecture, integration, and final verification. Review the actual diff and evidence from every handoff; a completion message is not proof.

After approval, continue through the queue. Pause only for a scope change, missing decision, secret, cost, production mutation, destructive action, or unresolved conflict. Do not call the feature complete until integration, builds, tests, runtime checks, and acceptance criteria are complete or honestly marked untested.

Read `references/concurrency.md` before assigning concurrent tasks.
