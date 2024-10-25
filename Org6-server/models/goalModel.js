// models/goalModel.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Por favor ingresa el título de la meta']
    },
    description: {
        type: String,
        default: ''
    },
    targetDate: {
        type: Date,
        required: [true, 'Por favor ingresa una fecha objetivo']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
