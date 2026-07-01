---
title: "SAML vs OIDC : quel protocole choisir pour votre SSO ?"
description: "Comparatif pratique entre SAML 2.0 et OpenID Connect. Critères de choix, cas d'usage et recommandations basés sur 4 ans d'intégration SSO."
date: 2025-01-15
tags: [saml, oidc, sso]
author: "Jean-Baptiste Janssen"
---

Après avoir intégré plus de 50 applications en SSO chez EDF et géré la fédération d'identités chez Allianz, la question que l'on me pose le plus souvent est : **SAML ou OIDC ?**

La réponse courte : **ça dépend**. Mais voici les critères concrets qui guident mon choix au quotidien.

## Les fondamentaux

**SAML 2.0** (2005) est un protocole basé sur XML, conçu pour le SSO web en entreprise. Il échange des *assertions* signées entre un Identity Provider (IdP) et un Service Provider (SP).

**OpenID Connect** (2014) est une couche d'identité construite sur OAuth 2.0, utilisant JSON et JWT. Plus moderne, plus léger, plus adapté aux architectures actuelles.

## Quand choisir SAML 2.0

SAML reste incontournable dans ces situations :

- **Applications legacy** qui ne supportent pas OIDC
- **Fédération B2B** avec des partenaires utilisant des IdP d'entreprise (ADFS, Shibboleth)
- **Écosystèmes entreprise matures** déjà construits autour de SAML
- **Exigences réglementaires** spécifiant SAML explicitement

Chez EDF, la majorité des 500+ intégrations SSO étaient en SAML 2.0. Pourquoi ? Parce que le parc applicatif existant supportait majoritairement SAML, et les partenaires externes fournissaient des métadonnées SAML.

## Quand choisir OIDC

OIDC est le choix naturel pour :

- **Applications modernes** (SPA, mobile, microservices)
- **Nouveaux projets** sans contrainte legacy
- **Protection d'API** (OAuth 2.0 + JWT)
- **Intégration avec des IdP cloud** (Entra ID, Google, Okta)
- **Besoin de simplicité** d'implémentation

Chez Allianz, les nouvelles intégrations avec ForgeRock AM se font systématiquement en OIDC quand le SP le supporte.

## Les critères de décision

| Critère | SAML 2.0 | OIDC |
|---------|----------|------|
| **Applications web classiques** | Excellent | Bon |
| **Applications mobiles** | Limité | Excellent |
| **API / Microservices** | Non adapté | Excellent |
| **Complexité d'intégration** | Élevée | Modérée |
| **Support navigateur** | Très bon | Très bon |
| **Debugging** | Difficile (XML) | Simple (JSON/JWT) |
| **Taille des messages** | Volumineux (XML) | Léger (JSON) |

## Mon approche en pratique

En mission, je suis une règle simple :

1. **Le SP supporte OIDC et c'est un nouveau projet ?** OIDC.
2. **Le SP ne supporte que SAML ?** SAML.
3. **Fédération B2B avec un partenaire ?** SAML (standard de facto en entreprise).
4. **API à protéger ?** OAuth 2.0 / OIDC obligatoirement.

## Le piège à éviter

Ne choisissez pas OIDC *uniquement* parce que c'est "plus moderne". J'ai vu des projets perdre des semaines à tenter d'intégrer en OIDC des applications qui supportaient nativement SAML, juste pour être "modernes". Le bon protocole est celui que **les deux parties** (IdP et SP) supportent le mieux.

## Pour aller plus loin

J'ai rédigé deux guides complets sur ces protocoles :

- [Guide SAML 2.0](/guides/saml/) — 10 chapitres, des composants aux flux de sécurité
- [Guide OIDC](/guides/oidc/) — 10 chapitres, des tokens JWT aux bonnes pratiques

Ces guides couvrent chaque protocole en profondeur, avec des exemples concrets tirés de mes missions.
