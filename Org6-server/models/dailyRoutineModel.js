// models/dailyRoutineModel.js
const mongoose = require('mongoose');

const dailyRoutineSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activity: {
        type: String,
        required: [true, 'Por favor ingresa la actividad']
    },
    time: {
        type: String,
        required: [true, 'Por favor ingresa la hora']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const DailyRoutine = mongoose.model('DailyRoutine', dailyRoutineSchema);
module.exports = DailyRoutine;
