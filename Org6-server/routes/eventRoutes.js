// routes/eventRoutes.js
const express = require('express');
const { addEvent, getEvents, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Rutas protegidas para la agenda
router.post('/', protect, addEvent); // Agregar nuevo evento
router.get('/', protect, getEvents); // Obtener eventos del usuario
router.delete('/:id', protect, deleteEvent); // Eliminar un evento

module.exports = router;
