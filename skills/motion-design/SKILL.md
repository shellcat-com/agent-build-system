---
name: motion-design
description: Specify and review purposeful, interruptible, accessible interface animation, transitions, haptics, and reduced-motion alternatives before implementation.
---

# Motion design

Use motion to communicate causality, continuity, state, priority, or emotion. Do not animate merely because a property can move.

For every important motion, create a spec from the bundled template. Repeated actions should be quiet and fast. Emotional milestones may be richer, but must not delay the next action. Define interruption and retargeting so rapid input cannot leave incorrect state.

Prefer transforms and opacity over expensive layout animation when both express the same behavior. Pair haptics with meaningful state transitions, not decoration. Provide intentional Reduce Motion and, where relevant, Reduce Transparency alternatives.

Verify on the target platform for dropped frames, repeated triggers, clipping, gesture conflicts, cancellation, background/foreground changes, and accessibility settings.
