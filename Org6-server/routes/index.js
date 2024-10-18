var express = require('express');
var router = express.Router();
var dotenv = require('dotenv');
var connectDB = require('./config/db');
var authRoutes = require('./routes/authRoutes');

dotenv.config();
//conectar a la base de datos
connectDB();

const app = express();
app.use(express.json());

//rutas
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
  console.log(`Servidor escuchando en el puerto ${PORT}`);
})

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
