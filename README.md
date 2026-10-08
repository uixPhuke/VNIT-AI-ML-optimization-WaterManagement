# VNIT × AI Workshop
### Application of AI, ML and Optimization in Water Management

> A modern, editorial-style workshop platform focused on the intersection of artificial intelligence, machine learning, optimization, sensing, predictive modelling, and water management.

---

## 01 — Overview

**VNIT × AI Workshop** is a responsive academic workshop website created for:

**APPLICATION OF AI, ML AND OPTIMIZATION IN WATER MANAGEMENT**

The website is designed to communicate the workshop clearly while maintaining a premium, technology-focused visual identity.

The experience combines:

- Editorial typography
- Dark academic visual language
- Blue technology accents
- Responsive layouts
- Motion-driven interactions
- Structured workshop information
- Speaker and organizer presentation
- Registration-focused calls to action

---

## 02 — Design Direction

The interface follows a **minimal editorial + advanced technology** aesthetic rather than a conventional academic-event template.

### Visual Language

| Element | Direction |
|---|---|
| Background | Deep black / near-black |
| Primary accent | Electric blue |
| Primary text | Soft white |
| Secondary text | Muted grey |
| Typography | Bold grotesk + italic editorial serif |
| Borders | Thin, low-contrast |
| Motion | Subtle and purposeful |
| Cards | Dark, structured, minimal |
| Layout | Editorial asymmetric grid |
| Responsive | Mobile-first |

### Hero Typography

The primary hero composition follows this structure:

```text
Application Of

AI / ML

& Optimisation

IN WATER MANAGEMENT
```

The combination of bold and italic typography creates a strong visual hierarchy while keeping the event title immediately recognizable.

---

# 03 — Features

### Editorial Hero

A large typographic hero section introduces the workshop with:

- Event title
- Workshop description
- Primary CTA
- Animated entrance
- Supporting visual
- Responsive typography

The **Explore Workshop** CTA smoothly scrolls to the workshop overview.

### Workshop Overview

Introduces the purpose and relevance of the workshop.

### Workshop Details

Presents important event information such as:

- Date
- Venue
- Mode
- Duration
- Event format

### Key Topics

Highlights the technical subjects covered during the workshop.

Example areas include:

- Artificial Intelligence
- Machine Learning
- Optimization
- Smart Water Systems
- Predictive Modelling
- Sensor Data
- Water Resource Management

### Speakers

Dedicated speaker presentation with:

- Speaker image
- Name
- Designation
- Institution
- Professional context

### Audience

Communicates who should attend the workshop.

### Registration

Provides the primary registration area and CTA.

### Application Process

Explains the participation process step-by-step.

### Important Notes

Highlights important requirements, instructions, and participation information.

### Organizers

Presents the institutions and partner organizations supporting the workshop.

### Contact

Provides relevant contact details for participants.

---

# 04 — Project Architecture

