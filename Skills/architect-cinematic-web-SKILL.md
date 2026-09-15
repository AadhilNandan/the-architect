---
name: architect-cinematic-web
description: Project-specific architecture and art-direction rules for The Architect cinematic superhero portal. Use this skill whenever building, modifying, reviewing, debugging, or extending the website.
---

# THE ARCHITECT — CINEMATIC WEB PROJECT

## 1. PURPOSE

Build a premium cinematic superhero experience called **The Architect**.

This is NOT a conventional landing page.

The website should feel like:

> **an ancient myth unfolding through a modern interactive medium.**

The visitor should feel as though they are moving through a continuous cinematic world and eventually arriving before The Architect.

The experience combines:

- Ancient Roman monumental architecture
- Mythological atmosphere
- Cinematic storytelling
- Scroll-driven animation
- 2D / 2.5D composition
- Refined glassmorphism
- Antique gold detailing
- Dark architectural materials
- Conversational interaction
- Narrative progression

The website must feel intentional, restrained, mysterious, and premium.

Do not turn it into:

- a generic superhero website
- a SaaS dashboard
- a gaming UI
- a cyberpunk interface
- a futuristic sci-fi website
- a collection of unrelated animation effects
- a slideshow
- a conventional landing page

---

# 2. SINGLE SOURCE OF TRUTH

This file is the primary project-specific design and implementation authority.

When instructions conflict with:

- old implementation assumptions
- old Three.js/WebGL experiments
- generic animation patterns
- previous prototype architecture
- unnecessary visual effects

follow this file.

The project uses a **2D / 2.5D cinematic architecture**.

> [!IMPORTANT]
> **Deprecated Legacy Artifacts**: The directories and files `src/three/`, `src/components/CinematicViewer.tsx`, `src/components/ConversationInterface.tsx`, and the `three` npm package are deprecated legacy prototypes from an earlier 3D exploration. They are completely decoupled from `src/app/page.tsx` and must NOT be reactivated, imported, or used.

## NON-NEGOTIABLE

### DO NOT use:

- Three.js
- WebGL
- WebGPU
- 3D camera engines
- Three.js scenes
- Three.js meshes
- Three.js particle systems
- GLSL shaders
- 3D world-space positioning
- artificial 3D environments
- full-screen canvas-based cinematic rendering

The cinematic world is created using:

- HTML
- CSS
- React
- TypeScript
- JPEG cinematic plates
- CSS transforms
- CSS masks
- opacity
- scale
- translate
- clipping
- gradients
- blur
- subtle atmospheric overlays
- small SVG effects where useful

The supplied cinematic images are the primary world.

Do not recreate their architecture in CSS or 3D.

---

# 3. CORE EXPERIENCE MODEL

The entire website is **one continuous vertical document**.

It is NOT:

```text
Scene 01
↓
Scene 02
↓
Scene 03
↓
Scene 04
```
````

with each scene behaving like a separate page.

Instead, the browser document itself continuously scrolls through the entire experience.

Each cinematic scene has:

1. A tall scroll runway
2. A sticky 100vh viewport
3. Multiple cinematic plates
4. Scroll-driven interpolation
5. Narrative text
6. Atmospheric layers
7. A transition state

Conceptually:

```text
DOCUMENT
│
├── SCENE 01
│   └── Interactive Seal
│
├── SCENE 02
│   ├── Frame 01
│   ├── Frame 02
│   ├── Frame 03
│   └── Transition
│
├── SCENE 03
│   ├── Frame 01
│   ├── Frame 02
│   ├── Frame 03
│   └── Transition
│
├── SCENE 04
│   ├── Frame 01
│   ├── Frame 02
│   ├── Frame 03
│   └── Transition
│
├── SCENE 05
│   ├── Frame 01
│   ├── Frame 02
│   ├── Frame 03
│   └── Transition
│
├── SCENE 06
│   ├── Frame 01
│   ├── Frame 02
│   ├── Frame 03
│   └── Transition
│
└── SCENE 07
    ├── Frame 01
    ├── Frame 02
    ├── Frame 03
    └── Communion Slab
```

The user should be able to continuously scroll from the beginning to the end.

---

# 4. SCROLL ARCHITECTURE

## Native browser scrolling is mandatory.

