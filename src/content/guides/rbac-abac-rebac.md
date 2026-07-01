---
title: "RBAC, ABAC, ReBAC : les modèles d'autorisation"
description: "Guide comparatif des modèles de contrôle d'accès : RBAC (rôles), ABAC (attributs) et ReBAC (relations). Fonctionnement, exemples de politiques, architecture PDP/PEP, standards (XACML, OPA, Cedar, OpenFGA) et critères de choix."
author: "Jean-Baptiste Janssen"
tags: [rbac, abac, rebac, authorization, autorisation, security]
chapters: 10
readingTime: "30 min"
---

## 1. Introduction : authentification n'est pas autorisation

En gestion des identités, deux questions distinctes se posent à chaque accès :

- **Authentification (AuthN)** : *« Qui es-tu ? »* — prouver l'identité (mot de passe, MFA, certificat, passkey).
- **Autorisation (AuthZ)** : *« As-tu le droit de faire ceci ? »* — décider si une identité authentifiée peut accéder à une ressource ou effectuer une action.

Le SSO et la fédération (SAML, OIDC) résolvent surtout l'**authentification**. L'autorisation, elle, repose sur un **modèle de contrôle d'accès**. Trois modèles dominent aujourd'hui : **RBAC**, **ABAC** et **ReBAC**.

> **Analogie simple**
> Imaginez un immeuble sécurisé. L'authentification, c'est le badge qui prouve que vous êtes bien un salarié. L'autorisation, c'est ce que ce badge vous ouvre : RBAC ouvre les portes selon votre *fonction* (« étage RH »), ABAC selon des *conditions* (« seulement en journée, depuis le réseau interne »), et ReBAC selon vos *relations* (« la salle de réunion que vous avez réservée »).

Le choix du modèle n'est pas cosmétique : il détermine la granularité des droits, la complexité de maintenance, la performance des décisions et la capacité à auditer *qui peut accéder à quoi*.

### 1.1 Le vocabulaire commun

Quel que soit le modèle, on raisonne sur un quadruplet :

