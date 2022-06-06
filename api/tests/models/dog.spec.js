const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

describe('Validators', () => {
  beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      //name null error
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      //name success
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
      //weightMin null error
      it('should throw an error if weightMin is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid weightMin')))
          .catch(() => done());
      });
      //weightMin success
      it('should work when its a valid weightMin', () => {
        Dog.create({ weightMin: '20' });
      });
    });
  });
});  
