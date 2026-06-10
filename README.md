# devops-api-pipeline

![CI](https://github.com/ZolamJr/devops-api-pipeline/actions/workflows/ci-cd.yml/badge.svg)

API REST Node.js avec pipeline CI/CD complet automatisé.
À chaque push : lint → tests → audit sécurité → build Docker + smoke test.

## Stack
- Node.js 20 + Express
- Docker (build multi-étapes, utilisateur non-root, healthcheck)
- GitHub Actions (CI/CD)
- Déploiement : Render

## Pipeline
1. **Lint** — ESLint vérifie la qualité du code
2. **Tests** — Jest + Supertest, avec rapport de couverture
3. **Audit** — `npm audit` détecte les failles connues dans les dépendances
4. **Build** — Docker empaquette l'application puis un smoke test vérifie que `/health` répond

## Structure du projet

```
.
├── app/
│   ├── app.js          # Application Express (routes, middlewares)
│   └── server.js       # Point d'entrée : démarre le serveur
├── tests/
│   └── unit/
│       └── server.test.js
├── .github/workflows/ci-cd.yml
├── Dockerfile
└── package.json
```

> `app.js` et `server.js` sont séparés : les tests importent `app.js`
> sans démarrer de vrai serveur HTTP.

## Lancer en local

```bash
# Installer les dépendances
npm ci

# Démarrer l'API (http://localhost:3000)
npm start

# Lancer le lint
npm run lint

# Lancer les tests
npm test
```

## Lancer avec Docker

```bash
# Construire l'image
docker build -t devops-api-pipeline .

# Démarrer le conteneur
docker run -d -p 3000:3000 --name api devops-api-pipeline

# Vérifier la santé
curl http://localhost:3000/health
```

## Endpoints

| Méthode | Route     | Description                          |
|---------|-----------|--------------------------------------|
| GET     | `/`       | Message de bienvenue                 |
| GET     | `/health` | Statut, uptime et timestamp (JSON)   |

## Améliorations prévues
- [ ] Routes CRUD `/api/tasks`
- [ ] Tests d'intégration
- [ ] Push de l'image vers GitHub Container Registry (GHCR)
- [ ] Déploiement automatique sur Render après le build
