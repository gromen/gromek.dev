# Plan: Portfolio gromek.dev — Astro + Tailwind + TypeScript (PL/EN)

## Kontekst

Marcin Gromek przygotowuje ofertę na redesign strony ostrowmaz.pl (Urząd Miasta). Potrzebuje profesjonalnego portfolio online, żeby wzmocnić wiarygodność oferty. Strona musi powstać szybko.

**Decyzje:** domena `gromek.dev` (OVH), Astro + Tailwind + TypeScript, PL + EN, dark/light toggle, screenshoty Playwright, deploy Netlify, branding osobisty "Marcin Gromek"

---

## 1. Domena: `gromek.dev`

- Rejestrator: OVH
- .dev wymusza HTTPS (HSTS preloaded)
- **Akcja usera:** zarejestrować `gromek.dev` na OVH, podpiąć DNS do Cloudflare Pages

---

## 2. Stack

- **Astro 5 + TypeScript** — zero JS domyślnie, świetny PageSpeed, type safety
- **Tailwind CSS 4** — stylowanie + dark mode (`class` strategy)
- **Astro i18n** — routing PL/EN (`/pl/`, `/en/`)
- **Astro Content Collections** — projekty jako Markdown
- **Playwright** — automatyczne screenshoty stron z portfolio
- **Deploy: Netlify** (free tier, CI/CD z GitHub, custom domain)

---

## 3. Struktura projektu

```
gromek.dev/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro              # Redirect → /pl/
│   │   ├── pl/
│   │   │   ├── index.astro          # Landing PL
│   │   │   ├── portfolio.astro      # Projekty PL
│   │   │   └── kontakt.astro        # Kontakt PL
│   │   └── en/
│   │       ├── index.astro          # Landing EN
│   │       ├── portfolio.astro      # Projects EN
│   │       └── contact.astro        # Contact EN
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── ProjectCard.astro
│   │   ├── SkillBadge.astro
│   │   ├── ExperienceTimeline.astro
│   │   ├── Navigation.astro         # lang switcher + dark/light toggle
│   │   ├── ThemeToggle.astro        # dark/light mode switch
│   │   └── Footer.astro
│   ├── content/
│   │   └── projects/
│   │       ├── wojanshop.md
│   │       ├── miior7.md
│   │       ├── bellmanespresso.md
│   │       ├── thepetshop.md
│   │       ├── nellijewels.md
│   │       └── desky.md
│   ├── i18n/
│   │   ├── pl.json                  # Tłumaczenia PL
│   │   └── en.json                  # Tłumaczenia EN
│   └── styles/
│       └── global.css
├── scripts/
│   └── screenshots.ts              # Playwright screenshot automation
├── public/
│   ├── images/projects/             # Wygenerowane screenshoty
│   └── favicon.svg
├── astro.config.mjs
├── playwright.config.ts
└── package.json
```

---

## 4. Sekcje strony

### Landing (index)
- Hero: "Marcin Gromek — Frontend Developer" + CTA
- O mnie: 10+ lat, e-commerce & web dev
- Tech stack: React, Next.js, Shopify, WordPress, TypeScript, Tailwind
- 3-4 highlight projekty (karty)
- Timeline: Efigence → Avon → MyWorld → BitBag → Wunderman Thompson → Media4U → MachinePortal → Brand Active → Desky
- CTA → kontakt

### Portfolio
- Karty: screenshot + opis + technologie + link
- Samodzielne: wojanshop.pl, miior7.com, bellmanespresso.com, thepetshop.com, nellijewels.com
- Agencyjne highlights: Bank Pekao S.A., Emirates NBD, PLAY, Marilyn, Tatuum, Cosmedica
- Osobna sekcja: "Desky" — video gallery, custom PDP features

### Kontakt
- Email: gromek.marcin@outlook.com
- Tel: +48 666 211 109
- LinkedIn: /in/gromekmarcin
- GitHub: /gromen
- Formularz: Formspree (free, zero backend)

---

## 5. Screenshoty (automatyczne)

Skrypt Playwright (`scripts/screenshots.ts`):
- Odwiedza każdy URL z portfolio
- Robi full-page screenshot (desktop 1440px + mobile 375px)
- Zapisuje do `public/images/projects/`
- Uruchamiany ręcznie: `npx tsx scripts/screenshots.ts`

Strony do screenshotowania:
- wojanshop.pl
- miior7.com
- bellmanespresso.com
- thepetshop.com
- nellijewels.com
- desky.com

---

## 6. Kolejność implementacji

1. ✅ `npm create astro@latest gromek.dev` + Tailwind + Playwright
2. ✅ BaseLayout + Navigation (z lang switcher PL/EN) + Footer
3. ✅ i18n (pl.json, en.json) + routing `/pl/`, `/en/`
4. ✅ Hero + landing page (Hero.astro, SkillBadge.astro, featured projects, CTA)
5. Content collections (Markdown per projekt)
6. ProjectCard + portfolio page
7. ExperienceTimeline (dane z CV)
8. ✅ Kontakt page + Formspree
9. `npx tsx scripts/screenshots.ts` — generacja screenshotów
10. Responsive polish + Lighthouse audit
11. `git init` + push do GitHub
12. Deploy: Netlify ← GitHub repo (auto CI/CD on push)
13. DNS: OVH → Netlify custom domain `gromek.dev`

---

## 7. Weryfikacja

- `npm run build` — zero errors
- `npm run preview` — test lokalny
- Lighthouse: Performance > 95, Accessibility > 95, SEO > 90
- RWD: mobile 375px, tablet 768px, desktop 1440px
- Lang switcher PL ↔ EN działa
- Linki do projektów poprawne
- Screenshoty renderują się prawidłowo
- Formularz Formspree wysyła maile

---

## Pytania nierozwiązane

1. **Akcja usera:** zarejestrować `gromek.dev` na OVH (sprawdzić dostępność)
2. **Netlify konto:** masz konto Netlify czy założyć nowe?
3. **Formspree:** czy formularz kontaktowy potrzebny, czy wystarczą dane (email, tel, LinkedIn)?
