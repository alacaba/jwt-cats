const express = require('express');
const app = express();

require('dotenv').config()

const db = require('./config/db');

db.connect();

app.get('/', (req, res) => {
  res.send('ok')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
});