Use the browser's normal document scroll.

Do not create a fake scroll engine.

Do not hijack the entire page with custom wheel handling.

Do not build a presentation-style chapter controller.

Do not manually move completed chapters upward.

Each scene may use:

```css
position: sticky;
top: 0;
height: 100vh;
```

inside a taller scene wrapper.

Example conceptual structure:

```tsx
<section className="scene">
  <div className="scene-runway">
    <div className="scene-viewport">...</div>
  </div>
</section>
```

The outer document scrolls normally.

The viewport remains sticky while the scene's internal animation progresses.

When the scene finishes:

- the sticky viewport naturally releases
- the document continues scrolling
- the next scene naturally enters the viewport

---

# 5. NO CHAPTER SLIDE-UP

This is one of the most important rules.

NEVER make a completed scene:

- slide upward
- translate upward
- shrink away
- get pushed away manually
- wipe to black
- behave like a presentation slide
- behave like a page transition

Do not implement:

```css
transform: translateY(-100%);
```

for the purpose of removing a completed cinematic chapter.

Do not create a chapter-level exit animation.

Do not create:

```text
FRAME 1
↓
FRAME 2
↓
FRAME 3
↓
TRANSITION
↓
WHOLE CHAPTER SLIDES UP
↓
NEXT CHAPTER
```

That is explicitly wrong.

The correct behavior is:

```text
FRAME 1
↓
FRAME 2
↓
FRAME 3
↓
TRANSITION STATE
↓
STICKY VIEWPORT RELEASES
↓
NORMAL DOCUMENT SCROLL
↓
NEXT SCENE ENTERS
```

The transition image is part of the current scene.

It is NOT a separate page transition.

---

# 6. CINEMATIC PLATE SYSTEM

Each major scene uses cinematic image plates.

The standard structure is:

```text
Frame 01
Frame 02
Frame 03
Transition
```

The plates are not treated as unrelated slides.

They are **keyframes of the same cinematic world**.

The implementation should interpolate between them.

---

# 7. FRAME INTERPOLATION

Do NOT simply do:

```text
Image 1
fade
Image 2
fade
Image 3
```

The visual movement must feel like a continuous camera and world transformation.

Use combinations of:

- scale
- translateX
- translateY
- opacity
- clipping
- masking
- atmospheric opacity
- subtle blur
- parallax
- foreground/background separation

For example:

```text
Frame 01
    ↓
camera slowly pushes forward
    ↓
architecture shifts
    ↓
atmosphere changes
    ↓
Frame 02 emerges
    ↓
camera continues
    ↓
character/environment state evolves
    ↓
Frame 03
```

The visitor should perceive one continuous cinematic event.

---

# 8. SCROLL PROGRESS

Each scene should derive a normalized progress value.

Conceptually:

```ts
progress = 0 → 1
```

Use this progress to control all scene animation.

Do not create independent timers for cinematic progression.

The user's scroll position is the primary timeline.

Conceptually:

```text
0.00 ─────────────── 0.30 ─────────────── 0.60 ─────────────── 0.80 ───── 1.00
Frame 01             Frame 02             Frame 03              Transition
```

The exact ranges may be tuned visually.

Do not unnecessarily synchronize animations with arbitrary durations.

---

# 9. TRANSITION PLATES

The project contains dedicated transition images.

Use:

```text
transition_02_03.jpeg
transition_03_04.jpeg
transition_04_05.jpeg
transition_05_06.jpeg
transition_06_07.jpeg
```

These are cinematic bridge states between scenes.

They should be integrated near the end of the current scene.

Conceptually:

```text
Frame 03
   ↓
visual state gradually evolves
   ↓
Transition plate
   ↓
sticky scene naturally releases
   ↓
next scene enters
```

The transition plate must NOT behave like:

- a full-screen wipe
- a separate slide
- a black curtain
- a page-turn
- a hard image replacement

The transition must preserve visual continuity.

---

# 10. SCENE 01

Scene 01 is special.

It is the entry sequence and interactive seal experience.

## Scene 01 must remain untouched unless explicitly requested.

Do not rewrite its architecture merely to match the later scenes.

Do not replace the seal interaction with a generic hero section.

Do not add the transition system to Scene 01.

Scene 01 establishes the mythic world.

