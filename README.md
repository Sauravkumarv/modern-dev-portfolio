# Modern Dev Portfolio

A modern developer portfolio built with React, Vite, Tailwind CSS, Framer Motion, React Router, and React Icons.

Repository:
`https://github.com/Sauravkumarv/modern-dev-portfolio`

This project is structured to stay easy to modify:
- content is stored in data files
- sections are split into focused components
- shared UI lives separately from page sections
- theme state and custom hooks are isolated
- visual effects are reduced where they hurt performance

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Framer Motion
- React Router DOM
- React Icons
- Canvas API for the hero particle background

## What This Project Includes

- Responsive single-page portfolio
- Light and dark theme support
- Animated hero section
- Canvas-based particle background
- Skills section
- Projects section
- Moving live reviews/feedback marquee
- Feedback form stored in browser `localStorage`
- Contact section with resume link and social links

## Project Structure

```text
src
├── components
│   ├── layout
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── sections
│   │   ├── AboutSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── FeedbackSection.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ParticleCanvas.jsx
│   │   ├── ProjectsSection.jsx
│   │   └── SkillsSection.jsx
│   └── ui
│       ├── BackgroundScene.jsx
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── IconTextLink.jsx
│       ├── SectionHeader.jsx
│       ├── SectionLoader.jsx
│       ├── SocialLinks.jsx
│       └── ThemeToggle.jsx
├── context
│   └── ThemeProvider.jsx
├── data
│   ├── contact.js
│   ├── feedback.js
│   ├── home.js
│   ├── profile.js
│   ├── projects.js
│   ├── site.js
│   └── skills.js
├── hooks
│   ├── useFeedback.js
│   ├── useParticles.js
│   ├── useReducedMotionPreference.js
│   └── useTheme.js
├── pages
│   └── Home
│       └── HomePage.jsx
├── styles
│   └── global.css
├── utils
│   ├── animation.js
│   └── iconMap.js
├── App.jsx
└── main.jsx
```

## How The App Is Built

### 1. App Entry

- `src/main.jsx` mounts the React app
- `BrowserRouter` wraps the application
- global styles are loaded from `src/styles/global.css`

### 2. App Shell

- `src/App.jsx` sets up routing
- `ThemeProvider` wraps the application
- `HomePage` is lazy loaded

### 3. Page Composition

- `src/pages/Home/HomePage.jsx` composes the full landing page
- each section is lazy loaded with `React.lazy`
- loading placeholders use `SectionLoader`

### 4. Layout Layer

- `Navbar.jsx` handles navigation and theme toggle
- `Footer.jsx` handles closing site metadata and footer text

### 5. Section Layer

Each major section is isolated:
- `HeroSection.jsx`
- `AboutSection.jsx`
- `SkillsSection.jsx`
- `ProjectsSection.jsx`
- `FeedbackSection.jsx`
- `ContactSection.jsx`

This keeps the page readable and makes it easier to add or remove sections later.

### 6. Shared UI Layer

Shared UI primitives live in `src/components/ui`.

Examples:
- `Card.jsx` standardizes glassmorphism containers
- `Button.jsx` standardizes button styles
- `SectionHeader.jsx` standardizes headings and section intros
- `ThemeToggle.jsx` isolates theme switching UI

### 7. Data Layer

All editable content is stored in `src/data`.

This means most content changes do not require touching UI components.

Examples:
- `profile.js` contains name, title, links, resume path
- `home.js` contains hero and about content
- `skills.js` contains skill groups
- `projects.js` contains project cards
- `feedback.js` contains feedback section copy and default entries
- `site.js` contains navigation and footer metadata

### 8. Hooks Layer

Custom hooks handle isolated behavior:

- `useTheme.js`
  reads theme state from the provider

- `useParticles.js`
  manages Canvas particle rendering for the hero

- `useFeedback.js`
  manages feedback data and stores entries in `localStorage`

- `useReducedMotionPreference.js`
  respects user motion preferences for accessibility and performance

## Styling Approach

This project uses:
- Tailwind CSS utility classes for layout and spacing
- `global.css` for reusable visual tokens and shared component classes
- CSS variables for theme-aware colors

Notable styling patterns:
- glassmorphism cards
- accent gradients
- reusable surface and border tokens
- responsive spacing and typography

## Animation Approach

Animations are implemented with Framer Motion where needed and CSS where cheaper.

Used for:
- hero reveal transitions
- section/card entry animations
- feedback marquee presentation

Performance notes:
- continuous heavy animations were reduced
- offscreen sections use `content-visibility`
- canvas particles are limited to cases where they add value
- some decorative effects are intentionally static to keep the site lighter

## Theme System

Theme state is handled by:
- `src/context/ThemeProvider.jsx`

Behavior:
- theme is stored in `localStorage`
- user preference is applied to `document.documentElement`
- UI reads colors from CSS variables in `global.css`

## Feedback System

The feedback section is frontend-only.

How it works:
- default feedback entries come from `src/data/feedback.js`
- new feedback entries are saved in browser `localStorage`
- this means comments are local to the user’s browser

Important:
- this is not a backend-powered review system
- if you want global comments shared between all visitors, integrate Supabase, Firebase, Appwrite, or your own backend

## How To Run Locally

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Create production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Build Process

When you run `npm run build`:

1. Vite reads `index.html`
2. React entry starts from `src/main.jsx`
3. Vite resolves imports and splits lazy-loaded sections into chunks
4. Tailwind scans project files and generates used CSS
5. Final assets are emitted into `dist/`

Output includes:
- optimized JS bundles
- generated CSS
- production-ready HTML

## Files You Will Most Commonly Edit

### Update personal details

Edit:
- `src/data/profile.js`

### Update hero/about text

Edit:
- `src/data/home.js`

### Update skills

Edit:
- `src/data/skills.js`

### Update projects

Edit:
- `src/data/projects.js`

### Update feedback defaults or copy

Edit:
- `src/data/feedback.js`

### Update contact content

Edit:
- `src/data/contact.js`

### Update nav and footer

Edit:
- `src/data/site.js`

### Update resume file

Place your file here:
- `public/resume.pdf`

## Performance Notes

This codebase already includes some practical optimizations:

- lazy loaded sections
- reduced continuous motion
- lighter background effects
- browser-native `content-visibility` for large sections
- local feedback initialization without an extra hydration pass
- CSS transform-based marquee animation instead of JS-driven movement

If you want to optimize further:
- reduce Framer Motion usage inside non-critical sections
- simplify hero decorative layers
- replace browser-local feedback with a backend only if needed

## Customization Notes

Good changes for future development:

- add an Experience section
- add blog or case-study pages
- connect feedback to a real backend
- add analytics
- add project filtering

## License

Use this project as a personal portfolio base and customize it for your own profile.
