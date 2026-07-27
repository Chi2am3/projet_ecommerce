# Projet e-commerce — Café en grains

Mini site e-commerce (projet de fin de stage) permettant à terme à un visiteur de créer un compte, parcourir un catalogue de cafés, ajouter des articles à un panier et valider une commande.

## Stack technique prévue

- **Front** : Nuxt (Vue) + Vuetify
- **Back** : Node.js + Express
- **Base de données** : SQLite (via Sequelize ORM)

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

## Installation (base de données)

Depuis le dossier `server` :

```bash
npm install
npx sequelize-cli db:migrate
```

Ça va créer le fichier `database.sqlite` avec les 4 tables (`Users`, `Products`, `Orders`, `OrderItems`).

## Structure du projet

```
projet_ecommerce/
├── server/
│   ├── config/       → connexion Sequelize (config.json, database.js)
│   ├── migrations/   → migrations Sequelize
│   ├── models/       → modèles Sequelize (User, Product, Order, OrderItem)
│   └── seeders/
└── client/           → application Nuxt
```
