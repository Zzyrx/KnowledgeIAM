# Rapport corrections frontend — KnowledgeIAM
Date : 2026-02-19

## Statut des corrections

| Fix | Fichier | Statut | Notes |
|-----|---------|--------|-------|
| A11Y-04 prefers-reduced-motion | `src/styles/global.css` | ✅ corrigé | `scroll-behavior: auto` + disable animations |
| A11Y-02 aria-controls menu mobile | `src/components/Header.astro` | ✅ corrigé | `aria-controls="mobile-menu"` ajouté sur bouton hamburger |
| SEO-03 Schema Article JSON-LD | `src/layouts/BlogLayout.astro` | ✅ corrigé | Schema `Article` avec headline, dates, author, publisher |
| SEO-03 Schema TechArticle JSON-LD | `src/layouts/GuideLayout.astro` | ✅ corrigé | Schema `TechArticle` avec timeRequired conditionnel |
| CR-03 Constantes centralisées | `src/config/site.ts` | ✅ créé | url, name, title, email (contact@jbjanssen.fr), linkedin |
| P1 preconnect Google Fonts | `src/layouts/BaseLayout.astro` | ✅ déjà présent | preconnect fonts.googleapis.com + fonts.gstatic.com en place |

## Corrections hors scope (P0 — nécessitent assets)

| Fix | Statut | Raison |
|-----|--------|--------|
| SEO-01 og-image.png valide | ⚠️ non appliqué | Nécessite outil de génération d'image (sharp, canvas, Satori) ou asset design |
| CR-02 SVG composants extraits | ⏭️ différé | Hors scope Phase 3 — prévu Phase 4 polish |

## Notes

- `netlify.toml` : headers HTTP déjà complets (SEC-01 résolu en amont)
- `public/robots.txt` : créé par l'agent devops (SEO-02 résolu)
- Email dans `BaseLayout.astro` L.27 : `jeanbaptiste.janssen10@gmail.com` dans le schema.org Person — à remplacer par `contact@jbjanssen.fr` lors du polish Phase 4