```text
VNIT-ML-optimization-WaterManagement/
│
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   │
│   ├── hero/
│   │   ├── floating-data.tsx
│   │   ├── hero-section.tsx
│   │   └── hero-visual.tsx
│   │
│   ├── icons/
│   │   └── water-icon.tsx
│   │
│   ├── layout/
│   │   ├── footer.tsx
│   │   ├── mobile-menu.tsx
│   │   └── navbar.tsx
│   │
│   ├── sections/
│   │   ├── application-process.tsx
│   │   ├── audience.tsx
│   │   ├── contact.tsx
│   │   ├── important-notes.tsx
│   │   ├── key-topics.tsx
│   │   ├── organizers.tsx
│   │   ├── registration.tsx
│   │   ├── speakers.tsx
│   │   ├── workshop-details.tsx
│   │   └── workshop-overview.tsx
│   │
│   └── ui/
│       ├── animated-line.tsx
│       ├── button.tsx
│       ├── magnetic-button.tsx
│       ├── number-counter.tsx
│       ├── reveal.tsx
│       └── section-heading.tsx
│
├── lib/
│   ├── event-data.ts
│   ├── navigation.ts
│   └── utils.ts
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   │   └── water-ai-hero.webp
│   │   ├── partners/
│   │   │   ├── iit-roorkee.webp
│   │   │   ├── rvce.webp
│   │   │   ├── victoria-university.webp
│   │   │   └── vnit.webp
│   │   └── speakers/
│   │       ├── ashoka-sharma.webp
│   │       ├── jyoti-shetty.webp
│   │       ├── pramod-kumar-sharma.webp
│   │       ├── rajesh-gupta.webp
│   │       └── shilpa-dongre.webp
│   ├── logo.svg
│   └── og-image.jpg
│
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

# 05 — Technology Stack

### Frontend

**Next.js**

The project uses the Next.js App Router for page structure, routing, metadata, and application rendering.

**React**

Used to build reusable interface components and interactive sections.

**TypeScript**

Provides type safety across components and event data.

### Styling

**Tailwind CSS**

Used for responsive layouts, typography, spacing, borders, colors, and component styling.

### Motion

**Framer Motion**

Used for:

- Hero entrance animation
- Section reveals
- Floating UI
- Interactive transitions
- Micro-interactions

### Icons

**Lucide React**

Used selectively for interface icons and navigation actions.

---

# 06 — Installation

## Requirements

Make sure the following are installed:

```text
Node.js
npm
Git
```

Recommended modern Node.js version:

```bash
node -v
npm -v
```

---

## Install the project

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Enter the project:

```bash
cd VNIT-ML-optimization-WaterManagement
```

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 07 — Development Commands

### Start development server

```bash
npm run dev
```

### Build production application

```bash
npm run build
```

### Start production server

```bash
npm start
```

### Run linting

```bash
npm run lint
```

---

# 08 — Next.js Command Resolution

If the terminal shows:

```text
sh: next: command not found
```

while the Next.js package is installed, run:

```bash
./node_modules/.bin/next dev
```

You can verify the installation with:

```bash
npm list next
```

and:

```bash
node node_modules/next/dist/bin/next --version
```

---

# 09 — Content Management

Workshop information is centralized in:

```text
lib/event-data.ts
```

This file should be the primary place for updating:

- Workshop title
- Description
- Date
- Venue
- Registration details
- Speakers
- Topics
- Audience
- Organizers
- Contact information

Navigation items are stored in:

```text
lib/navigation.ts
```

This keeps content separate from presentation components.

---

# 10 — Components

## Hero

```text
components/hero/
```

Contains the main landing-page visual experience.

### `hero-section.tsx`

Controls:

- Hero layout
- Event typography
- Description
- CTA
- Responsive behavior
- Scroll interaction

### `hero-visual.tsx`

Contains the main visual element on the right side of the hero.

### `floating-data.tsx`

Contains optional floating information cards and animated data elements.

---

## Layout

```text
components/layout/
```

### Navbar

Desktop navigation and event branding.

### Mobile Menu

Mobile navigation drawer/menu.

### Footer

Final navigation, institutional information, and contact presentation.

---

## Sections

```text
components/sections/
```

Contains the main workshop content sections.

Each section is intentionally separated to make the website easier to maintain and extend.

---

## UI

```text
components/ui/
```

Reusable visual primitives such as:

- Buttons
- Section headings
- Reveal animations
- Counters
- Animated lines
- Magnetic interactions

---

# 11 — Responsive Behaviour

The website is designed across multiple breakpoints.

### Mobile

The layout becomes vertically stacked.

The hero typography scales down while remaining visually dominant.

The navigation changes into a mobile menu.

The right-side hero visual moves below the main content.

### Tablet

Typography and spacing scale between mobile and desktop.

The two-column composition begins to become more prominent.

### Desktop

The full editorial composition is displayed:

```text
┌───────────────────────────────┬─────────────────────────┐
│                               │                         │
│  Editorial Event Typography   │                         │
│                               │      Hero Visual        │
│  AI / ML                      │                         │
│  & Optimisation               │                         │
│  IN WATER MANAGEMENT          │                         │
│                               │                         │
│  Description                  │                         │
│  Explore Workshop             │                         │
│                               │                         │
└───────────────────────────────┴─────────────────────────┘
```

---

# 12 — Animation Principles

Animations should remain:

- Smooth
- Fast enough to feel responsive
- Subtle
- Purposeful
- Non-distracting

Framer Motion is primarily used for entrance and micro-interaction effects rather than excessive continuous animation.

---

# 13 — Asset Guidelines

### Hero assets

Place hero visuals inside:

```text
public/images/hero/
```

### Speaker images

Place speaker photographs inside:

```text
public/images/speakers/
```

### Partner logos

Place institutional logos inside:

```text
public/images/partners/
```

### General branding

```text
public/logo.svg
public/og-image.jpg
```

---

# 14 — Git Workflow

Initialize Git:

```bash
git init
```

Set the primary branch:

```bash
git branch -M main
```

Check the repository:

```bash
git status
```

Stage files:

```bash
git add .
```

Create the first commit:

```bash
git commit -m "Initial commit"
```

Add GitHub remote:

```bash
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
```

Verify the remote:

```bash
git remote -v
```

Push:

```bash
git push -u origin main
```

For future updates:

```bash
git add .
git commit -m "Update workshop website"
git push
```

---

# 15 — Git Ignore

The repository should never include generated or sensitive files such as:

```text
node_modules/
.next/
.env
.env.local
```

Always verify before pushing:

```bash
git status
```

---

# 16 — Recommended Development Workflow

A clean workflow for future changes:

```text
1. Update event-data.ts
        ↓
