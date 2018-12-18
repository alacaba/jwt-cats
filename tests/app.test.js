const request = require('supertest');
const expect = require('chai').expect;

const app = require('../src/app');

describe('App', () => {
  it ('checks if the app is running', done => {
    request(app)
      .get('/')
      .expect(200)
      .end(() => done())
  })
})
