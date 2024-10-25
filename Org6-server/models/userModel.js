const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'por favor ingresa un nombre de usuario'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'por favor ingresa un correo'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'Por favor ingresa una contraseña']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// Método para encriptar la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Método para verificar la contraseña
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;