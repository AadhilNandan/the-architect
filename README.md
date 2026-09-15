# THE ARCHITECT

A cinematic, scroll-controlled superhero portal built for the **TechAscent Machine Test** (WhiteMatrix AI Innovation Centre).

> "I do not command reality. I understand it."

---

## Concept

**The Architect** is an ancient, mythological superhero whose core power — **Architect's Vision** — lets him perceive the hidden structure underlying reality. Every other ability (reality manipulation, energy constructs, spatial manipulation, superhuman physicality) flows from that one power.

The site tells his story as a **seven-scene scroll-controlled short film**, moving through:

1. **The Seal** — an interactive drawing ritual to enter
2. **The Fracture** — civilization collapses
3. **The Awakening** — he perceives the design beneath the ruin
4. **The Forging** — he understands and shapes power
5. **The Law** — his founding principle: *"Do not destroy what you cannot rebuild."*
6. **The Watcher** — centuries pass; he remains
7. **The Throne / Communion** — the visitor speaks with him directly

Scene 7 hosts the **Communion Slab**: a sequential, in-character conversational interface that collects a visitor's name, age, location, email, and grievance, then submits it as a petition.

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- Native scroll + CSS transforms/masks/opacity for the cinematic scenes (no Three.js/WebGL/GSAP)
- **Google Gemini** for dynamic in-character conversational replies, with graceful fallback to predefined Architect responses if the API is unavailable
- **Resend** for email delivery of submitted petitions
- Deployed on **Vercel**

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3001`.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key for sending petition emails |
| `CONTACT_EMAIL` | Yes | Address that receives submitted petitions |
| `RESEND_FROM_EMAIL` | No | Custom verified sender; defaults to `onboarding@resend.dev` |
| `GEMINI_API_KEY` | No | Enables dynamic Architect replies in Scene 7; falls back to static in-character responses if unset |
| `GEMINI_MODEL` | No | Defaults to `gemini-flash-latest` |

### Scripts

```bash
npm run dev             # local dev server
npm run build            # production build
npm run typecheck        # TypeScript check
npm run validate:assets  # verifies all 26 canonical scene images
```

## Project Structure

```
src/
  app/
    api/chat/       — Gemini-powered Architect dialogue endpoint
    api/contact/    — petition submission + Resend email dispatch
    page.tsx        — renders Scenes 01–07
  components/scenes/ — the 7 cinematic scene components
  interaction/       — seal-drawing gesture recognition
public/images/        — 26 canonical scene image plates
```

## Status

Built for submission to WhiteMatrix's TechAscent Machine Test — an original superhero, a cinematic responsive site, a conversational chatbot with structured data collection, automatic email notification, and public hosting.
