---
title: "Guide Complet OpenID Connect (OIDC)"
description: "Guide technique exhaustif sur OpenID Connect : tokens JWT, flows d'authentification, scopes, claims, endpoints, sécurité et bonnes pratiques."
author: "Jean-Baptiste Janssen"
tags: [oidc, oauth2, sso, jwt, security]
chapters: 10
readingTime: "50 min"
---

## 1. Introduction à OpenID Connect

### 1.1 Qu'est-ce qu'OpenID Connect ?
**OpenID Connect (OIDC)** est une couche d'identité construite au-dessus du protocole **OAuth 2.0**. Il permet aux applications de vérifier l'identité d'un utilisateur et d'obtenir des informations de profil basiques de manière standardisée.


Publié en 2014 par l'OpenID Foundation, OIDC est devenu le standard de facto pour l'authentification moderne, utilisé par Google, Microsoft, Facebook, et des milliers d'autres fournisseurs.


Analogie Simple
Si **OAuth 2.0** est comme une clé de voiture qui vous permet d'utiliser le véhicule (autorisation), **OIDC** ajoute votre permis de conduire qui prouve qui vous êtes (authentification). OAuth 2.0 dit "cette personne peut accéder à X", OIDC dit "cette personne EST Jean Dupont".


### 1.2 OAuth 2.0 vs OpenID Connect
Il est crucial de comprendre la différence entre ces deux protocoles :


-


OAuth 2.0 vs OpenID Connect


OAuth 2.0
Framework d'AUTORISATION

Déléguer l'accès à des ressources
Access Token pour les APIs
Ne dit PAS qui est l'utilisateur
Pas de format de token standard


OpenID Connect
Protocole d'AUTHENTIFICATION

Vérifie l'identité de l'utilisateur
ID Token standardisé (JWT)
Claims utilisateur normalisés
Endpoint UserInfo


+


Figure 1 : OAuth 2.0 gère l'autorisation, OIDC ajoute l'authentification


| Aspect | OAuth 2.0 | OpenID Connect |

| Objectif principal | Autorisation (accès aux ressources) | Authentification (identité utilisateur) |
| Question répondue | "Peut-il accéder à X ?" | "Qui est cette personne ?" |
| Token principal | Access Token | ID Token (+ Access Token) |
| Format du token | Non spécifié (opaque) | JWT obligatoire pour ID Token |
| Infos utilisateur | Non standardisé | Claims standardisés + UserInfo endpoint |


### 1.3 Pourquoi utiliser OIDC ?


####  Moderne et Léger
Basé sur JSON/REST, idéal pour les applications web modernes, mobiles et les SPAs. Messages compacts comparés à SAML/XML.


####  Mobile-Friendly
Conçu avec les applications mobiles en tête. PKCE pour les clients publics, support natif des apps.


####  Facile à Implémenter
Librairies disponibles dans tous les langages. Discovery automatique via .well-known.


####  Adoption Massive
Supporté par Google, Microsoft, Facebook, Apple, et tous les grands fournisseurs d'identité.


## 2. Composants Principaux
L'architecture OIDC implique trois acteurs principaux qui collaborent pour authentifier les utilisateurs :


Architecture OpenID Connect


END USER
(Utilisateur final)
Navigateur / App Mobile


OPENID PROVIDER
(OP / Authorization Server)
• Authentifie l'utilisateur
• Émet les tokens (ID, Access)
• Fournit les claims


RELYING PARTY
(RP / Client Application)
• Demande l'authentification
• Valide les tokens
• Utilise les claims


1. Authentification


2. Accès App


3. Tokens (ID + Access)


ID Token (JWT)
+ Access Token

Figure 2 : Architecture OpenID Connect avec les trois acteurs principaux


### 2.1 OpenID Provider (OP)
L'**OpenID Provider** (aussi appelé **Authorization Server** ou **Identity Provider**) est le serveur qui authentifie les utilisateurs et émet les tokens.


Responsabilités de l'OP

Authentifier les utilisateurs (identifiant/mot de passe, MFA, biométrie...)
- Gérer le consentement utilisateur pour les scopes demandés
- Émettre les ID Tokens et Access Tokens
- Exposer l'endpoint UserInfo pour les informations de profil
- Publier les métadonnées de configuration (Discovery)
- Gérer les clés de signature (JWKS)


