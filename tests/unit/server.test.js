// On importe supertest pour simuler des requêtes HTTP
// sans vraiment démarrer le serveur
const request = require('supertest');
const app = require('../../app/server');

// "describe" regroupe les tests d'une même fonctionnalité
describe('GET /health', () => {

  // "it" décrit ce que le test vérifie
  it('doit retourner status ok', async () => {
    const response = await request(app)
      .get('/health');     // on appelle la route

    // "expect" vérifie le résultat
    expect(response.status).toBe(200);        // code HTTP 200
    expect(response.body.status).toBe('ok');  // corps JSON correct
  });

});
