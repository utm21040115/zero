const mongoose = require('../conexion_mongo');

const Student = mongoose.model('Student', {
    nombre: {
        type: String,
        required: true,
    },
    FechaIngreso: {
        type: Number,
        required: true,
        min: 0,
    },
    calificacion: {
        type: Number,
        required: true,
        min: 0,
    },
    colonia: {
        type: String,
        required: true,
    },
    tutor: {
        type: String,
        required: true,
    },
    numerotelefonico: {
        type: Number,
        required: true,
        min: 0,
    },
});

module.exports = Student;
