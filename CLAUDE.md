# CLAUDE.md — Brief Projet Site Vitrine IAM

## Contexte
Site vitrine + knowledge base pour Jean-Baptiste Janssen, Expert IAM / SSO freelance.
Objectif : se positionner comme expert IAM, générer des leads clients, et publier du contenu technique (guides, articles).

## Stack technique
- **Framework** : Astro (SSG)
- **Styling** : Tailwind CSS
- **Contenu blog/guides** : Markdown / MDX (natif Astro)
- **Hébergement** : Netlify (.netlify.app)
- **Formulaire contact** : Netlify Forms (gratuit, zéro backend)
- **Typo** : Inter ou DM Sans (Google Fonts)
- **Icônes** : Lucide Icons

## Charte graphique
Palette inspirée du branding LinkedIn existant :
- Fond principal : `#0C1933` (bleu très foncé)
- Fond secondaire : `#122850` (bleu moyen foncé)
- Accent primaire : `#00B4DC` (cyan)
- Accent secondaire : `#2962B4` (bleu vif)
- Texte principal : `#FFFFFF` (blanc)
- Texte secondaire : `#B4C3DC` (gris clair bleuté)
- CTA : cyan `#00B4DC` sur fond foncé
- Style : sobre, technique, professionnel, dark mode natif
- Responsive mobile-first

## Arborescence des pages

```
/                          → Page d'accueil (hero + pitch + CTA)
/expertise/                → Vue d'ensemble des compétences
/expertise/forgerock       → Page dédiée ForgeRock
/expertise/entra-id        → Page dédiée Microsoft Entra ID
/expertise/openldap        → Page dédiée OpenLDAP & annuaires
/expertise/kerberos        → Page dédiée Kerberos
/expertise/protocoles      → Page dédiée SAML 2.0 / OIDC / OAuth 2.0
/missions/                 → Références missions (EDF, Allianz)
/certifications/           → SC-300, SC-100 (statut + progression)
/guides/                   → Guides techniques complets
/guides/saml               → Guide SAML 2.0 (contenu dans content/guides/saml.md)
/guides/oidc               → Guide OIDC (contenu dans content/guides/oidc.md)
/blog/                     → Liste des articles courts
/blog/[slug]               → Article individuel
/contact/                  → Formulaire de contact
```

## Structure du projet

```
F:/site-iam/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── netlify.toml
├── CLAUDE.md                      (ce fichier)
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── photo-profil.jpg
│       └── og-image.png
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro       (head, nav, footer)
│   │   ├── BlogLayout.astro       (template article)
│   │   ├── GuideLayout.astro      (template guide long)
│   │   └── ExpertiseLayout.astro  (template page expertise)
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ExpertiseCard.astro
│   │   ├── MissionCard.astro
│   │   ├── BlogCard.astro
│   │   ├── GuideCard.astro
│   │   ├── CertBadge.astro
│   │   ├── TableOfContents.astro  (sidebar TOC pour les guides)
│   │   ├── ContactForm.astro
│   │   └── CTA.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── expertise/
│   │   │   ├── index.astro
│   │   │   ├── forgerock.astro
│   │   │   ├── entra-id.astro
│   │   │   ├── openldap.astro
│   │   │   ├── kerberos.astro
│   │   │   └── protocoles.astro
│   │   ├── missions.astro
│   │   ├── certifications.astro
│   │   ├── guides/
│   │   │   └── index.astro
│   │   ├── blog/
│   │   │   └── index.astro
│   │   └── contact.astro
│   ├── content/
│   │   ├── config.ts              (Astro content collections)
│   │   ├── guides/
│   │   │   ├── saml.md            (guide SAML complet — converti depuis HTML)
│   │   │   └── oidc.md            (guide OIDC complet — converti depuis HTML)
│   │   └── blog/
│   │       └── (articles markdown)
│   └── styles/
│       └── global.css
```

## Détail des pages

### Accueil `/`
- Hero : "Expert IAM / SSO" + sous-titre + CTA "Discutons de votre projet"
- 3 blocs expertise avec icônes : ForgeRock / Entra ID / Protocoles
- Chiffres clés : "4 ans d'expérience" • "50+ apps intégrées en SSO" • "2 grands comptes"
- Aperçu missions EDF + Allianz
- Derniers articles/guides
- CTA contact en bas

