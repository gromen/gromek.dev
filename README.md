# gromek.dev — Professional Portfolio

Frontend Developer portfolio built with modern web technologies.

## 🚀 Tech Stack

- **Framework**: [Astro 5](https://astro.build) — Zero JS by default, blazing fast
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) — Utility-first CSS
- **Language**: TypeScript (strict mode)
- **i18n**: Polish & English versions
- **Deployment**: Netlify (CI/CD)
- **Testing**: Playwright (screenshot automation)

## ✨ Features

- 🌍 **Bilingual** — Polish and English versions
- 🌙 **Dark/Light Mode** — Theme toggle with localStorage
- 📱 **Fully Responsive** — Mobile-first design (375px → 1440px)
- ♿ **Accessible** — WCAG AA compliant, keyboard navigation
- ⚡ **Performance** — Lighthouse scores > 95
- 🔍 **SEO Optimized** — OG tags, Twitter cards, sitemap
- 📝 **Content Collections** — 12 portfolio projects
- 📧 **Contact Form** — Formspree integration
- 🎨 **Sticky Navigation** — With mobile hamburger menu

## 📂 Project Structure

```
gromek.dev/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # Main HTML shell
│   ├── pages/
│   │   ├── index.astro               # Redirect → /pl/
│   │   ├── pl/                       # Polish pages
│   │   │   ├── index.astro           # Landing PL
│   │   │   ├── portfolio.astro       # Projects PL
│   │   │   └── kontakt.astro         # Contact PL
│   │   └── en/                       # English pages
│   │       ├── index.astro           # Landing EN
│   │       ├── portfolio.astro       # Projects EN
│   │       └── contact.astro         # Contact EN
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro
│   │   ├── SkillBadge.astro
│   │   ├── ExperienceTimeline.astro
│   │   └── ProjectCard.astro
│   ├── content/
│   │   ├── config.ts                 # Content Collections schema
│   │   └── projects/                 # 12 project markdown files
│   ├── i18n/
│   │   ├── pl.json                   # Polish translations
│   │   ├── en.json                   # English translations
│   │   └── utils.ts                  # i18n helpers
│   └── styles/
│       └── global.css                # Tailwind + custom styles
├── scripts/
│   └── screenshots.ts                # Playwright automation
├── public/
│   ├── images/projects/              # Project screenshots
│   ├── favicon.svg
│   ├── og-image.png
│   └── robots.txt
├── astro.config.mjs
├── netlify.toml
├── playwright.config.ts
└── package.json
```

## 🛠️ Development

### Prerequisites
- Node.js 22+
- npm 10+

### Setup
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/gromek.dev.git
cd gromek.dev

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Available Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run check` | Check TypeScript types |
| `npx tsx scripts/screenshots.ts` | Generate project screenshots |

## 📸 Screenshot Automation

Automatically capture screenshots of all portfolio projects:

```bash
npx tsx scripts/screenshots.ts
```

Generates:
- Desktop screenshots (1440x900px)
- Mobile screenshots (375x667px)

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

### Quick Deploy to Netlify

1. Push to GitHub
2. Connect repository to Netlify
3. Configure custom domain `gromek.dev`
4. Enable HTTPS (automatic Let's Encrypt)

Build settings (auto-detected):
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 22

## 📊 Lighthouse Scores

Target scores (all pages):
- **Performance**: > 95 ⚡
- **Accessibility**: > 95 ♿
- **Best Practices**: > 90 ✅
- **SEO**: > 90 🔍

See [LIGHTHOUSE_CHECKLIST.md](./LIGHTHOUSE_CHECKLIST.md) for detailed optimizations.

## 🌐 Live Site

**Production**: https://gromek.dev

## 📝 Content

### Projects
- **Independent**: WojanShop, MIIOR7, Bellman Espresso, The Pet Shop, Nelli Jewels
- **Agency**: Bank Pekao S.A., Emirates NBD, PLAY, Marilyn, Tatuum, Cosmedica
- **Special**: Desky (video gallery, custom PDP)

### Experience Timeline
- Efigence (2014-2016)
- Avon (2016-2017)
- MyWorld (2017-2018)
- BitBag (2018-2019)
- Wunderman Thompson (2019-2020)
- Media4U (2020-2021)
- MachinePortal (2021-2022)
- Brand Active (2022-2023)
- Desky (2023-present)

## 📧 Contact

- **Email**: gromek.marcin@outlook.com
- **Phone**: +48 666 211 109
- **LinkedIn**: [/in/gromekmarcin](https://linkedin.com/in/gromekmarcin)
- **GitHub**: [/gromen](https://github.com/gromen)

## 📄 License

© 2026 Marcin Gromek. All rights reserved.

---

Built with 💙 using Astro, Tailwind CSS, and TypeScript.
