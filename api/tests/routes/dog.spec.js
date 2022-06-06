/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create({"name": "Caniche","heightMin": 20,"heightMax": 50,"weightMin": 20,"weightMax": 32,})));

describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

describe("GET /dogs/id", function() {
  it('GET responds with a status 200 if it finds a dog for id',  function() {
    return agent 
      .get('/dogs/1') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
  })
})
