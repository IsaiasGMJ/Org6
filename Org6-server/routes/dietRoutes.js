// routes/dietRoutes.js
const express = require('express');
const { addMeal, getMeals, deleteMeal } = require('../controllers/dietController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Rutas protegidas para la dieta
router.post('/', protect, addMeal); // Agregar nueva comida
router.get('/', protect, getMeals); // Obtener todas las comidas del usuario
router.delete('/:id', protect, deleteMeal); // Eliminar un registro de comida

module.exports = router;
