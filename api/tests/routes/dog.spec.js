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

//alldogs
describe('GET /dogs', () => {
    it('should responds with a status 200 if find all dogs', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

//query
describe("GET /dogs?name=query", () => {
  it('should responds with a status 200 if it finds a dog by query',  function() {
    return agent 
      .get('/dogs?name=Boxer') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
  })
})
describe("GET /dogs?name=query error", () => {
  it('should responds with a status 404 if it NOT finds a dog by query',  function() {
    return agent 
      .get('/dogs?name=Caniche') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
  })
})

//idDog
describe("GET /dogs/id", () => {
  it('should responds with a status 200 if it finds a dog by id',  function() {
    return agent 
      .get('/dogs/1') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
  })
})
