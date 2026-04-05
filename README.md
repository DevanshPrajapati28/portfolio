# 🚀 Devansh Prajapati — 3D Portfolio

A stunning, animated portfolio website built with the MERN stack (React frontend), featuring:

## ✨ Features
- **3D Background** — Three.js floating geometric shapes with orbit animations (Home)
- **Spectacular Loader** — Orbital loading animation with live progress counter
- **GSAP ScrollTrigger** — Scroll-driven animations throughout every section
- **Flip Card Projects** — 3D CSS flip cards with GSAP transitions (click to reveal!)
- **Animated Skill Bars** — Progress bars animate on scroll
- **Timeline Experience** — Animated timeline with staggered reveals
- **Contact Form** — Styled form with validation and success feedback
- **Lottie-style Animations** — SVG contact animation with inline SVG sequences
- **Light Theme** — Clean, editorial aesthetic with Material UI
- **Responsive** — Mobile-first, works on all screen sizes

## 🛠 Tech Stack
- React 18 + React Router
- Material UI v5
- GSAP 3 (ScrollTrigger, timelines, flip, stagger)
- Three.js + @react-three/fiber + @react-three/drei
- Lottie React
- Fonts: Syne, DM Sans, Space Mono (Google Fonts)

## 🚀 Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Build for production
npm run build
```

## 📁 Project Structure
```
src/
├── App.js              — Theme, routing, loader gate
├── index.js            — Entry point
├── components/
│   ├── Loader.js       — Orbital progress loader
│   └── Navbar.js       — Sticky nav with active section tracking
└── pages/
    ├── Home.js         — 3D Three.js hero section
    ├── About.js        — Code editor visual + stats
    ├── Skills.js       — Animated skill bars + tools
    ├── Projects.js     — 3D flip card project showcase
    ├── Experience.js   — Animated timeline + achievements
    └── Contact.js      — Contact form + animated SVG
```

## 🎨 Customisation
- Update project data in `src/pages/Projects.js`
- Update experience/education in `src/pages/Experience.js`
- Update skills in `src/pages/Skills.js`
- Change colors in `src/App.js` (MUI theme)

## 📦 Deployment
```bash
npm run build
# Deploy the /build folder to Vercel, Netlify, or any static host
```

---
Made with ❤️ | Devansh Prajapati Portfolio
