// routes/taskRoutes.js
const express = require('express');
const { addTask, getTasks, completeTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Rutas protegidas para las tareas
router.post('/', protect, addTask); // Agregar nueva tarea
router.get('/', protect, getTasks); // Obtener todas las tareas del usuario
router.put('/:id/complete', protect, completeTask); // Marcar tarea como completada

module.exports = router;
