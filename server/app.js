const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar tus rutas o servicios
const { getCollection, addDocument } = require('./src/config/firestoreService');

// Ruta de ejemplo
app.get('/api/collection/:name', async (req, res) => {
  const collectionName = req.params.name;
  try {
    const data = await getCollection(collectionName);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exportar la aplicación
module.exports = app;