**Exemples d'OpenID Providers :**


- Google Identity Platform
- Microsoft Entra ID (Azure AD)
- Okta / Auth0
- Keycloak
- AWS Cognito
- Apple Sign In


### 2.2 Relying Party (RP)
Le **Relying Party** (aussi appelé **Client**) est l'application qui demande l'authentification de l'utilisateur. Elle "s'appuie" (relies) sur l'OP pour vérifier l'identité.


Responsabilités du RP

- Rediriger l'utilisateur vers l'OP pour l'authentification
- Recevoir et valider l'ID Token
- Vérifier la signature du token et ses claims
- Créer une session locale pour l'utilisateur
- Utiliser l'Access Token pour appeler des APIs protégées


#### Types de Clients

| Type | Description | Exemple | Flow recommandé |

| **Confidential** | Peut garder un secret (client_secret) | Application serveur (Node.js, Java...) | Authorization Code |
| **Public** | Ne peut PAS garder de secret | SPA, App mobile, Desktop | Authorization Code + PKCE |


### 2.3 End User
L'**End User** est l'utilisateur final qui souhaite accéder à l'application. Il interagit avec le Relying Party et s'authentifie auprès de l'OpenID Provider.


Le rôle du User Agent
Le navigateur web ou l'application mobile de l'utilisateur joue un rôle crucial : il transporte les requêtes et réponses entre le RP et l'OP via des redirections HTTP.


## 3. Tokens OIDC
OIDC utilise trois types de tokens, chacun avec un rôle spécifique. L'**ID Token** est l'élément distinctif d'OIDC par rapport à OAuth 2.0.


Les Trois Types de Tokens


ID TOKEN
Format: JWT obligatoire
• Prouve l'identité
• Contient les claims utilisateur
• Signé par l'OP
• Destiné au RP uniquement

Usage: Authentification
"Qui est l'utilisateur"


ACCESS TOKEN
Format: JWT ou Opaque
• Autorise l'accès aux APIs
• Courte durée de vie
• Contient les scopes accordés
• Envoyé en header Authorization

Usage: Autorisation API
"Ce qu'il peut faire"


REFRESH TOKEN
Format: Opaque
• Obtient de nouveaux tokens
• Longue durée de vie
• Stocké de façon sécurisée
• Usage unique (rotation)

Usage: Renouvellement
"Prolonger la session"

Figure 3 : Les trois types de tokens OIDC et leurs usages


### 3.1 ID Token (JWT)
L'**ID Token** est l'élément clé qui différencie OIDC d'OAuth 2.0. C'est un **JSON Web Token (JWT)** qui contient des informations sur l'authentification et l'identité de l'utilisateur.


#### Structure d'un JWT
Un JWT est composé de trois parties séparées par des points (`.`) :


Structure d'un JSON Web Token (JWT)


HEADER
Algorithme + Type
Base64URL encoded


.


PAYLOAD
Claims (données)
Base64URL encoded


.


SIGNATURE
Vérification intégrité
Base64URL encoded


eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMjM0In0.SflKxwRJSM...

Figure 4 : Les trois parties d'un JWT séparées par des points


#### Exemple d'ID Token décodé
 ```
// HEADER
{
 "alg": "RS256", // Algorithme de signature
 "typ": "JWT", // Type de token
 "kid": "abc123" // ID de la clé de signature
}

// PAYLOAD (Claims)
{
 // Claims obligatoires
 "iss": "https://auth.example.com", // Issuer (OP)
 "sub": "user_abc123", // Subject (ID utilisateur unique)
 "aud": "client_xyz789", // Audience (Client ID du RP)
 "exp": 1706700000, // Expiration (Unix timestamp)
 "iat": 1706696400, // Issued At (émission)

 // Claims conditionnels
 "auth_time": 1706696300, // Moment de l'authentification
 "nonce": "n-0S6_WzA2Mj", // Protection anti-rejeu
 "acr": "urn:mace:...mfa", // Auth Context Class Reference
 "amr": ["pwd", "otp"], // Auth Methods References
 "azp": "client_xyz789", // Authorized Party

 // Claims utilisateur (si scope openid + profile)
 "name": "Jean Dupont",
 "email": "[[email&#160;protected]](/cdn-cgi/l/email-protection)",
 "email_verified": true
}
```

