// controllers/taskController.js
const Task = require('../models/taskModel');

// Crear una nueva tarea
exports.addTask = async (req, res) => {
    const { title, description, priority, dueDate } = req.body;

    try {
        const task = new Task({
            user: req.user.id,
            title,
            description,
            priority,
            dueDate
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las tareas del usuario
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Marcar tarea como completada
exports.completeTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        task.completed = true;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
