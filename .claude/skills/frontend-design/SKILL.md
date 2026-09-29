---
name: frontend-design
description: >-
  Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one.
  Helps with aesthetic direction, typography, curated color palettes, responsive layouts, and making
  choices that avoid generic AI templates and clichés.
---

# Frontend Design

Approach this as the design lead at an elite design studio known for giving every project a distinct, bespoke visual identity. Reject templated, generic, or cliché AI layouts ("AI slop") and make deliberate, opinionated choices about palette, typography, and composition that fit the specific subject matter.

## 1. Ground Your Designs in the Subject Matter

- **Context-Specific Aesthetic**: Before designing, identify the subject, audience, and mood. The vernacular and materials of the topic define the visual choices.
- **Real Content**: Build with realistic content, copy, and visual elements rather than generic lorem ipsum.
- **Aesthetic Stance**: Define a clear direction (e.g., editorial, vibrant cultural, retro-futuristic, minimal luxury, brutalist, or warm tactile) and commit to it across all components.

## 2. Typography & Hierarchy

- **Personality in Type**: Typography carries the soul of the page. Select intentional font pairings (e.g., a expressive display font paired with a clean, highly legible body font).
- **Avoid Default Font Stacks**: Don't default to generic system fonts unless strictly required. Use Google Fonts or modern web font pairings that enhance the theme.
- **Line Length & Rhythm**: Keep body text line lengths under 80 characters for readability. Set a consistent typographic scale and generous line-height for body content.
- **Avoid Typographic Clichés**:
  - Do not accent random single words with italics/colors unless they are interactive or vital keywords.
  - Avoid gratuitous all-caps labels or repetitive category badges above every headline.

## 3. Curated Color Palettes

- **Harmonious Tokens**: Build a cohesive palette using semantic design tokens (Primary, Secondary, Accent, Background, Surface, Border, Text).
- **Avoid AI Defaults**: Steer clear of generic purple/blue gradients or uncurated high-saturation primaries. Use tailored HSL/HEX values with intentional contrast ratios (WCAG AA/AAA).
- **Atmospheric Depth**: Use subtle background tints, ambient radial gradients, or subtle noise textures to give life to surfaces without visual clutter.

## 4. Layout, Spacing & Composition

- **Intentional Structure**: Structural devices (borders, dividers, outlines, cards) should organize information logically, not just decorate empty space.
- **Spacing Rhythm**: Use consistent spacing tokens (4px, 8px, 16px, 24px, 32px, 48px). Ensure generous breathing room between sections.
- **Mobile-First & Touch Targets**: Guarantee that all touch targets are at least 44x44px. Ensure fluid layouts that adapt gracefully from small mobile screens to ultra-wide displays.

## 5. Deliberate Micro-Interactions & Motion

- **Purposeful Motion**: Avoid animating every card on page load with generic fade-ups. Use one coordinated entrance or focal moment.
- **Action-Driven Feedback**: Motion should respond to user intent (hover, press, expand, select) with snappy, fluid easing curves (e.g., `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Accessibility**: Always respect `@media (prefers-reduced-motion: reduce)`.
