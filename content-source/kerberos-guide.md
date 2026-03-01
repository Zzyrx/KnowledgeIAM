---
title: "Guide Complet Kerberos"
description: "Guide technique exhaustif sur le protocole Kerberos : authentification par tickets, composants (KDC, TGS, AS), flux d'authentification, keytabs, sécurité et bonnes pratiques."
author: "Jean-Baptiste Janssen"
tags: [kerberos, authentication, sso, security, tickets]
chapters: 10
---

/* ============================================ */
 /* Confluence-compatible scoped styles */
 /* Wrapper: .kerberos-doc */
 /* ============================================ */

 .kerberos-doc {
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
 line-height: 1.7;
 color: #172B4D;
 max-width: 1200px;
 margin: 0 auto;
 padding: 20px 40px;
 background-color: #ffffff;
 }

 /* Header */
 .kerberos-doc .doc-header {
 text-align: center;
 margin-bottom: 60px;
 padding-bottom: 40px;
 border-bottom: 3px solid #C75300;
 }
 .kerberos-doc .doc-header h1 {
 font-size: 2.8em;
 color: #C75300;
 margin-bottom: 15px;
 font-weight: 700;
 }
 .kerberos-doc .doc-header .subtitle {
 font-size: 1.3em;
 color: #5E6C84;
 font-weight: 400;
 }
 .kerberos-doc .doc-header .version-info {
 margin-top: 20px;
 font-size: 0.9em;
 color: #5E6C84;
 }

 /* Table of Contents */
 .kerberos-doc .toc {
 background: #F4F5F7;
 border-radius: 8px;
 padding: 30px 40px;
 margin-bottom: 50px;
 border-left: 4px solid #C75300;
 }
 .kerberos-doc .toc h2 {
 color: #C75300;
 margin-bottom: 20px;
 font-size: 1.4em;
 }
 .kerberos-doc .toc ul {
 list-style: none;
 padding-left: 0;
 }
 .kerberos-doc .toc li {
 margin-bottom: 10px;
 }
 .kerberos-doc .toc a {
 color: #172B4D;
 text-decoration: none;
 }
 .kerberos-doc .toc a:hover {
 color: #C75300;
 text-decoration: underline;
 }
 .kerberos-doc .toc .toc-section {
 font-weight: 600;
 margin-top: 15px;
 margin-bottom: 8px;
 }
 .kerberos-doc .toc .toc-subsection {
 padding-left: 20px;
 font-size: 0.95em;
 }

 /* Headings */
 .kerberos-doc section {
 margin-bottom: 60px;
 }
 .kerberos-doc h2 {
 font-size: 2em;
 color: #C75300;
 margin-bottom: 25px;
 padding-bottom: 12px;
 border-bottom: 2px solid #DFE1E6;
 }
 .kerberos-doc h3 {
 font-size: 1.5em;
 color: #172B4D;
 margin-top: 35px;
 margin-bottom: 18px;
 }
 .kerberos-doc h4 {
 font-size: 1.2em;
 color: #172B4D;
 margin-top: 25px;
 margin-bottom: 12px;
 }
 .kerberos-doc p {
 margin-bottom: 18px;
 text-align: justify;
 }

 /* Info Boxes */
 .kerberos-doc .info-box {
 padding: 20px 25px;
 border-radius: 6px;
 margin: 25px 0;
 }
 .kerberos-doc .info-box.note {
 background: #E6F4FF;
 border-left: 4px solid #00B8D9;
 }
 .kerberos-doc .info-box.warning {
 background: #FFFAE6;
 border-left: 4px solid #FFAB00;
 }
 .kerberos-doc .info-box.success {
 background: #E3FCEF;
 border-left: 4px solid #36B37E;
 }
 .kerberos-doc .info-box.important {
 background: #FFEBE6;
 border-left: 4px solid #FF5630;
 }
 .kerberos-doc .info-box-title {
 font-weight: 700;
 margin-bottom: 10px;
 }

 /* Code */
 .kerberos-doc code {
 background: #F1F3F5;
 padding: 3px 8px;
 border-radius: 4px;
 font-family: 'SF Mono', Monaco, Consolas, 'Courier New', monospace;
 font-size: 0.9em;
 color: #D63384;
 }
 .kerberos-doc pre {
 background: #1E1E1E;
 color: #D4D4D4;
 padding: 25px;
 border-radius: 8px;
 overflow-x: auto;
 margin: 20px 0;
 font-size: 0.9em;
 line-height: 1.5;
 }
 .kerberos-doc pre code {
 background: none;
 padding: 0;
 color: inherit;
 }

 /* Syntax highlighting */
 .kerberos-doc .xml-tag { color: #569CD6; }
 .kerberos-doc .xml-attr { color: #9CDCFE; }
 .kerberos-doc .xml-value { color: #CE9178; }
 .kerberos-doc .xml-comment { color: #6A9955; }
 .kerberos-doc .json-key { color: #9CDCFE; }
 .kerberos-doc .json-string { color: #CE9178; }
 .kerberos-doc .json-number { color: #B5CEA8; }
 .kerberos-doc .json-comment { color: #6A9955; }
 .kerberos-doc .http-method { color: #569CD6; font-weight: bold; }
 .kerberos-doc .http-url { color: #CE9178; }
 .kerberos-doc .http-header { color: #9CDCFE; }

 /* Tables */
 .kerberos-doc table {
 width: 100%;
 border-collapse: collapse;
 margin: 25px 0;
 font-size: 0.95em;
 }
 .kerberos-doc th,
 .kerberos-doc td {
 padding: 14px 18px;
 text-align: left;
 border: 1px solid #DFE1E6;
 }
 .kerberos-doc th {
 background: #C75300;
 color: white;
 font-weight: 600;
 }
 .kerberos-doc tr:nth-child(even) {
 background: #F4F5F7;
 }
 .kerberos-doc tr:hover {
 background: #FFF3E6;
 }
 .kerberos-doc .comparison-table th {
 text-align: center;
 }
 .kerberos-doc .comparison-table td:first-child {
 font-weight: 600;
 background: #F4F5F7;
 }

 /* Diagrams */
 .kerberos-doc .diagram-container {
 background: #F4F5F7;
 border-radius: 12px;
 padding: 30px;
 margin: 30px 0;
 text-align: center;
 }
 .kerberos-doc .diagram-container svg {
 max-width: 100%;
 height: auto;
 }
 .kerberos-doc .diagram-caption {
 margin-top: 15px;
 font-style: italic;
 color: #5E6C84;
 font-size: 0.95em;
 }

 /* Glossary */
 .kerberos-doc .glossary-term {
 background: #F4F5F7;
 border-radius: 8px;
 padding: 20px 25px;
 margin-bottom: 15px;
 border-left: 4px solid #C75300;
 }
 .kerberos-doc .glossary-term dt {
 font-weight: 700;
 color: #C75300;
 font-size: 1.1em;
 margin-bottom: 8px;
 }
 .kerberos-doc .glossary-term dd {
 color: #172B4D;
 padding-left: 0;
 }

 /* Lists */
 .kerberos-doc ul,
 .kerberos-doc ol {
 margin: 15px 0 20px 30px;
 }
 .kerberos-doc li {
 margin-bottom: 10px;
 }

 /* Component Grid (flex-based, no CSS Grid) */
 .kerberos-doc .component-grid {
 display: table;
 width: 100%;
 margin: 30px 0;
 }
 .kerberos-doc .component-grid::after {
 content: "";
 display: table;
 clear: both;
 }
 .kerberos-doc .component-card {
 float: left;
 width: 47%;
 margin: 0 1.5% 25px 1.5%;
 background: white;
 border: 1px solid #DFE1E6;
 border-radius: 10px;
 padding: 25px;
 }
 .kerberos-doc .component-card h4 {
 color: #C75300;
 margin-top: 0;
 margin-bottom: 12px;
 font-size: 1.15em;
 }
 .kerberos-doc .component-card p {
 margin-bottom: 0;
 font-size: 0.95em;
 }

 /* Section cards */
 .kerberos-doc .binding-section,
 .kerberos-doc .profile-section,
 .kerberos-doc .flow-section {
 background: white;
 border: 1px solid #DFE1E6;
 border-radius: 10px;
 padding: 30px;
 margin: 25px 0;
 }
 .kerberos-doc .binding-section h4,
 .kerberos-doc .profile-section h4,
 .kerberos-doc .flow-section h4 {
 color: #C75300;
 border-bottom: 1px solid #DFE1E6;
 padding-bottom: 10px;
 margin-top: 0;
 }

 /* Process Steps (manual numbering, no CSS counters) */
 .kerberos-doc .process-steps {
 list-style: none;
 margin-left: 0;
 padding-left: 0;
 }
 .kerberos-doc .process-steps li {
 position: relative;
 padding-left: 60px;
 margin-bottom: 25px;
 min-height: 45px;
 }
 .kerberos-doc .step-num {
 position: absolute;
 left: 0;
 top: 0;
 width: 40px;
 height: 40px;
 background: #C75300;
 color: white;
 border-radius: 50%;
 text-align: center;
 line-height: 40px;
 font-weight: 700;
 font-size: 1.1em;
 }

 /* Token Box (Kerberos ticket style) */
 .kerberos-doc .token-box {
 background: linear-gradient(135deg, #C75300 0%, #8B3A00 100%);
 border-radius: 10px;
 padding: 20px;
 margin: 20px 0;
 color: white;
 }
 .kerberos-doc .token-box h4 {
 color: white;
 margin-top: 0;
 border-bottom: 1px solid rgba(255,255,255,0.3);
 padding-bottom: 10px;
 }

 /* Footer */
 .kerberos-doc .doc-footer {
 margin-top: 60px;
 padding-top: 30px;
 border-top: 2px solid #DFE1E6;
 text-align: center;
 color: #5E6C84;
 font-size: 0.9em;
 }

 /* Clearfix for floated cards */
 .kerberos-doc .component-grid::after,
 .kerberos-doc::after {
 content: "";
 display: table;
 clear: both;
 }


 # Kerberos
 Protocole d'Authentification par Tickets
Guide Complet pour Debutants


 Version 1.0 | Documentation Technique




## Table des Matieres

 - [1. Introduction a Kerberos](#introduction)
 - [1.1 Qu'est-ce que Kerberos ?](#quest-ce-que-kerberos)
 - [1.2 Pourquoi utiliser Kerberos ?](#pourquoi-kerberos)
 - [1.3 Historique et versions](#historique)
 - [2. Composants Principaux](#composants)
 - [2.1 Key Distribution Center (KDC)](#kdc)
 - [2.2 Authentication Service (AS)](#authentication-service)
 - [2.3 Ticket-Granting Service (TGS)](#ticket-granting-service)
 - [2.4 Client (Principal)](#client-principal)
 - [2.5 Service Server](#service-server)
 - [3. Tickets et Authenticators](#tickets)
 - [3.1 Ticket-Granting Ticket (TGT)](#tgt)
 - [3.2 Service Ticket (ST)](#service-ticket)
 - [3.3 Authenticator](#authenticator)
 - [3.4 Session Keys](#session-keys)
 - [4. Flux d'Authentification](#flux)
 - [4.1 AS-REQ / AS-REP](#as-exchange)
 - [4.2 TGS-REQ / TGS-REP](#tgs-exchange)
 - [4.3 AP-REQ / AP-REP](#ap-exchange)
 - [5. Keytabs et Principals](#keytabs)
 - [5.1 Qu'est-ce qu'un Keytab ?](#quest-ce-quun-keytab)
 - [5.2 Gestion des Keytabs](#gestion-keytabs)
 - [5.3 Formats de Principals](#formats-principals)
 - [5.4 Nommage des Realms](#nommage-realms)
 - [6. Kerberos dans Active Directory](#active-directory)
 - [6.1 Integration AD](#integration-ad)
 - [6.2 Service Principal Names (SPN)](#spn)
 - [6.3 Delegation Kerberos](#delegation)
 - [6.4 Kerberos Armoring (FAST)](#kerberos-armoring)
 - [7. Cross-Realm et Federation](#cross-realm)
 - [7.1 Trust inter-realm](#trust-inter-realm)
 - [7.2 Fonctionnement du cross-realm](#fonctionnement-cross-realm)
 - [7.3 Integration avec d'autres protocoles](#integration-protocoles)
 - [8. Securite](#securite)
 - [8.1 Algorithmes de chiffrement](#algorithmes)
 - [8.2 Attaques connues](#attaques)
 - [8.3 Bonnes pratiques](#bonnes-pratiques)
 - [8.4 Hardening](#hardening)
 - [9. Kerberos vs Autres Protocoles](#comparaison)
 - [10. Glossaire](#glossaire)





## 1. Introduction a Kerberos

### 1.1 Qu'est-ce que Kerberos ?
**Kerberos** est un protocole d'authentification reseau developpe au **Massachusetts Institute of Technology (MIT)** dans le cadre du projet Athena. Il permet a des entites communicant sur un reseau non securise de prouver mutuellement leur identite de maniere securisee, en utilisant un systeme de **tickets** cryptographiques.

Le nom "Kerberos" (ou Cerbere en francais) fait reference au chien a trois tetes de la mythologie grecque qui garde les portes des Enfers. De maniere analogue, le protocole Kerberos "garde" l'acces aux services reseau en s'appuyant sur trois composants principaux : le client, le serveur et le **Key Distribution Center (KDC)**.

Kerberos est un protocole d'**authentification mutuelle** : non seulement le serveur peut verifier l'identite du client, mais le client peut aussi verifier l'identite du serveur. Ce mecanisme previent les attaques de type "man-in-the-middle".


Analogie Simple
Imaginez Kerberos comme un systeme de billets au cinema. Vous montrez votre carte d'identite une seule fois au guichet principal (l'**Authentication Service**), vous recevez un **pass general** (le TGT). Ensuite, pour acceder a chaque salle de cinema (chaque service), vous presentez ce pass a un second guichet (le **Ticket-Granting Service**) qui vous remet un **billet specifique** (le Service Ticket) pour la salle souhaitee. A aucun moment vous ne devez re-montrer votre carte d'identite.



### 1.2 Pourquoi utiliser Kerberos ?


#### SSO Transparent
L'utilisateur s'authentifie une seule fois (a l'ouverture de session) et accede ensuite a tous les services autorises sans ressaisir ses identifiants. L'experience est totalement transparente.



#### Securite Forte
Les mots de passe ne transitent **jamais** sur le reseau. Seuls des tickets chiffres et des cles de session temporaires sont echanges, reduisant considerablement la surface d'attaque.



#### Delegation
Kerberos supporte la delegation d'identite, permettant a un service d'agir au nom de l'utilisateur aupres d'autres services, sans connaitre son mot de passe.



#### Interoperabilite
Kerberos v5 est un standard ouvert (RFC 4120) supporte nativement par Windows (Active Directory), Linux (MIT Kerberos, Heimdal), macOS, et de nombreuses applications (Apache, Nginx, PostgreSQL, SSH, etc.).



### 1.3 Historique et Versions

| Version | Annee | Description |

| **Kerberos v1-v3** | 1983-1987 | Versions internes au MIT, utilisees uniquement dans le projet Athena. Non publiees. |
| **Kerberos v4** | 1989 | Premiere version largement distribuee. Utilise DES pour le chiffrement. Limites de securite connues. |
| **Kerberos v5** | 1993 | Version majeure actuelle (RFC 1510, puis RFC 4120). Support de multiples algorithmes de chiffrement, pre-authentification, tickets renouvelables, delegation. |
| **Extensions PKINIT** | 2006 | RFC 4556 — Authentification initiale par certificat X.509 au lieu d'un mot de passe. |
| **Extensions FAST** | 2011 | RFC 6113 — Flexible Authentication via Secure Tunneling. Protection renforcee de la pre-authentification. |
| **AES Encryption** | 2005 | RFC 3962 — Support d'AES-128 et AES-256 en remplacement de DES (deprecie). |


Important
Ce document se concentre sur **Kerberos v5** (RFC 4120), qui est la version standard utilisee aujourd'hui. Les versions 1 a 4 sont obsoletes et ne doivent plus etre deployees.






## 2. Composants Principaux
L'architecture Kerberos repose sur plusieurs acteurs qui collaborent pour fournir une authentification securisee sans que les mots de passe ne circulent sur le reseau.



<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <!-- Fond -->
  <rect width="800" height="500" fill="#F4F5F7" rx="12"/>

  <!-- Titre -->
  <text x="400" y="35" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="18" font-weight="700" fill="#172B4D">Architecture Kerberos</text>

  <!-- KDC (englobant AS et TGS) -->
  <rect x="230" y="60" width="340" height="180" rx="12" fill="#FFF3E6" stroke="#C75300" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="400" y="85" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="#C75300">KEY DISTRIBUTION CENTER (KDC)</text>

  <!-- AS -->
  <rect x="250" y="100" width="140" height="120" rx="10" fill="white" stroke="#C75300" stroke-width="2"/>
  <text x="320" y="130" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#C75300">AUTHENTICATION</text>
  <text x="320" y="148" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#C75300">SERVICE (AS)</text>
  <text x="320" y="175" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">Authentifie les</text>
  <text x="320" y="192" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">utilisateurs</text>
  <text x="320" y="212" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">Emet le TGT</text>

  <!-- TGS -->
  <rect x="410" y="100" width="140" height="120" rx="10" fill="white" stroke="#C75300" stroke-width="2"/>
  <text x="480" y="130" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#C75300">TICKET-GRANTING</text>
  <text x="480" y="148" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#C75300">SERVICE (TGS)</text>
  <text x="480" y="175" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">Emet les</text>
  <text x="480" y="192" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">Service Tickets</text>
  <text x="480" y="212" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">Valide le TGT</text>

  <!-- Database -->
  <ellipse cx="400" cy="280" rx="60" ry="20" fill="#FFF3E6" stroke="#C75300" stroke-width="2"/>
  <rect x="340" y="260" width="120" height="25" fill="#FFF3E6" stroke="none"/>
  <ellipse cx="400" cy="260" rx="60" ry="20" fill="#FFF3E6" stroke="#C75300" stroke-width="2"/>
  <line x1="340" y1="260" x2="340" y2="280" stroke="#C75300" stroke-width="2"/>
  <line x1="460" y1="260" x2="460" y2="280" stroke="#C75300" stroke-width="2"/>
  <text x="400" y="265" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#C75300">Base de donnees</text>
  <text x="400" y="295" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">Principals + Cles secretes</text>

  <!-- Client -->
  <rect x="40" y="370" width="180" height="100" rx="10" fill="white" stroke="#C75300" stroke-width="2"/>
  <text x="130" y="400" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="#C75300">CLIENT</text>
  <text x="130" y="420" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#172B4D">(Principal)</text>
  <text x="130" y="445" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">Utilisateur ou service</text>
  <text x="130" y="460" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">demandant l'acces</text>

  <!-- Service Server -->
  <rect x="560" y="370" width="200" height="100" rx="10" fill="white" stroke="#C75300" stroke-width="2"/>
  <text x="660" y="400" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="#C75300">SERVICE SERVER</text>
  <text x="660" y="420" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#172B4D">(Application cible)</text>
  <text x="660" y="445" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">Heberge le service</text>
  <text x="660" y="460" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">protege par Kerberos</text>

  <!-- Fleches -->
  <!-- Client -> AS -->
  <line x1="130" y1="370" x2="300" y2="225" stroke="#C75300" stroke-width="2" marker-end="url(#arrowKerb)"/>
  <text x="180" y="290" font-family="Segoe UI, sans-serif" font-size="11" fill="#C75300" font-weight="600">1. AS-REQ</text>
  <text x="180" y="305" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">(demande TGT)</text>

  <!-- AS -> Client -->
  <line x1="290" y1="230" x2="140" y2="370" stroke="#36B37E" stroke-width="2" marker-end="url(#arrowGreen)" stroke-dasharray="6,3"/>
  <text x="175" y="330" font-family="Segoe UI, sans-serif" font-size="11" fill="#36B37E" font-weight="600">2. AS-REP (TGT)</text>

  <!-- Client -> TGS -->
  <line x1="220" y1="390" x2="460" y2="225" stroke="#C75300" stroke-width="2" marker-end="url(#arrowKerb)"/>
  <text x="350" y="330" font-family="Segoe UI, sans-serif" font-size="11" fill="#C75300" font-weight="600">3. TGS-REQ</text>
  <text x="350" y="345" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">(TGT + demande ST)</text>

  <!-- TGS -> Client -->
  <line x1="450" y1="230" x2="225" y2="395" stroke="#36B37E" stroke-width="2" marker-end="url(#arrowGreen)" stroke-dasharray="6,3"/>
  <text x="370" y="365" font-family="Segoe UI, sans-serif" font-size="11" fill="#36B37E" font-weight="600">4. TGS-REP (ST)</text>

  <!-- Client -> Service -->
  <line x1="220" y1="430" x2="560" y2="430" stroke="#C75300" stroke-width="2" marker-end="url(#arrowKerb)"/>
  <text x="390" y="425" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#C75300" font-weight="600">5. AP-REQ (Service Ticket)</text>

  <!-- Service -> Client -->
  <line x1="560" y1="445" x2="220" y2="445" stroke="#36B37E" stroke-width="2" marker-end="url(#arrowGreen)" stroke-dasharray="6,3"/>
  <text x="390" y="462" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#36B37E" font-weight="600">6. AP-REP (authentification mutuelle)</text>

  <!-- Marqueurs de fleches -->
  <defs>
    <marker id="arrowKerb" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#C75300"/>
    </marker>
    <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#36B37E"/>
    </marker>
  </defs>
</svg>

Figure 1 : Architecture generale Kerberos avec le KDC (AS + TGS), le Client et le Service Server



### 2.1 Key Distribution Center (KDC)
Le **Key Distribution Center (KDC)** est le composant central de l'infrastructure Kerberos. Il est responsable de la gestion des identites et de l'emission des tickets. Le KDC est compose de deux sous-services : l'**Authentication Service (AS)** et le **Ticket-Granting Service (TGS)**, ainsi qu'une **base de donnees** contenant tous les principals et leurs cles secretes.


Point Critique
Le KDC est un composant **critique** de l'infrastructure. S'il est compromis, l'ensemble de la securite Kerberos est compromise. Il doit etre place sur un serveur dedie, durci et a acces restreint. En production, il est recommande de deployer au moins **deux KDC** (un primaire et un secondaire) pour la haute disponibilite.


Le KDC stocke dans sa base de donnees :

- Les **principals** (identites) de tous les utilisateurs et services
- Les **cles secretes** derivees des mots de passe (pour les utilisateurs) ou extraites des keytabs (pour les services)
- Les **politiques** de mots de passe et de tickets (duree de vie, flags autorises)

### 2.2 Authentication Service (AS)
L'**Authentication Service** est le premier point de contact du client avec le KDC. Il est responsable de l'authentification initiale de l'utilisateur et de l'emission du **Ticket-Granting Ticket (TGT)**.


Responsabilites de l'AS

- Recevoir les demandes d'authentification initiale (AS-REQ)
- Verifier l'identite du client via la pre-authentification
- Emettre le TGT chiffre avec la cle du TGS
- Generer la cle de session client-TGS
- Appliquer les politiques d'authentification


**Fonctionnement simplifie :** Le client envoie une requete AS-REQ contenant son identite et un timestamp chiffre avec sa cle secrete (pre-authentification). L'AS verifie ce timestamp, puis genere un TGT et une cle de session. Le TGT est chiffre avec la cle du service `krbtgt` (que seul le TGS peut dechiffrer), et la cle de session est chiffree avec la cle du client.

### 2.3 Ticket-Granting Service (TGS)
Le **Ticket-Granting Service** est le second composant du KDC. Il emet des **Service Tickets** permettant au client d'acceder aux services specifiques, sans que le client ait besoin de re-saisir son mot de passe.


Responsabilites du TGS

- Recevoir les demandes de Service Tickets (TGS-REQ)
- Valider le TGT presente par le client
- Verifier l'authenticator du client
- Emettre les Service Tickets chiffres avec la cle du service cible
- Generer les cles de session client-service


**Avantage cle :** Grace au TGS, le mot de passe de l'utilisateur n'est utilise qu'**une seule fois**, lors de l'authentification initiale aupres de l'AS. Tous les acces subsequents aux services utilisent le TGT, realisant ainsi le **Single Sign-On (SSO)**.

### 2.4 Client (Principal)
Le **Client** (ou **Principal**) est l'entite qui souhaite acceder a un service. Il peut s'agir d'un utilisateur humain s'authentifiant a l'ouverture de sa session, ou d'un service/application devant s'authentifier aupres d'un autre service.


Le Vocabulaire des Principals
Dans Kerberos, toute entite (utilisateur, service, machine) ayant une entree dans la base de donnees du KDC est appelee un "principal". Chaque principal possede un nom unique et une cle secrete associee.



#### Types de Principals

| Type | Format | Exemple | Description |
| **User Principal** | `nom@REALM` | `jdupont@EXAMPLE.COM` | Utilisateur humain |
| **Service Principal** | `service/hostname@REALM` | `HTTP/web.example.com@EXAMPLE.COM` | Service reseau |
| **Host Principal** | `host/hostname@REALM` | `host/srv01.example.com@EXAMPLE.COM` | Machine/serveur |
| **TGT Principal** | `krbtgt/REALM@REALM` | `krbtgt/EXAMPLE.COM@EXAMPLE.COM` | Compte special du TGS |


### 2.5 Service Server
Le **Service Server** est le serveur qui heberge l'application ou le service auquel le client souhaite acceder. Il possede sa propre cle secrete (stockee dans un **keytab**) qui lui permet de dechiffrer les Service Tickets presentes par les clients.


Responsabilites du Service Server

- Recevoir et valider les Service Tickets (AP-REQ)
- Dechiffrer le ticket avec sa cle secrete (keytab)
- Verifier l'authenticator du client
- Optionnellement, fournir une preuve d'identite au client (authentification mutuelle via AP-REP)
- Autoriser l'acces a la ressource demandee


**Exemples de Service Servers :** serveur web (HTTP), serveur de fichiers (CIFS/SMB), serveur de base de donnees (PostgreSQL, Oracle), serveur SSH, serveur LDAP, serveur de messagerie (IMAP).




## 3. Tickets et Authenticators
Les **tickets** sont les elements centraux du protocole Kerberos. Ce sont des structures de donnees chiffrees qui prouvent l'identite d'un utilisateur aupres d'un service, sans que le mot de passe ne circule sur le reseau.



<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Fond -->
  <rect width="800" height="400" fill="#F4F5F7" rx="12"/>

  <!-- Titre -->
  <text x="400" y="35" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="18" font-weight="700" fill="#172B4D">Les Elements Cryptographiques Kerberos</text>

  <!-- TGT -->
  <rect x="30" y="60" width="230" height="280" rx="10" fill="white" stroke="#C75300" stroke-width="2"/>
  <rect x="30" y="60" width="230" height="45" rx="10" fill="#C75300"/>
  <rect x="30" y="90" width="230" height="15" fill="#C75300"/>
  <text x="145" y="88" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="15" font-weight="700" fill="white">TICKET-GRANTING</text>
  <text x="145" y="88" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="15" font-weight="700" fill="white" dy="0">TGT</text>
  <text x="145" y="82" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="white">TGT</text>
  <text x="50" y="130" font-family="Segoe UI, sans-serif" font-size="12" fill="#172B4D" font-weight="600">Contenu :</text>
  <text x="50" y="150" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Realm + Client principal</text>
  <text x="50" y="168" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Cle de session (client-TGS)</text>
  <text x="50" y="186" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Timestamps (debut/fin)</text>
  <text x="50" y="204" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Flags (renewable, forwardable)</text>
  <text x="50" y="222" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Adresses IP (optionnel)</text>
  <text x="50" y="250" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#C75300">Chiffre avec :</text>
  <text x="50" y="268" font-family="Segoe UI, sans-serif" font-size="11" fill="#172B4D">Cle du service krbtgt</text>
  <text x="50" y="295" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#36B37E">Duree de vie : 8-10h</text>
  <text x="50" y="315" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#36B37E">Renouvelable : 7 jours</text>

  <!-- Service Ticket -->
  <rect x="285" y="60" width="230" height="280" rx="10" fill="white" stroke="#C75300" stroke-width="2"/>
  <rect x="285" y="60" width="230" height="45" rx="10" fill="#8B3A00"/>
  <rect x="285" y="90" width="230" height="15" fill="#8B3A00"/>
  <text x="400" y="82" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="white">SERVICE TICKET (ST)</text>
  <text x="305" y="130" font-family="Segoe UI, sans-serif" font-size="12" fill="#172B4D" font-weight="600">Contenu :</text>
  <text x="305" y="150" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Realm + Client principal</text>
  <text x="305" y="168" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Cle de session (client-service)</text>
  <text x="305" y="186" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Timestamps (debut/fin)</text>
  <text x="305" y="204" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Flags du ticket</text>
  <text x="305" y="222" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Authorization Data (PAC)</text>
  <text x="305" y="250" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#C75300">Chiffre avec :</text>
  <text x="305" y="268" font-family="Segoe UI, sans-serif" font-size="11" fill="#172B4D">Cle du service cible</text>
  <text x="305" y="295" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#36B37E">Duree de vie : 8-10h</text>
  <text x="305" y="315" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#FFAB00">Usage : service specifique</text>

  <!-- Authenticator -->
  <rect x="540" y="60" width="230" height="280" rx="10" fill="white" stroke="#C75300" stroke-width="2"/>
  <rect x="540" y="60" width="230" height="45" rx="10" fill="#E67300"/>
  <rect x="540" y="90" width="230" height="15" fill="#E67300"/>
  <text x="655" y="82" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="white">AUTHENTICATOR</text>
  <text x="560" y="130" font-family="Segoe UI, sans-serif" font-size="12" fill="#172B4D" font-weight="600">Contenu :</text>
  <text x="560" y="150" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Client principal name</text>
  <text x="560" y="168" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Timestamp (ctime/cusec)</text>
  <text x="560" y="186" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Sous-cle (optionnel)</text>
  <text x="560" y="204" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Numero de sequence</text>
  <text x="560" y="222" font-family="Segoe UI, sans-serif" font-size="11" fill="#5E6C84">- Checksum</text>
  <text x="560" y="250" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#C75300">Chiffre avec :</text>
  <text x="560" y="268" font-family="Segoe UI, sans-serif" font-size="11" fill="#172B4D">Cle de session</text>
  <text x="560" y="295" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#FF5630">Usage unique !</text>
  <text x="560" y="315" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#FF5630">Protection anti-rejeu</text>

  <!-- Fleches -->
  <text x="400" y="370" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" fill="#5E6C84" font-style="italic">Le TGT est reutilisable | Le ST est specifique a un service | L'Authenticator est a usage unique</text>
</svg>

Figure 2 : Les trois elements cryptographiques de Kerberos : TGT, Service Ticket et Authenticator



### 3.1 Ticket-Granting Ticket (TGT)
Le **Ticket-Granting Ticket (TGT)** est le "pass general" de l'utilisateur dans le monde Kerberos. Il est emis par l'AS lors de l'authentification initiale et permet au client de demander des Service Tickets aupres du TGS **sans avoir a se re-authentifier**.


TGT — Le pass general

Le TGT est chiffre avec la **cle du service `krbtgt`** (le compte TGS dans la base de donnees du KDC). Le client ne peut donc **pas** le dechiffrer ni le modifier — il le stocke et le presente tel quel au TGS.


#### Structure detaillee du TGT

| Champ | Description | Exemple |
| `tkt-vno` | Version du ticket | `5` |
| `realm` | Realm Kerberos | `EXAMPLE.COM` |
| `sname` | Service principal (TGS) | `krbtgt/EXAMPLE.COM` |
| `enc-part.flags` | Flags du ticket | `FORWARDABLE, RENEWABLE, PROXIABLE` |
| `enc-part.key` | Cle de session client-TGS | (cle AES-256 generee aleatoirement) |
| `enc-part.crealm` | Realm du client | `EXAMPLE.COM` |
| `enc-part.cname` | Principal du client | `jdupont` |
| `enc-part.authtime` | Heure d'authentification | `2025-03-01T09:00:00Z` |
| `enc-part.starttime` | Debut de validite | `2025-03-01T09:00:00Z` |
| `enc-part.endtime` | Fin de validite | `2025-03-01T19:00:00Z` |
| `enc-part.renew-till` | Limite de renouvellement | `2025-03-08T09:00:00Z` |
| `enc-part.caddr` | Adresses autorisees | `192.168.1.100` (optionnel) |



Renouvellement du TGT
Un TGT peut etre **renouvele** avant son expiration (si le flag `RENEWABLE` est active). Le client envoie une requete TGS-REQ avec le flag `RENEW` au TGS, qui emet un nouveau TGT avec une nouvelle date d'expiration. La date `renew-till` definit la limite absolue de renouvellement (typiquement 7 jours).



### 3.2 Service Ticket (ST)
Le **Service Ticket (ST)**, aussi appele **ticket de service**, est emis par le TGS et permet au client d'acceder a un service specifique. Il est chiffre avec la **cle du service cible** — seul le service peut le dechiffrer.

#### Differences avec le TGT

| Aspect | TGT | Service Ticket |
| Emis par | Authentication Service (AS) | Ticket-Granting Service (TGS) |
| Chiffre avec | Cle du service `krbtgt` | Cle du service cible |
| Destinataire | TGS | Service Server |
| Usage | Demander des Service Tickets | Acceder a un service specifique |
| Portee | Tous les services du realm | Un seul service |


Le Service Ticket contient egalement les **Authorization Data**, notamment le **PAC (Privilege Attribute Certificate)** dans les environnements Active Directory. Le PAC contient les informations d'autorisation de l'utilisateur (groupes, SID, etc.) utilisees par le service pour le controle d'acces.

### 3.3 Authenticator
L'**Authenticator** est un element cryptographique cree par le client et envoye avec chaque ticket (TGT ou ST). Il contient le **timestamp courant** du client, chiffre avec la **cle de session** partagee entre le client et le destinataire.


Protection Anti-Rejeu
L'Authenticator est la protection principale contre les attaques de **rejeu** (replay attacks). Le serveur verifie que le timestamp de l'Authenticator est recent (dans la fenetre de tolerance, typiquement 5 minutes) et qu'il n'a pas deja ete vu. Chaque Authenticator est **a usage unique**.



Le serveur maintient un **cache des Authenticators** recemment recus. Si un attaquant intercepte et rejoue un message contenant un ticket + Authenticator, le serveur le rejettera car l'Authenticator a deja ete traite.

### 3.4 Session Keys
Les **cles de session** sont des cles de chiffrement symetriques temporaires, generees aleatoirement par le KDC pour chaque echange. Elles permettent de securiser la communication entre deux entites sans que celles-ci aient besoin de partager un secret permanent.

#### Deux types de cles de session

| Type | Partagee entre | Generee lors de | Utilisee pour |
| **Cle de session TGS** | Client et TGS | Echange AS (AS-REP) | Chiffrer les requetes TGS-REQ et les Authenticators presentes au TGS |
| **Cle de session Service** | Client et Service | Echange TGS (TGS-REP) | Chiffrer les Authenticators presentes au service et securiser les communications applicatives |



Securite des cles de session
Les cles de session sont **ephemeres** — elles ont la meme duree de vie que le ticket associe. Meme si une cle de session est compromise, l'impact est limite dans le temps et dans la portee (un seul service).






## 4. Flux d'Authentification
Le processus d'authentification Kerberos se deroule en **trois echanges** successifs, chacun compose d'une requete et d'une reponse. Voici le flux complet detaille.



<svg viewBox="0 0 800 620" xmlns="http://www.w3.org/2000/svg">
  <!-- Fond -->
  <rect width="800" height="620" fill="#F4F5F7" rx="12"/>

  <!-- Titre -->
  <text x="400" y="30" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="18" font-weight="700" fill="#172B4D">Flux d'Authentification Kerberos Complet</text>

  <!-- Colonnes -->
  <text x="120" y="60" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="#C75300">Client</text>
  <line x1="120" y1="70" x2="120" y2="600" stroke="#C75300" stroke-width="2" stroke-dasharray="4,4"/>

  <text x="400" y="60" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="#C75300">KDC (AS + TGS)</text>
  <line x1="400" y1="70" x2="400" y2="600" stroke="#C75300" stroke-width="2" stroke-dasharray="4,4"/>

  <text x="660" y="60" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="#C75300">Service Server</text>
  <line x1="660" y1="70" x2="660" y2="600" stroke="#C75300" stroke-width="2" stroke-dasharray="4,4"/>

  <!-- Phase 1 : AS Exchange -->
  <rect x="20" y="80" width="760" height="140" rx="8" fill="#FFF3E6" fill-opacity="0.5" stroke="#C75300" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="40" y="100" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#C75300">PHASE 1 : Authentication Service Exchange</text>

  <!-- AS-REQ -->
  <line x1="130" y1="120" x2="390" y2="120" stroke="#C75300" stroke-width="2" marker-end="url(#arrowK)"/>
  <text x="260" y="115" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#C75300">1. AS-REQ</text>
  <text x="260" y="135" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">Client principal + timestamp chiffre (pre-auth)</text>

  <!-- AS-REP -->
  <line x1="390" y1="170" x2="130" y2="170" stroke="#36B37E" stroke-width="2" marker-end="url(#arrowG)"/>
  <text x="260" y="165" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#36B37E">2. AS-REP</text>
  <text x="260" y="185" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">TGT (chiffre cle krbtgt) + cle session (chiffre cle client)</text>
  <text x="260" y="205" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#36B37E" font-style="italic">Le client dechiffre la cle de session avec son mot de passe</text>

  <!-- Phase 2 : TGS Exchange -->
  <rect x="20" y="225" width="760" height="140" rx="8" fill="#FFF3E6" fill-opacity="0.5" stroke="#C75300" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="40" y="245" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#C75300">PHASE 2 : Ticket-Granting Service Exchange</text>

  <!-- TGS-REQ -->
  <line x1="130" y1="270" x2="390" y2="270" stroke="#C75300" stroke-width="2" marker-end="url(#arrowK)"/>
  <text x="260" y="265" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#C75300">3. TGS-REQ</text>
  <text x="260" y="285" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">TGT + Authenticator (chiffre cle session TGS) + SPN du service cible</text>

  <!-- TGS-REP -->
  <line x1="390" y1="320" x2="130" y2="320" stroke="#36B37E" stroke-width="2" marker-end="url(#arrowG)"/>
  <text x="260" y="315" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#36B37E">4. TGS-REP</text>
  <text x="260" y="335" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">Service Ticket (chiffre cle service) + cle session service (chiffre cle session TGS)</text>
  <text x="260" y="355" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#36B37E" font-style="italic">Le client dechiffre la cle de session service</text>

  <!-- Phase 3 : AP Exchange -->
  <rect x="20" y="375" width="760" height="200" rx="8" fill="#FFF3E6" fill-opacity="0.5" stroke="#C75300" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="40" y="395" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#C75300">PHASE 3 : Application Service Exchange</text>

  <!-- AP-REQ -->
  <line x1="130" y1="420" x2="650" y2="420" stroke="#C75300" stroke-width="2" marker-end="url(#arrowK)"/>
  <text x="390" y="415" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#C75300">5. AP-REQ</text>
  <text x="390" y="435" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">Service Ticket + Authenticator (chiffre cle session service)</text>

  <!-- Service valide -->
  <text x="660" y="465" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">Le service dechiffre le ST avec</text>
  <text x="660" y="478" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">sa cle (keytab), puis valide</text>
  <text x="660" y="491" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">l'Authenticator du client</text>

  <!-- AP-REP -->
  <line x1="650" y1="510" x2="130" y2="510" stroke="#36B37E" stroke-width="2" marker-end="url(#arrowG)"/>
  <text x="390" y="505" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#36B37E">6. AP-REP (optionnel — authentification mutuelle)</text>
  <text x="390" y="525" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">Timestamp du client + 1, chiffre avec cle session service</text>

  <!-- Resultat -->
  <rect x="100" y="545" width="600" height="35" rx="6" fill="#E3FCEF" stroke="#36B37E" stroke-width="1"/>
  <text x="400" y="567" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="#36B37E">Acces au service accorde — Communication securisee etablie</text>

  <defs>
    <marker id="arrowK" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#C75300"/></marker>
    <marker id="arrowG" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#36B37E"/></marker>
  </defs>
</svg>

Figure 3 : Flux d'authentification Kerberos complet en trois phases (AS, TGS, AP)



### 4.1 AS-REQ / AS-REP (Authentication Service Exchange)
L'echange AS est la **premiere etape** du processus d'authentification. Le client s'identifie aupres de l'AS et obtient son TGT.

#### Processus detaille


- <span class="step-num">1</span> **Le client envoie une AS-REQ** contenant son principal name (`jdupont@EXAMPLE.COM`), le principal du TGS (`krbtgt/EXAMPLE.COM`), et les donnees de **pre-authentification** (un timestamp chiffre avec la cle derivee de son mot de passe).

- <span class="step-num">2</span> **L'AS verifie la pre-authentification** en cherchant le principal du client dans la base de donnees du KDC, recupere sa cle secrete, et tente de dechiffrer le timestamp. Si le timestamp est valide (dans la fenetre de tolerance de 5 minutes), l'authentification est reussie.

- <span class="step-num">3</span> **L'AS genere une cle de session** aleatoire pour la communication client-TGS.

- <span class="step-num">4</span> **L'AS cree le TGT** contenant l'identite du client, la cle de session, et les timestamps de validite. Le TGT est chiffre avec la cle du service `krbtgt`.

- <span class="step-num">5</span> **L'AS envoie la AS-REP** contenant le TGT (que le client ne peut pas dechiffrer) et la cle de session chiffree avec la cle du client (que le client peut dechiffrer).

- <span class="step-num">6</span> **Le client dechiffre** la partie qui lui est destinee avec sa cle (derivee de son mot de passe), obtient la cle de session, et stocke le TGT dans son **cache de credentials** (`/tmp/krb5cc_<UID>` sous Linux, ou le cache LSA sous Windows).


#### Pre-authentification (PA-DATA)

La pre-authentification est un mecanisme de securite **essentiel** qui empeche les attaques par dictionnaire hors-ligne contre le KDC.

```
# Structure simplifiee de la pre-authentification PA-ENC-TIMESTAMP
PA-ENC-TIMESTAMP ::= {
    patimestamp    [0] KerberosTime,    -- Timestamp courant du client
    pausec         [1] Microseconds     -- Microsecondes (precision)
}
# Le tout est chiffre avec la cle derivee du mot de passe du client
# Algorithme de derivation : string2key(password, salt, params)
```


Securite de la Pre-authentification
Sans pre-authentification, n'importe qui pourrait envoyer une AS-REQ au nom d'un utilisateur et recevoir un TGT chiffre avec la cle de cet utilisateur. Un attaquant pourrait alors tenter de dechiffrer le TGT hors-ligne par force brute (**AS-REP Roasting**). La pre-authentification empeche cela en exigeant que le client prouve sa connaissance du mot de passe **avant** l'emission du TGT.



### 4.2 TGS-REQ / TGS-REP (Ticket-Granting Service Exchange)
L'echange TGS est la **deuxieme etape**. Le client utilise son TGT pour demander un Service Ticket pour un service specifique.

#### Processus detaille


- <span class="step-num">1</span> **Le client construit un Authenticator** contenant son principal name et le timestamp courant, chiffre avec la **cle de session TGS** (obtenue dans l'AS-REP).

- <span class="step-num">2</span> **Le client envoie une TGS-REQ** contenant : le TGT (tel quel, opaque pour le client), l'Authenticator chiffre, et le **SPN** (Service Principal Name) du service souhaite (ex: `HTTP/web.example.com@EXAMPLE.COM`).

- <span class="step-num">3</span> **Le TGS dechiffre le TGT** avec la cle du service `krbtgt`, extrait la cle de session, puis dechiffre l'Authenticator avec cette cle de session.

- <span class="step-num">4</span> **Le TGS verifie** que le principal dans l'Authenticator correspond a celui du TGT, que le timestamp est recent, et que l'Authenticator n'a pas deja ete vu.

- <span class="step-num">5</span> **Le TGS genere une nouvelle cle de session** pour la communication client-service, et cree le Service Ticket chiffre avec la **cle du service cible** (stockee dans la base de donnees du KDC).

- <span class="step-num">6</span> **Le TGS envoie la TGS-REP** contenant le Service Ticket (opaque pour le client) et la nouvelle cle de session chiffree avec la cle de session TGS.


```
# Exemple de TGS-REQ (representation simplifiee)
TGS-REQ ::= {
    pvno       5,                           -- Version du protocole
    msg-type   12,                          -- KRB_TGS_REQ
    padata     {                            -- Pre-auth data
        AP-REQ {                            -- Contient le TGT + Authenticator
            ticket      <TGT>,
            authenticator <Authenticator chiffre>
        }
    },
    req-body   {
        sname  "HTTP/web.example.com",      -- Service demande
        realm  "EXAMPLE.COM",
        till   "2025-03-01T19:00:00Z",      -- Expiration souhaitee
        nonce  123456789,                   -- Anti-rejeu
        etype  [18, 17]                     -- AES-256, AES-128
    }
}
```

### 4.3 AP-REQ / AP-REP (Application Service Exchange)
L'echange AP est la **troisieme et derniere etape**. Le client presente son Service Ticket au serveur pour acceder au service.

#### Processus detaille


- <span class="step-num">1</span> **Le client construit un nouvel Authenticator**, cette fois chiffre avec la **cle de session service** (obtenue dans la TGS-REP).

- <span class="step-num">2</span> **Le client envoie une AP-REQ** au Service Server, contenant le Service Ticket et l'Authenticator.

- <span class="step-num">3</span> **Le Service Server dechiffre le Service Ticket** avec sa propre cle secrete (stockee dans son keytab), extrait la cle de session service, puis dechiffre l'Authenticator.

- <span class="step-num">4</span> **Le Service Server verifie** le principal, le timestamp, et l'unicite de l'Authenticator.

- <span class="step-num">5</span> **Si l'authentification mutuelle est demandee** (flag `MUTUAL-REQUIRED`), le serveur envoie une **AP-REP** contenant le timestamp de l'Authenticator du client incremente, chiffre avec la cle de session. Cela prouve au client que le serveur a pu dechiffrer le ticket (et donc qu'il est bien le service legitime).

- <span class="step-num">6</span> **L'acces est accorde.** La cle de session peut ensuite etre utilisee pour chiffrer les communications applicatives (comme avec GSSAPI/SPNEGO).



Pourquoi l'authentification mutuelle est importante
Sans AP-REP, un attaquant pourrait usurper l'identite du serveur (attaque "man-in-the-middle"). L'authentification mutuelle garantit que le client parle bien au serveur legitime et non a un imposteur.






## 5. Keytabs et Principals
Les **keytabs** et les **principals** sont des elements fondamentaux de l'administration Kerberos au quotidien.

### 5.1 Qu'est-ce qu'un Keytab ?
Un **keytab** (key table) est un fichier contenant une ou plusieurs paires (principal, cle secrete). Il est principalement utilise par les **services** et les **serveurs** pour s'authentifier aupres du KDC sans intervention humaine (pas de saisie de mot de passe).


Analogie
Si le mot de passe est votre "carte d'identite" que vous montrez manuellement, le keytab est votre "badge d'acces automatique" que le systeme presente pour vous.


#### Contenu d'un keytab

| Element | Description |
| Principal | Le nom du service ou de l'utilisateur (ex: `HTTP/web.example.com@EXAMPLE.COM`) |
| KVNO | Key Version Number — numero de version de la cle |
| Encryption Type | Algorithme de chiffrement (AES-256, AES-128, etc.) |
| Key | La cle secrete elle-meme (derivee du mot de passe ou generee aleatoirement) |
| Timestamp | Date d'ajout de l'entree dans le keytab |


Un keytab peut contenir **plusieurs entrees** pour le meme principal (differentes versions de cle, differents algorithmes) et pour **plusieurs principals** (un meme serveur hebergeant plusieurs services).


Securite critique
Le keytab contient l'equivalent du mot de passe du service en clair. Il doit etre protege avec des permissions strictes (`chmod 600`, `chown root:root` ou le compte de service) et ne jamais etre transmis en clair sur le reseau.



### 5.2 Gestion des Keytabs

#### Commandes essentielles

```
# ===================================
# CREATION d'un keytab avec kadmin
# ===================================

# Connexion au KDC en tant qu'administrateur
$ kadmin -p admin/admin@EXAMPLE.COM

# Creer un principal de service
kadmin: addprinc -randkey HTTP/web.example.com@EXAMPLE.COM

# Extraire la cle dans un fichier keytab
kadmin: ktadd -k /etc/krb5.keytab HTTP/web.example.com@EXAMPLE.COM

# ===================================
# CONSULTATION d'un keytab avec ktutil
# ===================================

$ ktutil
ktutil: read_kt /etc/krb5.keytab
ktutil: list
slot KVNO Principal
---- ---- -----------------------------------------------------
   1    3 HTTP/web.example.com@EXAMPLE.COM (aes256-cts-hmac-sha1-96)
   2    3 HTTP/web.example.com@EXAMPLE.COM (aes128-cts-hmac-sha1-96)

# ===================================
# CONSULTATION avec klist
# ===================================

# Lister le contenu d'un keytab
$ klist -k /etc/krb5.keytab
Keytab name: FILE:/etc/krb5.keytab
KVNO Principal
---- --------------------------------------------------
   3 HTTP/web.example.com@EXAMPLE.COM
   3 HTTP/web.example.com@EXAMPLE.COM

# Lister avec les types de chiffrement
$ klist -ke /etc/krb5.keytab
KVNO Principal
---- --------------------------------------------------
   3 HTTP/web.example.com@EXAMPLE.COM (aes256-cts-hmac-sha1-96)
   3 HTTP/web.example.com@EXAMPLE.COM (aes128-cts-hmac-sha1-96)
```

#### Commandes utilisateur courantes

```
# ===================================
# OBTENIR un TGT (authentification initiale)
# ===================================

# Avec mot de passe interactif
$ kinit jdupont@EXAMPLE.COM
Password for jdupont@EXAMPLE.COM: ********

# Avec un keytab (non interactif, pour les scripts/services)
$ kinit -kt /etc/krb5.keytab HTTP/web.example.com@EXAMPLE.COM

# ===================================
# CONSULTER le cache de tickets
# ===================================

$ klist
Ticket cache: FILE:/tmp/krb5cc_1000
Default principal: jdupont@EXAMPLE.COM

Valid starting       Expires              Service principal
03/01/2025 09:00:00  03/01/2025 19:00:00  krbtgt/EXAMPLE.COM@EXAMPLE.COM
    renew until 03/08/2025 09:00:00
03/01/2025 09:05:00  03/01/2025 19:00:00  HTTP/web.example.com@EXAMPLE.COM

# ===================================
# DETRUIRE le cache de tickets (deconnexion)
# ===================================

$ kdestroy
```

#### Rotation des keytabs

La rotation des cles de service est une bonne pratique de securite :

```
# 1. Generer une nouvelle cle pour le principal (incremente le KVNO)
kadmin: cpw -randkey HTTP/web.example.com@EXAMPLE.COM

# 2. Extraire la nouvelle cle dans le keytab (garde les anciennes entrees)
kadmin: ktadd -k /etc/krb5.keytab HTTP/web.example.com@EXAMPLE.COM

# 3. Verifier que le nouveau KVNO est present
$ klist -ke /etc/krb5.keytab

# 4. Apres un delai suffisant (> duree de vie max des tickets),
#    supprimer les anciennes entrees
ktutil: read_kt /etc/krb5.keytab
ktutil: delete_entry 1    # Supprimer l'ancienne entree KVNO
ktutil: write_kt /etc/krb5.keytab
```


Rotation progressive
Lors de la rotation, gardez les anciennes cles dans le keytab pendant au moins la duree de vie maximale d'un ticket (typiquement 10h). Les tickets emis avant la rotation sont chiffres avec l'ancienne cle — les supprimer trop tot causera des echecs d'authentification.



### 5.3 Formats de Principals
Le format d'un principal Kerberos est standardise et hierarchique :

```
# Format general
composant1/composant2@REALM

# Exemples de principals utilisateur
jdupont@EXAMPLE.COM                          # Utilisateur simple
admin/admin@EXAMPLE.COM                      # Administrateur Kerberos
jdupont/admin@EXAMPLE.COM                    # Instance admin de jdupont

# Exemples de principals de service
HTTP/web.example.com@EXAMPLE.COM             # Service HTTP
ldap/ldap.example.com@EXAMPLE.COM            # Service LDAP
host/srv01.example.com@EXAMPLE.COM           # Machine/host
postgres/db.example.com@EXAMPLE.COM          # Service PostgreSQL
cifs/fileserver.example.com@EXAMPLE.COM      # Service CIFS/SMB
nfs/nas.example.com@EXAMPLE.COM              # Service NFS

# Principals speciaux
krbtgt/EXAMPLE.COM@EXAMPLE.COM               # TGS du realm
krbtgt/PARTNER.COM@EXAMPLE.COM               # Trust inter-realm
K/M@EXAMPLE.COM                              # Master key du KDC
kadmin/admin@EXAMPLE.COM                     # Service d'administration
kadmin/changepw@EXAMPLE.COM                  # Service de changement de mot de passe
```

#### Decomposition d'un principal

| Partie | Description | Exemple |
| **Primary** | Nom de l'entite (utilisateur ou service) | `HTTP`, `jdupont`, `host` |
| **Instance** | Qualificateur (hostname pour services, role pour utilisateurs) | `web.example.com`, `admin` |
| **Realm** | Domaine Kerberos (toujours en MAJUSCULES par convention) | `EXAMPLE.COM` |

### 5.4 Nommage des Realms
Un **realm** est le domaine d'autorite d'un KDC. Tous les principals appartiennent a un realm.

#### Conventions de nommage

| Convention | Exemple | Usage |
| Domaine DNS en majuscules | `EXAMPLE.COM` | Standard recommande |
| Sous-domaine | `DEV.EXAMPLE.COM` | Environnements multiples |
| Nom arbitraire | `ATHENA.MIT.EDU` | Historique MIT |


Bonne pratique
Utilisez **toujours** le nom de domaine DNS en majuscules comme nom de realm. Cela facilite l'integration avec DNS (decouverte automatique des KDC via les enregistrements SRV `_kerberos._tcp.EXAMPLE.COM`) et avec Active Directory.



#### Configuration du realm (`/etc/krb5.conf`)

```
[libdefaults]
    default_realm = EXAMPLE.COM
    dns_lookup_realm = true
    dns_lookup_kdc = true
    ticket_lifetime = 10h
    renew_lifetime = 7d
    forwardable = true

[realms]
    EXAMPLE.COM = {
        kdc = kdc1.example.com
        kdc = kdc2.example.com         # KDC secondaire (HA)
        admin_server = kdc1.example.com
        default_domain = example.com
    }

[domain_realm]
    .example.com = EXAMPLE.COM
    example.com = EXAMPLE.COM
```




## 6. Kerberos dans Active Directory
**Active Directory (AD)** de Microsoft utilise Kerberos v5 comme protocole d'authentification **par defaut** depuis Windows 2000. L'implementation AD etend le standard Kerberos avec des fonctionnalites specifiques.

### 6.1 Integration AD

#### Le compte KRBTGT
Dans Active Directory, le compte `KRBTGT` est un compte de service special qui represente le **Ticket-Granting Service**. Sa cle secrete (mot de passe) est utilisee pour chiffrer tous les TGT du domaine.


Securite du compte KRBTGT
Le mot de passe du compte KRBTGT est la cle de voute de la securite Kerberos dans AD. S'il est compromis, un attaquant peut forger des **Golden Tickets** (voir chapitre 8). Microsoft recommande de **changer le mot de passe du KRBTGT deux fois** de suite lors d'une remediation de compromission.



#### Specificites AD

| Fonctionnalite | Standard Kerberos | Active Directory |
| PAC (Privilege Attribute Certificate) | Non prevu | Inclus dans chaque ticket — contient les SID des groupes de l'utilisateur |
| Delegation | Basique (forwarding) | Unconstrained, Constrained, Resource-Based |
| Pre-authentification | Optionnelle | Obligatoire par defaut (desactivable par compte) |
| Chiffrement par defaut | Configurable | AES-256 (Windows 2008+), RC4-HMAC (compatibilite) |
| Nom de realm | Arbitraire | Nom de domaine AD en majuscules (`EXAMPLE.COM`) |


### 6.2 Service Principal Names (SPN)
Les **SPN** (Service Principal Names) sont la methode utilisee par Active Directory pour associer un service a un compte (utilisateur ou ordinateur) qui execute ce service.

```
# Format d'un SPN
service_class/hostname[:port][/service_name]

# Exemples de SPN
HTTP/web.example.com                    # Service web
HTTP/web.example.com:8443               # Service web sur port specifique
MSSQLSvc/sql.example.com:1433           # SQL Server
ldap/dc01.example.com                   # Service LDAP sur un DC
cifs/fileserver.example.com             # Service de fichiers
host/srv01.example.com                  # Service host general
```

#### Gestion des SPN avec `setspn`

```
# Lister les SPN d'un compte
setspn -L svc_webapp

# Enregistrer un SPN sur un compte de service
setspn -S HTTP/web.example.com svc_webapp

# Verifier les doublons
setspn -X

# Supprimer un SPN
setspn -D HTTP/web.example.com svc_webapp
```


SPN en double
Un SPN ne doit etre enregistre que sur **un seul compte** dans tout le domaine. Un SPN en double provoquera des echecs d'authentification Kerberos. Utilisez `setspn -X` regulierement pour detecter les doublons.



### 6.3 Delegation Kerberos
La **delegation Kerberos** permet a un service d'agir **au nom de l'utilisateur** aupres d'autres services. C'est un mecanisme puissant mais potentiellement dangereux.

#### Les trois types de delegation

| Type | Description | Risque | Configuration |
| **Unconstrained Delegation** | Le service recoit le **TGT de l'utilisateur** et peut acceder a **n'importe quel service** en son nom. | Tres eleve | Onglet Delegation : "Trust this computer for delegation to any service" |
| **Constrained Delegation** | Le service peut agir au nom de l'utilisateur uniquement aupres de **services specifiques** (liste blanche de SPN). | Modere | Onglet Delegation : "Trust this computer for delegation to specified services only" |
| **Resource-Based Constrained Delegation (RBCD)** | Le **service cible** decide quels services peuvent agir au nom des utilisateurs aupres de lui. Gere via l'attribut AD `msDS-AllowedToActOnBehalfOfOtherIdentity`. | Faible | Configurable par le proprietaire de la ressource cible |



Danger de l'Unconstrained Delegation
L'Unconstrained Delegation est **extremement dangereuse**. Si un serveur avec cette configuration est compromis, l'attaquant obtient les TGT de tous les utilisateurs qui s'y connectent (y compris les administrateurs de domaine). **Evitez-la autant que possible** et preferez la Constrained Delegation ou RBCD.



#### Delegation Protocol Transition (S4U)
Active Directory fournit deux extensions specifiques pour la delegation :

- **S4U2Self (Service-for-User-to-Self)** : Permet a un service d'obtenir un Service Ticket **au nom d'un utilisateur** sans que cet utilisateur se soit authentifie via Kerberos (utile quand l'utilisateur s'est authentifie via un autre mecanisme, comme un formulaire web).

- **S4U2Proxy (Service-for-User-to-Proxy)** : Permet a un service d'utiliser le Service Ticket obtenu via S4U2Self pour acceder a un **service backend** au nom de l'utilisateur.


### 6.4 Kerberos Armoring (FAST)
**FAST** (Flexible Authentication via Secure Tunneling), defini dans la RFC 6113, protege les echanges de pre-authentification en les encapsulant dans un tunnel chiffre.

#### Probleme resolu
Sans FAST, les echanges AS-REQ/AS-REP peuvent etre observes par un attaquant sur le reseau. Meme avec la pre-authentification, un attaquant peut :
- Observer les metadonnees (quel principal tente de s'authentifier)
- Tenter des attaques par dictionnaire sur les pre-authentification chiffrees interceptees

#### Fonctionnement
FAST utilise un **armor ticket** (TGT de la machine) pour creer un tunnel chiffre protégeant l'integralite de l'echange AS. L'attaquant ne peut ni observer ni modifier les donnees de pre-authentification.

```
# Activer FAST dans krb5.conf (cote client)
[libdefaults]
    default_realm = EXAMPLE.COM

[realms]
    EXAMPLE.COM = {
        kdc = kdc1.example.com
    }
```

Dans Active Directory, FAST (appele "Kerberos Armoring" ou "Claims-based access control") peut etre configure via les **Group Policy** :

```
# Chemin GPO
Computer Configuration > Policies > Administrative Templates >
  System > KDC > KDC support for claims, compound authentication
  and Kerberos armoring
```




## 7. Cross-Realm et Federation
Kerberos permet l'authentification **inter-domaines** (cross-realm) grace a des relations de confiance entre realms.

### 7.1 Trust Inter-Realm
Un **trust** (relation de confiance) est un accord entre deux realms Kerberos permettant aux utilisateurs d'un realm d'acceder aux services de l'autre realm.

#### Types de trust

| Type | Description | Cles partagees |
| **Unidirectionnel** | Les utilisateurs de A peuvent acceder aux services de B, mais pas l'inverse. | `krbtgt/B@A` |
| **Bidirectionnel** | Les utilisateurs de chaque realm peuvent acceder aux services de l'autre. | `krbtgt/B@A` + `krbtgt/A@B` |
| **Transitif** | Si A fait confiance a B et B fait confiance a C, alors A fait confiance a C (via B). | Cles pour chaque paire |
| **Non-transitif** | La confiance est limitee aux deux realms directement concernes. | Cles pour la paire uniquement |


Dans Active Directory, les trusts entre forets (Forest Trust) sont **transitifs** par defaut, tandis que les trusts externes (External Trust) sont **non-transitifs**.

### 7.2 Fonctionnement du Cross-Realm
Lorsqu'un client du realm A souhaite acceder a un service dans le realm B, le processus utilise des **referral TGT** (TGT de renvoi).



<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <!-- Fond -->
  <rect width="800" height="450" fill="#F4F5F7" rx="12"/>

  <!-- Titre -->
  <text x="400" y="30" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="18" font-weight="700" fill="#172B4D">Authentification Cross-Realm Kerberos</text>

  <!-- Realm A -->
  <rect x="30" y="50" width="340" height="170" rx="10" fill="#FFF3E6" stroke="#C75300" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="200" y="75" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="#C75300">REALM A (CORP.EXAMPLE.COM)</text>

  <!-- Client Realm A -->
  <rect x="50" y="90" width="130" height="60" rx="8" fill="white" stroke="#C75300" stroke-width="1.5"/>
  <text x="115" y="117" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="600" fill="#172B4D">Client</text>
  <text x="115" y="135" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">jdupont@CORP...</text>

  <!-- KDC Realm A -->
  <rect x="220" y="90" width="130" height="60" rx="8" fill="white" stroke="#C75300" stroke-width="1.5"/>
  <text x="285" y="117" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="600" fill="#172B4D">KDC-A</text>
  <text x="285" y="135" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">AS + TGS</text>

  <!-- Realm B -->
  <rect x="430" y="50" width="340" height="170" rx="10" fill="#E6F4FF" stroke="#0065BD" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="600" y="75" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="#0065BD">REALM B (PARTNER.COM)</text>

  <!-- KDC Realm B -->
  <rect x="450" y="90" width="130" height="60" rx="8" fill="white" stroke="#0065BD" stroke-width="1.5"/>
  <text x="515" y="117" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="600" fill="#172B4D">KDC-B</text>
  <text x="515" y="135" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">AS + TGS</text>

  <!-- Service Realm B -->
  <rect x="620" y="90" width="130" height="60" rx="8" fill="white" stroke="#0065BD" stroke-width="1.5"/>
  <text x="685" y="117" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="12" font-weight="600" fill="#172B4D">Service</text>
  <text x="685" y="135" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" fill="#5E6C84">HTTP/web.partner...</text>

  <!-- Trust -->
  <rect x="310" y="170" width="180" height="30" rx="6" fill="#FFFAE6" stroke="#FFAB00" stroke-width="1"/>
  <text x="400" y="190" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" font-weight="600" fill="#FFAB00">Relation de confiance</text>

  <!-- Fleches et etapes -->
  <!-- 1. Client -> KDC-A : TGS-REQ pour service de B -->
  <line x1="115" y1="155" x2="115" y2="260" stroke="#C75300" stroke-width="1.5"/>
  <line x1="115" y1="260" x2="275" y2="260" stroke="#C75300" stroke-width="1.5" marker-end="url(#arrowK2)"/>
  <text x="195" y="255" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" font-weight="600" fill="#C75300">1. TGS-REQ</text>
  <text x="195" y="275" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="#5E6C84">"Je veux HTTP/web.partner.com"</text>

  <!-- 2. KDC-A -> Client : Referral TGT -->
  <line x1="275" y1="300" x2="115" y2="300" stroke="#36B37E" stroke-width="1.5" marker-end="url(#arrowG2)"/>
  <text x="195" y="295" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" font-weight="600" fill="#36B37E">2. TGS-REP (Referral)</text>
  <text x="195" y="315" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="#5E6C84">TGT cross-realm : krbtgt/PARTNER.COM@CORP...</text>

  <!-- 3. Client -> KDC-B : TGS-REQ avec referral TGT -->
  <line x1="115" y1="330" x2="115" y2="360" stroke="#C75300" stroke-width="1.5"/>
  <line x1="115" y1="360" x2="505" y2="360" stroke="#C75300" stroke-width="1.5" marker-end="url(#arrowK2)"/>
  <text x="310" y="355" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" font-weight="600" fill="#C75300">3. TGS-REQ au KDC-B</text>
  <text x="310" y="375" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="#5E6C84">Referral TGT + Authenticator + SPN du service</text>

  <!-- 4. KDC-B -> Client : Service Ticket -->
  <line x1="505" y1="395" x2="115" y2="395" stroke="#36B37E" stroke-width="1.5" marker-end="url(#arrowG2)"/>
  <text x="310" y="393" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" font-weight="600" fill="#36B37E">4. TGS-REP : Service Ticket pour HTTP/web.partner.com</text>

  <!-- 5. Client -> Service : AP-REQ -->
  <line x1="115" y1="410" x2="115" y2="430" stroke="#C75300" stroke-width="1.5"/>
  <line x1="115" y1="430" x2="675" y2="430" stroke="#C75300" stroke-width="1.5" marker-end="url(#arrowK2)"/>
  <text x="395" y="428" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" font-weight="600" fill="#C75300">5. AP-REQ : Service Ticket + Authenticator</text>

  <defs>
    <marker id="arrowK2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#C75300"/></marker>
    <marker id="arrowG2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#36B37E"/></marker>
  </defs>
</svg>

Figure 4 : Authentification cross-realm entre deux domaines Kerberos avec referral TGT



#### Processus detaille


- <span class="step-num">1</span> Le client (`jdupont@CORP.EXAMPLE.COM`) demande un Service Ticket pour `HTTP/web.partner.com@PARTNER.COM` a son KDC local (KDC-A).

- <span class="step-num">2</span> Le KDC-A constate que le service est dans un realm etranger (`PARTNER.COM`). Il emet un **referral TGT** — un TGT chiffre avec la **cle de confiance inter-realm** (`krbtgt/PARTNER.COM@CORP.EXAMPLE.COM`).

- <span class="step-num">3</span> Le client envoie une TGS-REQ au **KDC-B** (KDC de `PARTNER.COM`), en presentant le referral TGT.

- <span class="step-num">4</span> Le KDC-B dechiffre le referral TGT avec la cle de confiance, verifie l'identite du client, et emet un **Service Ticket** pour `HTTP/web.partner.com@PARTNER.COM`.

- <span class="step-num">5</span> Le client presente le Service Ticket au serveur dans le realm B via AP-REQ, exactement comme dans un acces intra-realm.


### 7.3 Integration avec d'autres Protocoles

#### SPNEGO / Negotiate (HTTP)
**SPNEGO** (Simple and Protected GSSAPI Negotiation Mechanism) permet d'utiliser Kerberos pour l'authentification HTTP. Le navigateur envoie un token SPNEGO dans le header HTTP `Authorization: Negotiate`.

```
# Echange HTTP avec SPNEGO
# 1. Le client accede a la ressource protegee
GET /app HTTP/1.1
Host: web.example.com

# 2. Le serveur repond avec un challenge Negotiate
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Negotiate

# 3. Le client obtient un Service Ticket pour HTTP/web.example.com,
#    cree un token SPNEGO et le renvoie
GET /app HTTP/1.1
Host: web.example.com
Authorization: Negotiate YIIGhgYGKwYBBQUCoIIG...

# 4. Le serveur valide le token et accorde l'acces
HTTP/1.1 200 OK
WWW-Authenticate: Negotiate oYH1MIHyoAMKAQChCwYJ...
```

#### PKINIT (RFC 4556)
**PKINIT** (Public Key Cryptography for Initial Authentication) permet l'authentification initiale aupres de l'AS en utilisant un **certificat X.509** au lieu d'un mot de passe. Utilise notamment avec les cartes a puce (smart cards) dans les environnements Windows.

#### Integration SAML / OIDC
Kerberos peut etre utilise comme mecanisme d'authentification **en amont** d'un IdP SAML ou OIDC. L'utilisateur s'authentifie de maniere transparente aupres de l'IdP via Kerberos/SPNEGO, puis l'IdP emet une assertion SAML ou un ID Token OIDC. C'est le pattern standard dans les environnements entreprise combinant un reseau interne (Kerberos) et des applications cloud (SAML/OIDC).




## 8. Securite
La securite est au coeur de Kerberos, mais le protocole n'est pas exempt de risques. Ce chapitre couvre les algorithmes de chiffrement, les attaques connues et les bonnes pratiques de protection.

### 8.1 Algorithmes de Chiffrement
Kerberos v5 supporte plusieurs algorithmes de chiffrement. Le choix de l'algorithme est crucial pour la securite.

| Algorithme | ID (etype) | Statut | Taille de cle |
| `des-cbc-crc` | 1 | Deprecie (RFC 6649) | 56 bits |
| `des-cbc-md5` | 3 | Deprecie (RFC 6649) | 56 bits |
| `des3-cbc-sha1` | 16 | Deprecie | 168 bits |
| `rc4-hmac` | 23 | A eviter (NT Hash) | 128 bits |
| `aes128-cts-hmac-sha1-96` | 17 | Recommande | 128 bits |
| `aes256-cts-hmac-sha1-96` | 18 | Fortement recommande | 256 bits |
| `camellia128-cts-cmac` | 25 | Acceptable | 128 bits |
| `camellia256-cts-cmac` | 26 | Acceptable | 256 bits |


DES est mort
Les algorithmes DES (etype 1 et 3) sont **deprecies depuis 2012** (RFC 6649). Ils ne doivent **jamais** etre utilises. Windows a desactive DES par defaut depuis Windows 7 / Server 2008 R2. Si votre infrastructure utilise encore DES, migrez immediatement vers AES.



RC4-HMAC : pourquoi l'eviter
L'algorithme `rc4-hmac` (etype 23) utilise directement le **hash NT** du mot de passe comme cle. Cela signifie que si un attaquant obtient le hash NT (via une fuite de base de donnees, Mimikatz, etc.), il peut forger des tickets sans connaitre le mot de passe. C'est la base des attaques **Pass-the-Hash** et **Overpass-the-Hash**. Preferez AES-256 dans tous les cas.


### 8.2 Attaques Connues

#### Golden Ticket

**Description :** Un attaquant qui connait la cle (hash) du compte `KRBTGT` peut forger des TGT arbitraires, accordant l'acces a **n'importe quel service** du domaine avec **n'importe quels privileges**, pour une duree arbitraire.


Golden Ticket — Attaque Critique
C'est l'attaque la plus devastatrice contre une infrastructure Kerberos/AD. Avec un Golden Ticket, l'attaquant est effectivement **administrateur de domaine persistant**. Les Golden Tickets survivent aux changements de mots de passe des utilisateurs et peuvent etre valides pendant des annees.

**Prerequis :** Hash du compte KRBTGT (obtenu via DCSync, ntdsutil, ou acces physique a un DC).
**Remediation :** Changer le mot de passe du KRBTGT **deux fois** (la deuxieme fois invalide les tickets bases sur l'ancien hash).



#### Silver Ticket

**Description :** Un attaquant qui connait la cle (hash) d'un **service specifique** peut forger un Service Ticket pour ce service, sans passer par le KDC. Le ticket est directement presente au service.


Silver Ticket — Attaque Ciblee
Moins devastateur qu'un Golden Ticket car limite a un seul service, mais plus discret : aucune communication avec le KDC n'est necessaire, ce qui rend la detection plus difficile. L'attaquant peut acceder au service avec les privileges de n'importe quel utilisateur.

**Prerequis :** Hash du compte de service (obtenu via Kerberoasting, acces au serveur, etc.).
**Remediation :** Changer le mot de passe du compte de service, utiliser des gMSA (Group Managed Service Accounts) pour la rotation automatique.



#### Kerberoasting

**Description :** Tout utilisateur authentifie dans le domaine peut demander un Service Ticket pour n'importe quel service enregistre (SPN). Le ticket est chiffre avec la cle du service. L'attaquant recupere le ticket et tente de le dechiffrer hors-ligne par force brute pour obtenir le mot de passe du compte de service.


Kerberoasting — Attaque Courante
C'est l'une des attaques les plus courantes dans les environnements Active Directory. Elle ne necessite **aucun privilege eleve** — un simple compte utilisateur suffit. Les comptes de service avec des mots de passe faibles sont particulierement vulnerables.

**Prerequis :** Un compte de domaine quelconque.
**Detection :** Surveiller les requetes TGS-REQ anormales (volumes, patterns, SPN inhabituels) via l'Event ID 4769.
**Prevention :** Mots de passe forts (25+ caracteres) pour les comptes de service, utilisation de gMSA, desactiver RC4-HMAC pour forcer AES.



#### AS-REP Roasting

**Description :** Si un compte a la pre-authentification **desactivee** (attribut `DONT_REQUIRE_PREAUTH`), un attaquant peut envoyer une AS-REQ au nom de ce compte et recevoir un AS-REP contenant des donnees chiffrees avec la cle du compte. Ces donnees peuvent etre attaquees par force brute hors-ligne.


AS-REP Roasting
Similaire au Kerberoasting mais cible les comptes **sans pre-authentification**. Moins courant car la pre-authentification est activee par defaut, mais certains comptes legacy ou certaines configurations peuvent la desactiver.

**Detection :** Auditer les comptes avec `DONT_REQUIRE_PREAUTH` via PowerShell :
`Get-ADUser -Filter {DoesNotRequirePreAuth -eq $true}`
**Prevention :** Activer la pre-authentification sur tous les comptes.



#### Pass-the-Ticket (PtT)

**Description :** Un attaquant qui a acces a la memoire d'une machine (via Mimikatz, par exemple) peut extraire les tickets Kerberos du cache de credentials et les utiliser sur une autre machine pour usurper l'identite de l'utilisateur.


Pass-the-Ticket
L'attaquant n'a pas besoin du mot de passe ni du hash — il reutilise directement les tickets existants. L'attaque est limitee par la duree de vie des tickets (typiquement 10h pour un TGT).

**Detection :** Event ID 4768/4769 depuis des postes inhabituels.
**Prevention :** Credential Guard (Windows 10+), reduire la duree de vie des TGT, segmentation reseau.



### 8.3 Bonnes Pratiques


#### Forcer AES-256

- Desactiver DES et RC4-HMAC dans les GPO
- Configurer `msDS-SupportedEncryptionTypes` sur les comptes
- Verifier la compatibilite de tous les services


#### Proteger le KDC

- Serveur dedie et durci
- Pas de role supplementaire sur le DC
- Acces administratif restreint
- Sauvegardes securisees de la base KDC


#### Comptes de service securises

- Utiliser les **gMSA** (Group Managed Service Accounts) pour la rotation automatique des mots de passe (tous les 30 jours)
- Mots de passe d'au moins 25 caracteres pour les comptes de service classiques
- Pas de comptes de service dans le groupe Domain Admins


#### Monitoring et Audit

- Activer l'audit Kerberos (Event IDs 4768, 4769, 4770, 4771, 4772)
- Alerter sur les anomalies (tickets a duree de vie anormale, requetes depuis des IP inhabituelles)
- Analyser regulierement les logs avec un SIEM


### 8.4 Hardening

#### Clock Skew (Tolerance d'horloge)
Kerberos depend de la synchronisation des horloges. Par defaut, la tolerance est de **5 minutes** entre le client et le serveur. Un ecart superieur provoque un echec d'authentification (`KRB_AP_ERR_SKEW`).

```
# Verifier la synchronisation NTP
$ ntpstat
synchronised to NTP server (192.168.1.1) at stratum 2
   time correct to within 12 ms

# Ou sous Windows
> w32tm /query /status
Leap Indicator: 0(no warning)
Stratum: 3
Root Delay: 0.0156250s
```


NTP est critique
**Tous** les serveurs et clients participant a l'infrastructure Kerberos doivent etre synchronises via NTP. Un ecart de plus de 5 minutes causera des echecs d'authentification en cascade. Les controleurs de domaine AD sont automatiquement la source NTP du domaine.


#### Rotation du mot de passe KRBTGT

```
# Script PowerShell pour la rotation du KRBTGT
# ATTENTION : a executer pendant une fenetre de maintenance

# Premiere rotation
Reset-KrbtgtKeyInteractive

# Attendre au moins la duree de vie max des TGT (typiquement 10h)
# avant la deuxieme rotation

# Deuxieme rotation (invalide l'ancien hash)
Reset-KrbtgtKeyInteractive
```


Rotation KRBTGT
Microsoft recommande de changer le mot de passe du KRBTGT **regulierement** (au moins une fois par an) et **immediatement** en cas de suspicion de compromission. La deuxieme rotation est necessaire car le KDC conserve les deux dernieres versions de la cle.


#### Audit des SPN

```
# Lister tous les SPN du domaine (PowerShell)
Get-ADUser -Filter {ServicePrincipalName -ne "$null"} `
  -Properties ServicePrincipalName |
  Select-Object Name, ServicePrincipalName

# Detecter les comptes vulnerables au Kerberoasting
Get-ADUser -Filter {ServicePrincipalName -ne "$null" `
  -and PasswordLastSet -lt (Get-Date).AddYears(-1)} `
  -Properties ServicePrincipalName, PasswordLastSet |
  Select-Object Name, PasswordLastSet
```

#### Detection d'anomalies

| Event ID | Description | Ce qu'il faut surveiller |
| **4768** | Ticket d'authentification (TGT) demande | Echecs repetes, comptes inhabituels, chiffrement RC4 |
| **4769** | Service Ticket demande | Volume anormal (Kerberoasting), SPN inhabituels |
| **4770** | Service Ticket renouvele | Renouvellements frequents ou inhabituels |
| **4771** | Pre-authentification echouee | Echecs repetes (brute force), comptes cibles |
| **4772** | Ticket d'authentification echoue | Erreurs de clock skew, comptes verrouilles |




## 9. Kerberos vs Autres Protocoles
Kerberos n'est pas le seul protocole d'authentification. Voici une comparaison avec les alternatives courantes pour vous aider a choisir le bon outil selon le contexte.


| Critere | Kerberos | SAML 2.0 | OIDC / OAuth 2.0 | NTLM |

| Annee | 1993 (v5) | 2005 | 2014 / 2012 | 1993 |
| Architecture | Tickets symetriques | Assertions XML signees | Tokens JWT | Challenge-Response |
| Transport | Protocole binaire (TCP/UDP 88) | HTTP (Redirect / POST) | HTTP REST (JSON) | SMB / HTTP |
| Format des tokens | Binaire (ASN.1/DER) | XML | JSON (JWT) | Binaire |
| SSO | Transparent (TGT) | Federation web | Federation web + API | Limite (session NTLM) |
| Authentification mutuelle | Oui (AP-REP) | Non natif | Non natif | Non |
| Delegation | Oui (S4U, constrained) | Non natif | Token exchange (RFC 8693) | Non |
| Internet / Cloud | Difficile (ports, firewall) | Excellent | Excellent | Non |
| Reseau interne | Excellent | Possible mais lourd | Possible | Acceptable |
| Support mobile | Limite | Limite (navigateur) | Excellent | Non |
| Active Directory | Natif (defaut) | Via ADFS | Via Entra ID | Fallback |
| Complexite | Elevee (KDC, DNS, NTP) | Elevee (XML, certificats) | Moyenne (REST, JWT) | Faible |



#### Quand utiliser Kerberos ?

Kerberos est le bon choix
- Reseau d'entreprise interne avec Active Directory
- SSO transparent pour les postes de travail Windows/Linux
- Services legacy on-premise (SMB, LDAP, SQL, SSH)
- Besoin d'authentification mutuelle native
- Delegation d'identite entre services backend
- Environnements a haute securite necessitant une gestion centralisee



#### Quand NE PAS utiliser Kerberos ?

Kerberos n'est pas adapte
- Applications web publiques (internet) — utiliser OIDC
- Applications mobiles — utiliser OIDC + PKCE
- APIs REST publiques — utiliser OAuth 2.0
- Federation B2B inter-entreprises — utiliser SAML ou OIDC
- Environnements cloud-native sans AD — utiliser OIDC



#### Diagramme de choix

| Contexte | Protocole recommande | Justification |
| Postes Windows internes + AD | **Kerberos** | Natif, transparent, SSO automatique |
| Applications web internes | **Kerberos + SPNEGO** | SSO transparent via le navigateur |
| Applications web cloud / SaaS | **OIDC** ou **SAML** | Traverse les firewalls, standard web |
| APIs REST | **OAuth 2.0 / OIDC** | Concu pour les APIs, tokens JWT legers |
| Applications mobiles | **OIDC + PKCE** | Support natif mobile, securise |
| Federation inter-entreprises | **SAML 2.0** | Mature, tres utilise en B2B |
| Services backend (SQL, SMB, NFS) | **Kerberos** | Authentification native, delegation |
| Migration NTLM | **Kerberos** | Remplacement direct, plus securise |




## 10. Glossaire
Definitions des termes techniques utilises dans cette documentation.


AP-REQ (Application Request)Message envoye par le client au Service Server contenant le Service Ticket et un Authenticator pour prouver son identite.
AP-REP (Application Reply)Reponse optionnelle du Service Server au client, prouvant l'identite du serveur (authentification mutuelle). Contient le timestamp du client chiffre.
AS (Authentication Service)Composant du KDC responsable de l'authentification initiale des utilisateurs. Emet les TGT apres verification de la pre-authentification.
AS-REQ (Authentication Service Request)Requete envoyee par le client a l'AS pour obtenir un TGT. Contient le principal du client et les donnees de pre-authentification.
AS-REP (Authentication Service Reply)Reponse de l'AS contenant le TGT (chiffre avec la cle du KRBTGT) et la cle de session (chiffree avec la cle du client).
AuthenticatorStructure cryptographique creee par le client contenant un timestamp, chiffree avec la cle de session. Protege contre les attaques de rejeu. Usage unique.
Clock SkewDifference maximale toleree entre les horloges du client et du serveur. Par defaut 5 minutes dans Kerberos.
Cross-RealmMecanisme permettant l'authentification entre differents realms Kerberos via des relations de confiance et des referral TGT.
DelegationMecanisme permettant a un service d'agir au nom d'un utilisateur aupres d'autres services. Trois types dans AD : Unconstrained, Constrained, RBCD.
FAST (Flexible Authentication via Secure Tunneling)Extension Kerberos (RFC 6113) protégeant les echanges de pre-authentification dans un tunnel chiffre. Appele "Kerberos Armoring" dans AD.
Golden TicketAttaque ou un attaquant forge un TGT arbitraire en utilisant la cle du compte KRBTGT. Donne un acces total et persistant au domaine.
gMSA (Group Managed Service Account)Type de compte de service dans AD dont le mot de passe (240 caracteres) est gere et rotate automatiquement par AD tous les 30 jours.
KDC (Key Distribution Center)Composant central de Kerberos, compose de l'AS et du TGS, plus une base de donnees des principals et de leurs cles.
KerberoastingAttaque ou un utilisateur authentifie demande des Service Tickets pour des comptes de service et tente de les dechiffrer hors-ligne pour obtenir les mots de passe.
KeytabFichier contenant les cles secretes d'un ou plusieurs principals. Utilise par les services pour s'authentifier sans intervention humaine.
KRBTGT (Key Distribution Center Service Account)Compte de service special dans AD dont la cle sert a chiffrer tous les TGT du domaine. Sa compromission mene aux Golden Tickets.
KVNO (Key Version Number)Numero de version de la cle d'un principal. Incremente a chaque changement de mot de passe. Permet de gerer la coexistence de plusieurs versions de cles.
PAC (Privilege Attribute Certificate)Structure de donnees specifique a AD, incluse dans les tickets Kerberos, contenant les SID des groupes de l'utilisateur et ses informations d'autorisation.
PKINIT (Public Key Cryptography for Initial Authentication)Extension Kerberos (RFC 4556) permettant l'authentification initiale par certificat X.509 au lieu d'un mot de passe.
Pre-authenticationMecanisme obligeant le client a prouver son identite (via un timestamp chiffre) avant que l'AS n'emette un TGT. Previent les attaques AS-REP Roasting.
PrincipalEntite (utilisateur, service, machine) enregistree dans la base de donnees du KDC. Identifiee par un nom unique au format `nom/instance@REALM`.
RealmDomaine d'autorite d'un KDC. Tous les principals d'un meme realm sont geres par le meme KDC. Ecrit en majuscules par convention.
Referral TGTTicket special emis par un KDC lorsqu'un client demande l'acces a un service dans un realm etranger. Chiffre avec la cle de confiance inter-realm.
Session KeyCle de chiffrement symetrique temporaire generee par le KDC pour securiser les communications entre deux entites. Liee a la duree de vie du ticket.
Silver TicketAttaque ou un attaquant forge un Service Ticket en utilisant la cle d'un service specifique, sans passer par le KDC.
SPN (Service Principal Name)Identifiant unique d'un service dans Active Directory, au format `service_class/hostname`. Associe un service a un compte AD.
SPNEGO (Simple and Protected GSSAPI Negotiation)Mecanisme permettant de negocier le protocole d'authentification (typiquement Kerberos) dans un contexte HTTP via le header `Authorization: Negotiate`.
ST (Service Ticket)Ticket emis par le TGS permettant au client d'acceder a un service specifique. Chiffre avec la cle du service cible.
TGS (Ticket-Granting Service)Composant du KDC qui emet les Service Tickets. Valide le TGT du client avant d'emettre un ST pour le service demande.
TGS-REQ / TGS-REPMessages de l'echange TGS. La requete contient le TGT + Authenticator + SPN. La reponse contient le Service Ticket + cle de session service.
TGT (Ticket-Granting Ticket)Ticket emis par l'AS apres l'authentification initiale. Permet au client de demander des Service Tickets sans se re-authentifier. Chiffre avec la cle du KRBTGT.
TrustRelation de confiance entre deux realms Kerberos, permettant l'authentification cross-realm. Peut etre unidirectionnelle, bidirectionnelle, transitive ou non-transitive.
Pass-the-Ticket (PtT)Attaque ou un attaquant extrait des tickets Kerberos de la memoire d'une machine et les reutilise sur une autre machine pour usurper une identite.
AS-REP RoastingAttaque ciblant les comptes sans pre-authentification. L'attaquant demande un AS-REP et tente de dechiffrer les donnees hors-ligne par force brute.




**Documentation Kerberos - Guide Complet pour Debutants**
Version 1.0 | Mars 2025

Cette documentation fournit une comprehension approfondie du protocole Kerberos,
de ses composants, tickets, et mecanismes de securite.

References : RFC 4120 (Kerberos V5) | RFC 6113 (FAST) | RFC 4556 (PKINIT) | Microsoft Kerberos Documentation
