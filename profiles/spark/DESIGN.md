# Spark design system

## Product feeling

Spark should feel intimate, playful, warm, tactile, and emotionally attentive. It is a date-night product, not a generic productivity interface. The experience is dark by design, but content hierarchy and contrast must remain clear.

## Principles

1. The couple is the subject. Photos, names, shared answers, and memories outrank decoration.
2. Repeated game actions are calm and fast. Save richer celebration for reveals, matches, milestones, and recaps.
3. Motion explains whose turn it is, what changed, and where content came from.
4. Warmth comes from language, imagery, timing, and tactile response, not from placing hearts everywhere.
5. Reuse the project’s `DesignSystem/` components and tokens before adding new ones.

## Color and materials

Use the existing `SparkMood`, gradients, semantic foreground roles, and dark canvases as the source of truth. New colors need a named semantic role and contrast verification. Avoid unrelated gradient families, low-contrast translucent text, and decorative borders on every card.

## Typography and spacing

Use `SparkFonts` and the established hierarchy. Limit a screen to a small number of type roles. Use a consistent 4/8-based spacing rhythm and preserve comfortable touch targets. Text must survive Dynamic Type without hiding the primary action.

## Components

Prefer existing gradient backgrounds, game icons, loaders, cards, conductor treatments, and animated text. A new reusable pattern belongs in `DesignSystem/`; a feature-specific composition stays with its feature.

Every interactive component needs default, pressed, disabled, loading, error, and success behavior where applicable.

## Motion and haptics

- Routine tap feedback: immediate and quiet.
- Turn or ownership change: directional continuity.
- Reveal: anticipation followed by a clear shared result.
- Match or milestone: brief celebratory emphasis.
- Recap: reflective, slower than gameplay, but never blocks navigation.
- Haptics confirm meaningful state changes and must not fire repeatedly from view recomputation.

With Reduce Motion, replace large travel, parallax, repeated scale, and spatial transitions with short fades, crossfades, or immediate state changes. Meaning must not depend on motion.

## Accessibility

Support VoiceOver order and labels, Dynamic Type, sufficient contrast, non-color state cues, Reduce Motion, and comfortable targets. Decorative images are hidden from accessibility. Game choices and results expose state and ownership in words.

## Do

- Use real couple content when available.
- Make the next action obvious.
- Give errors a recovery path.
- Keep playful copy concise.
- Verify animations on Simulator or device.

## Do not

- Add constant floating decoration.
- Bounce every control.
- delay routine actions for animation.
- Copy a Mobbin or brand reference screen.
- Create a second visual system for one feature.
- Hide important meaning in color, haptics, or motion alone.
