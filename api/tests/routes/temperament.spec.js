const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Temperament, conn } = require('../../src/db.js');

const agent = session(app);
const temperament = {
    name: "Agressive"
}
  
describe('Temperaments routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Temperament.sync({ force: true })
    .then(() => Temperament.create(temperament)));

describe('GET /temperaments', () => {
  it('should get 200', () =>
    agent.get('/temperaments').expect(200)
    );
  });
});