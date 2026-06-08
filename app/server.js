// server.js — Point d'entrée de l'application
// Express est le framework qui gère les requêtes HTTP

const express = require('express');
const app = express();

// Permet de lire le JSON dans les requêtes (POST, PUT)
app.use(express.json());

// Route de santé : le pipeline CI/CD l'utilise pour
// vérifier que l'app tourne bien après le déploiement
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Route principale
app.get('/', (req, res) => {
  res.json({ message: 'DevOps API Pipeline — ZolamJr' });
});

// On importe les routes (créées plus tard)
// app.use('/api/tasks', require('./routes/tasks'));

// Démarre le serveur sur le port défini
// process.env.PORT : Render le définit automatiquement en prod
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur démarré sur le port " + PORT);
});

// On exporte app pour pouvoir le tester avec Jest
module.exports = app;
