const app         = require('../../src/app');
const request     = require('supertest');
const User        = require('../../src/user');
const mongoose    = require('mongoose');
const bcrypt      = require('bcrypt');
const { expect }  = require('chai');
const { factory } = require('factory-girl');

module.exports = {
  app,
  request,
  User,
  mongoose,
  expect,
  factory,
  bcrypt,
}
