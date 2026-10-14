---
name: evidence-verification
description: Verify completed work with builds, tests, runtime checks, screenshots, recordings, measurements, and explicit pass/fail/partial/untested results.
---

# Evidence verification

Derive testable statements from the approved acceptance criteria. Choose evidence appropriate to the change:

- UI: build, runtime interaction, screenshots, recording, accessibility, reduced effects, and before/after comparison.
- Backend/API: type checks, tests, development probes, authorization failures, retry behavior, and redacted outputs.
- Bug fix: capture the failure before the fix and the passing behavior after it.
- Performance: measured before/after values under a stated environment.
- Agent workflow: trace or artifact showing the required tools, outputs, and stopping conditions.

Store temporary evidence in `.artifacts/<feature>/<task>/`. Never record secrets, tokens, personal data, payment details, or unrelated windows.

Mark every criterion `passed`, `failed`, `partially verified`, or `untested` with a reason. Evidence complements builds and tests; it does not replace them. Inspect evidence before citing it.

Use the bundled report template. State the exact revision and environment tested.
