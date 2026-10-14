# Agent Build System

A portable workflow for turning an idea into an approved product brief, a decision-complete plan, safely divided agent tasks, verified implementation, and bounded refinements.

It works with Codex, Claude Code, Cursor, T3 Code, and other harnesses that support the Agent Skills `SKILL.md` format.

## What it provides

- Plain technical writing
- Product interviews and master plans
- Dependency-aware orchestration with at most three concurrent agents
- Harness-aware task isolation
- Evidence-based completion
- UI/UX research using platform guidance, the web, and optional Mobbin MCP
- Original project `DESIGN.md` generation
- Purposeful motion specifications
- Text and visual refinement
- A safe project/user installer
- A Spark profile for SwiftUI + Convex + Clerk

## Install selected skills

With the Agent Skills CLI:

```bash
npx skills add https://github.com/shellcat-com/agent-build-system
```

Or clone the repository and preview a project installation:

```bash
git clone https://github.com/shellcat-com/agent-build-system.git
cd agent-build-system
node scripts/install.mjs --scope project --target /path/to/project
```

Nothing is written without `--apply`:

```bash
node scripts/install.mjs --scope project --target /path/to/project --apply
node scripts/install.mjs --scope project --target /path/to/spark --profile spark --apply
node scripts/install.mjs --scope user --apply
```

The installer never edits MCP configuration. See [Mobbin setup](integrations/mobbin/README.md) if design research needs Mobbin.

## Core workflow

```text
idea -> interview -> approved brief -> master plan -> approved task graph
     -> up to 3 concurrent tasks -> integration -> evidence -> refinement
```

After the brief, plan, and task graph are approved, execution continues to a verified end. It pauses for scope changes, missing product decisions, secrets, costs, production actions, destructive operations, or unresolved conflicts.

## Invocation

Codex:

```text
Use $product-interview for this feature.
Use $master-plan with the approved brief.
Use $task-orchestrator to execute the approved plan.
```

Claude Code and Cursor can use `/product-interview`, `/master-plan`, and `/task-orchestrator`, or natural-language requests.

## Project-specific design

The toolkit does not give every product the same appearance. `design-research` gathers evidence, then `design-system-builder` writes a project-specific `DESIGN.md`. The Spark profile is intentionally isolated under `profiles/spark/`.

## Verification

```bash
npm run validate
npm test
```

## License and sources

The toolkit is MIT licensed. Adapted third-party material retains its upstream notice. See [skill sources](docs/SKILL_SOURCES.md).
