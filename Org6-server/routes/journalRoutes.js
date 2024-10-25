// routes/journalRoutes.js
const express = require('express');
const { addEntry, getEntries, deleteEntry } = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Rutas protegidas para el journaling
router.post('/', protect, addEntry); // Agregar nueva entrada de journaling
router.get('/', protect, getEntries); // Obtener entradas del usuario
router.delete('/:id', protect, deleteEntry); // Eliminar una entrada

module.exports = router;