#### Claims obligatoires de l'ID Token

| Claim | Description | Exemple |

| `iss` | Issuer - URL de l'OpenID Provider | https://auth.example.com |
| `sub` | Subject - Identifiant unique de l'utilisateur | user_abc123 |
| `aud` | Audience - Client ID du Relying Party | client_xyz789 |
| `exp` | Expiration - Timestamp d'expiration | 1706700000 |
| `iat` | Issued At - Timestamp d'émission | 1706696400 |


Validation obligatoire de l'ID Token
Le RP **DOIT** valider l'ID Token avant de l'utiliser :


- Vérifier la signature avec la clé publique de l'OP (via JWKS)
- Vérifier que `iss` correspond à l'OP attendu
- Vérifier que `aud` contient son propre client_id
- Vérifier que `exp` n'est pas passé
- Vérifier le `nonce` si envoyé dans la requête


### 3.2 Access Token
L'**Access Token** est utilisé pour accéder aux ressources protégées (APIs). Contrairement à l'ID Token, son format n'est pas imposé par OIDC - il peut être un JWT ou un token opaque.


 ```
// Utilisation de l'Access Token pour appeler une API
GET /api/userinfo HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```


ID Token vs Access Token

- **ID Token** : Destiné au RP pour l'authentification. NE PAS envoyer aux APIs.
- **Access Token** : Destiné aux APIs/Resource Servers. À envoyer en header Authorization.


### 3.3 Refresh Token
Le **Refresh Token** permet d'obtenir de nouveaux Access Tokens sans demander à l'utilisateur de se ré-authentifier.


 ```
// Requête de renouvellement avec Refresh Token
POST /oauth/token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token=xRxGGEpVawiUak6He367W3oeOfh...
&client_id=client_xyz789
&client_secret=secret123
```


Sécurité du Refresh Token

- Stocker de façon sécurisée (jamais en localStorage pour les SPAs)
- Utiliser la rotation des refresh tokens (un nouveau à chaque utilisation)
- Définir une durée de vie limitée
- Permettre la révocation


## 4. Flux d'Authentification (Flows)
OIDC définit plusieurs flux d'authentification adaptés à différents types d'applications. Le choix du flux dépend du type de client et de ses contraintes de sécurité.


Comparaison des Flows OIDC


Authorization
Code
Recommandé
Serveurs web
Clients confidentiels
response_type=code


Code + PKCE
Recommandé
SPA, Mobile
Clients publics
+ code_challenge


Hybrid
Spécifique
Cas particuliers
ID Token immédiat
code id_token


Implicit
Déprécié
Ne plus utiliser
Risques sécurité
token id_token


Client
Credentials
Machine-to-
Machine
Pas d'utilisateur
client_credentials

Figure 5 : Vue d'ensemble des différents flows OIDC


### 4.1 Authorization Code Flow

####  Authorization Code Flow - Le Standard
C'est le flow le plus sécurisé et recommandé pour les applications serveur (clients confidentiels). Les tokens ne transitent jamais par le navigateur.


Authorization Code Flow


User Agent
RP (Client)
OP (Auth)
Resource


-


1. Accès à l'application


2. Redirect → /authorize


3. GET /authorize?response_type=code&client_id=...&redirect_uri=...&scope=openid


4. Login + Consentement
Utilisateur s'authentifie


5. Redirect → redirect_uri?code=AUTH_CODE&state=...


6. Callback avec code


7. POST /token (code + client_secret)

8. {id_token, access_token, refresh_token}
BACK-CHANNEL (serveur à serveur)


9. Validation ID Token


10. Session créée


11. API call avec Access Token

12. Données protégées


Figure 6 : Flux Authorization Code complet


#### Exemple de requête /authorize
 ```
GET /authorize?
 response_type=code
 &client_id=client_xyz789
 &redirect_uri=https://app.example.com/callback
 &scope=openid profile email
 &state=abc123xyz // Protection CSRF
 &nonce=n-0S6_WzA2Mj // Protection rejeu
```

#### Exemple de requête /token
 ```
POST /token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=SplxlOBeZQQYbYS6WxSbIA // Code reçu
&redirect_uri=https://app.example.com/callback
&client_id=client_xyz789
&client_secret=secret123 // Secret du client
```


