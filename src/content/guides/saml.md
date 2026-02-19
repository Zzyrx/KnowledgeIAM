---
title: "Guide Complet SAML 2.0"
description: "Guide technique exhaustif sur le protocole SAML 2.0 : composants, assertions, bindings, profils, flux d'authentification, sécurité et métadonnées."
author: "Jean-Baptiste Janssen"
tags: [saml, sso, federation, security]
chapters: 10
readingTime: "45 min"
---

## 1. Introduction à SAML

### 1.1 Qu'est-ce que SAML ?

**SAML** (Security Assertion Markup Language) est un standard ouvert basé sur XML pour l'échange de données d'authentification et d'autorisation entre différentes parties, principalement entre un **Identity Provider** (fournisseur d'identité) et un **Service Provider** (fournisseur de services).

En termes simples, SAML permet à un utilisateur de se connecter une seule fois (Single Sign-On ou SSO) et d'accéder ensuite à plusieurs applications sans avoir à s'authentifier à nouveau auprès de chacune d'elles.

> **Analogie Simple**
> Imaginez SAML comme un passeport numérique. Votre pays d'origine (l'IdP) certifie votre identité. Lorsque vous voyagez vers un autre pays (le SP), ce pays fait confiance à votre passeport sans avoir à vérifier votre identité lui-même.

### 1.2 Pourquoi utiliser SAML ?

#### Single Sign-On (SSO)

Une seule authentification donne accès à toutes les applications configurées, améliorant l'expérience utilisateur.

#### Sécurité Renforcée

Les mots de passe ne sont jamais transmis aux applications. Seules des assertions signées et chiffrées circulent.

#### Gestion Centralisée

Les identités sont gérées en un point central, simplifiant l'administration et l'audit.

#### Interopérabilité

Standard ouvert supporté par de nombreux fournisseurs (Microsoft, Google, Okta, etc.).

### 1.3 Historique et Versions

| Version | Année | Description |
|---------|-------|-------------|
| **SAML 1.0** | 2002 | Première version adoptée comme standard OASIS |
| **SAML 1.1** | 2003 | Corrections mineures et améliorations de clarté |
| **SAML 2.0** | 2005 | Version majeure actuelle - fusion de SAML 1.1, Liberty Alliance ID-FF et Shibboleth |

> **Important**
> Ce document se concentre sur **SAML 2.0**, qui est la version standard utilisée aujourd'hui. SAML 1.x est considéré comme obsolète.

## 2. Composants Principaux

L'architecture SAML repose sur trois acteurs principaux qui interagissent pour permettre l'authentification fédérée :

- **User Agent** (Navigateur Web)
- **Identity Provider (IdP)** : Authentifie les utilisateurs
- **Service Provider (SP)** : Fournit le service/application

Le flux général est le suivant :
1. L'utilisateur s'authentifie auprès de l'IdP
2. L'utilisateur accède au service via le SP
3. L'IdP émet une Assertion SAML pour le SP

Une relation de confiance est établie entre l'IdP et le SP.

### 2.1 Identity Provider (IdP)

L'**Identity Provider** est l'entité responsable de l'authentification des utilisateurs et de la génération des assertions SAML.

**Responsabilités de l'IdP :**

- Authentifier les utilisateurs (vérifier identifiant/mot de passe, MFA, etc.)
- Générer et signer les assertions SAML
- Maintenir les sessions utilisateur
- Fournir les attributs utilisateur aux SPs
- Gérer le Single Logout (SLO)

**Exemples d'IdP :** Microsoft ADFS, Entra ID (Azure AD), Okta, Ping Identity, Shibboleth IdP, Keycloak, OpenLDAP + SimpleSAMLphp

### 2.2 Service Provider (SP)

Le **Service Provider** est l'application ou le service auquel l'utilisateur souhaite accéder. Le SP fait confiance à l'IdP pour authentifier les utilisateurs.

