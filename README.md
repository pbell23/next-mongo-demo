# Projet de démonstration Backend-Frontend avec Docker

Ce projet de démonstration présente une application web simple composée d'un backend développé en Node.js avec une API CRUD pour gérer des éléments, et d'un frontend développé en Next.js pour interagir avec cette API.

## Architecture

L'architecture du projet comprend plusieurs composants :

- **Backend** : Un serveur Node.js qui expose une API pour effectuer des opérations CRUD (Create, Read, Update, Delete) sur des éléments. Le backend est connecté à une base de données MongoDB.

- **Frontend** : Une application web Next.js qui communique avec le backend pour afficher une liste d'éléments, ajouter de nouveaux éléments, modifier et supprimer des éléments existants.

- **Base de données** : MongoDB est utilisé comme système de gestion de base de données pour stocker les éléments.

- **Docker** : Les composants backend et frontend sont conteneurisés à l'aide de Docker pour faciliter le déploiement et la gestion des environnements de développement et de production.

- **Traefik** : Un proxy inversé utilisé pour le routage des requêtes vers les services backend et frontend en fonction des noms de domaine.

## Instructions pour lancer le projet

1. Assurez-vous que Docker est installé sur votre machine.

2. Clonez ce dépôt sur votre machine locale.

3. Dans le dossier `frontend`, créez un fichier `.env.local` à partir du `.env.sample` et modifier les variables
   d'environnement si nécessaire :

   ```bash
   cp frontend/.env.sample frontend/.env.local
   ```

   Faites de même dans le dossier `backend`.

4. A la racine du projet, exécutez la commande suivante pour construire les images docker :

   ```
   docker compose build
   ```

5. Exécutez la commande suivante pour lancer les services :

   ```
   docker compose up
   ```

6. Accédez à l'URL suivante dans votre navigateur pour accéder à l'interface utilisateur :
   ```
   http://frontend.localhost
   ```

Si vous n'arrivez pas à accéder aux services, éditez le fichier `/etc/hosts` de votre machine et ajoutez les lignes suivantes :

```
127.0.0.1 frontend.localhost
127.0.0.1 backend.localhost
```

## Structure du projet

- **backend/** : Contient le code source du backend Node.js, y compris les fichiers de serveur, les middlewares, les routes et les configurations.

- **frontend/** : Contient le code source du frontend Next.js, y compris les composants React, les pages et les fichiers de configuration.

- **docker-compose.yml** : Fichier de configuration Docker Compose pour définir les services et les réseaux du projet.

## Contribuer

Les contributions à ce projet sont les bienvenues. Pour toute suggestion ou problème, veuillez ouvrir une issue ou soumettre une pull request.
