const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { db } = require('./src/config/firebaseConfig');

const app = express();
app.use(cors());
app.use(express.json());


const multer = require("multer");
const upload = multer(); // Configuración de multer para datos sin archivos
app.use(express.urlencoded({ extended: true })); // Maneja datos en x-www-form-urlencoded

// Importar rutas
const userRoutes = require('./src/api/user/user.routes');
const authRoutes = require('./src/api/auth/auth.routes');
const recordRoutes = require('./src/api/record/record.routes');

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/record', recordRoutes); 



// Prueba de conexión con Firestore
db ? console.log("Firestore conectado correctamente") : console.error("Error al conectar con Firestore");
app.use(upload.none());
module.exports = app;