### 4.2 Authorization Code Flow + PKCE

####  Authorization Code + PKCE - Pour Clients Publics
**PKCE** (Proof Key for Code Exchange, prononcé "pixie") est une extension de sécurité obligatoire pour les clients publics (SPA, mobile) qui ne peuvent pas garder un secret.


Fonctionnement de PKCE


1. Client génère
code_verifier (random)
code_challenge = SHA256(verifier)


2. /authorize
+ code_challenge
+ code_challenge_method=S256


3. OP stocke
code_challenge
associé au code


4. /token
+ code_verifier
(le secret original)


5. OP vérifie
SHA256(verifier)
== code_challenge ?


6. Si OK
→ Émet les tokens
Sécurisé!

Figure 7 : PKCE protège contre l'interception du code d'autorisation


 ```
// 1. Client génère code_verifier (43-128 caractères)
code_verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"

// 2. Client calcule code_challenge
code_challenge = BASE64URL(SHA256(code_verifier))
 = "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"

// 3. Requête /authorize avec challenge
GET /authorize?
 response_type=code
 &client_id=spa_client
 &redirect_uri=https://spa.example.com/callback
 &scope=openid profile
 &code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
 &code_challenge_method=S256

// 4. Requête /token avec verifier
POST /token
grant_type=authorization_code
&code=SplxlOBeZQQYbYS6WxSbIA
&redirect_uri=https://spa.example.com/callback
&client_id=spa_client
&code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
```


Pourquoi PKCE est essentiel
Même si un attaquant intercepte le `code` d'autorisation, il ne peut pas l'échanger contre des tokens car il ne connaît pas le `code_verifier` original.


### 4.3 Implicit Flow (Déprécié)

####  Implicit Flow - NE PLUS UTILISER
L'Implicit Flow retourne les tokens directement dans l'URL fragment (#). Il est maintenant **déprécié** en faveur de Authorization Code + PKCE.


Pourquoi l'Implicit Flow est déprécié

**Tokens exposés dans l'URL** : Visibles dans l'historique navigateur, logs serveur, referrer
- **Pas de refresh token** : Impossible d'obtenir de nouveaux tokens
- **Vulnérable aux attaques** : Token substitution, token leakage
- **PKCE résout ces problèmes** : Utilisez Authorization Code + PKCE à la place


### 4.4 Hybrid Flow

####  Hybrid Flow - Combinaison
Le Hybrid Flow combine Authorization Code et Implicit, retournant certains tokens immédiatement et d'autres via le token endpoint.


| response_type | Tokens immédiats (front-channel) | Tokens via /token (back-channel) |

| `code id_token` | ID Token | Access Token, Refresh Token |
| `code token` | Access Token | ID Token, Refresh Token |
| `code id_token token` | ID Token, Access Token | Refresh Token |


Cas d'utilisation
Le Hybrid Flow est utile quand vous avez besoin d'un ID Token immédiat pour authentifier l'utilisateur côté client tout en récupérant l'Access Token de façon sécurisée côté serveur.


### 4.5 Client Credentials Flow

####  Client Credentials - Machine-to-Machine
Ce flow est utilisé pour l'authentification entre services (pas d'utilisateur impliqué). Le client s'authentifie directement avec ses propres credentials.


 ```
POST /token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=service_abc
&client_secret=super_secret_key
&scope=api:read api:write
```


Pas d'ID Token
Le Client Credentials flow ne retourne **pas d'ID Token** car il n'y a pas d'utilisateur. Il retourne uniquement un Access Token pour accéder aux APIs.


## 5. Scopes et Claims
Les **scopes** définissent les permissions demandées, et les **claims** sont les informations utilisateur retournées dans les tokens.


### 5.1 Scopes Standards OIDC

| Scope | Description | Claims associés |

