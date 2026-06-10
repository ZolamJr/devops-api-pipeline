# ── Étape 1 : installation des dépendances ──────────────
# Build multi-étapes : l'image finale ne contient que le strict nécessaire
FROM node:20-alpine AS deps

WORKDIR /app

# Copie d'abord package.json + package-lock.json SEULS
# Astuce : Docker met en cache cette couche si ces fichiers
# ne changent pas → npm ci ne se relance pas à chaque build
COPY package*.json ./

# npm ci = installation reproductible basée sur le lockfile
# --omit=dev = uniquement les dépendances de production
RUN npm ci --omit=dev

# ── Étape 2 : image finale ───────────────────────────────
FROM node:20-alpine

# Métadonnées de l'image
LABEL org.opencontainers.image.source="https://github.com/ZolamJr/devops-api-pipeline"

WORKDIR /app

# Variables d'environnement de production
ENV NODE_ENV=production \
    PORT=3000

# Récupère les node_modules de l'étape précédente
COPY --from=deps /app/node_modules ./node_modules

# Copie le code de l'application (filtré par .dockerignore)
COPY package*.json ./
COPY app ./app

# Sécurité : on n'exécute PAS l'app en root
# node:alpine fournit déjà un utilisateur "node" non privilégié
USER node

# Indique le port que l'app utilise (documentation)
EXPOSE 3000

# Healthcheck : Docker vérifie régulièrement que l'app répond
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Commande lancée au démarrage du conteneur
CMD ["node", "app/server.js"]
