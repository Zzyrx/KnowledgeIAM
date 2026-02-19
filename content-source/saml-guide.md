---
title: "Guide Complet SAML 2.0"
description: "Guide technique exhaustif sur le protocole SAML 2.0 : composants, assertions, bindings, profils, flux d'authentification, sécurité et métadonnées."
author: "Jean-Baptiste Janssen"
tags: [saml, sso, federation, security]
chapters: 10
---

/* ============================================ */
 /* Confluence-compatible scoped styles */
 /* Wrapper: .saml-doc */
 /* ============================================ */

 .saml-doc {
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
 line-height: 1.7;
 color: #172B4D;
 max-width: 1200px;
 margin: 0 auto;
 padding: 20px 40px;
 background-color: #ffffff;
 }

 /* Header */
 .saml-doc .doc-header {
 text-align: center;
 margin-bottom: 60px;
 padding-bottom: 40px;
 border-bottom: 3px solid #0052CC;
 }
 .saml-doc .doc-header h1 {
 font-size: 2.8em;
 color: #0052CC;
 margin-bottom: 15px;
 font-weight: 700;
 }
 .saml-doc .doc-header .subtitle {
 font-size: 1.3em;
 color: #5E6C84;
 font-weight: 400;
 }
 .saml-doc .doc-header .version-info {
 margin-top: 20px;
 font-size: 0.9em;
 color: #5E6C84;
 }

 /* Table of Contents */
 .saml-doc .toc {
 background: #F4F5F7;
 border-radius: 8px;
 padding: 30px 40px;
 margin-bottom: 50px;
 border-left: 4px solid #0052CC;
 }
 .saml-doc .toc h2 {
 color: #0052CC;
 margin-bottom: 20px;
 font-size: 1.4em;
 }
 .saml-doc .toc ul {
 list-style: none;
 padding-left: 0;
 }
 .saml-doc .toc li {
 margin-bottom: 10px;
 }
 .saml-doc .toc a {
 color: #172B4D;
 text-decoration: none;
 }
 .saml-doc .toc a:hover {
 color: #0052CC;
 text-decoration: underline;
 }
 .saml-doc .toc .toc-section {
 font-weight: 600;
 margin-top: 15px;
 margin-bottom: 8px;
 }
 .saml-doc .toc .toc-subsection {
 padding-left: 20px;
 font-size: 0.95em;
 }

 /* Headings */
 .saml-doc section {
 margin-bottom: 60px;
 }
 .saml-doc h2 {
 font-size: 2em;
 color: #0052CC;
 margin-bottom: 25px;
 padding-bottom: 12px;
 border-bottom: 2px solid #DFE1E6;
 }
 .saml-doc h3 {
 font-size: 1.5em;
 color: #172B4D;
 margin-top: 35px;
 margin-bottom: 18px;
 }
 .saml-doc h4 {
 font-size: 1.2em;
 color: #172B4D;
 margin-top: 25px;
 margin-bottom: 12px;
 }
 .saml-doc p {
 margin-bottom: 18px;
 text-align: justify;
 }

 /* Info Boxes */
 .saml-doc .info-box {
 padding: 20px 25px;
 border-radius: 6px;
 margin: 25px 0;
 }
 .saml-doc .info-box.note {
 background: #E6F4FF;
 border-left: 4px solid #00B8D9;
 }
 .saml-doc .info-box.warning {
 background: #FFFAE6;
 border-left: 4px solid #FFAB00;
 }
 .saml-doc .info-box.success {
 background: #E3FCEF;
 border-left: 4px solid #36B37E;
 }
 .saml-doc .info-box.important {
 background: #FFEBE6;
 border-left: 4px solid #FF5630;
 }
 .saml-doc .info-box-title {
 font-weight: 700;
 margin-bottom: 10px;
 }

 /* Code */
 .saml-doc code {
 background: #F1F3F5;
 padding: 3px 8px;
 border-radius: 4px;
 font-family: 'SF Mono', Monaco, Consolas, 'Courier New', monospace;
 font-size: 0.9em;
 color: #D63384;
 }
 .saml-doc pre {
 background: #1E1E1E;
 color: #D4D4D4;
 padding: 25px;
 border-radius: 8px;
 overflow-x: auto;
 margin: 20px 0;
 font-size: 0.9em;
 line-height: 1.5;
 }
 .saml-doc pre code {
 background: none;
 padding: 0;
 color: inherit;
 }

 /* Syntax highlighting */
 .saml-doc .xml-tag { color: #569CD6; }
 .saml-doc .xml-attr { color: #9CDCFE; }
 .saml-doc .xml-value { color: #CE9178; }
 .saml-doc .xml-comment { color: #6A9955; }
 .saml-doc .json-key { color: #9CDCFE; }
 .saml-doc .json-string { color: #CE9178; }
 .saml-doc .json-number { color: #B5CEA8; }
 .saml-doc .json-comment { color: #6A9955; }
 .saml-doc .http-method { color: #569CD6; font-weight: bold; }
 .saml-doc .http-url { color: #CE9178; }
 .saml-doc .http-header { color: #9CDCFE; }

 /* Tables */
 .saml-doc table {
 width: 100%;
 border-collapse: collapse;
 margin: 25px 0;
 font-size: 0.95em;
 }
 .saml-doc th,
 .saml-doc td {
 padding: 14px 18px;
 text-align: left;
 border: 1px solid #DFE1E6;
 }
 .saml-doc th {
 background: #0052CC;
 color: white;
 font-weight: 600;
 }
 .saml-doc tr:nth-child(even) {
 background: #F4F5F7;
 }
 .saml-doc tr:hover {
 background: #E6F2FF;
 }
 .saml-doc .comparison-table th {
 text-align: center;
 }
 .saml-doc .comparison-table td:first-child {
 font-weight: 600;
 background: #F4F5F7;
 }

 /* Diagrams */
 .saml-doc .diagram-container {
 background: #F4F5F7;
 border-radius: 12px;
 padding: 30px;
 margin: 30px 0;
 text-align: center;
 }
 .saml-doc .diagram-container svg {
 max-width: 100%;
 height: auto;
 }
 .saml-doc .diagram-caption {
 margin-top: 15px;
 font-style: italic;
 color: #5E6C84;
 font-size: 0.95em;
 }

 /* Glossary */
 .saml-doc .glossary-term {
 background: #F4F5F7;
 border-radius: 8px;
 padding: 20px 25px;
 margin-bottom: 15px;
 border-left: 4px solid #0052CC;
 }
 .saml-doc .glossary-term dt {
 font-weight: 700;
 color: #0052CC;
 font-size: 1.1em;
 margin-bottom: 8px;
 }
 .saml-doc .glossary-term dd {
 color: #172B4D;
 padding-left: 0;
 }

 /* Lists */
 .saml-doc ul,
 .saml-doc ol {
 margin: 15px 0 20px 30px;
 }
 .saml-doc li {
 margin-bottom: 10px;
 }

 /* Component Grid (flex-based, no CSS Grid) */
 .saml-doc .component-grid {
 display: table;
 width: 100%;
 margin: 30px 0;
 }
 .saml-doc .component-grid::after {
 content: "";
 display: table;
 clear: both;
 }
 .saml-doc .component-card {
 float: left;
 width: 47%;
 margin: 0 1.5% 25px 1.5%;
 background: white;
 border: 1px solid #DFE1E6;
 border-radius: 10px;
 padding: 25px;
 }
 .saml-doc .component-card h4 {
 color: #0052CC;
 margin-top: 0;
 margin-bottom: 12px;
 font-size: 1.15em;
 }
 .saml-doc .component-card p {
 margin-bottom: 0;
 font-size: 0.95em;
 }

 /* Section cards */
 .saml-doc .binding-section,
 .saml-doc .profile-section,
 .saml-doc .flow-section {
 background: white;
 border: 1px solid #DFE1E6;
 border-radius: 10px;
 padding: 30px;
 margin: 25px 0;
 }
 .saml-doc .binding-section h4,
 .saml-doc .profile-section h4,
 .saml-doc .flow-section h4 {
 color: #0052CC;
 border-bottom: 1px solid #DFE1E6;
 padding-bottom: 10px;
 margin-top: 0;
 }

 /* Process Steps (manual numbering, no CSS counters) */
 .saml-doc .process-steps {
 list-style: none;
 margin-left: 0;
 padding-left: 0;
 }
 .saml-doc .process-steps li {
 position: relative;
 padding-left: 60px;
 margin-bottom: 25px;
 min-height: 45px;
 }
 .saml-doc .step-num {
 position: absolute;
 left: 0;
 top: 0;
 width: 40px;
 height: 40px;
 background: #0052CC;
 color: white;
 border-radius: 50%;
 text-align: center;
 line-height: 40px;
 font-weight: 700;
 font-size: 1.1em;
 }

 /* Token Box (OIDC specific) */
 .saml-doc .token-box {
 background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 border-radius: 10px;
 padding: 20px;
 margin: 20px 0;
 color: white;
 }
 .saml-doc .token-box h4 {
 color: white;
 margin-top: 0;
 border-bottom: 1px solid rgba(255,255,255,0.3);
 padding-bottom: 10px;
 }

 /* Footer */
 .saml-doc .doc-footer {
 margin-top: 60px;
 padding-top: 30px;
 border-top: 2px solid #DFE1E6;
 text-align: center;
 color: #5E6C84;
 font-size: 0.9em;
 }

 /* Clearfix for floated cards */
 .saml-doc .component-grid::after,
 .saml-doc::after {
 content: "";
 display: table;
 clear: both;
 }


 # 🔐 SAML 2.0
 Security Assertion Markup Language
Guide Complet pour Débutants


 Version 1.0 | Documentation Technique





 ## 📑 Table des Matières

 - [1. Introduction à SAML](#introduction)
 - [1.1 Qu'est-ce que SAML ?](#quest-ce-que-saml)
 - [1.2 Pourquoi utiliser SAML ?](#pourquoi-saml)
 - [1.3 Historique et versions](#historique)
 - [2. Composants Principaux](#composants)
 - [2.1 Identity Provider (IdP)](#identity-provider)
 - [2.2 Service Provider (SP)](#service-provider)
 - [2.3 User Agent](#user-agent)
 - [3. Assertions SAML](#assertions)
 - [3.1 Types de Statements](#assertion-types)
 - [3.2 Structure XML](#assertion-structure)
 - [4. Bindings SAML](#bindings)
 - [4.1 HTTP Redirect](#binding-redirect)
 - [4.2 HTTP POST](#binding-post)
 - [4.3 HTTP Artifact](#binding-artifact)
 - [4.4 SOAP](#binding-soap)
 - [5. Profils SAML](#profiles)
 - [5.1 Web Browser SSO](#profile-sso)
 - [5.2 Single Logout](#profile-slo)
 - [6. Flux d'Authentification](#flux)
 - [6.1 SP-Initiated SSO](#flux-sp-initiated)
 - [6.2 IdP-Initiated SSO](#flux-idp-initiated)
 - [7. Sécurité](#securite)
 - [8. Métadonnées](#metadata)
 - [9. SAML vs Autres Protocoles](#comparaison)
 - [10. Glossaire](#glossaire)





 ## 1. Introduction à SAML

 ### 1.1 Qu'est-ce que SAML ?
 **SAML** (Security Assertion Markup Language) est un standard ouvert basé sur XML pour l'échange de données d'authentification et d'autorisation entre différentes parties, principalement entre un **Identity Provider** (fournisseur d'identité) et un **Service Provider** (fournisseur de services).


 En termes simples, SAML permet à un utilisateur de se connecter une seule fois (Single Sign-On ou SSO) et d'accéder ensuite à plusieurs applications sans avoir à s'authentifier à nouveau auprès de chacune d'elles.



 💡 Analogie Simple
 Imaginez SAML comme un passeport numérique. Votre pays d'origine (l'IdP) certifie votre identité. Lorsque vous voyagez vers un autre pays (le SP), ce pays fait confiance à votre passeport sans avoir à vérifier votre identité lui-même.




 ### 1.2 Pourquoi utiliser SAML ?


 #### 🔑 Single Sign-On (SSO)
 Une seule authentification donne accès à toutes les applications configurées, améliorant l'expérience utilisateur.




 #### 🛡️ Sécurité Renforcée
 Les mots de passe ne sont jamais transmis aux applications. Seules des assertions signées et chiffrées circulent.




 #### 📊 Gestion Centralisée
 Les identités sont gérées en un point central, simplifiant l'administration et l'audit.




 #### 🔄 Interopérabilité
 Standard ouvert supporté par de nombreux fournisseurs (Microsoft, Google, Okta, etc.).





 ### 1.3 Historique et Versions

 | Version | Année | Description |

 | **SAML 1.0** | 2002 | Première version adoptée comme standard OASIS |
 | **SAML 1.1** | 2003 | Corrections mineures et améliorations de clarté |
 | **SAML 2.0** | 2005 | Version majeure actuelle - fusion de SAML 1.1, Liberty Alliance ID-FF et Shibboleth |



 ⚠️ Important
 Ce document se concentre sur **SAML 2.0**, qui est la version standard utilisée aujourd'hui. SAML 1.x est considéré comme obsolète.







 ## 2. Composants Principaux
 L'architecture SAML repose sur trois acteurs principaux qui interagissent pour permettre l'authentification fédérée :





 -
















 USER AGENT
 (Navigateur Web)

 IDENTITY PROVIDER
 (IdP)
 Authentifie les utilisateurs

 SERVICE PROVIDER
 (SP)
 Fournit le service/application

 1. Authentification

 2. Accès Service

 3. Assertion SAML

 🤝 Relation de Confiance

 Figure 1 : Architecture générale SAML avec les trois acteurs principaux




 ### 2.1 Identity Provider (IdP)
 L'**Identity Provider** est l'entité responsable de l'authentification des utilisateurs et de la génération des assertions SAML.



 ✅ Responsabilités de l'IdP

 Authentifier les utilisateurs (vérifier identifiant/mot de passe, MFA, etc.)
 - Générer et signer les assertions SAML
 - Maintenir les sessions utilisateur
 - Fournir les attributs utilisateur aux SPs
 - Gérer le Single Logout (SLO)


 **Exemples d'IdP :** Microsoft ADFS, Entra ID (Azure AD), Okta, Ping Identity, Shibboleth IdP, Keycloak, OpenLDAP + SimpleSAMLphp


 ### 2.2 Service Provider (SP)
 Le **Service Provider** est l'application ou le service auquel l'utilisateur souhaite accéder. Le SP fait confiance à l'IdP pour authentifier les utilisateurs.



 ✅ Responsabilités du SP

 - Rediriger les utilisateurs non authentifiés vers l'IdP
 - Valider les assertions SAML reçues (signature, validité temporelle)
 - Extraire les informations utilisateur des assertions
 - Créer et gérer les sessions locales
 - Contrôler l'accès aux ressources



 ### 2.3 User Agent
 Le **User Agent** est généralement le navigateur web de l'utilisateur. Il transporte les messages SAML entre l'IdP et le SP via des redirections HTTP ou des formulaires POST.



 ⚠️ Point Important
 Dans SAML, l'IdP et le SP ne communiquent pas directement entre eux. Toutes les communications passent par le navigateur de l'utilisateur (sauf dans certains bindings comme l'Artifact binding).







 ## 3. Assertions SAML
 Une **assertion SAML** est un document XML émis par l'Identity Provider qui contient des déclarations (statements) concernant un sujet (généralement un utilisateur). C'est le cœur du protocole SAML.





 ASSERTION SAML


 AUTHENTICATION
 STATEMENT
 • Identité vérifiée
 • Méthode d'auth
 • Date/Heure
 🔐
 "Qui est l'utilisateur"


 ATTRIBUTE
 STATEMENT
 • Email
 • Nom/Prénom
 • Groupes/Rôles
 👤
 "Ses caractéristiques"


 AUTHORIZATION
 DECISION
 • Permit / Deny
 • Ressource ciblée
 • Action autorisée
 ✅
 "Ce qu'il peut faire"

 Figure 2 : Les trois types de statements dans une assertion SAML




 ### 3.1 Types de Statements

 #### Authentication Statement
 Déclare que le sujet a été authentifié par l'IdP à un moment donné avec une méthode spécifique.



 | Élément | Description | Exemple |

 | `AuthnInstant` | Timestamp de l'authentification | `2025-01-30T10:30:00Z` |
 | `SessionIndex` | Identifiant de session unique | `_abc123def456` |
 | `AuthnContext` | Contexte/méthode d'authentification | Password, X509, Kerberos, MFA |



 #### Attribute Statement
 Contient les attributs associés au sujet (email, nom, groupes, etc.).



 💡 Attributs Courants

 - `urn:oid:0.9.2342.19200300.100.1.3` - Email (mail)
 - `urn:oid:2.5.4.42` - Prénom (givenName)
 - `urn:oid:2.5.4.4` - Nom (sn)
 - `urn:oid:2.5.4.3` - Nom complet (cn)



 #### Authorization Decision Statement
 Déclare si le sujet est autorisé à effectuer une action sur une ressource donnée. Ce type est moins fréquemment utilisé.


 ### 3.2 Structure XML d'une Assertion
 ```
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
 [[email&#160;protected]](/cdn-cgi/l/email-protection)
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
 <saml:AttributeValue>[[email&#160;protected]](/cdn-cgi/l/email-protection)</saml:AttributeValue>
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

 | Email Address | `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` | [[email&#160;protected]](/cdn-cgi/l/email-protection) |
 | Unspecified | `urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified` | Tout identifiant |
 | Persistent | `urn:oasis:names:tc:SAML:2.0:nameid-format:persistent` | Identifiant opaque persistant |
 | Transient | `urn:oasis:names:tc:SAML:2.0:nameid-format:transient` | Identifiant temporaire unique |






 ## 4. Bindings SAML
 Les **bindings SAML** définissent comment les messages SAML sont transportés entre les parties. Chaque binding utilise un mécanisme de transport différent.




 Vue d'ensemble des Bindings SAML 2.0

 HTTP Redirect
 URL Query String
 Base64 + Deflate
 ≤ 8KB messages

 HTTP POST
 Form Hidden Field
 Base64 encoded
 Messages volumineux

 HTTP Artifact
 Référence courte
 Back-channel
 Haute sécurité

 SOAP
 Direct HTTPS
 Back-channel only
 Artifact Resolution

 PAOS
 Reverse SOAP
 ECP Profile
 Clients non-browser

 Front-channel: HTTP Redirect, HTTP POST | Back-channel: HTTP Artifact, SOAP, PAOS

 Figure 3 : Comparaison des différents bindings SAML




 ### 4.1 HTTP Redirect Binding

 #### 📤 HTTP Redirect Binding
 Encode le message SAML dans les paramètres de l'URL. C'est le binding le plus léger, utilisé principalement pour les **AuthnRequest**.


 #### Processus d'encodage

 - 1**Compression** : Le message XML est compressé avec DEFLATE
 - 2**Encodage Base64** : Le message compressé est encodé en Base64
 - 3**URL Encoding** : Le résultat est encodé pour l'URL
 - 4**Signature** : Une signature est ajoutée comme paramètre séparé (optionnel)

 #### Exemple d'URL
 ```
https://idp.example.com/saml2/sso?
 SAMLRequest=fZJNT8MwDIb%2FSuR7k... <-- Message encodé
 &RelayState=token123 <-- État de session
 &SigAlg=http%3A%2F%2F...sha256 <-- Algorithme de signature
 &Signature=ABCdef123... <-- Signature
```

 ⚠️ Limitation
 La taille des URL est limitée (~8 KB). Ce binding n'est pas adapté aux messages volumineux comme les réponses SAML.





 ### 4.2 HTTP POST Binding

 #### 📮 HTTP POST Binding
 Transmet le message SAML dans le corps d'une requête POST via un formulaire HTML auto-soumis. Recommandé pour les **Response** SAML.


 #### Exemple de formulaire
 ```
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

 ✅ Avantages

 - Supporte les messages de grande taille
 - La signature peut être incluse dans le message XML
 - Plus sécurisé (pas d'exposition dans les logs serveur)




 ### 4.3 HTTP Artifact Binding

 #### 🎫 HTTP Artifact Binding
 Utilise une référence courte (l'artifact) au lieu du message complet. Le destinataire récupère le message réel via un canal back-channel sécurisé.


 **Structure d'un Artifact :**


 ```
TypeCode (2 bytes) + EndpointIndex (2 bytes) + SourceID (20 bytes) + MessageHandle (20 bytes)
 0x0004 0x0000 SHA-1(EntityID) Random 20 bytes
```

 💡 Cas d'utilisation
 Recommandé lorsque la sécurité est critique. L'assertion transite uniquement sur un canal back-channel sécurisé.





 ### 4.4 SOAP Binding

 #### 🧼 SOAP Binding
 Encapsule les messages SAML dans des enveloppes SOAP et les transmet directement entre IdP et SP via HTTPS (back-channel). Utilisé pour :



 - La résolution d'artifacts (`ArtifactResolve`)
 - Les requêtes d'attributs (`AttributeQuery`)
 - Les requêtes d'autorisation



 ### Comparaison des Bindings

 | Caractéristique | HTTP Redirect | HTTP POST | HTTP Artifact | SOAP |

 | Taille max message | ~8 KB | Illimitée | 44 bytes | Illimitée |
 | Via navigateur | ✅ Oui | ✅ Oui | ✅ Partiellement | ❌ Non |
 | Compression | DEFLATE | Non | Non | Non |
 | Sécurité | Moyenne | Bonne | Excellente | Excellente |
 | Cas d'usage principal | AuthnRequest | Response | Haute sécurité | Back-channel |






 ## 5. Profils SAML
 Les **profils SAML** définissent des cas d'usage complets en spécifiant quels composants (assertions, protocoles, bindings) utiliser ensemble.


 ### 5.1 Web Browser SSO Profile

 #### 🌐 Web Browser Single Sign-On Profile
 C'est le profil le plus utilisé de SAML. Il définit deux flux principaux :



 - **SP-Initiated SSO** : L'utilisateur commence par accéder au SP
 - **IdP-Initiated SSO** : L'utilisateur commence par se connecter à l'IdP


 | Message | Bindings recommandés |

 | AuthnRequest (SP → IdP) | HTTP Redirect, HTTP POST, HTTP Artifact |
 | Response (IdP → SP) | HTTP POST, HTTP Artifact |



 ⚠️ Configuration courante
 La combinaison la plus fréquente : **HTTP Redirect** pour l'AuthnRequest et **HTTP POST** pour la Response.





 ### 5.2 Single Logout (SLO) Profile

 #### 🚪 Single Logout Profile
 Permet de déconnecter un utilisateur de toutes ses sessions (IdP et tous les SPs) en une seule action.




 Flux Single Logout (SLO)
 User
 SP-A
 IdP
 SP-B
 SP-C
 -




 1. Logout
 2. LogoutRequest
 3. LogoutRequest
 4. LogoutResponse
 5. LogoutRequest
 6. LogoutResponse
 7. LogoutResponse


 Figure 4 : Flux de déconnexion unique (Single Logout)




 ⚠️ Challenges du SLO
 Le SLO est difficile à implémenter correctement car il nécessite la coordination de multiples parties. Si un SP est indisponible, la chaîne peut être interrompue.








 ## 6. Flux d'Authentification Détaillés

 ### 6.1 SP-Initiated SSO
 L'utilisateur tente d'accéder à une ressource protégée sur le SP, qui le redirige vers l'IdP pour authentification.




 Flux SP-Initiated SSO (HTTP Redirect + POST)
 Utilisateur
 Service Provider
 Identity Provider





 1. Accès ressource protégée


 2. Redirection vers IdP avec AuthnRequest
 302 Redirect → IdP + SAMLRequest (HTTP Redirect)


 3. Suivi de la redirection

 4. Authentification
 Vérification credentials

 5. Formulaire auto-submit avec SAMLResponse
 HTTP POST Binding


 6. POST SAMLResponse vers SP (ACS)

 7. Validation assertion + Session créée

 Figure 5 : Flux complet SP-Initiated SSO




 ### 6.2 IdP-Initiated SSO
 L'utilisateur s'authentifie d'abord auprès de l'IdP (portail d'entreprise), puis sélectionne l'application.




 ⚠️ Considérations de sécurité
 Le flux IdP-Initiated est considéré comme **moins sécurisé** car :



 Pas de protection contre les attaques de rejeu (pas d'`InResponseTo`)
 - Pas de possibilité pour le SP de spécifier ses exigences
 - Certains SPs modernes ne le supportent plus






 ## 7. Sécurité
 La sécurité est au cœur de SAML. Le protocole utilise plusieurs mécanismes pour garantir l'intégrité, l'authenticité et la confidentialité.


 ### 7.1 Signatures XML
 Les signatures XML garantissent l'**intégrité** et l'**authenticité** des messages SAML.



 | Élément | Signataire | Obligatoire ? |

 | AuthnRequest | SP | Recommandé |
 | Response | IdP | Recommandé |
 | Assertion | IdP | **Obligatoire** |
 | LogoutRequest | Initiateur | Recommandé |



 #### Algorithmes recommandés
 ```
<!-- RSA avec SHA-256 (recommandé) -->
http://www.w3.org/2001/04/xmldsig-more#rsa-sha256

<!-- RSA avec SHA-512 -->
http://www.w3.org/2001/04/xmldsig-more#rsa-sha512

<!-- ⚠️ À ÉVITER : RSA avec SHA-1 (déprécié) -->
http://www.w3.org/2000/09/xmldsig#rsa-sha1
```

 ### 7.2 Chiffrement
 Le chiffrement protège la **confidentialité** des données sensibles.



 - **Assertion complète** (`EncryptedAssertion`) - le plus courant
 - **NameID** (`EncryptedID`)
 - **Attributs individuels** (`EncryptedAttribute`)


 ### 7.3 Bonnes Pratiques


 #### ✅ Validation des assertions

 - Toujours vérifier la signature
 - Vérifier `NotBefore` et `NotOnOrAfter`
 - Vérifier l'`Audience` et l'`Issuer`
 - Vérifier `InResponseTo`



 #### 🔒 Protection des clés

 - Utiliser des clés RSA ≥ 2048 bits
 - Stocker les clés privées de façon sécurisée
 - Rotation régulière des certificats



 #### 🛡️ Transport sécurisé

 - Toujours utiliser HTTPS (TLS 1.2+)
 - Valider les certificats TLS
 - Configurer HSTS



 #### ⏱️ Gestion du temps

 - Synchroniser les horloges (NTP)
 - Tolérance de clock skew raisonnable
 - Protection contre le rejeu





 🚨 Vulnérabilités courantes à éviter

 - **XML Signature Wrapping (XSW)** : Valider que la signature couvre l'élément attendu
 - **Injection XXE** : Désactiver le traitement des entités externes XML
 - **Replay attacks** : Implémenter une cache des ID d'assertions déjà vues
 - **Signature bypass** : Ne jamais accepter d'assertions non signées






 ## 8. Métadonnées SAML
 Les **métadonnées SAML** sont des documents XML décrivant les capacités et la configuration d'une entité SAML.



 | Élément | Description |

 | `EntityID` | Identifiant unique de l'entité (généralement une URL) |
 | `SingleSignOnService` | URLs des endpoints SSO de l'IdP |
 | `AssertionConsumerService` | URLs des endpoints ACS du SP |
 | `SingleLogoutService` | URLs des endpoints SLO |
 | `KeyDescriptor` | Certificats pour signature et chiffrement |
 | `NameIDFormat` | Formats de NameID supportés |



 #### Exemple de métadonnées IdP
 ```
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


 ✅ Avantages des métadonnées

 - **Configuration automatique** : Import/export facile
 - **Rotation de clés** : Possibilité d'inclure plusieurs certificats
 - **Validation** : Possibilité de signer les métadonnées






 ## 9. SAML vs Autres Protocoles
 SAML n'est pas le seul protocole de fédération d'identité. Voici une comparaison :



 | Critère | SAML 2.0 | OAuth 2.0 / OIDC | WS-Federation |

 | Format des tokens | XML | JSON (JWT) | XML |
 | Complexité | Élevée | Moyenne | Élevée |
 | Cas d'usage principal | Enterprise SSO | API, Mobile, Web moderne | Enterprise Microsoft |
 | Taille des messages | Volumineuse | Compacte | Volumineuse |
 | Support mobile | Limité (ECP) | Excellent | Limité |
 | Année | 2005 | 2012 / 2014 | 2009 |





 Quand utiliser quel protocole ?

 SAML 2.0
 ✓ SSO entreprise
 ✓ Applications legacy
 ✓ Fédération B2B
 ✓ Intégration LDAP/AD
 Maturité | Sécurité forte

 OAuth 2.0 / OIDC
 ✓ Applications mobiles
 ✓ APIs REST
 ✓ SPA / Web moderne
 ✓ Social login
 Modernité | Flexibilité

 WS-Federation
 ✓ Environnement Microsoft
 ✓ ADFS
 ✓ SharePoint
 ✓ Office 365
 Écosystème MS

 Figure 6 : Guide de sélection des protocoles de fédération







 ## 10. Glossaire
 Définitions des termes techniques utilisés dans cette documentation.



 ACS (Assertion Consumer Service)Endpoint du SP qui reçoit et traite les réponses SAML contenant les assertions.
 ArtifactRéférence courte (44 bytes) représentant un message SAML, utilisée dans le binding Artifact.
 AssertionDocument XML signé émis par l'IdP contenant des déclarations sur un sujet. C'est la "preuve" d'identité dans SAML.
 Authentication ContextInformation sur la méthode et la force de l'authentification (mot de passe, certificat, MFA).
 AuthnRequestMessage SAML envoyé par le SP à l'IdP pour demander l'authentification d'un utilisateur.
 Back-channelCommunication directe entre IdP et SP via HTTPS, sans passer par le navigateur. Plus sécurisé.
 BindingMécanisme de transport des messages SAML (HTTP Redirect, HTTP POST, SOAP, etc.).
 Certificate (Certificat X.509)Document électronique liant une clé publique à une identité. Utilisé pour signer et chiffrer.
 Circle of TrustEnsemble d'IdPs et SPs ayant établi des relations de confiance mutuelles.
 Clock SkewDifférence de temps entre les horloges de l'IdP et du SP. Une tolérance est configurée.
 DEFLATEAlgorithme de compression utilisé dans le binding HTTP Redirect.
 ECP (Enhanced Client or Proxy)Profil SAML pour les clients "intelligents" (applications mobiles, agents).
 EntityIDIdentifiant unique et global d'une entité SAML (IdP ou SP). Généralement une URL.
 Fédération d'identitéSystème permettant de partager les identités entre plusieurs domaines de sécurité distincts.
 Front-channelCommunication entre IdP et SP via le navigateur (redirections, formulaires). Moins sécurisé.
 Identity Provider (IdP)Entité qui authentifie les utilisateurs et émet des assertions SAML.
 IssuerÉlément SAML identifiant l'entité ayant émid>
 OASISOrganization for the Advancement of Structured Information Standards. Développe et maintient SAML.
 OIDC (OpenID Connect)Couche d'identité sur OAuth 2.0. Alternative moderne à SAML utilisant JSON/JWT.
 Profile (Profil)Spécification définissant comment combiner les composants SAML pour un cas d'usage.
 RelayStateParamètre transmis avec les messages SAML pour maintenir l'état de l'application.
 Replay AttackAttaque consistant à rejouer une assertion SAML valide pour usurper une identité.
 Service Provider (SP)Application qui s'appuie sur l'IdP pour authentifier les utilisateurs.
 SessionIndexIdentifiant unique de session émis par l'IdP. Utilisé pour le Single Logout.
 Single Logout (SLO)Mécanisme déconnectant un utilisateur de toutes ses sessions simultanément.
 Single Sign-On (SSO)Mécanisme permettant une authentification unique pour accéder à plusieurs applications.
 SOAPSimple Object Access Protocol. Protocole XML utilisé pour la communication back-channel.
 SubjectL'entité à propos de laquelle l'assertion fait des déclarations. Contient le NameID.
 Subject ConfirmationMécanisme permettant au SP de vérifier que l'assertion est présentée par le bon sujet.
 Trust RelationshipAccord entre IdP et SP permettant l'échange d'assertions.
 User AgentApplication cliente (navigateur) transportant les messages SAML entre IdP et SP.
 WAYF (Where Are You From)Service de découverte d'IdP aidant l'utilisateur à sélectionner son fournisseur d'identité.
 XML Digital Signature (XMLDSig)Standard W3C pour la signature numérique de documents XML.
 XML Encryption (XMLEnc)Standard W3C pour le chiffrement de documents XML.
 XSW (XML Signature Wrapping)Vulnérabilité où un attaquant manipule la structure XML pour que la signature soit valide mais appliquée à un élément différent.





 **Documentation SAML 2.0 - Guide Complet pour Débutants**
Version 1.0 | Janvier 2025


 Cette documentation fournit une compréhension approfondie du protocole SAML 2.0,
de ses composants, et de ses mécanismes de sécurité.


 Références : OASIS SAML 2.0 Specifications | NIST SP 800-63 | RFC 7522