---
title: "Guide Complet LDAP"
description: "Guide technique exhaustif sur le protocole LDAP : annuaires, structure DIT, opérations CRUD, schéma, réplication, sécurité LDAPS/STARTTLS et bonnes pratiques."
author: "Jean-Baptiste Janssen"
tags: [ldap, directory, annuaire, security, authentication]
chapters: 10
readingTime: "50 min"
---

## 1. Introduction a LDAP

### 1.1 Qu'est-ce que LDAP ?

**LDAP** (Lightweight Directory Access Protocol) est un protocole ouvert et standardise permettant d'acceder a des services d'annuaire distribues et de les gerer. Defini par la RFC 4511, LDAP est ne comme une version simplifiee et allegee du protocole DAP (Directory Access Protocol) utilise pour interroger les annuaires X.500 de l'ITU-T.

Un **annuaire LDAP** est une base de donnees specialisee, optimisee pour la lecture, qui stocke des informations organisees de maniere hierarchique. Contrairement a une base de donnees relationnelle classique, un annuaire LDAP est concu pour etre interroge tres frequemment mais modifie rarement.

> **Analogie Simple**
> Imaginez LDAP comme les Pages Jaunes (un annuaire telephonique hierarchique). Les Pages Jaunes sont organisees par pays, puis par ville, puis par rue, puis par numero. De la meme maniere, LDAP organise les donnees en arbre (le DIT - Directory Information Tree) pour retrouver rapidement des informations. Vous pouvez chercher par nom, par adresse, par numero de telephone... exactement comme LDAP permet de chercher par attribut dans l'arbre.

LDAP est utilise partout : authentification des utilisateurs en entreprise, stockage des informations de contacts, gestion des groupes et des droits d'acces, configuration des services reseau (DNS, email), et bien plus encore.

#### Caracteristiques cles de LDAP

- **Protocole client-serveur** : fonctionne sur TCP/IP (ports 389 et 636)
- **Modele d'information hierarchique** : les donnees sont organisees en arbre (DIT)
- **Optimise pour la lecture** : le ratio lecture/ecriture typique est de 100:1 voire plus
- **Standard ouvert** : defini par l'IETF dans les RFC 4510 a 4519
- **Extensible** : le schema peut etre enrichi avec des attributs et classes personnalises
- **Distribue** : supporte la replication et les referrals entre serveurs

### 1.2 Pourquoi utiliser LDAP ?

#### Gestion Centralisee des Identites

Un seul annuaire LDAP centralise toutes les identites (utilisateurs, groupes, machines). Toutes les applications s'y connectent pour authentifier et autoriser, eliminant les silos d'identite.

#### Lecture Optimisee et Performante

LDAP est concu pour des performances de lecture exceptionnelles. Les index, le caching et la structure arborescente permettent des recherches extremement rapides, meme sur des millions d'entrees.

#### Standard Universel

LDAP est supporte nativement par la quasi-totalite des systemes d'exploitation, applications d'entreprise et langages de programmation. C'est le standard de facto pour les annuaires.

#### Interoperabilite Multi-Plateformes

Un meme annuaire LDAP peut servir simultanement Linux (PAM/NSS), Windows (via AD ou LDAP natif), applications Java, Python, PHP, serveurs de messagerie, VPN, et bien plus.

### 1.3 Historique et Versions

| Version | Annee | Description |
|---------|-------|-------------|
| **X.500 / DAP** | 1988 | Standard ITU-T d'annuaire distribue. Protocole DAP complet mais tres lourd (pile OSI complete) |
| **LDAPv1** | 1993 | RFC 1487 - Premiere version, acces simplifie a X.500 sur TCP/IP. Fonctionnalites limitees |
| **LDAPv2** | 1995 | RFC 1777 - Ameliorations mineures, support de l'authentification simple. Largement deploye |
| **LDAPv3** | 1997 | RFC 2251 (puis RFC 4510-4519 en 2006) - Version majeure actuelle : UTF-8, SASL, TLS, referrals, controles etendus, schema publie |

> **Important**
> Ce document se concentre sur **LDAPv3**, qui est la version standard utilisee aujourd'hui. LDAPv2 est considere comme obsolete (RFC 3494). LDAPv3 apporte des ameliorations cruciales : support Unicode (UTF-8), authentification SASL, chiffrement TLS/StartTLS, et extensibilite du protocole.

### 1.4 LDAP vs Bases de Donnees Relationnelles

