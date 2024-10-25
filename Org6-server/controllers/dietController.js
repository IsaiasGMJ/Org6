// controllers/dietController.js
const Diet = require('../models/dietModel');

// Agregar un nuevo registro de comida
exports.addMeal = async (req, res) => {
    const { meal, calories, description } = req.body;

    try {
        const diet = new Diet({
            user: req.user.id,
            meal,
            calories,
            description
        });

        const savedDiet = await diet.save();
        res.status(201).json(savedDiet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener el registro de comidas del usuario
exports.getMeals = async (req, res) => {
    try {
        const meals = await Diet.find({ user: req.user.id });
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un registro de comida
exports.deleteMeal = async (req, res) => {
    try {
        const meal = await Diet.findById(req.params.id);

        if (!meal) {
            return res.status(404).json({ message: 'Comida no encontrada' });
        }

        if (meal.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        await meal.remove();
        res.json({ message: 'Comida eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
