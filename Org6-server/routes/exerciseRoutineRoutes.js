// routes/exerciseRoutineRoutes.js
const express = require('express');
const { addExercise, getExercises, deleteExercise } = require('../controllers/exerciseRoutineController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Rutas protegidas para la rutina de ejercicio
router.post('/', protect, addExercise); // Agregar nueva rutina de ejercicio
router.get('/', protect, getExercises); // Obtener rutinas de ejercicio del usuario
router.delete('/:id', protect, deleteExercise); // Eliminar una rutina de ejercicio

module.exports = router;