**Responsabilités du SP :**

- Rediriger les utilisateurs non authentifiés vers l'IdP
- Valider les assertions SAML reçues (signature, validité temporelle)
- Extraire les informations utilisateur des assertions
- Créer et gérer les sessions locales
- Contrôler l'accès aux ressources

### 2.3 User Agent

Le **User Agent** est généralement le navigateur web de l'utilisateur. Il transporte les messages SAML entre l'IdP et le SP via des redirections HTTP ou des formulaires POST.

> **Point Important**
> Dans SAML, l'IdP et le SP ne communiquent pas directement entre eux. Toutes les communications passent par le navigateur de l'utilisateur (sauf dans certains bindings comme l'Artifact binding).

## 3. Assertions SAML

Une **assertion SAML** est un document XML émis par l'Identity Provider qui contient des déclarations (statements) concernant un sujet (généralement un utilisateur). C'est le cœur du protocole SAML.

Une assertion SAML contient trois types de statements :

- **Authentication Statement** : "Qui est l'utilisateur" - Identité vérifiée, méthode d'authentification, date/heure
- **Attribute Statement** : "Ses caractéristiques" - Email, nom/prénom, groupes/rôles
- **Authorization Decision** : "Ce qu'il peut faire" - Permit/Deny, ressource ciblée, action autorisée

### 3.1 Types de Statements

#### Authentication Statement

Déclare que le sujet a été authentifié par l'IdP à un moment donné avec une méthode spécifique.

| Élément | Description | Exemple |
|---------|-------------|---------|
| `AuthnInstant` | Timestamp de l'authentification | `2025-01-30T10:30:00Z` |
| `SessionIndex` | Identifiant de session unique | `_abc123def456` |
| `AuthnContext` | Contexte/méthode d'authentification | Password, X509, Kerberos, MFA |

#### Attribute Statement

Contient les attributs associés au sujet (email, nom, groupes, etc.).

> **Attributs Courants**
>
> - `urn:oid:0.9.2342.19200300.100.1.3` - Email (mail)
> - `urn:oid:2.5.4.42` - Prénom (givenName)
> - `urn:oid:2.5.4.4` - Nom (sn)
> - `urn:oid:2.5.4.3` - Nom complet (cn)

#### Authorization Decision Statement

Déclare si le sujet est autorisé à effectuer une action sur une ressource donnée. Ce type est moins fréquemment utilisé.

### 3.2 Structure XML d'une Assertion

```xml
<!-- Exemple d'Assertion SAML 2.0 -->
<saml:Assertion
  xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
  ID="_assertion_abc123"
  Version="2.0"
  IssueInstant="2025-01-30T10:30:00Z">

  <!-- Émetteur de l'assertion (IdP) -->
  <saml:Issuer>https://idp.example.com/saml2</saml:Issuer>

  <!-- Signature numérique XML -->
  <ds:Signature>...</ds:Signature>

  <!-- Sujet de l'assertion (l'utilisateur) -->
  <saml:Subject>
    <saml:NameID Format="...emailAddress">
      user@example.com
    </saml:NameID>
    <saml:SubjectConfirmation Method="...bearer">
      <saml:SubjectConfirmationData
        NotOnOrAfter="2025-01-30T10:35:00Z"
        Recipient="https://sp.example.com/saml/acs"/>
    </saml:SubjectConfirmation>
  </saml:Subject>

  <!-- Conditions de validité -->
  <saml:Conditions
    NotBefore="2025-01-30T10:29:00Z"
    NotOnOrAfter="2025-01-30T10:35:00Z">
    <saml:AudienceRestriction>
      <saml:Audience>https://sp.example.com</saml:Audience>
    </saml:AudienceRestriction>
  </saml:Conditions>

  <!-- Statement d'authentification -->
  <saml:AuthnStatement
    AuthnInstant="2025-01-30T10:28:00Z"
    SessionIndex="_session_def456">
    <saml:AuthnContext>
      <saml:AuthnContextClassRef>
        urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport
      </saml:AuthnContextClassRef>
    </saml:AuthnContext>
  </saml:AuthnStatement>

  <!-- Statement d'attributs -->
  <saml:AttributeStatement>
    <saml:Attribute Name="email">
      <saml:AttributeValue>user@example.com</saml:AttributeValue>
    </saml:Attribute>
    <saml:Attribute Name="groups">
      <saml:AttributeValue>admin</saml:AttributeValue>
      <saml:AttributeValue>developers</saml:AttributeValue>
    </saml:Attribute>
  </saml:AttributeStatement>
</saml:Assertion>
```

#### Formats de NameID

| Format | URI | Exemple |
|--------|-----|---------|
| Email Address | `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` | user@example.com |
| Unspecified | `urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified` | Tout identifiant |
| Persistent | `urn:oasis:names:tc:SAML:2.0:nameid-format:persistent` | Identifiant opaque persistant |
| Transient | `urn:oasis:names:tc:SAML:2.0:nameid-format:transient` | Identifiant temporaire unique |

## 4. Bindings SAML

Les **bindings SAML** définissent comment les messages SAML sont transportés entre les parties. Chaque binding utilise un mécanisme de transport différent.

**Vue d'ensemble des Bindings SAML 2.0 :**

| Binding | Transport | Encodage | Particularité |
|---------|-----------|----------|---------------|
| **HTTP Redirect** | URL Query String | Base64 + Deflate | Messages <= 8KB |
| **HTTP POST** | Form Hidden Field | Base64 encoded | Messages volumineux |
| **HTTP Artifact** | Référence courte | Back-channel | Haute sécurité |
| **SOAP** | Direct HTTPS | Back-channel only | Artifact Resolution |
| **PAOS** | Reverse SOAP | ECP Profile | Clients non-browser |

Front-channel : HTTP Redirect, HTTP POST | Back-channel : HTTP Artifact, SOAP, PAOS

### 4.1 HTTP Redirect Binding

Encode le message SAML dans les paramètres de l'URL. C'est le binding le plus léger, utilisé principalement pour les **AuthnRequest**.

#### Processus d'encodage

1. **Compression** : Le message XML est compressé avec DEFLATE
2. **Encodage Base64** : Le message compressé est encodé en Base64
3. **URL Encoding** : Le résultat est encodé pour l'URL
4. **Signature** : Une signature est ajoutée comme paramètre séparé (optionnel)

#### Exemple d'URL

```
https://idp.example.com/saml2/sso?
  SAMLRequest=fZJNT8MwDIb%2FSuR7k...   <-- Message encodé
  &RelayState=token123                  <-- État de session
  &SigAlg=http%3A%2F%2F...sha256       <-- Algorithme de signature
  &Signature=ABCdef123...               <-- Signature
```

> **Limitation**
> La taille des URL est limitée (~8 KB). Ce binding n'est pas adapté aux messages volumineux comme les réponses SAML.

### 4.2 HTTP POST Binding

Transmet le message SAML dans le corps d'une requête POST via un formulaire HTML auto-soumis. Recommandé pour les **Response** SAML.

#### Exemple de formulaire

```html
<html>
<body onload="document.forms[0].submit()">
  <form method="POST" action="https://sp.example.com/saml/acs">
    <input type="hidden" name="SAMLResponse"
           value="PHNhbWxwOlJlc3BvbnNlI..."/>
    <input type="hidden" name="RelayState" value="token123"/>
    <noscript><input type="submit" value="Continuer"/></noscript>
  </form>
</body></html>
```

**Avantages :**

- Supporte les messages de grande taille
- La signature peut être incluse dans le message XML
- Plus sécurisé (pas d'exposition dans les logs serveur)

### 4.3 HTTP Artifact Binding

Utilise une référence courte (l'artifact) au lieu du message complet. Le destinataire récupère le message réel via un canal back-channel sécurisé.

**Structure d'un Artifact :**

```
TypeCode (2 bytes) + EndpointIndex (2 bytes) + SourceID (20 bytes) + MessageHandle (20 bytes)
  0x0004               0x0000                   SHA-1(EntityID)      Random 20 bytes
```

> **Cas d'utilisation**
> Recommandé lorsque la sécurité est critique. L'assertion transite uniquement sur un canal back-channel sécurisé.

### 4.4 SOAP Binding

Encapsule les messages SAML dans des enveloppes SOAP et les transmet directement entre IdP et SP via HTTPS (back-channel). Utilisé pour :

- La résolution d'artifacts (`ArtifactResolve`)
- Les requêtes d'attributs (`AttributeQuery`)
- Les requêtes d'autorisation

### Comparaison des Bindings

| Caractéristique | HTTP Redirect | HTTP POST | HTTP Artifact | SOAP |
|-----------------|---------------|-----------|---------------|------|
| Taille max message | ~8 KB | Illimitée | 44 bytes | Illimitée |
| Via navigateur | Oui | Oui | Partiellement | Non |
| Compression | DEFLATE | Non | Non | Non |
| Sécurité | Moyenne | Bonne | Excellente | Excellente |
| Cas d'usage principal | AuthnRequest | Response | Haute sécurité | Back-channel |

## 5. Profils SAML

Les **profils SAML** définissent des cas d'usage complets en spécifiant quels composants (assertions, protocoles, bindings) utiliser ensemble.

### 5.1 Web Browser SSO Profile

#### Web Browser Single Sign-On Profile

C'est le profil le plus utilisé de SAML. Il définit deux flux principaux :

- **SP-Initiated SSO** : L'utilisateur commence par accéder au SP
- **IdP-Initiated SSO** : L'utilisateur commence par se connecter à l'IdP

| Message | Bindings recommandés |
|---------|---------------------|
| AuthnRequest (SP -> IdP) | HTTP Redirect, HTTP POST, HTTP Artifact |
| Response (IdP -> SP) | HTTP POST, HTTP Artifact |

> **Configuration courante**
> La combinaison la plus fréquente : **HTTP Redirect** pour l'AuthnRequest et **HTTP POST** pour la Response.

### 5.2 Single Logout (SLO) Profile

#### Single Logout Profile

Permet de déconnecter un utilisateur de toutes ses sessions (IdP et tous les SPs) en une seule action.

**Flux Single Logout (SLO) :**

1. L'utilisateur initie la déconnexion depuis SP-A
2. SP-A envoie un `LogoutRequest` à l'IdP
3. L'IdP envoie un `LogoutRequest` à SP-B
4. SP-B répond avec un `LogoutResponse`
5. L'IdP envoie un `LogoutRequest` à SP-C
6. SP-C répond avec un `LogoutResponse`
7. L'IdP envoie un `LogoutResponse` à SP-A

> **Challenges du SLO**
> Le SLO est difficile à implémenter correctement car il nécessite la coordination de multiples parties. Si un SP est indisponible, la chaîne peut être interrompue.

## 6. Flux d'Authentification Détaillés

### 6.1 SP-Initiated SSO

L'utilisateur tente d'accéder à une ressource protégée sur le SP, qui le redirige vers l'IdP pour authentification.

**Flux SP-Initiated SSO (HTTP Redirect + POST) :**

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Utilisateur  │     │      SP      │     │      IdP     │
│  (Navigateur) │     │  (Service    │     │  (Identity   │
│              │     │   Provider)  │     │   Provider)  │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                     │
       │  1. Accès ressource│                     │
       │    protégée        │                     │
       │───────────────────>│                     │
       │                    │                     │
       │  2. 302 Redirect   │                     │
       │  + AuthnRequest    │                     │
       │  (HTTP Redirect    │                     │
       │   Binding)         │                     │
       │<───────────────────│                     │
       │                    │                     │
       │  3. GET /sso?SAMLRequest=...             │
       │─────────────────────────────────────────>│
       │                    │                     │
       │  4. Authentification                     │
       │     (login/password, MFA...)             │
       │<────────────────────────────────────────>│
       │                    │                     │
       │  5. Formulaire HTML auto-submit          │
       │     avec SAMLResponse signée             │
       │     (HTTP POST Binding)                  │
       │<─────────────────────────────────────────│
       │                    │                     │
       │  6. POST /acs      │                     │
       │  (SAMLResponse)    │                     │
       │───────────────────>│                     │
       │                    │                     │
       │                    │  7. Valide assertion │
       │                    │  (signature, conditions,
       │                    │   audience, timestamps)
       │                    │                     │
       │  8. Session créée  │                     │
       │  + accès accordé   │                     │
       │<───────────────────│                     │
       │                    │                     │
```

*Figure : Flux SP-Initiated SSO complet*

**Étapes détaillées :**

1. L'utilisateur accède à une ressource protégée sur le SP
2. Le SP redirige vers l'IdP avec un AuthnRequest (302 Redirect + SAMLRequest via HTTP Redirect)
3. Le navigateur suit la redirection
4. L'IdP authentifie l'utilisateur (vérification des credentials)
5. L'IdP génère un formulaire auto-submit avec la SAMLResponse (HTTP POST Binding)
6. Le navigateur POST la SAMLResponse vers le SP (ACS)
7. Le SP valide l'assertion et crée une session locale

### 6.2 IdP-Initiated SSO

L'utilisateur s'authentifie d'abord auprès de l'IdP (portail d'entreprise), puis sélectionne l'application.

> **Considérations de sécurité**
> Le flux IdP-Initiated est considéré comme **moins sécurisé** car :
>
> - Pas de protection contre les attaques de rejeu (pas d'`InResponseTo`)
> - Pas de possibilité pour le SP de spécifier ses exigences
> - Certains SPs modernes ne le supportent plus

## 7. Sécurité

La sécurité est au cœur de SAML. Le protocole utilise plusieurs mécanismes pour garantir l'intégrité, l'authenticité et la confidentialité.

### 7.1 Signatures XML

Les signatures XML garantissent l'**intégrité** et l'**authenticité** des messages SAML.

| Élément | Signataire | Obligatoire ? |
|---------|------------|---------------|
| AuthnRequest | SP | Recommandé |
| Response | IdP | Recommandé |
| Assertion | IdP | **Obligatoire** |
| LogoutRequest | Initiateur | Recommandé |

#### Algorithmes recommandés

```xml
<!-- RSA avec SHA-256 (recommandé) -->
http://www.w3.org/2001/04/xmldsig-more#rsa-sha256

<!-- RSA avec SHA-512 -->
http://www.w3.org/2001/04/xmldsig-more#rsa-sha512

<!-- À ÉVITER : RSA avec SHA-1 (déprécié) -->
http://www.w3.org/2000/09/xmldsig#rsa-sha1
```

### 7.2 Chiffrement

Le chiffrement protège la **confidentialité** des données sensibles.

- **Assertion complète** (`EncryptedAssertion`) - le plus courant
- **NameID** (`EncryptedID`)
- **Attributs individuels** (`EncryptedAttribute`)

### 7.3 Bonnes Pratiques

#### Validation des assertions

- Toujours vérifier la signature
- Vérifier `NotBefore` et `NotOnOrAfter`
- Vérifier l'`Audience` et l'`Issuer`
- Vérifier `InResponseTo`

#### Protection des clés

- Utiliser des clés RSA >= 2048 bits
- Stocker les clés privées de façon sécurisée
- Rotation régulière des certificats

#### Transport sécurisé

- Toujours utiliser HTTPS (TLS 1.2+)
- Valider les certificats TLS
- Configurer HSTS

#### Gestion du temps

- Synchroniser les horloges (NTP)
- Tolérance de clock skew raisonnable
- Protection contre le rejeu

> **Vulnérabilités courantes à éviter**
>
> - **XML Signature Wrapping (XSW)** : Valider que la signature couvre l'élément attendu
> - **Injection XXE** : Désactiver le traitement des entités externes XML
> - **Replay attacks** : Implémenter une cache des ID d'assertions déjà vues
> - **Signature bypass** : Ne jamais accepter d'assertions non signées

## 8. Métadonnées SAML

Les **métadonnées SAML** sont des documents XML décrivant les capacités et la configuration d'une entité SAML.

| Élément | Description |
|---------|-------------|
| `EntityID` | Identifiant unique de l'entité (généralement une URL) |
| `SingleSignOnService` | URLs des endpoints SSO de l'IdP |
| `AssertionConsumerService` | URLs des endpoints ACS du SP |
| `SingleLogoutService` | URLs des endpoints SLO |
| `KeyDescriptor` | Certificats pour signature et chiffrement |
| `NameIDFormat` | Formats de NameID supportés |

#### Exemple de métadonnées IdP

```xml
<md:EntityDescriptor
  xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata"
  entityID="https://idp.example.com">
  <md:IDPSSODescriptor
    protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <md:KeyDescriptor use="signing">
      <ds:KeyInfo><ds:X509Data>
        <ds:X509Certificate>MIIC...=</ds:X509Certificate>
      </ds:X509Data></ds:KeyInfo>
    </md:KeyDescriptor>
    <md:NameIDFormat>urn:oasis:...:emailAddress</md:NameIDFormat>
    <md:SingleSignOnService
      Binding="urn:oasis:...:HTTP-Redirect"
      Location="https://idp.example.com/saml2/sso"/>
    <md:SingleSignOnService
      Binding="urn:oasis:...:HTTP-POST"
      Location="https://idp.example.com/saml2/sso"/>
  </md:IDPSSODescriptor>
</md:EntityDescriptor>
```

**Avantages des métadonnées :**

- **Configuration automatique** : Import/export facile
- **Rotation de clés** : Possibilité d'inclure plusieurs certificats
- **Validation** : Possibilité de signer les métadonnées

## 9. SAML vs Autres Protocoles

SAML n'est pas le seul protocole de fédération d'identité. Voici une comparaison :

| Critère | SAML 2.0 | OAuth 2.0 / OIDC | WS-Federation |
|---------|----------|-------------------|---------------|
| Format des tokens | XML | JSON (JWT) | XML |
| Complexité | Élevée | Moyenne | Élevée |
| Cas d'usage principal | Enterprise SSO | API, Mobile, Web moderne | Enterprise Microsoft |
| Taille des messages | Volumineuse | Compacte | Volumineuse |
| Support mobile | Limité (ECP) | Excellent | Limité |
| Année | 2005 | 2012 / 2014 | 2009 |

### Quand utiliser quel protocole ?

**SAML 2.0 :**
- SSO entreprise
- Applications legacy
- Fédération B2B
- Intégration LDAP/AD
- Points forts : Maturité, sécurité forte

**OAuth 2.0 / OIDC :**
- Applications mobiles
- APIs REST
- SPA / Web moderne
- Social login
- Points forts : Modernité, flexibilité

**WS-Federation :**
- Environnement Microsoft
- ADFS
- SharePoint
- Office 365
- Points forts : Écosystème Microsoft

## 10. Glossaire

Définitions des termes techniques utilisés dans cette documentation.

| Terme | Définition |
|-------|-----------|
| **ACS (Assertion Consumer Service)** | Endpoint du SP qui reçoit et traite les réponses SAML contenant les assertions. |
| **Artifact** | Référence courte (44 bytes) représentant un message SAML, utilisée dans le binding Artifact. |
| **Assertion** | Document XML signé émis par l'IdP contenant des déclarations sur un sujet. C'est la "preuve" d'identité dans SAML. |
| **Authentication Context** | Information sur la méthode et la force de l'authentification (mot de passe, certificat, MFA). |
| **AuthnRequest** | Message SAML envoyé par le SP à l'IdP pour demander l'authentification d'un utilisateur. |
| **Back-channel** | Communication directe entre IdP et SP via HTTPS, sans passer par le navigateur. Plus sécurisé. |
| **Binding** | Mécanisme de transport des messages SAML (HTTP Redirect, HTTP POST, SOAP, etc.). |
| **Certificate (Certificat X.509)** | Document électronique liant une clé publique à une identité. Utilisé pour signer et chiffrer. |
| **Circle of Trust** | Ensemble d'IdPs et SPs ayant établi des relations de confiance mutuelles. |
| **Clock Skew** | Différence de temps entre les horloges de l'IdP et du SP. Une tolérance est configurée. |
| **DEFLATE** | Algorithme de compression utilisé dans le binding HTTP Redirect. |
| **ECP (Enhanced Client or Proxy)** | Profil SAML pour les clients "intelligents" (applications mobiles, agents). |
| **EntityID** | Identifiant unique et global d'une entité SAML (IdP ou SP). Généralement une URL. |
| **Fédération d'identité** | Système permettant de partager les identités entre plusieurs domaines de sécurité distincts. |
| **Front-channel** | Communication entre IdP et SP via le navigateur (redirections, formulaires). Moins sécurisé. |
| **Identity Provider (IdP)** | Entité qui authentifie les utilisateurs et émet des assertions SAML. |
| **Issuer** | Élément SAML identifiant l'entité ayant émis le message ou l'assertion. |
| **OASIS** | Organization for the Advancement of Structured Information Standards. Développe et maintient SAML. |
| **OIDC (OpenID Connect)** | Couche d'identité sur OAuth 2.0. Alternative moderne à SAML utilisant JSON/JWT. |
| **Profile (Profil)** | Spécification définissant comment combiner les composants SAML pour un cas d'usage. |
| **RelayState** | Paramètre transmis avec les messages SAML pour maintenir l'état de l'application. |
| **Replay Attack** | Attaque consistant à rejouer une assertion SAML valide pour usurper une identité. |
| **Service Provider (SP)** | Application qui s'appuie sur l'IdP pour authentifier les utilisateurs. |
| **SessionIndex** | Identifiant unique de session émis par l'IdP. Utilisé pour le Single Logout. |
| **Single Logout (SLO)** | Mécanisme déconnectant un utilisateur de toutes ses sessions simultanément. |
| **Single Sign-On (SSO)** | Mécanisme permettant une authentification unique pour accéder à plusieurs applications. |
| **SOAP** | Simple Object Access Protocol. Protocole XML utilisé pour la communication back-channel. |
| **Subject** | L'entité à propos de laquelle l'assertion fait des déclarations. Contient le NameID. |
| **Subject Confirmation** | Mécanisme permettant au SP de vérifier que l'assertion est présentée par le bon sujet. |
| **Trust Relationship** | Accord entre IdP et SP permettant l'échange d'assertions. |
| **User Agent** | Application cliente (navigateur) transportant les messages SAML entre IdP et SP. |
| **WAYF (Where Are You From)** | Service de découverte d'IdP aidant l'utilisateur à sélectionner son fournisseur d'identité. |
| **XML Digital Signature (XMLDSig)** | Standard W3C pour la signature numérique de documents XML. |
| **XML Encryption (XMLEnc)** | Standard W3C pour le chiffrement de documents XML. |
| **XSW (XML Signature Wrapping)** | Vulnérabilité où un attaquant manipule la structure XML pour que la signature soit valide mais appliquée à un élément différent. |
