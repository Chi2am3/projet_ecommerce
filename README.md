# Projet e-commerce — Café en grains

Mini site e-commerce (projet de fin de stage) permettant à un visiteur de créer un compte, parcourir un catalogue de cafés, ajouter des articles à un panier et valider une commande.

## Stack technique

- **Front** : Nuxt 4 (Vue 3) + Vuetify + Pinia
- **Back** : Node.js + Express
- **Base de données** : SQLite (via Sequelize ORM)
- **Authentification** : JWT + bcrypt

## État d'avancement

- [x] Conception du schéma de base de données
- [x] Modèles Sequelize + migrations (User, Product, Order, OrderItem)
- [x] API Express de base (route produits)
- [x] Front Nuxt / Vuetify (pages, navigation)
- [x] Authentification (inscription, connexion, JWT, store Pinia)
- [x] Catalogue & détail produit
- [x] Panier (store Pinia : ajout, quantités, total)
- [ ] Commande (validation, enregistrement en base)
- [ ] Historique des commandes (bonus)

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

## Fonctionnalités actuelles

- **Catalogue** : liste des produits affichée sur la page d'accueil, avec cartes cliquables
- **Détail produit** : page dynamique (`/product/:id`) affichant les informations complètes d'un café
- **Authentification** : inscription (`/register`) et connexion (`/login`), avec mot de passe hashé (bcrypt) et token JWT
- **Panier** : ajout de produits, ajustement des quantités, suppression, calcul automatique du total (`/cart`)
- **Navigation** : barre de navigation dynamique selon l'état de connexion

## Structure du projet

```
projet_ecommerce/
├── server/
│   ├── config/        → connexion Sequelize (config.json)
│   ├── migrations/    → migrations Sequelize
│   ├── models/        → modèles Sequelize (User, Product, Order, OrderItem)
│   ├── routes/        → routes Express (product, auth)
│   ├── seed.js         → script d'insertion de données de test
│   └── app.js          → point d'entrée du serveur Express
└── client/
    └── app/
        ├── pages/       → pages Nuxt (accueil, connexion, inscription, panier, commande, détail produit)
        ├── stores/      → stores Pinia (auth, cart)
        └── app.vue      → layout principal (navigation, structure globale)
```

## API — routes disponibles

| Méthode | Route               | Description                      |
| ------- | ------------------- | -------------------------------- |
| GET     | `/api/products`     | Liste tous les produits          |
| GET     | `/api/products/:id` | Détail d'un produit              |
| POST    | `/api/register`     | Inscription d'un utilisateur     |
| POST    | `/api/login`        | Connexion (renvoie un token JWT) |
