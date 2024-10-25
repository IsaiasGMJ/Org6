// controllers/habitController.js
const Habit = require('../models/habitModel');

// Agregar un nuevo hábito
exports.addHabit = async (req, res) => {
    const { habit, frequency } = req.body;

    try {
        const newHabit = new Habit({
            user: req.user.id,
            habit,
            frequency
        });

        const savedHabit = await newHabit.save();
        res.status(201).json(savedHabit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener los hábitos del usuario
exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user.id });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Completar un hábito
exports.completeHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Hábito no encontrado' });
        }

        if (habit.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        habit.completed = true;
        await habit.save();
        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
