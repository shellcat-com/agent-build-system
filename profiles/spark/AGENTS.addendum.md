# Spark agent workflow

Use the Agent Build System for substantial features: `product-interview` → `master-plan` → `task-orchestrator` → `evidence-verification` → `refine-result`.

Read `STACK.md` before architecture or service work and `DESIGN.md` before UI work. Run no more than three independent agents concurrently. The lead agent owns shared architecture and integration.

For app implementation, apply `spark-engineering-quality`. Use specialized SwiftUI accessibility, performance, testing, and Simulator skills when available. Use the existing Convex skills for schema, components, migrations, and performance. Preserve Clerk's current Convex JWT integration.

Use plain technical English. Explain what changed, why, and how it was verified. Never claim completion from a task agent’s summary alone.
