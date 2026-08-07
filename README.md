# Projet e-commerce — Café en grains

Mini site e-commerce (projet de fin de stage) permettant à un visiteur de créer un compte, parcourir un catalogue de cafés en grains, ajouter des articles à un panier et valider une commande enregistrée en base de données.

## Stack technique

- **Front** : Nuxt 4 (Vue 3) + Vuetify + Pinia
- **Back** : Node.js + Express
- **Base de données** : SQLite (via Sequelize ORM + Sequelize CLI pour les migrations)
- **Authentification** : JWT + bcrypt

## Fonctionnalités

- Inscription et connexion (mot de passe hashé avec bcrypt, session gérée via token JWT)
- Catalogue de produits avec grille de cartes cliquables
- Page détail produit (route dynamique)
- Panier persistant en session (store Pinia) : ajout, ajustement de quantité, suppression, calcul du total
- Validation de commande : enregistrement en base (`Order` + `OrderItem`), décrémentation automatique du stock
- Navigation dynamique selon l'état de connexion
- Thème visuel personnalisé (brun / or), mise en page responsive

## Schéma de la base de données

Le schéma a été conçu sur [dbdiagram.io](https://dbdiagram.io) avant l'écriture des modèles.

**Tables :**

- `User` : id, firstName, lastName, email, password
- `Product` : id, name, variety, roast, origin, description, price, weight, stock, image
- `Order` : id, userId, status
- `OrderItem` (table de jointure) : id, orderId, productId, quantity

**Relations :**

- Un `User` a plusieurs `Order` (`hasMany` / `belongsTo`)
- Une `Order` contient plusieurs `Product`, via `OrderItem` (`belongsToMany`)

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Chi2am3/projet_ecommerce.git
cd projet_ecommerce
```

### 2. Backend (`server/`)

```bash
cd server
npm install
```

Créer un fichier `.env` à la racine de `server/` avec :

```
JWT_SECRET=une_longue_chaine_secrete_a_toi_de_choisir
```

Lancer les migrations pour créer les tables :

```bash
npx sequelize-cli db:migrate
```

Insérer des données de test :

```bash
node seed.js
```

### 3. Frontend (`client/`)

```bash
cd ../client
npm install
```

## Lancement du projet

Le projet nécessite deux serveurs lancés en parallèle, dans deux terminaux séparés.

### Lancer l'API (port 3001)

```bash
cd server
node app.js
```

### Lancer le front (port 3000)

```bash
cd client
npm run dev
```

Le site est ensuite accessible sur http://localhost:3000

## Parcours utilisateur

1. Créer un compte (`/register`)
2. Se connecter (`/login`)
3. Parcourir le catalogue de cafés (`/`)
4. Consulter le détail d'un produit (`/product/:id`)
5. Ajouter des produits au panier
6. Consulter et ajuster le panier (`/cart`)
7. Valider la commande (`/order`) → la commande est enregistrée en base et le stock est mis à jour

## API — routes disponibles

| Méthode | Route               | Authentification  | Description                              |
| ------- | ------------------- | :---------------: | ---------------------------------------- |
| GET     | `/api/products`     |         —         | Liste tous les produits                  |
| GET     | `/api/products/:id` |         —         | Détail d'un produit                      |
| POST    | `/api/register`     |         —         | Inscription d'un utilisateur             |
| POST    | `/api/login`        |         —         | Connexion (renvoie un token JWT)         |
| POST    | `/api/orders`       | ✅ (Bearer token) | Crée une commande et décrémente le stock |

## Structure du projet

```
projet_ecommerce/
├── server/
│   ├── config/         → connexion Sequelize (config.json)
│   ├── middleware/      → middleware d'authentification (vérification JWT)
│   ├── migrations/      → migrations Sequelize
│   ├── models/          → modèles Sequelize (User, Product, Order, OrderItem)
│   ├── routes/           → routes Express (product, auth, orders)
│   ├── seed.js            → script d'insertion de données de test
│   └── app.js             → point d'entrée du serveur Express
└── client/
    └── app/
        ├── pages/          → pages Nuxt
        │   ├── index.vue    → catalogue / accueil
        │   ├── login.vue    → connexion
        │   ├── register.vue → inscription
        │   ├── cart.vue     → panier
        │   ├── order.vue    → validation de commande
        │   └── product/
        │       └── [id].vue → détail produit (route dynamique)
        ├── stores/          → stores Pinia (auth, cart)
        └── app.vue          → layout principal (navigation, thème)
```

## Sécurité

- Les mots de passe ne sont jamais stockés ni renvoyés en clair (hashage bcrypt)
- Les routes sensibles (création de commande) sont protégées par un middleware qui vérifie la validité du token JWT
- CORS configuré pour autoriser la communication entre le front (port 3000) et l'API (port 3001)

## Pistes d'amélioration (bonus)

- Page « Mes commandes » avec historique des achats
- Rôle administrateur pour la gestion des produits
- Validation de formulaire plus poussée (règles Vuetify)
- Upload d'images produit
- Pagination et filtres du catalogue (par origine, torréfaction...)
