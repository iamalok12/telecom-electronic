# Telecom Electronics

Modern, responsive, fully data-driven static website for **Telecom Electronics** — a local shop selling CCTV cameras, DVR/NVR systems, accessories, plus installation & maintenance services.

## Tech stack

- React 19 (JavaScript)
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router

No backend, no APIs — every piece of business content is loaded from local JSON.

## Project structure

```
src/
  components/     Reusable UI (Navbar, Footer, Hero, ProductCard, Icons, ...)
  pages/          Home, Products, Services, Brands, Contact, NotFound
  data/           ALL business content (JSON)
    shop.json
    products.json
    services.json
    brands.json
    navigation.json
  utils/          Pure helpers (links.js)
  index.css       Tailwind entry + theme tokens
  App.jsx         Routes
  main.jsx        Bootstrap
```

## Editing business info

All business data lives in [src/data](src/data):

- Shop name, phones, WhatsApp, email, address, hours, stats → [src/data/shop.json](src/data/shop.json)
- Products & categories → [src/data/products.json](src/data/products.json)
- Services → [src/data/services.json](src/data/services.json)
- Brands / Partners → [src/data/brands.json](src/data/brands.json)
- Navigation links → [src/data/navigation.json](src/data/navigation.json)

> No business text is hardcoded inside components. Update JSON → UI updates everywhere.

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview production build
```

## Highlights

- Mobile-first responsive design with a clean, dark, premium UI
- Subtle cursor-follow tilt parallax on the hero visual (no animation libraries)
- Strong conversion-focused CTAs (Call & WhatsApp) wired from JSON
- Click-to-call, prefilled WhatsApp links, mailto, and embedded Google Map
- Floating Call/WhatsApp action for instant lead capture
- Lazy-loaded product images, accessible markup, smooth transitions
