---
name: spark-engineering-quality
description: Build or review Spark features across SwiftUI, Convex, Clerk, accessibility, performance, testing, and Simulator verification using the app's established architecture.
---

# Spark engineering quality

Read `STACK.md`, `DESIGN.md`, repository instructions, and the relevant feature code before changing the app.

## SwiftUI

- Reuse the existing design system and environment-object ownership in `MainShell`.
- Keep one clear owner for mutable state and stable identity for collections/navigation.
- Handle loading, empty, error, offline/reconnecting, permission, disabled, and success states.
- Verify Dynamic Type, VoiceOver order/labels, contrast, target sizes, and Reduce Motion.
- Check async cancellation, rapid taps, repeated presentation, and navigation dismissal.
- Use specialized SwiftUI UI-pattern, accessibility, performance, testing, and Simulator skills when they are available.

## Convex

- Read `convex/_generated/ai/guidelines.md` first.
- Keep game state, authorization, scoring, timing, and answer redaction server-authoritative.
- Keep high-churn writes in dedicated tables rather than patching session documents.
- Preserve graceful AI fallbacks and budget gates.
- Use the project Convex skills for schema/component/migration/performance work.

## Clerk and identity

- Preserve `SparkClerkAuthProvider`, the `convex` JWT template, issuer/JWKS validation, and the absence of a strict audience check for the current iOS token.
- Preserve seat-token authorization in addition to Clerk identity.
- Never log tokens or credentials. Test loading, signed-out, signed-in, expired-session, and backend-auth failure states.

## Verification

Run the smallest relevant checks during implementation and the full relevant gate before completion: Swift/TypeScript tests, `xcodebuild`, Convex checks, and Simulator smoke tests. Use `evidence-verification` for the critical journey. Report anything not run as untested.
