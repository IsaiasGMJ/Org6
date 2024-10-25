// models/projectModel.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Por favor ingresa el título del proyecto']
    },
    description: {
        type: String,
        default: ''
    },
    dueDate: {
        type: Date,
        required: [true, 'Por favor ingresa una fecha de finalización']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
