const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const app = express();

require('dotenv').config()
require('./config/db');

const userRoute = require('./user/route');
const authRoute = require('./auth/route');

app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('ok')
})

app.use('/users', userRoute);
app.use('/auth', authRoute);

const PORT = process.env.PORT || 3000;

if (!module.parent) {
  app.listen(PORT);
  console.log(`Running on port ${PORT}`);
}

module.exports = app;