Canonical opening interaction:

```text
DRAW THE SEAL.
```

Optional supporting instruction:

```text
HOLD & INSCRIBE TO BREAK THE BINDING
```

Scene 01 eventually transitions the visitor into the main cinematic journey.

---

# 11. CANONICAL STORY

The following story is locked.

Do not invent replacement narration.

Do not add unnecessary lore.

Do not add unrelated mythology.

Do not change the meaning.

---

## SCENE 01 — THE SEAL

Primary:

```text
DRAW THE SEAL.
```

Optional instruction:

```text
HOLD & INSCRIBE TO BREAK THE BINDING
```

---

## SCENE 02 — THE FRACTURE

Canonical narration:

```text
Men had learned to build empires.
But never their foundations.
```

Visual progression:

```text
ORDER
→
FRACTURE
→
RUIN
```

Assets:

```text
fracture_01_civilization.jpeg
fracture_02_breaking.jpeg
fracture_03_ruin.jpeg
transition_02_03.jpeg
```

Do not add the old lines:

```text
Before him...
Then the first fracture appeared.
Not in the earth.
In reality itself.
```

Those are not canonical.

---

## SCENE 03 — THE AWAKENING

Canonical narration:

```text
Where others saw ruin,
he saw the design.
```

Visual progression:

```text
RUIN
→
VISION
→
DESIGN
```

Assets:

```text
awakening_01_ruins.jpeg
awakening_02_vision.jpeg
awakening_03_design.jpeg
transition_03_04.jpeg
```

---

## SCENE 04 — THE FORGING

Canonical narration:

```text
He did not inherit power.
He understood it.
```

Visual progression:

```text
STONE
→
ENERGY
→
CONTROL
```

Assets:

```text
forging_01_stone.jpeg
forging_02_energy.jpeg
forging_03_architect.jpeg
transition_04_05.jpeg
```

Do not use old generic superhero copy such as:

```text
With the power to destroy worlds...
```

The Architect's power is based on understanding structure.

---

## SCENE 05 — THE LAW

Canonical statement:

```text
DO NOT DESTROY
WHAT YOU CANNOT REBUILD.
```

Visual progression:

```text
MONUMENT
→
PRESENCE
→
JUDGEMENT
```

Assets:

```text
law_01_monument.jpeg
law_02_standing.jpeg
law_03_judgement.jpeg
transition_05_06.jpeg
```

Do NOT add Latin subtitles.

Do NOT add invented philosophical statements.

The canonical statement is the focal point.

---

## SCENE 06 — THE WATCHER

Canonical narration:

```text
Names disappeared.
Thrones fell.
Cities returned to the earth.
But he remained.
```

Visual progression:

```text
EMPIRE
→
DECAY
→
WATCHER
```

Assets:

```text
watcher_01_empire.jpeg
watcher_02_decay.jpeg
watcher_03_watcher.jpeg
transition_06_07.jpeg
```

The destruction should feel like slow erosion through time.

Do not make the scene feel like an explosion or action sequence.

The Architect's defining visual quality here is permanence.

---

## SCENE 07 — THE ARCHITECT

Canonical dialogue:

```text
You have crossed the seal.
You have seen what lies beneath this world.
Now tell me...
What has fallen?
```

Visual progression:

```text
APPROACH
→
REVEAL
→
COMMUNION
```

Assets:

```text
throne_01_approach.jpeg
throne_02_reveal.jpeg
throne_03_communion.jpeg
```

Scene 07 ends with the conversational interface.

---

# 12. THE ARCHITECT — CHARACTER CONCEPT

The Architect is not a collection of borrowed superhero powers.

He has one coherent fundamental ability:

## ARCHITECT'S VISION

He perceives the hidden structure of reality.

Once he understands a system's structure, he can manipulate or rebuild it.

His strength is not merely physical.

His greatest advantage is:

> **understanding.**

The character should therefore feel:

- ancient
- intelligent
- controlled
- imposing
- strategic
- restrained
- almost mythological

He should not feel:

- goofy
- comic-book exaggerated
- futuristic
- cybernetic
- technologically dependent

---

# 13. POWER HIERARCHY

## CORE

```text
Architect's Vision
```

The ability to perceive hidden structures and understand how systems are constructed.

