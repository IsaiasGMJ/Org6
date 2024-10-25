// controllers/exerciseRoutineController.js
const ExerciseRoutine = require('../models/exerciseRoutineModel');

// Agregar una nueva rutina de ejercicio
exports.addExercise = async (req, res) => {
    const { exercise, sets, reps } = req.body;

    try {
        const routine = new ExerciseRoutine({
            user: req.user.id,
            exercise,
            sets,
            reps
        });

        const savedRoutine = await routine.save();
        res.status(201).json(savedRoutine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener las rutinas de ejercicio del usuario
exports.getExercises = async (req, res) => {
    try {
        const exercises = await ExerciseRoutine.find({ user: req.user.id });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una rutina de ejercicio
exports.deleteExercise = async (req, res) => {
    try {
        const exercise = await ExerciseRoutine.findById(req.params.id);

        if (!exercise) {
            return res.status(404).json({ message: 'Ejercicio no encontrado' });
        }

        if (exercise.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        await exercise.remove();
        res.json({ message: 'Ejercicio eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
