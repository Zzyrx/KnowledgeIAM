# AUDIT_REPORT.md — KnowledgeIAM
**Date** : 2026-02-19
**Stack** : Astro 5.17.3 · Tailwind CSS 3.4.19 · TypeScript strict · Netlify Forms
**Phase projet** : 3/4 (avant go-live)

---

## Tableau de bord exécutif

| Dimension          | Avant | Après | Statut  |
|--------------------|-------|-------|---------|
| Sécurité           | 0/7 headers | 7/7 headers | ✅ Résolu |
| SEO technique      | 3 issues P0 | 1 restante | 🟡 Partiel |
| Accessibilité WCAG | 4 issues | 2 restantes | 🟡 Partiel |
| Qualité du code    | 3 issues | 1 restante | 🟢 Bon |
| Performance        | — | Base saine (SSG pur) | 🟢 Bon |

---

## Corrections appliquées (2026-02-19)

### ✅ P0 — Blockers résolus

| ID | Issue | Fichier | Statut |
|----|-------|---------|--------|
| SEC-01 | Headers HTTP sécurité absents | `netlify.toml` | ✅ Résolu (devops) |
| SEO-02 | `robots.txt` absent | `public/robots.txt` | ✅ Créé |

### ✅ P1 — Issues importantes résolues

| ID | Issue | Fichier | Statut |
|----|-------|---------|--------|
| A11Y-04 | Animations sans `prefers-reduced-motion` | `src/styles/global.css` | ✅ Corrigé |
| A11Y-02 | Bouton menu mobile sans `aria-controls` | `src/components/Header.astro` | ✅ Corrigé |
| SEO-03a | Schema `Article` manquant | `src/layouts/BlogLayout.astro` | ✅ Ajouté |
| SEO-03b | Schema `TechArticle` manquant | `src/layouts/GuideLayout.astro` | ✅ Ajouté |

### ✅ P2 — Quick wins résolus

| ID | Issue | Fichier | Statut |
|----|-------|---------|--------|
| CR-03 | Email/config hardcodé | `src/config/site.ts` | ✅ Créé |

---

## Issues restantes (hors scope Phase 3)

### 🔴 SEO-01 — og-image.png vide (BLOCKER go-live)
- **Fichier** : `public/images/og-image.png` (11 octets, vide)
- **Impact** : partage LinkedIn non fonctionnel, OG image absente
- **Action requise** : Générer une image PNG 1200×630 (Satori, sharp, ou asset design)
- **Effort estimé** : 2h
- **Priorité** : P0 avant go-live

### 🟡 A11Y-01 — SVG décoratifs sans aria-hidden
- **Impact** : lecteurs d'écran lisent les SVG inline comme contenu
- **Action** : Ajouter `aria-hidden="true"` sur les SVG purement décoratifs
- **Effort** : 30 min

### 🟡 A11Y-03 — Messages d'erreur form non accessibles (WCAG 3.3.1)
- **Fichier** : `src/components/ContactForm.astro`
- **Action** : Ajouter `aria-describedby` sur les champs + messages d'erreur avec `role="alert"`
- **Effort** : 1h

### 🟡 CR-01 — SVG icons dupliqués (index.astro ↔ expertise/index.astro)
- **Action** : Créer `src/components/icons/` avec composants réutilisables
- **Effort** : 1h — Phase 4 polish

### 🟡 CR-02 — Classes `prose` Tailwind dupliquées (BlogLayout ↔ GuideLayout)
- **Action** : Extraire dans un composant `ProseContent.astro`
- **Effort** : 30 min — Phase 4 polish

### ℹ️ Email schema.org — Incohérence
- **Fichier** : `src/layouts/BaseLayout.astro` L.27
- `jeanbaptiste.janssen10@gmail.com` dans `personSchema` → remplacer par `contact@jbjanssen.fr`
- **Effort** : 2 min

---

## Plan de remédiation Phase 4

### Avant go-live (obligatoire)
1. **SEO-01** : Générer `og-image.png` valide 1200×630 — *(2h)*
2. **Email schema.org** : corriger `BaseLayout.astro` L.27 — *(2 min)*

### Phase 4 polish (recommandé)
3. **A11Y-01** : `aria-hidden="true"` sur SVG décoratifs — *(30 min)*
4. **A11Y-03** : Accessibilité formulaire contact — *(1h)*
5. **CR-01** : Composants icônes SVG — *(1h)*
6. **CR-02** : Composant `ProseContent.astro` — *(30 min)*

---

## Détail sécurité — netlify.toml (headers actifs)

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'none'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    X-XSS-Protection = "1; mode=block"
```

> **Note CSP** : `script-src 'self'` fonctionne car Astro SSG bundle le JS en fichiers externes. Les `<script type="application/ld+json">` ne sont pas affectés par `script-src` (type non-exécutable).

---

## Rapports partiels
- `audit/devops-fixes.md` — Sécurité infrastructure
- `audit/frontend-fixes.md` — Frontend, accessibilité, schemas