## PRIMARY

```text
Reality Manipulation
Energy Manipulation / Constructs
Spatial Manipulation / Portals
Probability Perception
```

## PHYSICAL

```text
Superhuman Strength
Superhuman Speed
Enhanced Reflexes
Flight
Durability
```

## COMBAT

```text
Enhanced Perception
Structural Analysis
Weakness Detection
Adaptive Combat
Strategic Analysis
```

## ULTIMATE

```text
Architect Mode — Total Adaptation
```

The Architect temporarily reaches an extreme state of understanding and adaptation.

The cost is severe mental and physical overload.

Do not visually represent these powers as unrelated effects.

They must all feel like manifestations of one underlying principle:

> **understanding structure.**

---

# 14. CHARACTER PHILOSOPHY

Canonical philosophical principles:

```text
I do not command reality.
I understand it.
```

```text
What is understood can be rebuilt.
```

```text
Do not destroy what you cannot rebuild.
```

The character should communicate intelligence and control rather than rage or spectacle.

---

# 15. VISUAL DIRECTION

## PRIMARY AESTHETIC

Ancient Roman monumental architecture × refined glassmorphism × supernatural mythology.

Think:

- monumental
- architectural
- mysterious
- ancient
- cinematic
- restrained
- luxurious
- atmospheric

---

# 16. COLOR PALETTE

Primary:

```text
Matte black
Near-black
Antique gold
Warm ivory
Smoke grey
```

Use gold carefully.

Gold should feel like:

- aged metal
- engraved ornament
- sacred material
- ancient illumination

Do NOT use:

- neon gold
- glowing cyberpunk gold
- blue/purple gradients
- RGB lighting
- futuristic holographic colors

---

# 17. MATERIAL LANGUAGE

Preferred materials:

```text
Black carved stone
Basalt
Dark marble
Aged bronze
Antique gold
Smoked glass
Dark metal
Subtle atmospheric haze
```

Interfaces should feel physically embedded in the environment rather than floating as generic cards.

---

# 18. TYPOGRAPHY

Use a consistent typographic system.

## DISPLAY / CINEMATIC

Preferred:

```text
Cormorant Garamond
```

Use for:

- cinematic narration
- major statements
- dialogue
- mythic headings

## UI

Preferred:

```text
Manrope
```

Use for:

- form labels
- metadata
- controls
- system text
- conversational interface
- small supporting text

Do not constantly switch fonts between scenes.

---

# 19. GEOMETRY

The design language is architectural.

Prefer:

- sharp corners
- thin borders
- rectangular frames
- engraved lines
- axial symmetry
- precise alignment
- monumental proportions

Avoid excessive:

- rounded cards
- pills
- bubbles
- playful shapes
- soft SaaS components

The interface should feel designed by an architect.

---

# 20. NEGATIVE SPACE

Large negative space is important.

Do not fill every area with:

- particles
- icons
- labels
- fake statistics
- decorative objects
- buttons
- cards

Silence is part of the design.

A large dark empty region can be more cinematic than another effect.

---

# 21. CINEMATIC IMAGE RULES

The generated JPEG plates are the primary cinematic world.

Do not unnecessarily recreate or duplicate objects already present in the plates.

For example, if a plate already contains:

- architecture
- throne
- pillars
- character
- ruins
- gold geometry
- environmental lighting

do not create another CSS/HTML version of the same object.

HTML should primarily provide:

- text
- interaction
- UI
- subtle overlays
- atmospheric effects

The JPEG plates provide the world.

---

# 22. CAMERA-LIKE MOTION WITHOUT A 3D ENGINE

Camera movement should be simulated using CSS.

Useful properties:

```css
transform: translate3d(...);
transform: scale(...);
opacity: ...;
filter: blur(...);
clip-path: ...;
mask-image: ...;
```

Although `translate3d()` may be used as a browser compositing optimization, this does NOT mean building a 3D scene.

Do not create:

- perspective worlds
- 3D meshes
- camera objects
- orbital cameras
- world coordinates

The effect should remain 2D/2.5D.

---

# 23. LAYERING

A scene can be conceptually divided into:

```text
BACKGROUND
↓
ARCHITECTURE
↓
ATMOSPHERE
↓
CHARACTER
↓
GEOMETRIC EFFECTS
↓
TEXT
↓
UI
```

