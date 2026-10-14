# Spark stack policy

Spark is a native SwiftUI iOS app. Convex is its backend and database. Clerk is its authentication provider. Applicable in-app digital purchases use StoreKit and App Store Connect.

Preserve the existing server-authoritative game engines, seat-token authorization, Convex schema and functions, Clerk JWT-template integration, and project-generated Convex guidance.

Do not introduce Supabase, Neon, Stripe, Greploop, Greploop Apps, another authentication provider, or a second source of truth. Discussing an alternative is allowed; integrating one requires a separately approved architecture change.

Before changing Convex code, read `convex/_generated/ai/guidelines.md`. Test backend work against development before production. Production deployments and dashboard mutations require an explicit checkpoint.

Never expose or record Clerk tokens, Convex secrets, seat credentials, customer data, or payment information.
