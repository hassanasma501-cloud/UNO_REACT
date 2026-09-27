# UNO Online

## Présentation du projet

**UNO Online** est une version web du jeu UNO.

L’utilisateur peut notamment :

- saisir son pseudo ;
- choisir le nombre de joueurs ;
- créer une nouvelle partie ;
- naviguer entre les différentes pages de l’application ;
- consulter les règles du UNO ;
- jouer une carte lorsqu’elle respecte les règles ;
- piocher une carte ;
- suivre le joueur actif ;
- voir la carte posée au centre ;
- jouer contre des adversaires automatiques.

L’application a été développée avec une architecture React + TypeScript et utilise un état global partagé pour gérer la logique de jeu.

---

## Fonctionnalités

### Jeu

- Gestion des joueurs
- Gestion des mains
- Gestion de la pioche
- Carte active au centre
- Gestion du tour actuel
- Validation des cartes jouables
- Gestion du sens du jeu
- Gestion de cartes spéciales
- Gestion de la fin de partie
- Adversaires automatiques pour la démonstration

### Navigation

- Page d’accueil
- Page des règles
- Page des parties
- Page d’une partie spécifique
- Page 404
- Navigation programmatique avec React Router

### Formulaire

- Pseudo du joueur
- Nombre de joueurs
- Champs contrôlés
- Validation côté client
- Messages d’erreur par champ
- Soumission bloquée lorsque le formulaire est invalide

### API / données

- Chargement des règles via `fetch`
- Données mock dans `public/api`
- Gestion des états :
  - chargement
  - erreur
  - succès
- Hook générique `useFetch<T>`
- Nettoyage des effets avec `AbortController`

### Tests

Tests automatisés avec **Vitest** et **Testing Library**.

Résultat actuel :

```text
Test Files  4 passed (4)
Tests       9 passed (9)
```

---

## Technologies utilisées

- React
- TypeScript
- Vite
- React Router
- Context API
- useReducer
- Vitest
- Testing Library
- CSS
- Git / GitHub

---

## Architecture du projet

Structure simplifiée :

```text
UNO_REACT/
├── public/
│   └── api/
│       ├── rules.json
│       └── scores.json
│
├── src/
│   ├── __tests__/
│   │   ├── Button.test.tsx
│   │   ├── CreateGameForm.test.tsx
│   │   ├── Rules.test.tsx
│   │   ├── setup.ts
│   │   └── useFetch.test.tsx
│   │
│   ├── components/
│   │   ├── game/
│   │   ├── Button.tsx
│   │   ├── CardContainer.tsx
│   │   └── CreateGameForm.tsx
│   │
│   ├── context/
│   │   └── GameContext.tsx
│   │
│   ├── game/
│   │   └── gameReducer.ts
│   │
│   ├── hooks/
│   │   ├── useFetch.ts
│   │   ├── useTourJeu.ts
│   │   └── useValidationCarte.ts
│   │
│   ├── layouts/
│   │   └── Layout.tsx
│   │
│   ├── pages/
│   │   ├── Game.tsx
│   │   ├── Games.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   └── Rules.tsx
│   │
│   ├── types/
│   │   └── game.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

---

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/hassanasma501-cloud/UNO_REACT.git
```

### 2. Entrer dans le dossier

