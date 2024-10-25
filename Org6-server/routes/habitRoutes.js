// routes/habitRoutes.js
const express = require('express');
const { addHabit, getHabits, completeHabit } = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Rutas protegidas para los hábitos
router.post('/', protect, addHabit); // Agregar nuevo hábito
router.get('/', protect, getHabits); // Obtener todos los hábitos del usuario
router.put('/:id/complete', protect, completeHabit); // Completar un hábito

module.exports = router;
