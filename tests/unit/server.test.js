// On importe supertest pour simuler des requêtes HTTP
// sans vraiment démarrer le serveur
const request = require('supertest');

// On importe app.js (pas server.js) : ainsi aucun serveur
// réel ne démarre et Jest se termine proprement
const app = require('../../app/app');

describe('GET /health', () => {
  it('doit retourner status ok', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });
});

describe('GET /', () => {
  it('doit retourner le message de bienvenue', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.message).toContain('DevOps API Pipeline');
  });
});

describe('Route inexistante', () => {
  it('doit retourner une erreur 404 en JSON', async () => {
    const response = await request(app).get('/nexistepas');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Route non trouvée');
  });
});
