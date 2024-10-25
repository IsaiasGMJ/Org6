// models/journalModel.js
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entry: {
        type: String,
        required: [true, 'Por favor ingresa tu entrada de journaling']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Journal = mongoose.model('Journal', journalSchema);
module.exports = Journal;
