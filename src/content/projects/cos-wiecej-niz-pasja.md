---
title: "Coś więcej niż pasja"
description: "Interaktywne portfolio kolekcji 86 meczowych koszulek Wisły Kraków. Astro z animacjami sterowanymi scrollem, płynnymi przejściami między stronami (View Transitions) i prawdziwymi zdjęciami koszulek wycinanymi z tła lokalnie przez AI. Hosting na Cloudflare Workers."
descriptionEn: "Interactive portfolio of a collection of 86 Wisła Kraków match-worn shirts. Astro with scroll-driven animations, smooth cross-page View Transitions and real shirt photos with backgrounds removed locally by AI. Hosted on Cloudflare Workers."
url: "https://cos-wiecej-niz-pasja.gromson101.workers.dev"
technologies: ["Astro", "TypeScript", "View Transitions", "CSS Scroll-driven Animations", "Cloudflare Workers"]
image: "/images/projects/cos-wiecej-niz-pasja-desktop.webp"
category: "independent"
featured: false
wip: true
order: -9
---

# Coś więcej niż pasja

Strona-muzeum kolekcji meczowych koszulek Wisły Kraków prowadzonej na Instagramie jako @cos_wiecej_niz_pasja.

## Zakres prac:

- Projekt graficzny w stylu „Trybuna” – kinetyczna typografia (Archivo variable, animowany `font-stretch`), ukośny pas, taśmy z nazwiskami zawodników
- Kolekcja z filtrami (epoka, rodzaj, kolor, status, autograf) zapisywanymi w URL i płynnym przejściem z karty do strony koszulki (View Transitions)
- Strona koszulki z obrotem przód/tył, lupą do detali i przeglądarką oryginalnych zdjęć z zoomem
- Interaktywna „Ściana” z 86 koszulkami na zdjęciu oraz „Szatnia” z koszulkami kołyszącymi się na wieszakach
- Pipeline zdjęć: wycinanie tła lokalnie (rembg / BiRefNet), automatyczne kadrowanie, AVIF/WebP
- Wydajność i dostępność: ~1–3 KB JS na stronę, mobile-first, `prefers-reduced-motion`, nawigacja klawiaturą
- Wdrożenie na Cloudflare Workers (Static Assets)