However, do not artificially split everything if the cinematic plate already contains the composition.

Use separate layers only when they improve motion or interaction.

---

# 24. ATMOSPHERE

Atmosphere should be subtle.

Possible effects:

- smoke
- dust
- haze
- soft light
- faint particles
- shadow gradients
- vignette

The atmosphere must support the scene.

Never let it become:

- particle wallpaper
- glitter
- sci-fi energy fog
- distracting motion

---

# 25. GOLD GEOMETRY

Gold geometry represents the Architect's understanding of structure.

It can appear as:

- fragments
- lines
- diagrams
- geometric structures
- energy constructs
- architectural forms

It should feel related to:

```text
geometry
structure
construction
knowledge
reality
```

Do not scatter decorative gold geometry everywhere.

If a cinematic plate already contains enough geometry, reduce the overlay rather than adding more.

---

# 26. UI PHILOSOPHY

UI should be minimal.

The interface should not look like:

```text
Dashboard
Card
Card
Card
Metrics
Status
Navigation
```

Avoid unnecessary:

- fake telemetry
- fake coordinates
- fake system diagnostics
- fake statistics
- excessive metadata
- archive menus
- technical HUDs

Small metadata elements can be used when they support the narrative.

They should remain secondary.

---

# 27. COMMUNION SLAB

The final conversational interface is called the:

## COMMUNION SLAB

It is not a floating chatbot bubble.

It should feel embedded in the world.

Visual concept:

```text
dark smoked glass
+
black stone
+
thin antique-gold border
+
architectural geometry
```

It should be wide and horizontal.

Avoid:

- rounded chatbot bubbles
- generic chat widgets
- bright white cards
- oversized modern SaaS forms

The Communion Slab should feel like an ancient communication surface adapted into a modern interface.

---

# 28. CHATBOT FLOW

The visitor should encounter the conversational interface naturally.

The chatbot collects:

```text
Name
Age
Location
Email
```

Then asks for the visitor's actual request.

Canonical conversational progression:

```text
Who are you?
```

```text
How many years have you walked this world?
```

```text
Where do you stand?
```

```text
And where may I reach you?
```

Then:

```text
Now tell me... What has fallen?
```

The visitor describes their:

- problem
- grievance
- request
- issue
- situation

Then:

```text
So... tell me.
How can I help?
```

The exact conversational wording may be adapted for usability, but the tone must remain consistent with The Architect.

---

# 29. FORM DATA

The submission should capture:

```text
name
age
location
email
grievance
timestamp
```

The backend should receive the complete submission.

Do not expose private credentials in client-side code.

---

# 30. EMAIL SUBMISSION

The completed request should be submitted to the designated recipient through the backend.

The email should contain:

```text
Visitor Name
Age
Location
Email
Grievance / Request
Date
Time
```

The API should validate required fields.

Never put secret API keys in:

```text
client components
public files
browser JavaScript
environment-visible UI
```

Use server-side environment variables.

---

# 31. RESPONSIVE DESIGN

The experience must work on:

- desktop
- laptop
- tablet
- mobile

Do not simply scale the desktop composition down.

On smaller screens:

- preserve focal points
- preserve character visibility
- preserve readability
- simplify nonessential decoration
- adjust text positioning
- adjust image cropping
- preserve the cinematic hierarchy

The mobile experience should remain cinematic.

---

# 32. PERFORMANCE

Optimize without destroying the visual quality.

Prioritize:

- efficient image loading
- lazy loading where appropriate
- avoiding unnecessary DOM elements
- avoiding expensive continuous effects
- GPU-friendly CSS transforms
- avoiding large JavaScript animation loops
- avoiding unnecessary re-renders

Use:

```css
transform
opacity
```

for high-frequency visual animation where possible.

Do not introduce WebGL as a performance solution.

---

# 33. ACCESSIBILITY

The cinematic presentation must not prevent basic usability.

Ensure:

- readable text contrast
- keyboard accessibility
- visible focus states
- form labels
- usable controls
- appropriate semantic HTML
- reduced-motion consideration

Respect:

```css
prefers-reduced-motion
```

When reduced motion is enabled:

