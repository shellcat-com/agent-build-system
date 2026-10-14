---
name: project-bootstrap
description: Inspect a project and safely install the Agent Build System, merge instruction files, select skills, create project stack/design guidance, and validate harness discovery.
---

# Project bootstrap

Inspect the repository, frameworks, tests, existing `AGENTS.md`/`CLAUDE.md`, skill directories, design guidance, and working-tree state. Ask only missing product or policy choices.

Run the installer in dry-run first. Select only relevant skills. Merge rather than replace existing instructions. Create a project `STACK.md` and, for UI products, use `design-research` and `design-system-builder` to create `DESIGN.md`. Record the installed source revision in `.agent-build-system.json`.

Do not install an MCP server, edit credentials, commit, push, deploy, or overwrite a conflict without explicit approval. Validate skill discovery in the project’s actual harnesses and show the final diff.

Read `references/bootstrap-flow.md` before installation.
