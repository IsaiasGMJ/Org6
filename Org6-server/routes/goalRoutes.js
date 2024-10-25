// routes/goalRoutes.js
const express = require('express');
const { addGoal, getGoals, completeGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Rutas protegidas para las metas
router.post('/', protect, addGoal); // Agregar nueva meta
router.get('/', protect, getGoals); // Obtener metas del usuario
router.put('/:id/complete', protect, completeGoal); // Completar una meta

module.exports = router;
