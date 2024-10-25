// routes/financeRoutes.js
const express = require('express');
const { addFinance, getFinances, deleteFinance } = require('../controllers/financeController');
const { protect } = require('../middleware/authMiddleware'); // Middleware de autenticación
const router = express.Router();

// Rutas protegidas para las finanzas
router.post('/', protect, addFinance); // Agregar nueva transacción
router.get('/', protect, getFinances); // Obtener todas las transacciones del usuario
router.delete('/:id', protect, deleteFinance); // Eliminar una transacción

module.exports = router;
