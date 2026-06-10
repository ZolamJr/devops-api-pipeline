// server.js — Point d'entrée : démarre le serveur HTTP
// La logique de l'app est dans app.js (pour faciliter les tests)

const app = require('./app');

// process.env.PORT : Render le définit automatiquement en prod
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
