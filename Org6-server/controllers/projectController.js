// controllers/projectController.js
const Project = require('../models/projectModel');

// Agregar un nuevo proyecto
exports.addProject = async (req, res) => {
    const { title, description, dueDate } = req.body;

    try {
        const project = new Project({
            user: req.user.id,
            title,
            description,
            dueDate
        });

        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener los proyectos del usuario
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Completar un proyecto
exports.completeProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        project.completed = true;
        await project.save();
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
