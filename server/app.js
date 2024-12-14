const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { db } = require('./src/config/firebaseConfig');

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const userRoutes = require('./src/api/user/user.routes');
const authRoutes = require('./src/api/auth/auth.routes');


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes); 



// Prueba de conexión con Firestore
db ? console.log("Firestore conectado correctamente") : console.error("Error al conectar con Firestore");

module.exports = app;
