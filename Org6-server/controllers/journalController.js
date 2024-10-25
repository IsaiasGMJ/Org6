// controllers/journalController.js
const Journal = require('../models/journalModel');

// Agregar una nueva entrada de journaling
exports.addEntry = async (req, res) => {
    const { entry } = req.body;

    try {
        const journalEntry = new Journal({
            user: req.user.id,
            entry
        });

        const savedEntry = await journalEntry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener las entradas de journaling del usuario
exports.getEntries = async (req, res) => {
    try {
        const entries = await Journal.find({ user: req.user.id });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una entrada de journaling
exports.deleteEntry = async (req, res) => {
    try {
        const entry = await Journal.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Entrada no encontrada' });
        }

        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        await entry.remove();
       
        res.json({ message: 'Entrada eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