- reduce camera movement
- reduce parallax
- reduce atmospheric motion
- preserve narrative ordering
- preserve content and interaction

---

# 34. CODE ARCHITECTURE

Use:

```text
Next.js
React
TypeScript
CSS
```

Keep scene components modular.

Conceptual structure:

```text
src/
├── app/
│   ├── api/
│   │   └── contact/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
└── components/
    ├── Scene01...
    ├── Scene02...
    ├── Scene03...
    ├── Scene04...
    ├── Scene05...
    ├── Scene06...
    ├── Scene07...
    └── ...
```

Exact component naming may follow the existing project.

Do not restructure the entire application unnecessarily.

---

# 35. SCENE COMPONENT RESPONSIBILITY

Each scene component should own:

- its cinematic plates
- its scroll progress calculation
- its visual interpolation
- its narrative text
- its transition state
- its scene-specific atmospheric layers

Do not make every scene dependent on a giant global animation controller unless necessary.

Keep scene logic understandable.

---

# 36. SHARED COMPONENTS

Shared components may include:

```text
CinematicViewport
SceneProgress
CinematicText
Atmosphere
TransitionPlate
CommunionSlab
```

Use shared abstractions when they genuinely reduce duplication.

Do not over-engineer.

---

# 37. IMAGE PATHS

The main cinematic assets use:

```text
/public/images/
```

Expected scene assets:

## Scene 02

```text
fracture_01_civilization.jpeg
fracture_02_breaking.jpeg
fracture_03_ruin.jpeg
transition_02_03.jpeg
```

## Scene 03

```text
awakening_01_ruins.jpeg
awakening_02_vision.jpeg
awakening_03_design.jpeg
transition_03_04.jpeg
```

## Scene 04

```text
forging_01_stone.jpeg
forging_02_energy.jpeg
forging_03_architect.jpeg
transition_04_05.jpeg
```

## Scene 05

```text
law_01_monument.jpeg
law_02_standing.jpeg
law_03_judgement.jpeg
transition_05_06.jpeg
```

## Scene 06

```text
watcher_01_empire.jpeg
watcher_02_decay.jpeg
watcher_03_watcher.jpeg
transition_06_07.jpeg
```

## Scene 07

```text
throne_01_approach.jpeg
throne_02_reveal.jpeg
throne_03_communion.jpeg
```

Scene 01 has its own existing interactive assets.

Do not rename assets without a concrete reason.

---

# 38. SCENE 07 COMPOSITION

Scene 07 has a special requirement.

The lower portion of the final scene must remain sufficiently clean for the Communion Slab.

Do not place:

- huge character close-ups
- excessive gold geometry
- large UI elements
- bright flares

over the final conversation area.

The Architect should remain imposing without becoming an enormous foreground face that destroys the composition.

---

# 39. VISUAL CONTINUITY

When transitioning between images, preserve:

- camera position
- approximate lens perspective
- horizon
- architectural axis
- major landmarks
- lighting direction
- character placement
- environmental palette

A transition should feel like:

```text
same world
+
new state
```

not:

```text
new image
+
new world
```

---

# 40. DO NOT REGENERATE ASSETS UNNECESSARILY

The existing cinematic plates are intentionally selected.

If an image has a minor imperfection:

- compensate with opacity
- crop it
- mask it
- darken it
- layer atmosphere
- adjust scale
- adjust position

before deciding to regenerate it.

Do not repeatedly regenerate locked cinematic plates unless the user explicitly asks.

---

# 41. TEXT PLACEMENT

Narrative text should feel like part of the cinematic composition.

Prefer:

- large negative space
- centered or carefully offset typography
- restrained tracking
- slow opacity changes
- subtle vertical movement

Avoid:

- text blocks covering the character
- excessive captions
- subtitles everywhere
- UI-heavy text
- bouncing typography
- kinetic typography for its own sake

The story should breathe.

---

# 42. ANIMATION PHILOSOPHY

Every animation must have a reason.

Good:

```text
camera push
character reveal
architectural transformation
atmospheric drift
gold geometry forming
text emerging
transition into next world
```

Bad:

```text
random floating
random scaling
random spinning
random particles
random glow
random blur
```

Do not animate something merely because it can be animated.

---

# 43. TIMING

Animation timing should feel:

