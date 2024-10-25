// models/eventModel.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Por favor ingresa el título del evento']
    },
    date: {
        type: Date,
        required: [true, 'Por favor ingresa la fecha del evento']
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
