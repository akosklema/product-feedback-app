const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const initDb = require('./services/db');
const createRoutes = require('./routes');
const globalErrorHandler = require('./middlewares/globalErrorHandler');

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 80;

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

createRoutes(app);

app.use(globalErrorHandler);

initDb(process.env.DB, () => {
  app.listen(PORT, () => {
    console.log(`Hello: ${PORT}`)
  });
});