- slow
- deliberate
- monumental
- controlled

Avoid:

- fast UI easing
- elastic effects
- bounce animations
- playful spring physics
- excessive overshoot

The Architect should feel powerful because he moves with control.

---

# 44. EASING

Prefer restrained easing.

Suitable conceptual behavior:

```text
ease-out
smooth interpolation
slow cinematic interpolation
```

Avoid:

```text
bounce
elastic
rubber-band
cartoon spring
```

---

# 45. LOADING

The initial loading experience should not reveal a blank technical application.

If a loader is necessary, it should fit the mythology.

Prefer:

- subtle seal
- thin gold line
- restrained typography
- dark background

Avoid:

- progress dashboards
- percentage counters
- futuristic loaders
- spinning neon circles

---

# 46. NAVIGATION

The website does not need a conventional navigation bar dominating the experience.

Navigation should not destroy immersion.

If navigation is included, keep it:

- minimal
- architectural
- subtle
- secondary

Do not turn the website into a conventional multi-page corporate layout.

---

# 47. DECORATIVE ASSETS

Use decorative assets sparingly.

Do not add floating objects simply to make the screen look busy.

Before adding any decorative layer, ask:

> Does this improve the story, depth, or atmosphere?

If not, remove it.

The cinematic plates already contain much of the visual complexity.

---

# 48. FAKE TELEMETRY

Avoid excessive fake technical UI.

Do not fill the screen with things like:

```text
SYSTEM STATUS
LATITUDE
LONGITUDE
POWER LEVEL
ENERGY
ARCHIVE ID
THREAT LEVEL
STRUCTURAL INTEGRITY
```

unless a specific element has a narrative purpose.

The Architect is not a spaceship dashboard.

---

# 49. ERROR STATES

Errors should use the same visual language.

Avoid generic bright browser-like error messages.

Use:

- dark surfaces
- restrained typography
- antique-gold accents
- clear language

However, usability always takes priority over aesthetic purity.

---

# 50. FORM VALIDATION

Validate:

```text
Name
Age
Location
Email
Grievance
```

Provide clear errors.

Do not rely exclusively on placeholder text.

The form should remain understandable even without animation.

---

# 51. SECURITY

Never commit:

```text
API keys
private tokens
email credentials
secret environment values
```

Do not expose:

```text
RESEND_API_KEY
```

or equivalent secrets in frontend code.

---

# 52. DEBUGGING

When debugging visual problems, first determine whether the problem is:

```text
1. Asset
2. Scroll progress
3. CSS transform
4. Opacity interpolation
5. Sticky positioning
6. Container height
7. Z-index
8. Responsive crop
9. Text placement
10. Browser overflow
```

Do not immediately rewrite the architecture.

Preserve working scene behavior.

---

# 53. WHEN MODIFYING A SCENE

Before changing a scene:

1. Inspect the current implementation.
2. Identify the existing scroll-progress calculation.
3. Identify the sticky viewport.
4. Identify the plate order.
5. Identify text timing.
6. Identify transition timing.
7. Change only what is necessary.
8. Preserve the working Frame 01 → Frame 02 → Frame 03 motion.

Do not replace a functioning scene with a generic implementation.

---

# 54. CONTINUOUS-SCROLL CHECKLIST

Every scene after Scene 01 must satisfy:

```text
[ ] Normal document scrolling
[ ] Sticky 100vh cinematic viewport
[ ] Tall scene runway
[ ] Frame 01 → Frame 02 → Frame 03 progression
[ ] Transition plate near scene end
[ ] No chapter slide-up
[ ] No translateY exit
[ ] No black wipe
[ ] No page-turn
[ ] No hard scene replacement
[ ] Sticky viewport naturally releases
[ ] Next scene enters through normal document flow
```

---

# 55. FULL-PAGE TEST

Do not test scenes only in isolation.

Always test:

```text
Scene 01
↓
Scene 02
↓
Scene 03
↓
Scene 04
↓
Scene 05
↓
Scene 06
↓
Scene 07
```

Verify:

- no jumps
- no blank gaps
- no black curtain
- no artificial chapter movement
- no unexpected horizontal overflow
- no broken sticky positioning
- no sudden image replacement
- no duplicated assets
- no accidental overlapping scenes
- no scroll locking
- no scroll hijacking

