// models/dietModel.js
const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    meal: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del platillo']
    },
    calories: {
        type: Number,
        required: [true, 'Por favor ingresa la cantidad de calorías']
    },
    description: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Diet = mongoose.model('Diet', dietSchema);
module.exports = Diet;