### Pages expertise `/expertise/[techno]`
Template commun, chaque page contient :
- Titre + description
- Mon expérience concrète avec cette techno
- Cas d'usage maîtrisés
- Liens vers guides/articles associés
- CTA contact

Contenu par techno :

**ForgeRock** : AM (SSO, fédération), IDM (provisioning), DS (annuaire), IG (gateway), ForgeOps (Kubernetes). Contexte mission Allianz.

**Microsoft Entra ID** : Azure AD, Graph API, PowerShell, Conditional Access, MFA, SSO. Contexte mission Allianz.

**OpenLDAP** : architecture, administration, réplication, optimisation, intégration avec ForgeRock et AD. Contexte mission Allianz.

**Kerberos** : infrastructure Kerberos, keytabs, automatisation. Contexte mission Allianz.

**Protocoles** : SAML 2.0, OIDC, OAuth 2.0 — fonctionnement, intégration, troubleshooting, comparatif. Contexte missions EDF + Allianz. Liens vers les guides complets.

### Missions `/missions/`
Deux blocs (sans infos confidentielles) :

**Mission EDF — Équipe Raccordement SSO (2022-2024)**
- Intégration 50+ applications WebSSO (SAML 2.0, OIDC)
- Configuration connecteurs LDAP / Active Directory
- Automatisation raccordement via Python/Bash
- Support N2/N3

**Mission Allianz — Transformation IAM (2024-2026)**
- Infrastructure Kerberos (keytabs automatisés)
- Scripts automatisation Entra ID via Graph API + PowerShell
- ForgeOps pour déploiement ForgeRock
- Administration OpenLDAP
- Support N2/N3 chaîne IAM complète

### Certifications `/certifications/`
- SC-300 : Identity and Access Administrator — en préparation
- SC-100 : Cybersecurity Architect Expert — en préparation
- Afficher statut dynamique (en cours / obtenue) + description des compétences couvertes

### Guides `/guides/`
Page liste avec cards vers les guides complets :
- Guide SAML 2.0 (10 chapitres, ~55 sections)
- Guide OIDC (10 chapitres, ~54 sections)

Chaque guide a une page dédiée avec :
- Table des matières sticky en sidebar (desktop) ou collapsible (mobile)
- Contenu long format avec blocs de code syntax-highlighted
- Navigation chapitre par chapitre
- Temps de lecture estimé

Les fichiers source HTML des guides sont dans `/content-source/` et doivent être convertis en Markdown propre dans `/src/content/guides/`.

### Blog `/blog/`
- Liste paginée, filtrable par tags
- Tags : forgerock, entra-id, saml, oidc, kerberos, ldap, sc-300, sc-100
- Articles en Markdown avec frontmatter (title, date, tags, description)

### Contact `/contact/`
- Formulaire Netlify Forms : Nom, Email, Entreprise, Message
- Liens : LinkedIn (linkedin.com/in/jeanbaptistejanssen), email (contact@jbjanssen.fr)
- Mention "Disponible à partir de mai 2026"

## SEO
- Meta title + description sur chaque page
- Open Graph images pour partage LinkedIn
- Sitemap auto (@astrojs/sitemap)
- URLs propres
- Schema.org : Person + ProfessionalService
- Target Lighthouse 95+

## Netlify config

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

## Phases de développement

### Phase 1 — MVP
1. Init Astro + Tailwind + config
2. BaseLayout (Header, Footer, navigation responsive)
3. Page d'accueil complète
4. Page contact avec Netlify Forms
5. Deploy sur Netlify

### Phase 2 — Contenu vitrine
6. 5 pages expertise
7. Page missions
8. Page certifications

### Phase 3 — Guides & Blog
9. Convertir les HTML SAML/OIDC en Markdown propre
10. GuideLayout avec table des matières
11. Pages guides
12. BlogLayout + premier article

### Phase 4 — Polish
13. Animations scroll (CSS transitions)
14. OG images
15. Schema.org
16. Lighthouse optimization

## Informations personnelles (pour le contenu)
- Nom : Jean-Baptiste Janssen
- Titre : Expert IAM / SSO
- Localisation : Nantes, France
- Disponibilité : Remote France entière + sur site Nantes
- LinkedIn : linkedin.com/in/jeanbaptistejanssen
- Email : contact@jbjanssen.fr
- Expérience : 4 ans (Accenture Technology Solutions)
