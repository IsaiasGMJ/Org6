// models/exerciseRoutineModel.js
const mongoose = require('mongoose');

const exerciseRoutineSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exercise: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del ejercicio']
    },
    sets: {
        type: Number,
        required: [true, 'Por favor ingresa la cantidad de sets']
    },
    reps: {
        type: Number,
        required: [true, 'Por favor ingresa la cantidad de repeticiones']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const ExerciseRoutine = mongoose.model('ExerciseRoutine', exerciseRoutineSchema);
module.exports = ExerciseRoutine;
