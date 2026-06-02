---
name: Precision Vitality
colors:
  surface: '#fcf8f8'
  surface-dim: '#ddd9d9'
  surface-bright: '#fcf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c8'
  surface-tint: '#5d5f5f'
  primary: '#5d5f5f'
  on-primary: '#ffffff'
  primary-container: '#ffffff'
  on-primary-container: '#747676'
  inverse-primary: '#c6c6c7'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#646464'
  tertiary: '#526600'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffffff'
  on-tertiary-container: '#677f00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#c7f300'
  tertiary-fixed-dim: '#aed500'
  on-tertiary-fixed: '#171e00'
  on-tertiary-fixed-variant: '#3d4d00'
  background: '#fcf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  neon-glow: rgba(209, 255, 0, 0.4)
  glass-fill: rgba(255, 255, 255, 0.7)
  glass-border: rgba(0, 0, 0, 0.05)
  subtle-gray: '#BCBCBC'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  metric-xl:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
  card-padding: 32px
---

## Brand & Style

The design system is engineered for a premium health-tracking experience that merges clinical precision with futuristic energy. The aesthetic is rooted in **Apple-level minimalism**, prioritizing high-contrast clarity, expansive whitespace, and a sophisticated "Glassmorphic" depth.

The brand personality is authoritative yet motivating—positioning health data not just as numbers, but as a luxury performance metric. The visual style utilizes a **Modern Minimalist** framework enhanced by **Glassmorphism** and **High-Contrast** accents. Every element should feel light, airy, and hyper-modern, evoking the feeling of a high-end medical laboratory combined with a premium lifestyle tech brand.

## Colors

The palette is strictly curated to drive focus toward health metrics. 
- **Primary White (#FFFFFF):** Used for the base canvas and high-clarity surfaces to maintain a clean, "clinical-chic" environment.
- **Secondary Black (#000000):** Reserved for sharp, high-legibility typography and primary iconography.
- **Tertiary Neon Green (#D1FF00):** The singular "Action" color. It is used for accents, progress indicators, and "active" states.

**Functional Application:**
Apply the Neon Green with a soft outer glow (`neon-glow`) to simulate a futuristic interface light. Neutral tones like `#BCBCBC` should be used sparingly for secondary labels and disabled states to ensure the interface remains high-contrast.

## Typography

This design system uses **Sora** for headlines and metrics to provide a geometric, futuristic feel that remains highly premium. **Inter** is utilized for body text and functional labels to ensure maximum readability and a systematic, clean appearance.

**Hierarchy Rules:**
- **Metrics:** Always use `metric-xl` for primary health data (e.g., heart rate, steps).
- **Captions:** Use `label-caps` for section headers above cards to create a clear structural rhythm.
- **Contrast:** Maintain high contrast by using pure Black text on White or Glass backgrounds. Use the Neon Green only for hyper-specific emphasis within text blocks.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for the main dashboard, centering content within a 1200px container to maintain an editorial, premium feel. 

- **Grid:** 12-column layout on desktop with a 24px gutter.
- **Rhythm:** Use an 8px base unit. Section gaps are generous (80px) to prevent the "cluttered" look common in health apps.
- **Responsiveness:** On mobile, margins shrink to 16px, and the 12-column grid collapses to a single column. Cards should span the full width of the container minus the margins.

## Elevation & Depth

Hierarchy is achieved through **Glassmorphism** and tonal layering rather than traditional heavy shadows.

- **Level 1 (Base):** Pure #FFFFFF background.
- **Level 2 (Cards):** `glass-fill` with a `backdrop-filter: blur(20px)`. These surfaces must have a thin 1px border using `glass-border`.
- **Shadows:** Use a singular, ultra-diffused "Ambient Shadow" for Level 2 elements: `0 20px 40px rgba(0, 0, 0, 0.03)`.
- **Interactions:** When a user interacts with a card, the `neon-glow` can be applied to the border or as a soft drop shadow to indicate focus.

## Shapes

The shape language is extremely soft and approachable, contrasting with the "sharp" technical data. 

- **Cards:** Use `rounded-xl` (1.5rem / 24px) or `rounded-2xl` (2rem / 32px) for large dashboard widgets.
- **Buttons & Chips:** Use a full pill-shape (circular ends) to reinforce the friendly, premium feel.
- **Inputs:** Maintain a consistent `rounded-lg` (1rem / 16px) for form fields to ensure they feel modern but distinct from circular action buttons.

## Components

### Buttons
- **Primary:** Black background, white text, pill-shaped. Hover state introduces a Neon Green border.
- **Ghost:** Transparent background, 1px black border, pill-shaped.
- **Action Icon:** Neon Green circle with a black icon, used for floating actions.

### Activity Rings & Charts
- **Activity Rings:** Use thick strokes (12px+) with rounded caps. The primary progress track is Neon Green, while the background track is a very faint version of the same hue (10% opacity).
- **Charts:** Line charts should be ultra-thin (1.5px) and black, with a soft Neon Green gradient fill (10% to 0% opacity) underneath the line.

### Inputs
- **Field:** White background with a 1px `subtle-gray` border.
- **Focus State:** Border transitions to Black, and a subtle 2px Neon Green "outer glow" shadow is applied to indicate activity.

### Cards
- **Health Widget:** Glassmorphic background, 32px padding, Sora-weight headlines. Every card must have a 1px subtle border to define its edges against the white background.
- **Stat Highlights:** Use the Neon Green color for the primary metric value within the card to draw immediate visual attention.