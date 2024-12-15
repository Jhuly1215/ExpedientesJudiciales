const express = require('express');
const router = express.Router();
const {
  getAudiencesByRecordId,
  createAudience,
  deleteAudience,
} = require('./audience.controller');

// Rutas para audiencias
router.get('/:recordId', getAudiencesByRecordId); // Obtener todas las audiencias de un expediente
router.post('/:recordId', createAudience); // Crear una nueva audiencia
router.delete('/:recordId/:audienceId', deleteAudience); // Eliminar una audiencia

module.exports = router;
