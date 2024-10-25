const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount:{
    type:Number,
    required:[true, 'Por favor ingresa un monto']
    },
    type:{
        type:String,
        enum: ['income', 'expense'],
        required: [true, 'Por favor selecciona el tipo de transaccion']
    },
    category:{
        type:String,
        required:[true,'Por favor selecciona una categoria']
    },
    description:{
        type:String,
        default: ''
    },
    date:{
        type:Date,
        default: Date.now
    }
});

const Finance = mongoose.model('Finance', financeSchema);
module.exports = Finance;