- **Sujet** (subject) : l'utilisateur, le service ou le système qui demande l'accès.
- **Action** : l'opération demandée (lire, écrire, supprimer, approuver…).
- **Ressource** : l'objet visé (un document, une API, un enregistrement).
- **Contexte** (environment) : les conditions de la demande (heure, IP, niveau d'authentification, appareil).

RBAC, ABAC et ReBAC se distinguent surtout par **ce sur quoi ils fondent la décision**.

## 2. RBAC — le contrôle d'accès basé sur les rôles

**RBAC** (Role-Based Access Control) attribue les permissions à des **rôles**, et affecte les utilisateurs à ces rôles. On n'attribue jamais un droit directement à une personne : on lui donne un rôle qui *porte* les droits.

```
Utilisateur  →  Rôle  →  Permissions
  cmartin    →  "RH-Gestionnaire"  →  { lire:dossier_salarie, modifier:contrat }
```

C'est le modèle le plus répandu en entreprise, formalisé par le standard **NIST RBAC** (ANSI INCITS 359-2004), qui définit quatre niveaux :

| Niveau | Nom | Apport |
|---|---|---|
| RBAC₀ | Flat | Rôles + permissions + affectation utilisateur |
| RBAC₁ | Hierarchical | Hiérarchie de rôles (héritage des permissions) |
| RBAC₂ | Constrained | Contraintes, dont la séparation des tâches (SoD) |
| RBAC₃ | Consolidated | Combine hiérarchie et contraintes |

### 2.1 Hiérarchie de rôles

Un rôle « senior » hérite des permissions de rôles « juniors ». Un `RH-Manager` hérite de `RH-Gestionnaire`, qui hérite de `Collaborateur`. On évite ainsi de redéclarer les mêmes droits.

### 2.2 Séparation des tâches (SoD)

Une contrainte SoD interdit à un même utilisateur de cumuler des rôles incompatibles — par exemple *créer un fournisseur* **et** *valider son paiement*. C'est un pilier de la conformité (SOX, ISO 27001) que RBAC gère nativement via ses contraintes.

### 2.3 Forces et limites

**Forces** : simple à comprendre, facile à auditer (« qui a le rôle Admin ? »), aligné sur l'organigramme, largement supporté par tous les annuaires et solutions IAM.

**Limite majeure — l'explosion des rôles** : dès qu'un droit dépend d'une nuance (la région, le service, le montant), on crée un rôle par combinaison : `RH-Paris`, `RH-Lyon`, `RH-Paris-LectureSeule`… Le nombre de rôles explose et devient ingérable. C'est le signal qu'il faut envisager ABAC.

> **Retour d'expérience**
> Sur les annuaires OpenLDAP d'un grand assureur, le contrôle d'accès applicatif reposait sur des **groupes LDAP** mappés vers des rôles applicatifs — du RBAC classique. Efficace pour des droits stables et par fonction, mais chaque exception métier tendait à créer un nouveau groupe : la gouvernance des groupes devient alors un chantier à part entière.

## 3. ABAC — le contrôle d'accès basé sur les attributs

**ABAC** (Attribute-Based Access Control) prend ses décisions en évaluant des **attributs** et des **règles**, plutôt que des rôles figés. Le standard de référence est le **NIST SP 800-162**.

La décision combine des attributs de quatre catégories :

- **Sujet** : service, niveau d'habilitation, ancienneté, pays de rattachement…
- **Ressource** : classification (public/confidentiel), propriétaire, projet…
- **Action** : lire, modifier, supprimer…
- **Contexte** : heure, adresse IP, force de l'authentification (`acr`), type d'appareil…

### 3.1 Une politique ABAC en langage naturel

> *« Autoriser la lecture d'un dossier médical si le service du sujet est "cardiologie" **et** que le service de la ressource est "cardiologie" **et** que la demande a lieu pendant les heures ouvrées **et** que le niveau d'authentification est MFA. »*

La même règle couvre *tous* les cardiologues et *tous* les dossiers de cardiologie, sans créer un seul rôle par combinaison. C'est la réponse directe à l'explosion des rôles de RBAC.

### 3.2 Exemple de politique (pseudo-Rego)

```rego
# Autorisation : accès en lecture aux dossiers de son propre service, en MFA
default allow = false

allow {
    input.action == "read"
    input.subject.department == input.resource.department
    input.subject.auth_level == "mfa"
    heures_ouvrees(input.context.time)
}
```

### 3.3 Forces et limites

**Forces** : granularité fine, politiques dynamiques (le contexte est évalué à la volée), passage à l'échelle sans multiplier les rôles, idéal pour les règles contextuelles (Zero Trust, accès conditionnel).

**Limites** : plus complexe à écrire et à raisonner ; l'audit *« qui peut accéder à quoi ? »* devient difficile car la réponse dépend d'attributs et du contexte au moment de la demande. La qualité des décisions dépend directement de la **qualité des attributs** (un attribut faux = une décision fausse).

## 4. ReBAC — le contrôle d'accès basé sur les relations

**ReBAC** (Relationship-Based Access Control) fonde la décision sur les **relations** entre le sujet et la ressource, modélisées comme un **graphe**. Popularisé par le papier **Google Zanzibar** (2019), le moteur d'autorisation derrière Google Drive, YouTube ou Calendar.

La question n'est plus « quel rôle ? » ni « quels attributs ? » mais **« quel lien existe entre cet utilisateur et cet objet ? »**.

### 4.1 Le modèle par tuples

Les relations sont stockées comme des **tuples** `objet#relation@sujet` :

```
document:rapport-q3#owner@user:cmartin
document:rapport-q3#viewer@group:equipe-finance#member
folder:2026#parent@document:rapport-q3
```

Un moteur ReBAC répond à des questions comme :
- *cmartin peut-il éditer `rapport-q3` ?* → il en est `owner`, donc oui.
- *un membre de `equipe-finance` peut-il le voir ?* → la relation `viewer` est accordée au groupe, donc oui.
- Les permissions **s'héritent le long du graphe** (le dossier parent propage ses droits au document).

### 4.2 Cas d'usage typiques

ReBAC brille pour les autorisations **par ressource** et le partage collaboratif :

- « L'utilisateur qui a **créé** ce ticket peut le fermer. »
- « Les membres de l'**équipe propriétaire** d'un dépôt peuvent le merger. »
- « L'accès à un dossier partagé se propage à tous ses fichiers. »

C'est le modèle des applications type Google Docs, GitHub, Notion — partout où « qui a accès » dépend de qui a partagé quoi avec qui.

### 4.3 Forces et limites

**Forces** : parfait pour les droits fins par objet et le partage transitif ; performant à grande échelle (Zanzibar sert des milliards d'objets) ; audit intuitif (on remonte le graphe).

**Limites** : nécessite un **moteur dédié** (OpenFGA, SpiceDB, Ory Keto) ; il faut maintenir le graphe de relations à jour ; moins adapté aux règles purement contextuelles (heure, IP) — sur ce point ABAC reste plus naturel.

## 5. Comparatif synthétique

| Critère | RBAC | ABAC | ReBAC |
|---|---|---|---|
| Décision basée sur | Rôles | Attributs + règles | Relations (graphe) |
| Granularité | Grossière à moyenne | Très fine | Fine, par objet |
| Contexte dynamique (heure, IP) | Non | **Oui** | Limité |
| Droits par ressource individuelle | Difficile | Possible | **Natif** |
| Facilité d'audit | **Élevée** | Faible à moyenne | Moyenne à élevée |
| Complexité de mise en œuvre | Faible | Élevée | Moyenne à élevée |
| Risque | Explosion des rôles | Politiques illisibles | Graphe à maintenir |
| Exemple d'outil | Annuaires, groupes AD/LDAP | OPA, XACML, Cedar | OpenFGA, SpiceDB |

## 6. Comment choisir (et pourquoi c'est souvent hybride)

Il n'y a pas de modèle « meilleur » dans l'absolu — il y a un modèle adapté à un besoin. Quelques repères :

- **Droits stables, alignés sur l'organigramme, audit prioritaire** → **RBAC**.
- **Règles contextuelles, conformité fine, Zero Trust** → **ABAC**.
- **Partage collaboratif, droits par objet, propagation** → **ReBAC**.

### 6.1 L'approche hybride RBAC + ABAC

En pratique, la combinaison la plus répandue est **RBAC pour la base, ABAC pour les nuances**. On garde des rôles lisibles pour l'ossature (« RH », « Comptable ») et on ajoute des règles ABAC pour les conditions (« …mais seulement pour son établissement, en MFA »). On parle alors de **PBAC** (Policy-Based Access Control) : une couche de politiques qui orchestre rôles *et* attributs.

> **Règle de décision pragmatique**
> Commencez par RBAC. Le jour où vous créez des rôles du type `Role-Region-Service-LectureSeule`, c'est le signal d'ajouter de l'ABAC. Le jour où la question devient « qui a partagé cet objet avec qui », regardez ReBAC.

## 7. L'architecture d'autorisation : PDP, PEP, PIP, PAP

Au-delà du modèle, l'autorisation moderne s'**externalise** de l'application dans un service dédié. Le vocabulaire (issu de XACML) structure toute architecture d'autorisation :

- **PEP** (Policy Enforcement Point) : le point qui *applique* la décision — une API gateway, un middleware, un reverse-proxy. Il intercepte la requête et interroge le PDP.
- **PDP** (Policy Decision Point) : le moteur qui *décide* en évaluant les politiques (autorisé / refusé).
- **PIP** (Policy Information Point) : la source des attributs manquants (annuaire, base RH, API).
- **PAP** (Policy Administration Point) : l'interface où l'on *écrit et gère* les politiques.

```
   Requête          ┌─────┐   décision   ┌─────┐
utilisateur ─────▶  │ PEP │ ───────────▶ │ PDP │
                    └─────┘  ◀─────────── └─────┘
                                            │  a besoin d'attributs
                                            ▼
                                          ┌─────┐
                                          │ PIP │  (annuaire, RH…)
                                          └─────┘
```

L'intérêt : **découpler la logique d'autorisation du code applicatif**. Les règles évoluent sans redéployer les applications, et la décision est centralisée et auditable.

## 8. Standards et outils

| Outil / standard | Modèle dominant | Notes |
|---|---|---|
| **XACML** | ABAC | Standard OASIS historique, en XML, très complet mais verbeux |
| **OPA / Rego** | ABAC / PBAC | Open Policy Agent (CNCF), politiques en langage Rego, très répandu en cloud-native |
| **Cedar** | RBAC + ABAC | Langage d'AWS (Verified Permissions), lisible et analysable formellement |
| **OpenFGA** | ReBAC | Implémentation open source inspirée de Zanzibar (CNCF) |
| **SpiceDB** | ReBAC | Moteur Zanzibar-like par Authzed |
| **Ory Keto** | ReBAC | Serveur de permissions open source |

Le **JWT** joue ici un rôle clé : les rôles (`roles`), groupes (`groups`) et portées (`scope`) transportés dans un token issu de l'authentification servent souvent d'attributs d'entrée au PDP. C'est le pont entre AuthN et AuthZ — vous pouvez inspecter ces claims avec le [décodeur JWT](/outils/decodeur-jwt/).

## 9. L'autorisation dans les solutions IAM

- **Microsoft Entra ID** : RBAC via les *rôles d'annuaire* et Azure RBAC (scopes), enrichi par le **Conditional Access** — qui est de l'ABAC de fait (décision selon l'utilisateur, l'appareil, la localisation, le risque). **PIM** ajoute l'attribution *just-in-time* des rôles à privilèges.
- **ForgeRock / Ping** : moteur de politiques d'AM combinant sujets, ressources et conditions (ABAC), au-delà du simple mapping de rôles.
- **Keycloak** : rôles *realm* et *client* (RBAC), plus des politiques fines (attributs, temps, agrégats) via l'**Authorization Services** basé sur UMA 2.0.
- **Active Directory / OpenLDAP** : historiquement du RBAC par **groupes** ; les groupes d'annuaire restent la brique d'autorisation la plus déployée en entreprise.

## 10. Bonnes pratiques et conclusion

- **Moindre privilège** : n'accordez que le strict nécessaire, quel que soit le modèle.
- **Externalisez la décision** (PDP) dès que la logique se complexifie : ne codez pas les règles en dur dans chaque application.
- **Testez vos politiques** comme du code : une règle d'autorisation mérite des tests unitaires (cas autorisés *et* refusés).
- **Soignez la qualité des attributs** : en ABAC/ReBAC, une décision ne vaut que ce que valent les données qui l'alimentent.
- **Auditez régulièrement** : revues d'accès (recertification), détection des droits dormants, contrôle des contraintes SoD.
- **Restez pragmatique** : RBAC couvre l'immense majorité des besoins. N'ajoutez de l'ABAC ou du ReBAC que là où la valeur le justifie.

**En résumé** : RBAC répond à *« quelle est ta fonction ? »*, ABAC à *« dans quelles conditions ? »*, ReBAC à *« quel est ton lien avec l'objet ? »*. Les architectures matures les combinent derrière une couche de politiques (PBAC) et un point de décision centralisé. Le bon réflexe n'est pas de choisir le modèle le plus puissant, mais le plus simple qui réponde au besoin — et de le faire évoluer quand la complexité l'exige.
