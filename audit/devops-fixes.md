# Rapport DevOps - Corrections Infrastructure KnowledgeIAM

Date : 2026-02-19

## P0 - Headers HTTP de securite (netlify.toml)

**Statut : APPLIQUE**

Fichier modifie : `F:/BacASable/KnowledgeIAM/netlify.toml`

Headers ajoutes dans un bloc `[[headers]]` pour toutes les routes (`/*`) :

| Header | Valeur |
|--------|--------|
| Content-Security-Policy | `default-src 'none'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'` |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains; preload` |
| X-Frame-Options | `DENY` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` |
| X-XSS-Protection | `1; mode=block` |

### Justification de la CSP

- **`default-src 'none'`** : politique restrictive par defaut, tout est bloque sauf ce qui est explicitement autorise
- **`script-src 'self'`** : Astro SSG bundle les scripts en fichiers JS externes via Vite, pas besoin d'`unsafe-inline`
- **`style-src 'self' https://fonts.googleapis.com`** : Tailwind CSS compile en fichier externe + feuilles de style Google Fonts
- **`font-src 'self' https://fonts.gstatic.com`** : fichiers de polices Google Fonts
- **`img-src 'self' data:`** : images locales + eventuels data URIs (favicons SVG inline)
- **`connect-src 'self'`** : requetes XHR/fetch vers le meme origin uniquement
- **`form-action 'self'`** : formulaire Netlify Forms soumis vers le meme origin
- **`frame-ancestors 'none'`** : empeche l'embedding dans des iframes (renforce X-Frame-Options)
- **`base-uri 'self'`** : empeche l'injection de balise `<base>`

### Note sur JSON-LD

Les balises `<script type="application/ld+json">` presentes dans `BaseLayout.astro` ne sont **pas affectees** par `script-src` car elles ne sont pas executables (type non-JavaScript). Aucune exception CSP necessaire.

---

## P0 - robots.txt

**Statut : CREE**

Fichier cree : `F:/BacASable/KnowledgeIAM/public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://knowledgeiam.netlify.app/sitemap-index.xml
```

- URL du site extraite de `astro.config.mjs` : `https://knowledgeiam.netlify.app`
- Sitemap genere par l'integration `@astrojs/sitemap` configuree dans `astro.config.mjs`
- Le fichier est place dans `public/` pour etre copie tel quel dans `dist/` au build

---

## Resume

| Correction | Priorite | Statut |
|-----------|----------|--------|
| Headers HTTP de securite | P0 | APPLIQUE |
| robots.txt | P0 | CREE |
