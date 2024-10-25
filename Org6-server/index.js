var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var bcrypt = require('bcryptjs');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, {
})
  .then(() => console.log('MongoDB conectado!!!'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Rutas
var authRouter = require('./routes/authRoutes');
var usersRouter = require('./routes/users');

var app = express();

const PORT = process.env.PORT || 5000; // Usa el puerto de .env o el 5000 por defecto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var financeRoutes = require('./routes/financeRoutes');
var taskRoutes = require('./routes/taskRoutes');
var dietRouter = require('./routes/dietRoutes');
var habitRouter = require('./routes/habitRoutes');
var projectRouter = require('./routes/projectRoutes');
var dailyRoutineRouter = require('./routes/dailyRoutineRoutes');
var eventRouter = require('./routes/eventRoutes');
var journalRouter = require('./routes/journalRoutes');
var exerciseRoutineRouter = require('./routes/exerciseRoutineRoutes');
var goalRouter = require('./routes/goalRoutes');

// Rutas
app.use('/api/auth', authRouter); // Ruta para autenticación
app.use('/api/finances', financeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/diets', dietRouter);
app.use('/api/habits', habitRouter);
app.use('/api/projects', projectRouter);
app.use('/api/daily-routines', dailyRoutineRouter);
app.use('/api/events', eventRouter);
app.use('/api/journals', journalRouter);
app.use('/api/exercise-routines', exerciseRoutineRouter);
app.use('/api/goals', goalRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
