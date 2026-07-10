---
name: Acoustic Gallery
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c6'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636465'
  inverse-primary: '#5d5f5f'
  secondary: '#e0c29f'
  on-secondary: '#3f2d14'
  secondary-container: '#5a452b'
  on-secondary-container: '#d1b492'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e3e2e2'
  on-tertiary-container: '#646464'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#fdddb9'
  secondary-fixed-dim: '#e0c29f'
  on-secondary-fixed: '#281803'
  on-secondary-fixed-variant: '#584329'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 84px
    fontWeight: '800'
    lineHeight: 92px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Syne
    fontSize: 42px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  margin-safe: 5vw
  gutter-grid: 2rem
  stack-xl: 10rem
  stack-lg: 6rem
  stack-md: 3rem
  stack-sm: 1.5rem
---

## Brand & Style
The design system embodies a fusion of a high-end recording studio and a contemporary art gallery. The brand personality is prestigious, serene, and uncompromisingly precise. It targets an audience that values craftsmanship, acoustic excellence, and curated aesthetics.

The visual direction utilizes a "Cinematic Minimalist" approach. It draws heavily from **Glassmorphism** for its interface layers, simulating high-quality studio equipment displays. The overall aesthetic is "Tactile Digital"—elements should feel like physical objects resting on a matte surface, utilizing deep blacks, metallic textures, and organic wood accents to ground the futuristic interface in a physical reality.

## Colors
The palette is rooted in a deep, matte "Studio Black" to provide an infinite sense of depth. 

- **Primary (Brushed Aluminum):** A cool, low-saturation grey used for active states and critical interface boundaries.
- **Secondary (Walnut):** A warm, organic brown used sparingly for high-impact accents, hover states, or "organic" interactive elements to break the digital coldness.
- **Tertiary (Muted Metal):** A mid-tone grey for secondary information and borders.
- **Background (Matte Black):** The canvas for the entire system, utilizing a #0A0A0A hex to allow for rich shadow depth.
- **Ambient Light:** Warm, low-opacity glows (#FFD1A0 at 5-10% opacity) should be used as background blurs to simulate soft studio lighting hitting a surface.

## Typography
Typography is treated as an architectural element. **Syne** provides an avant-garde, "Art Gallery" feel for large-scale headlines, while **Inter** ensures "Studio Precision" for body copy and descriptions. 

For technical data, timestamps, or equipment specs, **JetBrains Mono** is utilized to reinforce the recording studio theme. All type should be rendered in "Soft White" (#F5F5F5) or "Muted Aluminum" to avoid harsh contrast against the dark background. Large display type should use tight kerning for a cinematic, editorial look.

## Layout & Spacing
The layout follows a **Fluid Grid** philosophy with generous, gallery-like "Safe Zones." 

- **Desktop:** A 12-column grid with a 5vw (viewport width) side margin. This ensures the content feels expansive regardless of screen size.
- **Vertical Rhythm:** Large sections are separated by significant "Stack" spacing to allow the eye to rest, mimicking the walk between exhibits in a gallery.
- **Micro-interactions:** Spacing between labels and their related inputs or buttons should be tight (stack-sm) to imply a mechanical relationship, like knobs on a console.

## Elevation & Depth
Depth is the cornerstone of this design system. It is achieved through three distinct techniques:

1.  **Glassmorphism:** Overlays use a background blur (20px to 40px) with a semi-transparent dark fill (rgba(10, 10, 10, 0.7)). A 1px "Brushed Aluminum" border at low opacity (20%) defines the edges of the glass.
2.  **Ambient Shadows:** Elements don't cast black shadows; they cast "Light Occlusion" shadows. Use large, soft blurs (60px+) with very low opacity to simulate objects sitting on a matte surface.
3.  **Backlighting:** Important containers should have a subtle, warm-tinted inner glow or a very soft outer glow to simulate the "Warm Lighting" of a studio.

## Shapes
The shape language is "Precision Softened." We use small, intentional radii that suggest high-end machining rather than consumer-grade plastic. 

- **Containers:** Use `0.25rem` (Soft) for cards and modules.
- **Interactive Elements:** Buttons and inputs follow the same subtle rounding to maintain a professional, architectural feel.
- **Dividers:** Horizontal and vertical lines should be thin (1px) and use a gradient that fades out at the ends to appear like wires or thin metallic strings.

## Components
- **Buttons:** Primary buttons should resemble aluminum toggles. High-contrast (Light Grey text on Matte Black) with a 1px solid Aluminum border. On hover, the border transitions to the Walnut wood color.
- **Glass Chips:** Categorical tags should be semi-transparent "Glass" with a soft blur, using the mono font for a technical look.
- **Cards:** Portfolio pieces are housed in "Gallery Frames"—large images with significant padding, where the description only appears on a soft-blur overlay or subtle vertical slide-in.
- **Input Fields:** Minimalist lines. Only a bottom border (1px Aluminum). When active, a subtle warm glow appears beneath the line.
- **Audio Visualizers:** Integrated as decorative but functional components, using thin vertical bars that react to interaction, styled in the secondary Walnut color.
- **Cursors:** A custom "Studio Range" cursor—a small dot surrounded by a larger, thin circular stroke that expands when hovering over interactive elements.