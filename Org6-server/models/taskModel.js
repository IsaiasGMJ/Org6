// models/taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Por favor ingresa un título para la tarea']
    },
    description: {
        type: String,
        default: ''
    },
    priority: {
        type: String,
        enum: ['short-term', 'medium-term', 'long-term'],
        required: [true, 'Por favor selecciona una prioridad']
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: [true, 'Por favor selecciona una fecha de vencimiento']
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
