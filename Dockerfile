# On part d'une image officielle Node.js légère
# "alpine" = version minimaliste (~5MB au lieu de ~300MB)
FROM node:20-alpine

# Crée et définit le dossier de travail dans le conteneur
WORKDIR /app

# Copie d'abord package.json SEUL
# Astuce : Docker met en cache cette couche si le package.json
# ne change pas → npm install ne se relance pas à chaque build
COPY package*.json ./

# Installe uniquement les dépendances de production
RUN npm install --omit=dev

# Copie tout le reste du code
COPY . .

# Indique le port que l'app utilise (documentation)
EXPOSE 3000

# Commande lancée au démarrage du conteneur
CMD ["node", "app/server.js"]