| `openid` | **OBLIGATOIRE** - Active OIDC (sinon c'est juste OAuth 2.0) | sub |
| `profile` | Informations de profil basiques | name, family_name, given_name, middle_name, nickname, preferred_username, profile, picture, website, gender, birthdate, zoneinfo, locale, updated_at |
| `email` | Adresse email | email, email_verified |
| `address` | Adresse postale | address (objet JSON) |
| `phone` | Numéro de téléphone | phone_number, phone_number_verified |
| `offline_access` | Demande un Refresh Token | - |


Le scope openid est obligatoire
Sans le scope `openid`, la requête est traitée comme une simple requête OAuth 2.0 et aucun ID Token n'est retourné.


### 5.2 Claims Standards

| Claim | Type | Description | Exemple |

| `sub` | string | Identifiant unique de l'utilisateur (Subject) | "user_abc123" |
| `name` | string | Nom complet | "Jean Dupont" |
| `given_name` | string | Prénom | "Jean" |
| `family_name` | string | Nom de famille | "Dupont" |
| `preferred_username` | string | Nom d'utilisateur préféré | "jdupont" |
| `email` | string | Adresse email | "[[email&#160;protected]](/cdn-cgi/l/email-protection)" |
| `email_verified` | boolean | Email vérifié ? | true |
| `picture` | string | URL de la photo de profil | "https://..." |
| `locale` | string | Langue préférée (BCP47) | "fr-FR" |
| `zoneinfo` | string | Fuseau horaire | "Europe/Paris" |


#### Exemple de réponse UserInfo
 ```
GET /userinfo HTTP/1.1
Host: auth.example.com
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...

// Réponse
{
 "sub": "user_abc123",
 "name": "Jean Dupont",
 "given_name": "Jean",
 "family_name": "Dupont",
 "preferred_username": "jdupont",
 "email": "[[email&#160;protected]](/cdn-cgi/l/email-protection)",
 "email_verified": true,
 "picture": "https://example.com/photos/jdupont.jpg",
 "locale": "fr-FR",
 "zoneinfo": "Europe/Paris"
}
```


## 6. Endpoints OIDC
OIDC définit plusieurs endpoints standardisés que l'OpenID Provider doit exposer.


Endpoints OIDC Standards


OpenID Provider


/.well-known/openid-configuration


/authorize


/token


/userinfo


/jwks


Discovery
Authentification
Échange tokens
Infos user / Clés

Figure 8 : Les endpoints principaux d'un OpenID Provider


| Endpoint | Méthode | Description | Obligatoire |

| `/authorize` | GET | Initie l'authentification, affiche le login |  Oui |
| `/token` | POST | Échange code contre tokens, refresh tokens |  Oui |
| `/userinfo` | GET/POST | Retourne les claims utilisateur |  Oui |
| `/jwks` | GET | Clés publiques pour vérifier les signatures JWT |  Oui |
| `/.well-known/openid-configuration` | GET | Métadonnées de configuration (Discovery) |  Recommandé |
| `/revoke` | POST | Révoque un token |  Optionnel |
| `/introspect` | POST | Vérifie la validité d'un token |  Optionnel |
| `/end_session` | GET | Déconnexion (logout) |  Optionnel |


## 7. Discovery et Metadata
Le mécanisme de **Discovery** permet aux clients de découvrir automatiquement la configuration de l'OpenID Provider via un document JSON bien connu.


### URL de Discovery
 ```
GET https://auth.example.com/.well-known/openid-configuration
```

### Exemple de document Discovery
 ```
{
 "issuer": "https://auth.example.com",
 "authorization_endpoint": "https://auth.example.com/authorize",
 "token_endpoint": "https://auth.example.com/token",
 "userinfo_endpoint": "https://auth.example.com/userinfo",
 "jwks_uri": "https://auth.example.com/.well-known/jwks.json",
 "revocation_endpoint": "https://auth.example.com/revoke",
 "end_session_endpoint": "https://auth.example.com/logout",

 "response_types_supported": ["code", "token", "id_token", "code id_token"],
 "grant_types_supported": ["authorization_code", "refresh_token", "client_credentials"],
 "subject_types_supported": ["public", "pairwise"],
 "scopes_supported": ["openid", "profile", "email", "address", "phone", "offline_access"],
 "claims_supported": ["sub", "name", "email", "email_verified", "picture"],

 "id_token_signing_alg_values_supported": ["RS256", "ES256"],
 "token_endpoint_auth_methods_supported": ["client_secret_basic", "client_secret_post", "private_key_jwt"],
 "code_challenge_methods_supported": ["S256", "plain"]
}
```

### JWKS (JSON Web Key Set)
Le document JWKS contient les clés publiques utilisées pour vérifier les signatures des tokens JWT.


 ```
{
 "keys": [
 {
 "kty": "RSA", // Type de clé
 "use": "sig", // Usage: signature
 "kid": "abc123", // ID de la clé (correspond au header JWT)
 "alg": "RS256", // Algorithme
 "n": "0vx7agoebG...", // Modulus (Base64URL)
 "e": "AQAB" // Exponent (Base64URL)
 }
 ]
}
```


Avantages du Discovery

- **Configuration automatique** : Le client peut s'auto-configurer
- **Rotation des clés** : Les nouvelles clés sont automatiquement découvertes via JWKS
- **Interopérabilité** : Format standardisé supporté par tous les OPs


## 8. Sécurité
OIDC intègre plusieurs mécanismes de sécurité pour protéger l'authentification et les tokens.


### 8.1 Protection CSRF avec State
Le paramètre `state` protège contre les attaques CSRF (Cross-Site Request Forgery).


 ```
// 1. Client génère un state aléatoire et le stocke en session
state = generateRandomString(32)
session.state = state

// 2. Inclure dans la requête /authorize
/authorize?...&state=abc123xyz

// 3. Vérifier le state au callback
if (request.state !== session.state) {
 throw "CSRF attack detected!"
}
```

### 8.2 Protection Replay avec Nonce
Le `nonce` protège contre les attaques de rejeu de tokens.


 ```
// 1. Inclure nonce dans la requête
/authorize?...&nonce=n-0S6_WzA2Mj

// 2. Vérifier le nonce dans l'ID Token
if (idToken.nonce !== session.nonce) {
 throw "Token replay attack detected!"
}
```

### 8.3 Validation des Tokens


####  Validation ID Token

- Vérifier la signature avec JWKS
- Vérifier `iss` == issuer attendu
- Vérifier `aud` contient client_id
- Vérifier `exp` > now
- Vérifier `iat` raisonnable
- Vérifier `nonce` si utilisé


####  Sécurité des Tokens

- Toujours utiliser HTTPS
- Durée de vie courte pour Access Token
- Refresh Token avec rotation
- Stockage sécurisé des tokens
- Ne jamais exposer les tokens dans les URLs


### 8.4 Bonnes Pratiques

Recommandations de sécurité

- **Toujours utiliser PKCE** pour les clients publics (SPA, mobile)
- **Ne jamais utiliser l'Implicit Flow** - il est déprécié
- **Valider tous les tokens** avant de les utiliser
- **Utiliser des durées de vie courtes** pour les Access Tokens (5-15 min)
- **Implémenter la rotation** des Refresh Tokens
- **Stocker les tokens de façon sécurisée** :

Backend : Session côté serveur
- SPA : Memory (pas localStorage)
- Mobile : Secure storage (Keychain/Keystore)


### 8.5 Algorithmes de Signature

| Algorithme | Type | Recommandation |

| `RS256` | RSA + SHA-256 |  Recommandé (asymétrique) |
| `RS384` | RSA + SHA-384 |  Recommandé |
| `RS512` | RSA + SHA-512 |  Recommandé |
| `ES256` | ECDSA + P-256 |  Recommandé (moderne, compact) |
| `ES384` | ECDSA + P-384 |  Recommandé |
| `HS256` | HMAC + SHA-256 |  Symétrique - éviter si possible |
| `none` | Pas de signature |  JAMAIS en production |


## 9. OIDC vs SAML
Comparaison détaillée entre OpenID Connect et SAML 2.0 pour vous aider à choisir.


| Critère | OpenID Connect | SAML 2.0 |

| Format des données | JSON / JWT | XML |
| Protocole de transport | REST / OAuth 2.0 | HTTP Redirect / POST / SOAP |
| Taille des messages | Compact (~1-2 KB) | Volumineux (~5-20 KB) |
| Complexité | Simple | Complexe |
| Support mobile | Excellent (natif) | Limité |
| Support SPA | Excellent (PKCE) | Difficile |
| Support API | Excellent (Access Token) | Non conçu pour |
| Découverte automatique | Oui (.well-known) | Oui (Metadata XML) |
| Social Login | Standard (Google, FB...) | Rare |
| Enterprise SSO | Bon | Excellent (mature) |
| Année de publication | 2014 | 2005 |


Quand utiliser OIDC vs SAML ?


OpenID Connect
Applications modernes (SPA, mobile)
APIs et microservices
Social login (Google, Facebook)
Nouveaux projets


SAML 2.0
Applications entreprise legacy
Intégration avec AD/LDAP existant
Fédération B2B établie
Exigences réglementaires spécifiques

Figure 9 : Guide de choix entre OIDC et SAML


Conseil
Pour les nouveaux projets, **privilégiez OpenID Connect**. SAML reste pertinent pour l'intégration avec des systèmes legacy ou des partenaires qui l'exigent. Beaucoup d'IdP modernes (Okta, Azure AD, Keycloak) supportent les deux protocoles.


## 10. Glossaire
Définitions des termes techniques utilisés dans cette documentation.


Access TokenToken utilisé pour accéder aux ressources protégées (APIs). Peut être un JWT ou un token opaque. Courte durée de vie.
Authorization CodeCode temporaire échangé contre des tokens. Usage unique, expire rapidement (~10 min).
Authorization EndpointEndpoint de l'OP où le client redirige l'utilisateur pour l'authentification (/authorize).
Authorization ServerServeur qui émet les tokens. Dans OIDC, c'est l'OpenID Provider.
Bearer TokenType de token où la simple possession suffit pour l'utiliser. Envoyé en header "Authorization: Bearer {token}".
ClaimInformation sur un sujet (utilisateur) contenue dans un token. Ex: name, email, sub.
ClientApplication qui demande l'authentification. Synonyme de Relying Party (RP).
Client CredentialsFlow d'authentification machine-to-machine sans utilisateur.
Client IDIdentifiant public unique du client auprès de l'OP.
Client SecretSecret partagé entre le client confidential et l'OP. Ne jamais exposer.
Confidential ClientClient capable de garder un secret (application serveur).
DiscoveryMécanisme permettant de découvrir automatiquement la configuration d'un OP (.well-known).
Grant TypeType de flux OAuth 2.0 utilisé (authorization_code, client_credentials, refresh_token...).
ID TokenJWT contenant l'identité de l'utilisateur authentifié. Spécifique à OIDC.
Issuer (iss)URL identifiant l'OpenID Provider qui a émis le token.
JWKS (JSON Web Key Set)Document JSON contenant les clés publiques pour vérifier les signatures JWT.
JWT (JSON Web Token)Standard (RFC 7519) pour représenter des claims de façon sécurisée. Composé de Header.Payload.Signature.
NonceValeur aléatoire unique pour prévenir les attaques de rejeu. Lié à une session spécifique.
OAuth 2.0Framework d'autorisation sur lequel OIDC est construit. Gère l'accès aux ressources.
OpenID Provider (OP)Serveur qui authentifie les utilisateurs et émet les tokens OIDC.
PKCE (Proof Key for Code Exchange)Extension de sécurité utilisant code_verifier/code_challenge pour protéger les clients publics.
Public ClientClient ne pouvant pas garder de secret (SPA, mobile). Doit utiliser PKCE.
Redirect URIURL où l'OP redirige après authentification. Doit être pré-enregistrée.
Refresh TokenToken longue durée permettant d'obtenir de nouveaux Access Tokens sans ré-authentification.
Relying Party (RP)Application qui s'appuie sur l'OP pour authentifier les utilisateurs. Le client OIDC.
Resource ServerServeur hébergeant les ressources protégées (API). Valide les Access Tokens.
Response TypeParamètre indiquant ce que le client attend (code, token, id_token, ou combinaisons).
ScopePermission demandée par le client. OIDC requiert au minimum "openid".
StateValeur aléatoire pour prévenir les attaques CSRF. Vérifié au callback.
Subject (sub)Identifiant unique de l'utilisateur chez l'OP. Claim obligatoire.
Token EndpointEndpoint de l'OP pour échanger un code contre des tokens (/token).
Token IntrospectionEndpoint permettant de vérifier la validité d'un token auprès de l'OP.
Token RevocationEndpoint permettant d'invalider un token avant son expiration.
UserInfo EndpointEndpoint retournant les claims utilisateur à partir d'un Access Token (/userinfo).