The website should feel like one continuous film.

---

# 56. BUILD VALIDATION

After meaningful implementation changes, run:

```bash
npm run typecheck
```

and:

```bash
npm run build
```

Fix actual errors before considering the implementation complete.

Do not introduce a dependency merely to solve a small visual problem.

---

# 57. VISUAL QA

After implementation, inspect the website at:

```text
Desktop
Laptop
Tablet
Mobile
```

Check:

- image cropping
- character visibility
- text readability
- transition continuity
- sticky behavior
- scene boundaries
- Communion Slab positioning
- overall pacing

The most important test is the full scroll from top to bottom.

---

# 58. PERFORMANCE QA

Check for:

```text
Unnecessary re-renders
Expensive scroll listeners
Unnecessary DOM layers
Huge duplicated images
Uncontrolled animation loops
Layout thrashing
```

Prefer:

```text
requestAnimationFrame
passive scroll listeners
CSS transforms
opacity
memoization where useful
```

Do not optimize prematurely by replacing the architecture with WebGL.

---

# 59. DESIGN HIERARCHY

The visual hierarchy should generally be:

```text
WORLD
↓
ARCHITECT
↓
STORY
↓
ATMOSPHERE
↓
INTERACTION
↓
METADATA
```

Never let technical UI dominate the character or story.

---

# 60. THE ARCHITECT MUST FEEL UNIQUE

Do not make The Architect visually resemble:

- Superman
- Batman
- Iron Man
- Doctor Strange
- generic fantasy wizards
- generic sci-fi superheroes

His identity comes from:

```text
architecture
+
understanding
+
reality structure
+
ancient permanence
+
controlled power
```

His power should feel intellectual and structural rather than merely destructive.

---

# 61. CORE THEMATIC IDEA

Everything should reinforce one central idea:

> **Reality is a structure. The Architect understands its design.**

His power is not:

> "I am stronger than everyone."

It is:

> "I understand what everything is made of."

This distinction must remain visible throughout the website.

---

# 62. FINAL EXPERIENCE

The complete experience should progress emotionally as:

```text
MYSTERY
↓
DISCOVERY
↓
FRACTURE
↓
UNDERSTANDING
↓
POWER
↓
LAW
↓
PERMANENCE
↓
ENCOUNTER
↓
COMMUNION
```

The visitor should feel that they earned the right to speak to The Architect.

---

# 63. ABSOLUTE NON-NEGOTIABLES

These rules override convenience.

### 1.

**No Three.js.**

### 2.

**No WebGL cinematic world.**

### 3.

**No 3D camera/world engine.**

### 4.

**Use native browser scrolling.**

### 5.

**Use sticky cinematic viewports.**

### 6.

**The entire website is one continuous document.**

### 7.

**Frame 01 → Frame 02 → Frame 03 must remain scroll-driven.**

### 8.

**Transition images are cinematic bridge states, not page transitions.**

### 9.

**Never slide an entire completed chapter upward.**

### 10.

**Never manually translate a completed scene out of the viewport.**

### 11.

**Never use a black wipe to hide a scene transition.**

### 12.

**Never turn the experience into a slideshow.**

### 13.

**Do not add unnecessary floating decorative assets.**

### 14.

**Do not add dashboard-style telemetry without narrative purpose.**

### 15.

**Do not invent story text when canonical copy exists.**

### 16.

**Scene 01 remains untouched unless explicitly requested.**

### 17.

**Scene 07 must end with the Communion Slab.**

### 18.

**The cinematic JPEG plates are the primary visual world.**

### 19.

**Do not recreate objects already contained in the cinematic plates unless a separate layer is genuinely required.**

### 20.

**The experience must feel like one continuous cinematic film controlled by scrolling.**

---

# 64. FINAL IMPLEMENTATION PRINCIPLE

When making any decision, use this question:

> **Does this make the website feel more like one continuous ancient cinematic world, or more like a collection of web sections?**

If it makes the experience feel like separate web sections, do not do it.

The Architect is not a slideshow.

The Architect is not a dashboard.

The Architect is not a 3D game.

The Architect is not a conventional landing page.

It is:

> **a continuous cinematic journey through an ancient world, ending in a direct conversation with the one who understands its design.**
