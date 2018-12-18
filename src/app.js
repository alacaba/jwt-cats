const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const app = express();

require('dotenv').config()

const db = require('./config/db');

db.connect();

app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('ok')
})

const PORT = process.env.PORT || 3000;

if (!module.parent) {
  app.listen(PORT);
  console.log(`Running on port ${PORT}`);
}

module.exports = app;
