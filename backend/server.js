const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const foodtransRoutes = require('./routes/foodtrans');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://127.0.0.1:5173,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origen no permitido por CORS'));
    },
  }),
);

app.get('/', (req, res) => {
  res.json({
    name: 'FoodTrans NQR API',
    version: '1.0.0',
    status: 'ok',
    docs: '/api',
  });
});

app.use('/api', foodtransRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
    path: req.originalUrl,
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
  });
});

module.exports = app;
