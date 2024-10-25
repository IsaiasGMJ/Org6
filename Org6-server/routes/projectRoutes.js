// routes/projectRoutes.js
const express = require('express');
const { addProject, getProjects, completeProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Rutas protegidas para los proyectos
router.post('/', protect, addProject); // Agregar nuevo proyecto
router.get('/', protect, getProjects); // Obtener todos los proyectos del usuario
router.put('/:id/complete', protect, completeProject); // Completar un proyecto

module.exports = router;
