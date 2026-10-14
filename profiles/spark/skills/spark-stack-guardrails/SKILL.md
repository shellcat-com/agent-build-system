---
name: spark-stack-guardrails
description: Apply Spark's fixed SwiftUI, Convex, Clerk, and StoreKit architecture constraints when planning or changing services, data, authentication, or payments.
---

# Spark stack guardrails

Read the project `STACK.md` and existing architecture before proposing changes.

Use Convex for backend/database, Clerk for authentication, and StoreKit/App Store Connect for applicable iOS digital purchases. Preserve server-authoritative game state and seat-token authorization. Do not introduce Supabase, Neon, Stripe, Greploop, Greploop Apps, or another provider without an explicitly approved architecture migration.

Read `convex/_generated/ai/guidelines.md` before Convex code changes. Test in development first. Stop before production mutations, secrets, costs, or destructive actions.
