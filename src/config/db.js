const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cats', { useNewUrlParser: true });
const mongo = mongoose.connection;

const db = {};

db.connect = function() {
  mongo.on('error', console.error.bind(console, 'connection error'));
  mongo.once('open', () => console.log('connected'));
}

module.exports = db;
