# Concurrency rules

- Maximum three active task agents.
- Unlimited queued tasks.
- A task starts only when all dependencies pass.
- Overlapping files, schemas, generated code, ports, simulators, deployments, and external accounts are shared-resource conflicts unless explicitly coordinated.
- Foundation and interface tasks finish before their consumers begin.
- The lead agent integrates. Task agents do not independently merge competing architecture.
- Failed or partial tasks return to the queue with a narrower repair packet or escalate a real decision.
