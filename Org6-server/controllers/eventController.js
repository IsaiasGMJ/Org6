// controllers/eventController.js
const Event = require('../models/eventModel');

// Agregar un nuevo evento
exports.addEvent = async (req, res) => {
    const { title, date, description } = req.body;

    try {
        const event = new Event({
            user: req.user.id,
            title,
            date,
            description
        });

        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener los eventos del usuario
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ user: req.user.id });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un evento
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        await event.remove();
        res.json({ message: 'Evento eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