2. Update component
        ↓
3. Run development server
        ↓
4. Test desktop
        ↓
5. Test mobile
        ↓
6. Run build
        ↓
7. Review git diff
        ↓
8. Commit
        ↓
9. Push to GitHub
```

---

# 17 — Design Principles

This project intentionally avoids generic template aesthetics.

### Avoid

- Excessive gradients
- Neon effects
- Excessive rounded cards
- Heavy shadows
- Overuse of glassmorphism
- Unnecessary icons
- Dense information blocks
- Generic dashboard-style layouts

### Prefer

- Strong typography
- Clear hierarchy
- Generous spacing
- Restrained motion
- Intentional asymmetry
- Editorial composition
- High-quality imagery
- Minimal interface chrome

The goal is to make the website feel like a **designed academic technology experience**, not a generic event template.

---

# 18 — Performance

Recommended practices:

- Use optimized WebP images where possible.
- Keep hero assets appropriately compressed.
- Avoid unnecessary client-side components.
- Use animations selectively.
- Keep large decorative elements lightweight.
- Test mobile performance before deployment.

---

# 19 — Deployment

The project can be deployed using platforms that support Next.js.

Typical deployment flow:

```text
GitHub
   ↓
Production platform
   ↓
Next.js build
   ↓
Optimized production application
```

Before deployment:

```bash
npm run build
```

A successful production build should complete without TypeScript or ESLint errors.

---

# 20 — Future Improvements

Possible future additions include:

- Online registration form
- Registration database
- Email confirmation
- Speaker detail pages
- Downloadable workshop brochure
- Event calendar integration
- Google Maps integration
- QR-code registration
- Admin dashboard
- Attendance tracking
- Certificate generation
- Workshop schedule timeline
- Gallery
- Announcement system

---

# 21 — Credits

### Workshop

**Application of AI, ML and Optimization in Water Management**

### Institution

**Visvesvaraya National Institute of Technology (VNIT), Nagpur**

Additional partner institutions, speakers, organizers, and collaborators should be credited according to the official workshop information.

---

# 22 — License & Asset Usage

This website is intended for the official workshop and related academic communication.

Institutional logos, photographs, speaker information, partner branding, and other third-party materials should only be used with the appropriate authorization.

---

## Built for

### VNIT × AI

**APPLICATION OF AI, ML AND OPTIMIZATION IN WATER MANAGEMENT**

A focused workshop exploring intelligent and optimized approaches to the evolving challenges of water management.
