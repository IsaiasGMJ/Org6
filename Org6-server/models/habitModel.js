// models/habitModel.js
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    habit: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del hábito']
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        required: [true, 'Por favor selecciona la frecuencia']
    },
    completed: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;
