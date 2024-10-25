// controllers/goalController.js
const Goal = require('../models/goalModel');

// Agregar una nueva meta
exports.addGoal = async (req, res) => {
    const { title, description, targetDate } = req.body;

    try {
        const goal = new Goal({
            user: req.user.id,
            title,
            description,
            targetDate
        });

        const savedGoal = await goal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener las metas del usuario
exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user.id });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Completar una meta
exports.completeGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Meta no encontrada' });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        goal.completed = true;
        await goal.save();
        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
