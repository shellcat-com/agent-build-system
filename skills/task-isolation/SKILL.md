---
name: task-isolation
description: Prepare safe parallel agent work by detecting harness-managed worktrees, protecting unrelated changes, assigning ownership, and checking shared-resource conflicts.
---

# Task isolation

Inspect the current branch, worktree, uncommitted changes, active tasks, and open conflicting work before editing.

Use an existing harness-managed worktree when present. Never create a nested worktree. When isolation is not already managed, propose or create a task-specific worktree only when the user authorized implementation and repository workflow permits it.

Preserve unrelated changes. Assign exclusive file ownership where practical. Remember that Git worktrees do not isolate ports, simulators, databases, deployments, lockfiles, credentials, or external accounts. Record shared-resource reservations in the task packet.

Never force-delete a branch or worktree, discard changes, or clean a broad directory. The lead agent owns integration and cleanup.