| Critere | LDAP | Base Relationnelle (SQL) |
|---------|------|--------------------------|
| **Structure** | Arbre hierarchique (DIT) | Tables avec lignes et colonnes |
| **Optimisation** | Lecture intensive | Lecture et ecriture equilibrees |
| **Schema** | Flexible, base sur Object Classes | Rigide, base sur DDL (CREATE TABLE) |
| **Transactions** | Pas de transactions ACID completes | Transactions ACID completes |
| **Jointures** | Pas de jointures (navigation dans l'arbre) | Jointures SQL (JOIN) |
| **Langage** | Filtres LDAP (RFC 4515) | SQL |
| **Replication** | Syncrepl, native et legere | Dependante du SGBD, souvent complexe |
| **Cas d'usage** | Annuaire d'identites, configuration | Donnees transactionnelles, reporting |
| **Scalabilite lecture** | Excellente (replicas en lecture) | Bonne (read replicas) |
| **Scalabilite ecriture** | Limitee (un seul master, ou MMR complexe) | Bonne (sharding, partitioning) |

> **Note**
> LDAP n'est pas un remplacement des bases SQL. Ce sont des outils complementaires. Utilisez LDAP pour les donnees d'identite et de configuration lues frequemment, et SQL pour les donnees transactionnelles et les rapports complexes.

## 2. Structure de l'Annuaire (DIT)

L'annuaire LDAP organise ses donnees dans une structure hierarchique appelee **DIT** (Directory Information Tree). Comprendre cette structure est fondamental pour travailler avec LDAP.

**Arbre DIT (Directory Information Tree) — hierarchie typique :**

- **Racine (Base DN)** : `dc=example,dc=com`
  - **ou=People** (branche utilisateurs)
    - `cn=Jean Dupont` (inetOrgPerson)
    - `cn=Marie Martin` (inetOrgPerson)
  - **ou=Groups** (branche groupes)
    - `cn=admins` (groupOfNames)
    - `cn=developers` (groupOfNames)
  - **ou=Services** (branche services)

**Exemples de DN complets :**
- `cn=Jean Dupont,ou=People,dc=example,dc=com`
- `cn=admins,ou=Groups,dc=example,dc=com`
- `cn=ldap-proxy,ou=Services,dc=example,dc=com`

### 2.1 Directory Information Tree (DIT)

Le **DIT** (Directory Information Tree) est la structure hierarchique en arbre qui organise toutes les donnees de l'annuaire LDAP. Chaque noeud de l'arbre est une **entree** (entry) identifiee de maniere unique par son **DN** (Distinguished Name).

L'arbre part d'une racine (souvent appelee **Base DN** ou **Suffix**) et se ramifie en branches representant des unites organisationnelles (OU), des domaines, ou d'autres conteneurs logiques.

#### Structure typique d'un DIT

- **Racine (Base DN)** : `dc=example,dc=com` — point d'entree de l'arbre
- **Branches organisationnelles** : `ou=People`, `ou=Groups`, `ou=Services`
- **Feuilles** : les entrees finales (utilisateurs, groupes, machines)

> **Note**
> La convention `dc=` (Domain Component) est la plus repandue pour nommer la racine du DIT, en decoupant le nom de domaine DNS. Par exemple, le domaine `example.com` devient `dc=example,dc=com`. D'anciennes conventions utilisaient `o=` (organization) ou `c=` (country).

### 2.2 Entrees (Entries)

Chaque noeud du DIT est une **entree**. Une entree est un ensemble d'**attributs** qui decrivent un objet (un utilisateur, un groupe, une machine, un service...). Chaque entree possede obligatoirement :

- Un **DN** (Distinguished Name) unique qui l'identifie dans l'arbre
- Au moins un **objectClass** qui definit les attributs autorises et obligatoires
- Les **attributs obligatoires** definis par ses objectClasses

```ldif
# Exemple d'entree utilisateur
dn: cn=Jean Dupont,ou=People,dc=example,dc=com
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: inetOrgPerson
cn: Jean Dupont
sn: Dupont
givenName: Jean
mail: jean.dupont@example.com
uid: jdupont
userPassword: {SSHA}xxxxxxxxxxxxxxxxxxxx
telephoneNumber: +33 1 23 45 67 89
title: Ingenieur IAM
ou: DSI
```

### 2.3 Distinguished Name (DN) et Relative DN (RDN)

Le **DN** (Distinguished Name) est l'identifiant unique et global d'une entree dans le DIT. Il est construit en concatenant les RDN de chaque noeud depuis l'entree jusqu'a la racine.

Le **RDN** (Relative Distinguished Name) est l'identifiant relatif d'une entree par rapport a son parent direct.

#### Decomposition d'un DN

```
DN complet : cn=Jean Dupont,ou=People,dc=example,dc=com

Decomposition :
  RDN de l'entree  : cn=Jean Dupont       (identifie l'entree dans ou=People)
  Parent direct     : ou=People            (unite organisationnelle)
  Grand-parent      : dc=example,dc=com    (racine du DIT)
```

#### Types de composants DN courants

| Composant | Signification | Utilisation |
|-----------|---------------|-------------|
| `dc=` | Domain Component | Racine du DIT, decoupe du domaine DNS |
| `ou=` | Organizational Unit | Branches organisationnelles (People, Groups) |
| `cn=` | Common Name | Nom courant d'une entree (personne, groupe) |
| `uid=` | User ID | Identifiant unique utilisateur |
| `o=` | Organization | Nom de l'organisation (convention ancienne) |
| `c=` | Country | Code pays (convention X.500 ancienne) |

> **Attention**
> Les DN sont sensibles a la casse pour les noms d'attributs, mais les comparaisons de valeurs suivent les **matching rules** du schema. Par exemple, `cn=Jean Dupont` et `CN=jean dupont` referent la meme entree si le matching rule est `caseIgnoreMatch`.

### 2.4 Attributs et Valeurs

Les **attributs** sont les paires cle-valeur qui composent une entree LDAP. Chaque attribut a un **type** (defini dans le schema) et une ou plusieurs **valeurs**.

#### Attributs mono-values vs multi-values

| Type | Description | Exemples |
|------|-------------|----------|
| **Mono-value** | Un seul valeur possible | `uid`, `employeeNumber`, `userPassword` |
| **Multi-values** | Plusieurs valeurs simultanees | `mail`, `telephoneNumber`, `objectClass`, `memberOf` |

#### Syntaxes d'attributs courantes

| Syntaxe | OID | Description | Exemple |
|---------|-----|-------------|---------|
| DirectoryString | 1.3.6.1.4.1.1466.115.121.1.15 | Chaine UTF-8 | `cn: Jean Dupont` |
| IA5String | 1.3.6.1.4.1.1466.115.121.1.26 | Chaine ASCII (email, uid) | `mail: jean@example.com` |
| Integer | 1.3.6.1.4.1.1466.115.121.1.27 | Nombre entier | `uidNumber: 1000` |
| Boolean | 1.3.6.1.4.1.1466.115.121.1.7 | TRUE ou FALSE | `accountDisabled: FALSE` |
| DN | 1.3.6.1.4.1.1466.115.121.1.12 | Reference a un autre DN | `member: cn=Jean,ou=People,...` |
| OctetString | 1.3.6.1.4.1.1466.115.121.1.40 | Donnees binaires | `userCertificate: ...` |
| GeneralizedTime | 1.3.6.1.4.1.1466.115.121.1.24 | Date/Heure | `createTimestamp: 20250130120000Z` |

#### Attributs operationnels

Les **attributs operationnels** sont maintenus automatiquement par le serveur LDAP. Ils ne sont pas retournes par defaut et doivent etre demandes explicitement.

```bash
# Demander les attributs operationnels
ldapsearch -b "dc=example,dc=com" "(uid=jdupont)" "+"

# Attributs operationnels courants :
# createTimestamp   : date de creation de l'entree
# modifyTimestamp   : date de derniere modification
# creatorsName      : DN de celui qui a cree l'entree
# modifiersName     : DN de celui qui a modifie l'entree
# entryUUID         : identifiant unique universel de l'entree
# entryCSN          : Change Sequence Number (replication)
# subschemaSubentry : DN du sous-schema applicable
```

### 2.5 Object Classes

Les **Object Classes** definissent le type d'une entree et determinent quels attributs sont obligatoires (MUST) et optionnels (MAY).

#### Types d'Object Classes

| Type | Description | Exemples |
|------|-------------|----------|
| **Structural** | Definit la nature de l'entree. Une seule structural class par entree (plus ses parents) | `person`, `organizationalUnit`, `device` |
| **Auxiliary** | Ajoute des attributs supplementaires. Peut etre combinee avec n'importe quelle structural class | `posixAccount`, `shadowAccount`, `extensibleObject` |
| **Abstract** | Classe de base, ne peut pas etre utilisee seule. Sert de parent pour l'heritage | `top` (racine de toutes les classes) |

#### Heritage des Object Classes

Les Object Classes suivent un modele d'heritage. Par exemple :

```
top (abstract)
  |
  +-- person (structural)
        MUST: sn, cn
        MAY: userPassword, telephoneNumber, description
        |
        +-- organizationalPerson (structural)
              MAY: title, ou, postalAddress, telephoneNumber, ...
              |
              +-- inetOrgPerson (structural)
                    MAY: mail, uid, givenName, employeeNumber, jpegPhoto, ...
```

> **Bonne pratique**
> La classe `inetOrgPerson` est la plus utilisee pour representer des utilisateurs dans un annuaire LDAP. Elle herite de `person` et `organizationalPerson`, offrant un ensemble riche d'attributs pour decrire une personne.

## 3. Schema LDAP

Le **schema LDAP** est l'ensemble des definitions qui regissent la structure des donnees dans l'annuaire. Il definit les types d'attributs autorises, les Object Classes disponibles et les regles de validation.

### 3.1 Qu'est-ce que le Schema ?

Le schema LDAP est comparable au DDL (Data Definition Language) dans les bases SQL. Il determine :

- Quels **types d'attributs** existent (nom, syntaxe, regles de comparaison)
- Quelles **Object Classes** sont disponibles (attributs obligatoires et optionnels)
- Les **matching rules** (comment comparer les valeurs)
- Les **syntaxes** (quels formats de donnees sont acceptes)

Le schema est lui-meme stocke dans l'annuaire, accessible via le **Subschema Subentry** :

```bash
# Consulter le schema de l'annuaire
ldapsearch -b "cn=Subschema" -s base "(objectClass=subSchema)" \
  objectClasses attributeTypes matchingRules ldapSyntaxes
```

### 3.2 Types d'Attributs

Chaque type d'attribut est defini par :

```
# Exemple de definition d'un attribut dans le schema
attributeType ( 2.5.4.3
  NAME 'cn'
  DESC 'Common Name - Nom courant'
  SUP name                           # Herite du type "name"
  EQUALITY caseIgnoreMatch           # Regle de comparaison d'egalite
  SUBSTR caseIgnoreSubstringsMatch   # Regle de comparaison de sous-chaine
  ORDERING caseIgnoreOrderingMatch   # Regle de tri
  SYNTAX 1.3.6.1.4.1.1466.115.121.1.15  # DirectoryString (UTF-8)
  SINGLE-VALUE                       # ou absent si multi-value
  )
```

#### Elements cles d'une definition d'attribut

| Element | Description |
|---------|-------------|
| **OID** | Identifiant unique global (ex: `2.5.4.3` pour `cn`) |
| **NAME** | Nom(s) de l'attribut (`cn`, `commonName`) |
| **DESC** | Description textuelle |
| **SUP** | Attribut parent (heritage) |
| **EQUALITY** | Matching rule pour les comparaisons `=` |
| **SUBSTR** | Matching rule pour les comparaisons avec wildcards `*` |
| **ORDERING** | Matching rule pour les comparaisons `>=`, `<=` |
| **SYNTAX** | OID de la syntaxe (format de donnees) |
| **SINGLE-VALUE** | Attribut mono-value (absent = multi-value) |
| **NO-USER-MODIFICATION** | Attribut operationnel en lecture seule |

#### Matching Rules courantes

| Matching Rule | Utilisation | Comportement |
|---------------|-------------|--------------|
| `caseIgnoreMatch` | Egalite | Ignore la casse |
| `caseExactMatch` | Egalite | Respecte la casse |
| `distinguishedNameMatch` | Egalite | Compare les DN normalises |
| `integerMatch` | Egalite | Compare les entiers |
| `octetStringMatch` | Egalite | Compare les octets bruts |
| `caseIgnoreSubstringsMatch` | Sous-chaine | Recherche partielle insensible a la casse |

### 3.3 Object Classes Standards

| Object Class | Type | Attributs MUST | Attributs MAY (principaux) |
|-------------|------|----------------|---------------------------|
| `top` | Abstract | `objectClass` | - |
| `person` | Structural | `sn`, `cn` | `userPassword`, `telephoneNumber`, `description` |
| `organizationalPerson` | Structural | (herite de person) | `title`, `ou`, `postalAddress`, `st`, `l` |
| `inetOrgPerson` | Structural | (herite d'organizationalPerson) | `mail`, `uid`, `givenName`, `employeeNumber`, `jpegPhoto`, `labeledURI` |
| `organizationalUnit` | Structural | `ou` | `description`, `l`, `st`, `postalAddress` |
| `groupOfNames` | Structural | `cn`, `member` | `description`, `ou`, `owner`, `businessCategory` |
| `groupOfUniqueNames` | Structural | `cn`, `uniqueMember` | `description`, `ou`, `owner` |
| `posixAccount` | Auxiliary | `cn`, `uid`, `uidNumber`, `gidNumber`, `homeDirectory` | `loginShell`, `gecos`, `userPassword` |
| `shadowAccount` | Auxiliary | `uid` | `shadowExpire`, `shadowLastChange`, `shadowMax`, `shadowMin` |
| `device` | Structural | `cn` | `serialNumber`, `owner`, `ou`, `l`, `description` |

### 3.4 Schemas Standards

| Schema | Fichier | Contenu principal |
|--------|---------|-------------------|
| **core** | `core.schema` | Object classes de base (`top`, `alias`, `referral`), types fondamentaux |
| **cosine** | `cosine.schema` | Attributs issus du standard X.500 COSINE (RFC 4524) |
| **inetorgperson** | `inetorgperson.schema` | `inetOrgPerson` et ses attributs etendus (RFC 2798) |
| **nis** | `nis.schema` | Classes POSIX (`posixAccount`, `shadowAccount`, `posixGroup`) pour les systemes Unix/Linux |
| **samba** | `samba.schema` | Classes et attributs pour l'integration Samba/SMB |
| **ppolicy** | `ppolicy.schema` | Politique de mots de passe (`pwdPolicy`, attributs de gestion) |
| **dyngroup** | `dyngroup.schema` | Groupes dynamiques bases sur des URLs LDAP |

### 3.5 Extensions de Schema

Il est possible d'etendre le schema en ajoutant ses propres types d'attributs et Object Classes. Cette operation necessite :

- Un **OID unique** pour chaque nouvel element (obtenu aupres de l'IANA ou sous un arc prive)
- Le respect de la syntaxe de definition du schema
- Le chargement dans le serveur (fichier `.schema` ou via `cn=config`)

```
# Exemple : ajouter un attribut personnalise et une object class
# OID de base : 1.3.6.1.4.1.99999 (arc prive fictif)

# 1. Definition de l'attribut
attributeType ( 1.3.6.1.4.1.99999.1.1
  NAME 'dateEntree'
  DESC 'Date d entree dans l entreprise'
  EQUALITY generalizedTimeMatch
  ORDERING generalizedTimeOrderingMatch
  SYNTAX 1.3.6.1.4.1.1466.115.121.1.24
  SINGLE-VALUE )

# 2. Definition de l'Object Class auxiliaire
objectClass ( 1.3.6.1.4.1.99999.2.1
  NAME 'employeEntreprise'
  DESC 'Attributs supplementaires pour les employes'
  SUP top AUXILIARY
  MAY ( dateEntree $ badgeNumber $ bureau ) )
```

> **Attention**
> Modifier le schema d'un annuaire en production est une operation sensible. Testez toujours sur un environnement de pre-production. Notez egalement qu'il est tres difficile de supprimer un element du schema une fois ajoute si des entrees l'utilisent.

## 4. Operations LDAP

LDAP definit neuf operations fondamentales que le client peut effectuer sur le serveur. Chaque operation suit un modele requete-reponse.

**Flux des operations client-serveur LDAP :**

1. **Bind Request** (authentification) — le serveur repond avec Bind Response (success/failure)
2. **Search Request** (base, scope, filtre) — le serveur repond avec Search Result Entry (0..N entrees) puis Search Result Done
3. **Add / Modify / Delete / ModRDN** — le serveur repond avec Result (success/error + code retour)
4. **Compare Request** — le serveur repond avec Compare Response (TRUE/FALSE)
5. **Unbind Request** (fermeture) — pas de reponse, la connexion est fermee

### 4.1 Bind (Authentification)

L'operation **Bind** authentifie le client aupres du serveur LDAP. C'est generalement la premiere operation apres l'ouverture de la connexion TCP.

#### Types de Bind

| Type | Description | Securite |
|------|-------------|----------|
| **Anonymous Bind** | Aucune authentification. Acces en lecture seule limite | Faible — a desactiver en production |
| **Simple Bind** | DN + mot de passe en clair (doit etre protege par TLS) | Moyenne — necessite TLS obligatoirement |
| **SASL Bind** | Mecanisme SASL (GSSAPI/Kerberos, EXTERNAL/certificat, DIGEST-MD5) | Forte — recommande pour la production |

```bash
# Anonymous Bind (acces limite)
ldapsearch -x -H ldap://ldap.example.com -b "dc=example,dc=com" "(uid=jdupont)"

# Simple Bind avec DN et mot de passe
ldapsearch -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" \
  -W \
  -b "dc=example,dc=com" "(uid=jdupont)"

# SASL Bind avec Kerberos (GSSAPI)
ldapsearch -H ldap://ldap.example.com \
  -Y GSSAPI \
  -b "dc=example,dc=com" "(uid=jdupont)"
```

> **Important**
> Ne jamais utiliser le Simple Bind sans chiffrement TLS/LDAPS. Le mot de passe circulerait en clair sur le reseau. Configurez toujours LDAPS (port 636) ou StartTLS (port 389 avec upgrade TLS).

### 4.2 Search (Recherche)

L'operation **Search** est l'operation la plus utilisee de LDAP. Elle permet de rechercher des entrees dans l'annuaire en specifiant des criteres precis.

#### Parametres d'une recherche

| Parametre | Description | Exemple |
|-----------|-------------|---------|
| **Base DN** | Point de depart de la recherche dans le DIT | `ou=People,dc=example,dc=com` |
| **Scope** | Etendue de la recherche (`base`, `one`, `sub`) | `sub` (sous-arbre complet) |
| **Filter** | Criteres de selection (syntaxe RFC 4515) | `(&(objectClass=inetOrgPerson)(ou=DSI))` |
| **Attributes** | Liste des attributs a retourner | `cn mail uid telephoneNumber` |
| **Size Limit** | Nombre max d'entrees retournees | `100` |
| **Time Limit** | Duree maximale de la recherche (secondes) | `30` |
| **Deref Aliases** | Comment traiter les alias | `never`, `search`, `find`, `always` |

```bash
# Recherche complete avec tous les parametres
ldapsearch -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W \
  -b "ou=People,dc=example,dc=com" \
  -s sub \
  -z 100 \
  -l 30 \
  "(&(objectClass=inetOrgPerson)(ou=DSI))" \
  cn mail uid telephoneNumber
```

### 4.3 Add (Ajout)

L'operation **Add** cree une nouvelle entree dans l'annuaire. L'entree doit respecter le schema (attributs obligatoires, syntaxes) et son parent doit exister.

```bash
# Ajout d'un utilisateur via ldapadd
ldapadd -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W << 'EOF'
dn: cn=Pierre Bernard,ou=People,dc=example,dc=com
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: inetOrgPerson
cn: Pierre Bernard
sn: Bernard
givenName: Pierre
mail: pierre.bernard@example.com
uid: pbernard
userPassword: {SSHA}motDePasseHashe
title: Administrateur Systeme
ou: Infrastructure
telephoneNumber: +33 1 98 76 54 32
EOF
```

### 4.4 Modify (Modification)

L'operation **Modify** permet de modifier les attributs d'une entree existante. Trois types de modifications sont possibles :

| Type | Description | Exemple |
|------|-------------|---------|
| **add** | Ajouter une valeur a un attribut | Ajouter un numero de telephone supplementaire |
| **replace** | Remplacer toute(s) la/les valeur(s) d'un attribut | Changer l'email |
| **delete** | Supprimer une valeur specifique ou tout l'attribut | Retirer un numero de telephone |

```bash
# Modification d'un utilisateur via ldapmodify
ldapmodify -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W << 'EOF'
dn: cn=Pierre Bernard,ou=People,dc=example,dc=com
changetype: modify
replace: mail
mail: p.bernard@example.com
-
add: telephoneNumber
telephoneNumber: +33 6 12 34 56 78
-
delete: title
-
add: description
description: Administrateur senior infrastructure
EOF
```

### 4.5 Delete (Suppression)

L'operation **Delete** supprime une entree de l'annuaire. L'entree ne doit pas avoir d'enfants (sauf si le controle Tree Delete est supporte).

```bash
# Suppression d'une entree
ldapdelete -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W \
  "cn=Pierre Bernard,ou=People,dc=example,dc=com"

# Suppression recursive (si supportee par le serveur)
ldapdelete -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W \
  -r "ou=TempUsers,dc=example,dc=com"
```

> **Attention**
> La suppression dans LDAP est irreversible. Il n'y a pas de corbeille ni de rollback natif. Effectuez toujours un export LDIF de sauvegarde avant de supprimer des entrees en production.

### 4.6 ModifyDN (Renommer/Deplacer)

L'operation **ModifyDN** (aussi appelee ModRDN) permet de renommer une entree (changer son RDN) ou de la deplacer dans l'arbre (changer son parent).

```bash
# Renommer une entree (changer le RDN)
ldapmodrdn -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W \
  "cn=Jean Dupont,ou=People,dc=example,dc=com" \
  "cn=Jean-Baptiste Dupont"

# Deplacer une entree vers un autre parent (LDAPv3)
ldapmodrdn -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W \
  -s "ou=Archives,dc=example,dc=com" \
  "cn=Jean Dupont,ou=People,dc=example,dc=com" \
  "cn=Jean Dupont"
```

### 4.7 Compare

L'operation **Compare** verifie si un attribut d'une entree contient une valeur donnee, sans retourner l'entree elle-meme. Utile pour verifier un mot de passe ou une appartenance a un groupe sans exposer les donnees.

```bash
# Verifier si l'utilisateur appartient au groupe "admins"
ldapcompare -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W \
  "cn=admins,ou=Groups,dc=example,dc=com" \
  "member:cn=Jean Dupont,ou=People,dc=example,dc=com"

# Resultat : TRUE (6) ou FALSE (5)
```

### 4.8 Extended Operations

Les **Extended Operations** sont un mecanisme d'extension du protocole LDAPv3. Elles permettent d'ajouter des fonctionnalites au-dela des operations de base.

| Operation | OID | Description |
|-----------|-----|-------------|
| **StartTLS** | 1.3.6.1.4.1.1466.20037 | Upgrade la connexion en TLS (chiffrement) |
| **Who Am I** | 1.3.6.1.4.1.4203.1.11.3 | Retourne l'identite du client authentifie |
| **Password Modify** | 1.3.6.1.4.1.4203.1.11.1 | Changer le mot de passe (generer un nouveau si besoin) |
| **Cancel** | 1.3.6.1.1.8 | Annuler une operation en cours |

```bash
# StartTLS — demarrer le chiffrement sur port 389
ldapsearch -x -H ldap://ldap.example.com -ZZ \
  -b "dc=example,dc=com" "(uid=jdupont)"
# -ZZ = exiger StartTLS (echec si TLS impossible)
# -Z  = tenter StartTLS (continuer si echec)

# Who Am I — connaitre son identite
ldapwhoami -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W
# Resultat : dn:cn=admin,dc=example,dc=com

# Password Modify — changer un mot de passe
ldappasswd -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W \
  -S "cn=Jean Dupont,ou=People,dc=example,dc=com"
```

### 4.9 Unbind (Deconnexion)

L'operation **Unbind** signale au serveur que le client souhaite fermer la connexion. Contrairement a son nom, elle ne "desauthentifie" pas : elle **ferme la connexion TCP**. Le serveur ne renvoie pas de reponse.

> **Note**
> En pratique, les bibliotheques clientes LDAP gerent l'Unbind automatiquement a la fermeture de la connexion. Vous n'avez generalement pas besoin d'appeler Unbind explicitement.

## 5. Filtres de Recherche

Les **filtres LDAP** sont le mecanisme de selection des entrees lors d'une operation Search. Definis par la RFC 4515, ils utilisent une syntaxe prefixee (notation polonaise) qui peut paraitre inhabituelle mais qui est en realite tres logique.

### 5.1 Syntaxe des Filtres

Un filtre LDAP est entoure de parentheses et suit la forme `(attribut operateur valeur)`.

```
# Syntaxe de base
(attribut=valeur)           # Egalite exacte
(attribut=vale*)            # Commence par "vale"
(attribut=*aleur)           # Finit par "aleur"
(attribut=*ale*)            # Contient "ale"
(attribut=*)                # Attribut present (existe)
(attribut>=valeur)          # Superieur ou egal
(attribut<=valeur)          # Inferieur ou egal
(attribut~=valeur)          # Egalite approximative (phonetique)
```

### 5.2 Operateurs de Comparaison

| Operateur | Nom | Description | Exemple |
|-----------|-----|-------------|---------|
| `=` | Egalite | Correspondance exacte | `(uid=jdupont)` |
| `>=` | Superieur ou egal | Comparaison d'ordre | `(uidNumber>=1000)` |
| `<=` | Inferieur ou egal | Comparaison d'ordre | `(uidNumber<=9999)` |
| `~=` | Egalite approximative | Recherche phonetique (soundex) | `(cn~=Dupont)` |
| `=*` | Presence | L'attribut existe dans l'entree | `(mail=*)` |
| `=val*` | Sous-chaine | Recherche avec wildcards | `(cn=Jean*)` |

### 5.3 Operateurs Logiques

Les operateurs logiques permettent de combiner plusieurs filtres. Ils utilisent la **notation prefixee** (l'operateur vient avant les operandes).

| Operateur | Syntaxe | Description | Exemple |
|-----------|---------|-------------|---------|
| `&` (ET) | `(&(filtre1)(filtre2)...)` | Toutes les conditions doivent etre vraies | `(&(objectClass=person)(ou=DSI))` |
| `\|` (OU) | `(\|(filtre1)(filtre2)...)` | Au moins une condition doit etre vraie | `(\|(ou=DSI)(ou=RH))` |
| `!` (NON) | `(!(filtre))` | Negation du filtre | `(!(accountDisabled=TRUE))` |

### 5.4 Filtres Complexes

Les operateurs se combinent pour creer des filtres sophistiques :

```
# Tous les utilisateurs actifs du departement DSI
(&(objectClass=inetOrgPerson)(ou=DSI)(!(accountDisabled=TRUE)))

# Utilisateurs dont le nom commence par "D" dans DSI ou RH
(&(objectClass=inetOrgPerson)(sn=D*)(|(ou=DSI)(ou=RH)))

# Comptes avec mot de passe expirant avant une date donnee
(&(objectClass=posixAccount)(shadowExpire<=19800)(shadowExpire>=1))

# Groupes contenant un membre specifique
(&(objectClass=groupOfNames)(member=cn=Jean Dupont,ou=People,dc=example,dc=com))

# Tous les utilisateurs ayant un email ET un numero de telephone
(&(objectClass=inetOrgPerson)(mail=*)(telephoneNumber=*))

# Utilisateurs sans email defini
(&(objectClass=inetOrgPerson)(!(mail=*)))
```

#### Table des filtres courants

| Objectif | Filtre |
|----------|--------|
| Tous les utilisateurs | `(objectClass=inetOrgPerson)` |
| Utilisateur par UID | `(uid=jdupont)` |
| Utilisateur par email | `(mail=jean.dupont@example.com)` |
| Recherche par nom partiel | `(cn=*Dupont*)` |
| Tous les groupes | `(objectClass=groupOfNames)` |
| Groupes d'un utilisateur | `(member=cn=Jean Dupont,ou=People,dc=example,dc=com)` |
| Comptes desactives | `(accountDisabled=TRUE)` |
| Comptes crees depuis 2025 | `(createTimestamp>=20250101000000Z)` |
| Unites organisationnelles | `(objectClass=organizationalUnit)` |
| Entrees modifiees recemment | `(modifyTimestamp>=20250301000000Z)` |

### 5.5 Scopes de Recherche

Le **scope** determine la profondeur de la recherche a partir du Base DN.

| Scope | Description | Utilisation |
|-------|-------------|-------------|
| **base** | Uniquement l'entree pointee par le Base DN | Lire une entree specifique par son DN |
| **one** (oneLevel) | Uniquement les enfants directs du Base DN | Lister les entrees d'une OU |
| **sub** (subtree) | Le Base DN et tous ses descendants | Recherche globale dans un sous-arbre |
| **children** | Tous les descendants du Base DN (sans le Base DN lui-meme) | Variante de sub (pas supporte partout) |

```bash
# Scope base — lire une entree precise
ldapsearch -b "cn=Jean Dupont,ou=People,dc=example,dc=com" -s base "(objectClass=*)"

# Scope one — lister les OUs directes sous la racine
ldapsearch -b "dc=example,dc=com" -s one "(objectClass=organizationalUnit)"

# Scope sub — chercher dans tout le sous-arbre People
ldapsearch -b "ou=People,dc=example,dc=com" -s sub "(sn=Dupont)"
```

> **Bonne pratique**
> Choisir le bon scope et le bon Base DN est crucial pour les performances. Evitez les recherches `sub` sur la racine du DIT si vous pouvez cibler une branche specifique (par exemple `ou=People`).

## 6. Format LDIF

### 6.1 Qu'est-ce que LDIF ?

**LDIF** (LDAP Data Interchange Format), defini par la RFC 2849, est le format texte standard pour representer les donnees LDAP et les operations de modification. C'est l'equivalent du dump SQL pour les bases relationnelles.

LDIF est utilise pour :

- Exporter les donnees d'un annuaire (sauvegarde)
- Importer des donnees dans un annuaire
- Decrire des modifications a appliquer (ajout, modification, suppression)
- Echanger des donnees entre annuaires LDAP differents

### 6.2 Syntaxe LDIF

Un fichier LDIF contient une ou plusieurs entrees, separees par des lignes vides.

```ldif
# Commentaire : ce fichier contient deux entrees

# Premiere entree : une unite organisationnelle
dn: ou=People,dc=example,dc=com
objectClass: top
objectClass: organizationalUnit
ou: People
description: Branche contenant les utilisateurs

# Deuxieme entree : un utilisateur
dn: cn=Jean Dupont,ou=People,dc=example,dc=com
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: inetOrgPerson
cn: Jean Dupont
cn: J. Dupont
sn: Dupont
givenName: Jean
mail: jean.dupont@example.com
uid: jdupont
userPassword: {SSHA}W6ph5Mm5Pz8GgiULbPgzG37mj9g=
telephoneNumber: +33 1 23 45 67 89
title: Ingenieur IAM
ou: DSI
```

#### Regles de syntaxe

- Chaque entree commence par `dn:` suivi du Distinguished Name
- Les attributs sont au format `nom: valeur` (un par ligne)
- Les lignes longues sont coupees avec un espace en debut de ligne suivante (folding)
- Les valeurs binaires sont encodees en Base64 avec `nom:: valeurBase64`
- Les entrees sont separees par une ligne vide
- Les commentaires commencent par `#`

```ldif
# Valeur encodee en Base64 (par exemple un certificat ou une photo)
dn: cn=Jean Dupont,ou=People,dc=example,dc=com
jpegPhoto:: /9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMC...

# Ligne longue coupee (folding) — la continuation commence par un espace
description: Ceci est une tres longue description qui depasse la largeur maximale
 recommandee de 76 caracteres et qui est donc repliee sur la ligne suivante
```

### 6.3 LDIF pour Ajout, Modification, Suppression

LDIF supporte aussi le format **changetype** pour decrire des modifications :

```ldif
# --- AJOUT d'une entree ---
dn: cn=Nouveau Utilisateur,ou=People,dc=example,dc=com
changetype: add
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: inetOrgPerson
cn: Nouveau Utilisateur
sn: Utilisateur
givenName: Nouveau
mail: nouveau@example.com
uid: nutilisateur

# --- MODIFICATION d'une entree ---
dn: cn=Jean Dupont,ou=People,dc=example,dc=com
changetype: modify
replace: mail
mail: jean.dupont-nouveau@example.com
-
add: telephoneNumber
telephoneNumber: +33 6 98 76 54 32
-
delete: title
-

# --- SUPPRESSION d'une entree ---
dn: cn=Ancien Compte,ou=People,dc=example,dc=com
changetype: delete

# --- RENOMMAGE d'une entree ---
dn: cn=Jean Dupont,ou=People,dc=example,dc=com
changetype: modrdn
newrdn: cn=Jean-Baptiste Dupont
deleteoldrdn: 1
```

> **Note**
> Le separateur `-` (tiret seul sur une ligne) est obligatoire entre chaque operation de modification dans un meme bloc `changetype: modify`. C'est une source d'erreur frequente.

### 6.4 Import/Export avec LDIF

#### Export (sauvegarde)

```bash
# Export complet de l'annuaire
slapcat -b "dc=example,dc=com" -l backup_complet.ldif

# Export avec ldapsearch (via le protocole LDAP)
ldapsearch -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W \
  -b "dc=example,dc=com" \
  -s sub "(objectClass=*)" "*" "+" \
  -LLL > export.ldif
# -LLL : format LDIF pur (sans commentaires ni version)
# "*"  : tous les attributs utilisateur
# "+"  : tous les attributs operationnels
```

#### Import (restauration)

```bash
# Import via slapadd (serveur arrete — plus rapide)
slapcat -b "dc=example,dc=com"   # sauvegarde d'abord !
service slapd stop
slapadd -b "dc=example,dc=com" -l backup_complet.ldif
service slapd start

# Import via ldapadd (serveur en marche — via le protocole)
ldapadd -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W \
  -f nouveaux_utilisateurs.ldif

# Appliquer des modifications LDIF
ldapmodify -x -H ldap://ldap.example.com \
  -D "cn=admin,dc=example,dc=com" -W \
  -f modifications.ldif
```

> **Attention**
> `slapadd` doit etre execute serveur arrete. `ldapadd`/`ldapmodify` s'executent serveur en marche. Ne melangez pas les deux approches. Pour les imports massifs, `slapadd` est beaucoup plus rapide car il ecrit directement dans la base sans passer par le protocole LDAP.

## 7. Replication et Haute Disponibilite

### 7.1 Pourquoi Repliquer ?

La replication LDAP consiste a maintenir des copies synchronisees de l'annuaire sur plusieurs serveurs. Les objectifs sont :

- **Haute disponibilite** : si un serveur tombe, les autres prennent le relais
- **Performance** : distribuer la charge de lecture sur plusieurs serveurs
- **Resilience geographique** : placer des replicas dans differents sites/datacenters
- **Continuite de service** : maintenance sans interruption

### 7.2 Replication Single-Master (Provider/Consumer)

Dans le modele **Single-Master**, un seul serveur (le **Provider**, anciennement "Master") accepte les ecritures. Les autres serveurs (**Consumers**, anciennement "Slaves") sont des replicas en lecture seule.

#### Fonctionnement

1. Le client effectue une ecriture sur le Provider
2. Le Provider enregistre la modification avec un CSN (Change Sequence Number)
3. Les Consumers interrogent periodiquement le Provider (syncrepl)
4. Le Provider envoie les modifications depuis le dernier CSN connu du Consumer
5. Le Consumer applique les modifications localement

```ldif
# Configuration syncrepl sur le Consumer (cn=config)
dn: olcDatabase={1}mdb,cn=config
changetype: modify
add: olcSyncRepl
olcSyncRepl: rid=001
  provider=ldap://provider.example.com
  bindmethod=simple
  binddn="cn=replicator,dc=example,dc=com"
  credentials=motDePasse
  searchbase="dc=example,dc=com"
  scope=sub
  schemachecking=on
  type=refreshAndPersist
  retry="60 10 300 +"
  interval=00:00:05:00
```

> **Note**
> Quand un client tente d'ecrire sur un Consumer, celui-ci renvoie un **referral** vers le Provider. Le client doit alors se reconnecter au Provider pour effectuer l'ecriture.

### 7.3 Replication Multi-Master (MMR)

La replication **Multi-Master** (Mirror Mode ou MMR — Multi-Master Replication) permet a plusieurs serveurs d'accepter des ecritures simultanement. Chaque serveur est a la fois Provider et Consumer.

#### Avantages et inconvenients

| Aspect | Avantage | Inconvenient |
|--------|----------|--------------|
| **Disponibilite** | Ecriture possible meme si un serveur tombe | Conflits possibles si ecritures simultanees sur le meme objet |
| **Performance** | Repartition de la charge d'ecriture | Overhead de synchronisation entre masters |
| **Simplicite** | Pas de basculement Provider/Consumer | Configuration plus complexe |
| **Coherence** | Resolution automatique des conflits par CSN | Coherence a terme (eventual consistency), pas immediate |

> **Attention**
> La replication Multi-Master dans OpenLDAP est consideree comme experimentale. Pour la production, privilegiez le mode **Mirror Mode** (2 masters exactement) ou la replication Single-Master avec basculement automatique.

### 7.4 Delta-syncrepl vs Syncrepl

| Critere | Syncrepl | Delta-syncrepl |
|---------|----------|----------------|
| **Donnees transferees** | Entree complete a chaque modification | Uniquement les attributs modifies (delta) |
| **Bande passante** | Elevee (entrees completes) | Faible (seulement les changements) |
| **Journal (accesslog)** | Non requis | Requis (overlay accesslog sur le Provider) |
| **Complexite** | Simple | Plus complexe a configurer |
| **Cas d'usage** | Petits annuaires, premieres mises en place | Grands annuaires, liens reseau lents |

```ldif
# Configuration delta-syncrepl (necessite l'overlay accesslog sur le Provider)
# Provider : activer l'overlay accesslog
dn: olcOverlay={0}accesslog,olcDatabase={1}mdb,cn=config
objectClass: olcOverlayConfig
objectClass: olcAccessLogConfig
olcOverlay: {0}accesslog
olcAccessLogDB: cn=accesslog
olcAccessLogOps: writes
olcAccessLogPurge: 07+00:00 01+00:00

# Consumer : configurer delta-syncrepl
olcSyncRepl: rid=001
  provider=ldap://provider.example.com
  bindmethod=simple
  binddn="cn=replicator,dc=example,dc=com"
  credentials=motDePasse
  searchbase="dc=example,dc=com"
  logbase="cn=accesslog"
  logfilter="(&(objectClass=auditWriteObject)(reqResult=0))"
  syncdata=accesslog
  type=refreshAndPersist
  retry="60 10 300 +"
```

### 7.5 Topologies de Replication

**Trois topologies principales de replication LDAP :**

- **Etoile** : un Provider central (P) replique vers plusieurs Consumers (C1, C2, C3). Simple, ideal pour les petits/moyens deployments.
- **Chaine** : le Provider (P) replique vers C1, qui replique vers C2. Utile pour les sites distants a faible bande passante.
- **Maillage (MMR)** : tous les noeuds (M1, M2, M3, M4) sont masters et se repliquent mutuellement. Haute disponibilite en ecriture, resolution de conflits par CSN.

#### Table comparative des topologies

| Topologie | Ecritures | Disponibilite | Complexite | Cas d'usage |
|-----------|-----------|---------------|------------|-------------|
| **Etoile** | Provider uniquement | Moyenne (SPOF sur le Provider) | Faible | PME, site unique |
| **Chaine** | Provider uniquement | Moyenne | Faible | Multi-sites, WAN lent |
| **Mirror Mode** | 2 Masters | Haute | Moyenne | Production avec failover |
| **MMR (Maillage)** | Tous les Masters | Tres haute | Elevee | Multi-datacenter, grande echelle |

## 8. Securite

La securite est un aspect critique de tout deploiement LDAP. L'annuaire contient des donnees sensibles (mots de passe, informations personnelles, structures organisationnelles) et doit etre protege a tous les niveaux.

### 8.1 LDAPS vs StartTLS

| Critere | LDAPS | StartTLS |
|---------|-------|----------|
| **Port** | 636 (dedie) | 389 (standard LDAP, upgrade TLS) |
| **Mecanisme** | TLS des la connexion TCP | Connexion en clair, puis upgrade via Extended Operation |
| **RFC** | Pas de RFC officielle (convention) | RFC 4511 (operation etendue standard) |
| **Firewall** | Port specifique a ouvrir | Meme port que LDAP non chiffre |
| **Recommandation** | Largement deploye, simple | Standard officiel, prefere par l'IETF |
| **Risque** | Aucun (chiffre des le debut) | Possible downgrade attack si `-Z` au lieu de `-ZZ` |

#### Processus StartTLS

1. Le client se connecte au serveur sur le port 389 (connexion en clair)
2. Le client envoie une Extended Operation StartTLS (OID 1.3.6.1.4.1.1466.20037)
3. Le serveur repond avec un code de succes
4. La negociation TLS commence (echange de certificats, cles)
5. La connexion est maintenant chiffree — toutes les operations suivantes sont protegees

```bash
# LDAPS — connexion chiffree directe sur le port 636
ldapsearch -x -H ldaps://ldap.example.com:636 \
  -D "cn=admin,dc=example,dc=com" -W \
  -b "dc=example,dc=com" "(uid=jdupont)"

# StartTLS — upgrade de la connexion sur le port 389
ldapsearch -x -H ldap://ldap.example.com -ZZ \
  -D "cn=admin,dc=example,dc=com" -W \
  -b "dc=example,dc=com" "(uid=jdupont)"
# -ZZ : exige StartTLS (echec si TLS impossible)
# -Z  : tente StartTLS (continue meme si echec -- DANGEREUX)
```

> **Important**
> Utilisez toujours `-ZZ` (et non `-Z`) avec StartTLS. L'option `-Z` simple tente le chiffrement mais continue en clair si le serveur refuse, ce qui est un risque de securite majeur (downgrade attack).

### 8.2 Authentification

#### Simple Bind

Le client envoie son DN et son mot de passe. Le mot de passe est transmis en clair dans le message LDAP (d'ou l'obligation de chiffrer avec TLS).

#### SASL/GSSAPI (Kerberos)

L'authentification est deleguee a Kerberos. Le client presente un ticket Kerberos valide. Aucun mot de passe ne transite sur le reseau.

```bash
# Authentification Kerberos avec kinit prealable
kinit jdupont@EXAMPLE.COM
ldapsearch -H ldap://ldap.example.com -Y GSSAPI \
  -b "dc=example,dc=com" "(uid=jdupont)"
```

#### SASL/EXTERNAL (Certificats)

L'authentification est basee sur le certificat client TLS. Le DN de l'utilisateur est extrait du certificat X.509.

```bash
# Authentification par certificat client
ldapsearch -H ldaps://ldap.example.com \
  -Y EXTERNAL \
  -b "dc=example,dc=com" "(uid=jdupont)"
# Le certificat client doit etre configure dans ldap.conf
# TLS_CERT /chemin/vers/client-cert.pem
# TLS_KEY  /chemin/vers/client-key.pem
```

#### Comparaison des methodes

| Methode | Securite | Complexite | Pre-requis |
|---------|----------|------------|------------|
| **Anonymous** | Aucune | Nulle | Rien |
| **Simple Bind** | Moyenne (avec TLS) | Faible | TLS obligatoire |
| **SASL/DIGEST-MD5** | Bonne | Moyenne | Deprecie (RFC 6331) |
| **SASL/GSSAPI** | Excellente | Elevee | Infrastructure Kerberos (KDC) |
| **SASL/EXTERNAL** | Excellente | Elevee | PKI (certificats X.509) |

### 8.3 Controle d'Acces (ACL/ACI)

Les **ACL** (Access Control Lists) definissent qui peut acceder a quoi dans l'annuaire. La syntaxe differe selon l'implementation.

#### Syntaxe OpenLDAP (olcAccess)

```
# Syntaxe : olcAccess: to <quoi> by <qui> <niveau_acces>

# Exemple : ACL complete pour un annuaire OpenLDAP
# 1. Les utilisateurs peuvent lire/modifier leur propre mot de passe
olcAccess: {0}to attrs=userPassword
  by self write
  by anonymous auth
  by * none

# 2. Les admins ont acces total
olcAccess: {1}to *
  by dn.exact="cn=admin,dc=example,dc=com" manage
  by group.exact="cn=ldap-admins,ou=Groups,dc=example,dc=com" write

# 3. Les utilisateurs authentifies peuvent lire
olcAccess: {2}to *
  by users read
  by anonymous none
```

#### Niveaux d'acces OpenLDAP

| Niveau | Valeur | Description |
|--------|--------|-------------|
| `none` | 0 | Aucun acces |
| `disclose` | 1 | Revele l'existence de l'entree dans les messages d'erreur |
| `auth` | 2 | Permet l'authentification (bind) |
| `compare` | 4 | Permet l'operation Compare |
| `search` | 8 | Permet d'appliquer des filtres de recherche |
| `read` | 16 | Permet de lire les valeurs des attributs |
| `write` | 32 | Permet de modifier les valeurs |
| `manage` | 64 | Acces total (y compris attributs operationnels) |

#### Syntaxe 389 Directory Server (ACI)

```
# Syntaxe ACI integree dans les entrees elles-memes
aci: (targetattr="*")
  (version 3.0; acl "Lecture pour utilisateurs authentifies";
   allow (read, search, compare)
   userdn="ldap:///all";)

aci: (targetattr="userPassword")
  (version 3.0; acl "Modification mot de passe par proprietaire";
   allow (write)
   userdn="ldap:///self";)
```

### 8.4 Politique de Mots de Passe (ppolicy)

L'overlay **ppolicy** (Password Policy, RFC draft-behera-ldap-password-policy) permet de definir des regles de gestion des mots de passe.

```ldif
# Entree de politique de mots de passe
dn: cn=default,ou=Policies,dc=example,dc=com
objectClass: top
objectClass: person
objectClass: pwdPolicy
cn: default
sn: default
pwdAttribute: userPassword
pwdMinAge: 0
pwdMaxAge: 7776000          # Expiration apres 90 jours
pwdMinLength: 12            # Longueur minimale 12 caracteres
pwdInHistory: 10            # Historique des 10 derniers mots de passe
pwdCheckQuality: 2          # Verification de la complexite (2 = rejet si non conforme)
pwdMaxFailure: 5            # Verrouillage apres 5 echecs
pwdLockout: TRUE            # Activer le verrouillage
pwdLockoutDuration: 1800    # Verrouillage pendant 30 minutes (1800 secondes)
pwdGraceAuthNLimit: 3       # 3 authentifications de grace apres expiration
pwdFailureCountInterval: 600 # Reset du compteur d'echecs apres 10 minutes
pwdMustChange: TRUE         # Forcer le changement au premier login
pwdAllowUserChange: TRUE    # L'utilisateur peut changer son mot de passe
pwdSafeModify: TRUE         # Doit fournir l'ancien mot de passe pour changer
```

### 8.5 Bonnes Pratiques Securite

> **Important**
> **Desactiver le bind anonyme** en production. Le bind anonyme permet a n'importe qui de lire l'annuaire sans authentification. Configurez `olcDisallows: bind_anon` ou restreignez les ACL.

> **Attention**
> **Chiffrement obligatoire** : Forcez TLS/LDAPS pour toutes les connexions. Configurez `olcSecurity: tls=1` sur OpenLDAP pour refuser les connexions non chiffrees.

#### Liste de controle securite

1. **Chiffrement** : TLS 1.2+ obligatoire pour toutes les connexions (LDAPS ou StartTLS -ZZ)
2. **Bind anonyme** : Desactiver ou restreindre severement les ACL pour les connexions anonymes
3. **Comptes de service** : Creer des comptes dedies avec des droits minimaux pour chaque application
4. **Mots de passe** : Implementer ppolicy (longueur, complexite, historique, verrouillage)
5. **ACL granulaires** : Principe du moindre privilege — chaque compte n'accede qu'aux donnees necessaires
6. **Audit logs** : Activer l'overlay accesslog pour tracer toutes les operations
7. **Hachage** : Stocker les mots de passe avec SSHA-512 ou PBKDF2 (jamais en clair ou MD5)
8. **Certificats** : Utiliser des certificats signes par une CA de confiance (pas d'auto-signe en production)
9. **Firewall** : Restreindre l'acces aux ports 389/636 aux seuls clients autorises
10. **Monitoring** : Surveiller les tentatives de bind echouees, les recherches anormales, la replication

## 9. Implementations LDAP

### Table Comparative

| Critere | OpenLDAP | 389 Directory Server | Active Directory (AD DS) | Apache Directory Server |
|---------|----------|---------------------|--------------------------|------------------------|
| **Licence** | Open source (OpenLDAP Public License) | Open source (GPLv2) | Proprietaire (Microsoft) | Open source (Apache 2.0) |
| **OS** | Linux, BSD, macOS, Windows | Linux (RHEL/Fedora principalement) | Windows Server uniquement | Multi-plateforme (Java) |
| **Configuration** | `cn=config` (dynamique) ou `slapd.conf` | `cn=config` (dynamique) + Console/Cockpit | GUI (ADUC, ADAC) + PowerShell | Apache Directory Studio (GUI) |
| **Replication** | Syncrepl, Delta-syncrepl, Mirror Mode | Multi-Master native | Multi-Master (AD natif) | Replication basique |
| **Extensibilite** | Overlays (plugins C) | Plugins (C) | Extensions Microsoft | Intercepteurs (Java) |
| **Performance** | Excellente (MDB backend) | Excellente (BDB backend) | Tres bonne | Bonne |
| **Schema** | Tres flexible | Flexible | Etendu (attributs AD proprietaires) | Flexible |
| **Communaute** | Tres active | Active (Red Hat) | Enorme (ecosysteme Microsoft) | Moderee |
| **Cas d'usage** | Linux/Unix auth, annuaire generique | RHEL/Fedora auth, entreprise Linux | Environnement Windows, entreprise | Developpement, embedded, tests |

### 9.1 OpenLDAP

**OpenLDAP** est l'implementation LDAP open source la plus deployee. Elle se compose de :

- **slapd** : le serveur (daemon) LDAP
- **bibliotheques clientes** : libldap pour le developpement
- **outils CLI** : ldapsearch, ldapadd, ldapmodify, ldapdelete, ldapwhoami, ldappasswd
- **outils serveur** : slapcat, slapadd, slapindex, slaptest

#### Architecture OpenLDAP

```
Client LDAP
    |
    v
+-------------------+
|       slapd        |  (daemon LDAP)
|                     |
| +--- Frontend ---+ |  Gestion des connexions, protocole LDAP
| +--- Backend ---+  |  Stockage des donnees (MDB, BDB, LDIF, SQL)
| +--- Overlays --+  |  Plugins : ppolicy, accesslog, syncprov, memberof, refint
+-------------------+
    |
    v
 Base MDB/LMDB       (stockage sur disque — Lightning Memory-Mapped Database)
```

#### Configuration cn=config

Depuis OpenLDAP 2.4, la configuration se fait dynamiquement via l'arbre `cn=config` (plus besoin de redemarrer slapd). L'ancien fichier `slapd.conf` est deprecie.

```bash
# Lister la configuration actuelle
ldapsearch -Y EXTERNAL -H ldapi:/// -b "cn=config" "(objectClass=*)" -LLL

# Modifier la configuration (exemple : changer le loglevel)
ldapmodify -Y EXTERNAL -H ldapi:/// << 'EOF'
dn: cn=config
changetype: modify
replace: olcLogLevel
olcLogLevel: stats sync
EOF
```

#### Overlays essentiels

| Overlay | Description |
|---------|-------------|
| `syncprov` | Fournisseur de replication (syncrepl) |
| `accesslog` | Journalisation des operations (audit) |
| `ppolicy` | Politique de mots de passe |
| `memberof` | Maintien automatique de l'attribut `memberOf` sur les utilisateurs |
| `refint` | Integrite referentielle (mise a jour des references DN) |
| `unique` | Garantie d'unicite d'attributs (ex: uid, mail) |
| `auditlog` | Journal texte des modifications |

### 9.2 389 Directory Server

**389 Directory Server** (anciennement Fedora Directory Server) est l'annuaire LDAP sponsorise par Red Hat. C'est la base de **Red Hat Directory Server** (RHDS) et de **FreeIPA/IdM**.

#### Caracteristiques cles

- **Interface Cockpit** : administration web integree
- **Replication Multi-Master** native et robuste
- **Plugins riches** : DNA (Distributed Numeric Assignment), MemberOf, Referential Integrity
- **Support LDAPI** : communication via socket Unix (securite renforcee)
- **Certificate System** integre pour PKI

```bash
# Installation sur RHEL/Fedora
dnf install 389-ds-base 389-ds-base-legacy-tools cockpit-389-ds

# Creation d'une instance
dscreate interactive

# Administration via dsconf
dsconf instance_name backend list
dsconf instance_name replication status
```

### 9.3 Active Directory (AD DS)

**Active Directory Domain Services** (AD DS) est l'implementation d'annuaire de Microsoft. Bien qu'il utilise LDAP comme protocole d'acces, AD ajoute de nombreuses fonctionnalites proprietaires.

#### LDAP dans Active Directory

| Aspect | Standard LDAP | Specificite AD |
|--------|---------------|----------------|
| **Base DN** | `dc=example,dc=com` | `DC=example,DC=com` (meme syntaxe) |
| **Schema** | Extensible librement | Extensible mais avec precaution (replication schema) |
| **Authentification** | Simple Bind, SASL | NTLM, Kerberos (prefere), Simple Bind |
| **Groupes** | `groupOfNames` | `group` (classe AD specifique, attribut `member`) |
| **Port** | 389, 636 | 389, 636 + **3268/3269** (Global Catalog) |
| **Naming context** | Unique | Multiples (Domain, Configuration, Schema, DNS) |
| **Attributs specifiques** | - | `sAMAccountName`, `userPrincipalName`, `userAccountControl`, `objectGUID`, `objectSid` |

#### Global Catalog (GC)

Le **Global Catalog** (ports 3268/3269) est un index en lecture seule contenant un sous-ensemble d'attributs de tous les objets de la foret AD. Il permet des recherches inter-domaines rapides.

```bash
# Recherche dans le Global Catalog (multi-domaine)
ldapsearch -x -H ldap://gc.example.com:3268 \
  -D "user@example.com" -W \
  -b "DC=example,DC=com" \
  "(sAMAccountName=jdupont)" \
  sAMAccountName mail displayName memberOf
```

> **Note**
> Active Directory n'est pas un serveur LDAP pur. Il utilise LDAP comme un de ses protocoles d'acces, mais son modele interne est beaucoup plus riche (GPO, sites, trusts, Kerberos integre, DNS integre). Les outils LDAP standards fonctionnent avec AD, mais certaines operations necessitent des outils Microsoft specifiques.

### 9.4 Quand Choisir Quelle Implementation ?

**OpenLDAP** : Environnement Linux/Unix, annuaire generique haute performance, flexibilite maximale (overlays), budget limite (open source). Mots-cles : *Performance, Flexibilite*.

**389 Directory Server** : Ecosysteme Red Hat / Fedora, FreeIPA / Red Hat IdM, replication Multi-Master robuste, interface Cockpit integree. Mots-cles : *Entreprise Linux, Support Red Hat*.

**Active Directory** : Environnement Windows Server, GPO / Kerberos / DNS integres, ecosysteme Microsoft complet, integration Entra ID (cloud). Mots-cles : *Ecosysteme Microsoft, Entreprise*.

**Apache Directory Server** : Developpement et tests, applications Java embarquees, Apache Directory Studio (IDE), prototypage rapide. Mots-cles : *Developpement, Multi-plateforme*.

## 10. Glossaire

Definitions des termes techniques utilises dans cette documentation.

- **ACL (Access Control List)** : Ensemble de regles definissant les droits d'acces aux entrees et attributs de l'annuaire. Syntaxe `olcAccess` dans OpenLDAP.

- **ACI (Access Control Instruction)** : Equivalent des ACL dans 389 Directory Server. Les ACI sont stockees directement dans les entrees sous forme d'attribut `aci`.

- **Alias (Entree Alias)** : Entree speciale qui pointe vers une autre entree du DIT. Similaire a un lien symbolique dans un systeme de fichiers.

- **Attribut (Attribute)** : Paire cle-valeur composant une entree LDAP. Defini dans le schema par un type, une syntaxe et des matching rules.

- **Attribut Operationnel (Operational Attribute)** : Attribut maintenu automatiquement par le serveur (ex: `createTimestamp`, `modifyTimestamp`, `entryUUID`). Non retourne par defaut.

- **Base DN** : Point de depart d'une recherche dans le DIT. Aussi appele "suffix" quand il designe la racine de l'annuaire.

- **Bind (Liaison)** : Operation LDAP d'authentification du client aupres du serveur. Types : anonymous, simple (DN + mot de passe), SASL.

- **cn=config** : Methode de configuration dynamique d'OpenLDAP. La configuration est stockee dans un arbre LDAP special, modifiable a chaud sans redemarrage.

- **Consumer (Replica)** : Serveur LDAP en lecture seule qui recoit les donnees du Provider via la replication (syncrepl).

- **CSN (Change Sequence Number)** : Numero de sequence unique attribue a chaque modification dans l'annuaire. Utilise pour la synchronisation de la replication.

- **DIT (Directory Information Tree)** : Structure hierarchique en arbre qui organise toutes les entrees de l'annuaire LDAP. Chaque noeud est une entree.

- **DN (Distinguished Name)** : Identifiant unique et global d'une entree dans le DIT. Construit en concatenant les RDN depuis l'entree jusqu'a la racine. Exemple : `cn=Jean Dupont,ou=People,dc=example,dc=com`.

- **Entree (Entry)** : Noeud du DIT contenant un ensemble d'attributs. Chaque entree est identifiee par son DN et typee par ses Object Classes.

- **GSSAPI (Generic Security Services API)** : Mecanisme SASL permettant l'authentification Kerberos dans LDAP. Le client presente un ticket Kerberos au lieu d'un mot de passe.

- **LDAPS (LDAP over SSL/TLS)** : LDAP chiffre via TLS des l'etablissement de la connexion, sur le port 636. Alternative a StartTLS.

- **LDIF (LDAP Data Interchange Format)** : Format texte standard (RFC 2849) pour representer les donnees LDAP et les operations de modification. Utilise pour l'import/export.

- **Matching Rule** : Regle definissant comment comparer deux valeurs d'attribut (egalite, sous-chaine, ordre). Exemple : `caseIgnoreMatch`.

- **MMR (Multi-Master Replication)** : Mode de replication ou plusieurs serveurs acceptent les ecritures simultanement et se synchronisent mutuellement.

- **Object Class** : Definition dans le schema qui determine le type d'une entree et ses attributs obligatoires (MUST) et optionnels (MAY). Types : structural, auxiliary, abstract.

- **OID (Object Identifier)** : Identifiant numerique unique et global pour les elements du schema LDAP (attributs, object classes, syntaxes). Exemple : `2.5.4.3` pour `cn`.

- **Overlay (OpenLDAP)** : Module plugin d'OpenLDAP qui intercepte les operations pour ajouter des fonctionnalites (ppolicy, syncprov, memberof, accesslog, refint, unique).

- **ppolicy (Password Policy)** : Overlay OpenLDAP implementant les politiques de mots de passe : longueur, complexite, historique, expiration, verrouillage apres echecs.

- **Provider (Master)** : Serveur LDAP qui accepte les ecritures et fournit les donnees aux Consumers via la replication.

- **RDN (Relative Distinguished Name)** : Composant le plus a gauche du DN, identifiant une entree par rapport a son parent direct. Exemple : `cn=Jean Dupont`.

- **Referral (Renvoi)** : Reponse du serveur indiquant que les donnees demandees se trouvent sur un autre serveur LDAP. Le client doit suivre le referral.

- **Root DSE (Directory Server Agent - Specific Entry)** : Entree speciale a la racine (DN vide) contenant les informations sur les capacites du serveur : naming contexts, controles supportes, versions, etc.

- **SASL (Simple Authentication and Security Layer)** : Framework d'authentification (RFC 4422) supportant plusieurs mecanismes : GSSAPI (Kerberos), EXTERNAL (certificats), DIGEST-MD5, PLAIN.

- **Schema LDAP** : Ensemble des definitions de types d'attributs, object classes, matching rules et syntaxes qui regissent la structure des donnees de l'annuaire.

- **Scope (Portee de recherche)** : Etendue d'une operation Search : `base` (entree exacte), `one` (enfants directs), `sub` (sous-arbre complet).

- **slapd** : Daemon (service) du serveur OpenLDAP. Ecoute les connexions LDAP et traite les operations.

- **StartTLS** : Operation etendue LDAPv3 (OID 1.3.6.1.4.1.1466.20037) qui upgrade une connexion LDAP en clair vers une connexion chiffree TLS, sur le port 389.

- **Subschema Subentry** : Entree speciale de l'annuaire contenant la definition complete du schema (types d'attributs, object classes, matching rules, syntaxes).

- **Syncrepl (Synchronization Replication)** : Mecanisme de replication d'OpenLDAP. Le Consumer interroge le Provider pour obtenir les modifications depuis le dernier CSN connu.

---

**Documentation LDAP - Guide Complet pour Debutants**
Version 1.0 | Mars 2025

Cette documentation fournit une comprehension approfondie du protocole LDAP,
de sa structure d'annuaire, ses operations, et ses mecanismes de securite.

References : RFC 4510-4519 (LDAPv3) | RFC 4515 (Filtres) | RFC 2849 (LDIF) | RFC 4513 (Methodes d'authentification)
