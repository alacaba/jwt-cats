const app         = require('../../src/app');
const request     = require('supertest');
const mongoose    = require('mongoose');
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');
const { expect }  = require('chai');
const { factory } = require('factory-girl');

// models
const User        = require('../../src/user');
const Blacklist = require('../../src/blacklist');

module.exports = {
  app,
  request,
  mongoose,
  expect,
  factory,
  bcrypt,
  jwt,
  Blacklist,
  User,
}
