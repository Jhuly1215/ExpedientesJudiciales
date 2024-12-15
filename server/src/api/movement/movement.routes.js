const express = require('express');
const router = express.Router();
const { getMovements,deleteMovement, addMovement } = require('./movement.controller');


router.get('/:recordId', getMovements);
router.delete('/:id', deleteMovement);
router.post('/:recordId', addMovement);

module.exports = router;
