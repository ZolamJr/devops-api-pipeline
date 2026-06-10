// app.js — Définition de l'application Express
// Séparé de server.js pour pouvoir tester l'app avec Jest
// SANS démarrer un vrai serveur (plus besoin de --forceExit)

const express = require('express');
const app = express();

// Permet de lire le JSON dans les requêtes (POST, PUT)
app.use(express.json());

// Route de santé : le pipeline CI/CD l'utilise pour
// vérifier que l'app tourne bien après le déploiement
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Route principale
app.get('/', (req, res) => {
  res.json({ message: 'DevOps API Pipeline — ZolamJr' });
});

// On importera les routes ici plus tard
// app.use('/api/tasks', require('./routes/tasks'));

// Gestion des routes inexistantes (404)
// Placé en DERNIER : ne s'exécute que si aucune route n'a répondu
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion centralisée des erreurs (500)
// Les 4 paramètres sont obligatoires pour qu'Express
// reconnaisse ce middleware comme gestionnaire d'erreurs
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

module.exports = app;
