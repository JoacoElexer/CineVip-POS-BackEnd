require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectMongo = require('./src/config/mongo');
const routes = require('./src/routes');

const app = express();

connectMongo();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api', routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  console.error(`[ERROR] ${status} - ${message}`);
  if (process.env.NODE_ENV !== 'production') console.error(err.stack);
  res.status(status).json({ error: message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
