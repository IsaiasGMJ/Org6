// config/db.js
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Detiene la aplicación si hay un error
    }
};
module.exports = connectDB;
//Actualmente no se manda a llamar este archivo la conexion se maneja desde index.js
