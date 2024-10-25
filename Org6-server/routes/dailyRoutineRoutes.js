// routes/dailyRoutineRoutes.js
const express = require('express');
const { addActivity, getActivities, deleteActivity } = require('../controllers/dailyRoutineController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Rutas protegidas para la rutina diaria
router.post('/', protect, addActivity); // Agregar nueva actividad
router.get('/', protect, getActivities); // Obtener actividades del usuario
router.delete('/:id', protect, deleteActivity); // Eliminar una actividad

module.exports = router;
