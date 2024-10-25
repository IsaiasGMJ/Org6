// controllers/dailyRoutineController.js
const DailyRoutine = require('../models/dailyRoutineModel');

// Agregar una nueva actividad
exports.addActivity = async (req, res) => {
    const { activity, time } = req.body;

    try {
        const routine = new DailyRoutine({
            user: req.user.id,
            activity,
            time
        });

        const savedRoutine = await routine.save();
        res.status(201).json(savedRoutine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener la rutina diaria del usuario
exports.getActivities = async (req, res) => {
    try {
        const activities = await DailyRoutine.find({ user: req.user.id });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una actividad de la rutina
exports.deleteActivity = async (req, res) => {
    try {
        const activity = await DailyRoutine.findById(req.params.id);

        if (!activity) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        if (activity.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        await activity.remove();
        res.json({ message: 'Actividad eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
