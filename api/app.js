var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var enrutadorStudents = require('./routes/students');

var app = express();

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar la solicitud GET a la ruta raíz '/'
app.get('/', (req, res) => {
    res.send('¡Hola desde el servidor API!');
});

// Ruta para manejar las solicitudes relacionadas con estudiantes
app.use('/students', enrutadorStudents);

module.exports = app;
