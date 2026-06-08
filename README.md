# devops-api-pipeline

![CI](https://github.com/ZolamJr/devops-api-pipeline/actions/workflows/ci-cd.yml/badge.svg)

API REST Node.js avec pipeline CI/CD complet automatisé.
À chaque push : lint → tests → build Docker.

## Stack
- Node.js + Express
- Docker
- GitHub Actions (CI/CD)
- Déploiement : Render

## Pipeline
1. **Lint** — ESLint vérifie la qualité du code
2. **Tests** — Jest vérifie que tout fonctionne
3. **Build** — Docker empaquette l'application

## Lancer en local