```bash
cd UNO_REACT
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Lancer l’application en développement

```bash
npm run dev
```

Vite affiche ensuite l’adresse locale, généralement :

```text
http://localhost:5173/
```

---

## Scripts disponibles

### Lancer l’application

```bash
npm run dev
```

### Créer le build de production

```bash
npm run build
```

Le build du projet passe actuellement sans erreur.

### Lancer les tests

```bash
npx vitest run
```

Résultat validé :

```text
4 fichiers de tests sur 4
9 tests sur 9
```

---

## Routage

Le routage est géré avec **React Router**.

L’application contient notamment :

- une route pour l’accueil ;
- une route pour les règles ;
- une route pour la liste des parties ;
- une route à paramètre pour une partie spécifique ;
- une page 404 ;
- un layout partagé.

Lors de la création d’une partie, un identifiant unique est généré et la navigation est effectuée de manière programmatique.

---

## Gestion de l’état global

L’état global de la partie repose sur :

- `GameContext`
- `useReducer`
- un reducer centralisé

L’état contient notamment :

- les joueurs ;
- les mains ;
- la pioche ;
- la carte du dessus ;
- le joueur actif ;
- le sens du jeu ;
- le statut de la partie.

Les actions sont envoyées au reducer pour produire un nouvel état.

L’immutabilité est respectée : l’état existant n’est pas modifié directement.

Deux hooks personnalisés permettent de séparer la logique métier de l’interface :

### `useTourJeu`

Gère notamment :

- le démarrage de la partie ;
- les tours ;
- la pioche ;
- le jeu d’une carte ;
- le passage au joueur suivant ;
- la réinitialisation de la partie.

### `useValidationCarte`

Centralise les règles permettant de déterminer si une carte peut être jouée.

---

## API et données asynchrones

Le projet utilise un hook générique :

```ts
useFetch<T>
```

Il permet de charger les données avec `fetch` tout en gérant les trois états :

- chargement ;
- erreur ;
- succès.

Le hook utilise également `AbortController` afin d’annuler une requête lorsqu’un composant est démonté ou lorsqu’une nouvelle requête remplace la précédente.

Les données mock sont stockées dans :

```text
public/api/rules.json
public/api/scores.json
```

La page des règles utilise ces données pour afficher dynamiquement les règles du jeu.

---

## Formulaire

Le composant `CreateGameForm` est un formulaire contrôlé.

Il permet de saisir :

- le nom du joueur ;
- le nombre de joueurs.

La validation est effectuée côté client.

Exemples de contrôles :

- nom obligatoire ;
- longueur minimale et maximale du pseudo ;
- nombre de joueurs compris entre 2 et 4.

Les messages d’erreur sont affichés au niveau des champs concernés.

---

## Tests

Les tests sont écrits avec :

- Vitest
- Testing Library
- jest-dom

Les fichiers de tests sont :

```text
src/__tests__/Button.test.tsx
src/__tests__/CreateGameForm.test.tsx
src/__tests__/Rules.test.tsx
src/__tests__/useFetch.test.tsx
```

Ils vérifient notamment :

- le comportement d’un bouton ;
- la validation conditionnelle du formulaire ;
- les états chargement / erreur / succès de la page des règles ;
- le comportement du hook `useFetch`.

Résultat :

```text
Test Files  4 passed (4)
Tests       9 passed (9)
```

---

## Répartition du travail

### Raïssa — Architecture et routage

- Mise en place de Vite, React et TypeScript
- Création des types et interfaces du jeu
- Mise en place du Layout
- Création des différentes pages
- Configuration de React Router et des routes
- Mise en place de la route à paramètre
- Mise en place de la page 404
- Création de composants réutilisables

### Asma — Logique du jeu et état global

- Mise en place du Context global
- Gestion de l’état avec `useReducer`
- Gestion des joueurs
- Gestion des mains
- Gestion de la pioche
- Gestion du tour actif
- Gestion du sens du jeu
- Gestion du statut de la partie
- Création du hook personnalisé `useTourJeu`
- Création du hook personnalisé `useValidationCarte`
- Validation des cartes jouables
- Gestion des règles du UNO
- Gestion des cartes spéciales
- Intégration du plateau de jeu
- Mise en place des adversaires automatiques
- Participation à l’intégration finale

### Aurélie — API, formulaire et tests

- Création du hook générique `useFetch<T>`
- Gestion du chargement, des erreurs et du succès
- Utilisation de `fetch`
- Gestion de l’annulation des requêtes avec `AbortController`
- Création des données API mock
- Création du formulaire contrôlé de création de partie
- Validation des champs
- Gestion des messages d’erreur
- Mise en place de Vitest
- Mise en place de Testing Library
- Création des tests automatisés

### Travail commun

- Intégration des différentes parties
- Résolution des conflits et problèmes de structure
- Vérification du build
- Vérification des tests
- Tests manuels de l’application
- Préparation de la soutenance
- Mise à jour du README

---

## Intégration du projet

Les différentes parties du projet ont été regroupées sur une branche d’intégration avant leur fusion dans `main`.

Une Pull Request finale a été créée puis mergée dans `main`.

Vérifications réalisées avant la fusion :

```text
npm run build
→ OK
```

```text
npx vitest run
→ 4 fichiers de tests validés
→ 9 tests sur 9 validés
```

L’application a également été testée manuellement dans le navigateur :

- création d’une partie ;
- validation du formulaire ;
- navigation ;
- affichage des règles ;
- plateau de jeu ;
- pioche ;
- jeu d’une carte ;
- tours automatiques.

---

## Déploiement

Le projet est actuellement disponible dans le dépôt GitHub :

```text
https://github.com/hassanasma501-cloud/UNO_REACT
```

**Application déployée :** https://uno-react-snowy.vercel.app

---

## Améliorations possibles

Plusieurs évolutions pourraient être ajoutées :

- véritable multijoueur en ligne ;
- système de salons ;
- synchronisation en temps réel ;
- sauvegarde des scores ;
- historique des parties ;
- animations des cartes ;
- amélioration de l’interface responsive ;
- gestion plus complète des effets des cartes spéciales ;
- déploiement public automatisé.

---

## Auteurs

Projet réalisé par :

- Raïssa
- Asma
- Aurélie

Dans le cadre du projet final **React.js & TypeScript — Bachelor 2**.