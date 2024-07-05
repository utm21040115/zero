var express = require('express');
var router = express.Router();
var Student = require("../modelos/modeloStudent.js");

// Crear un estudiante
router.post('/', async function (req, res, next) {
  try {
    const student = new Student({
      nombre: req.body.nombre,
      FechaIngreso: req.body.FechaIngreso,
      calificacion: req.body.calificacion,
      colonia: req.body.colonia,
      tutor: req.body.tutor,
      numerotelefonico: req.body.numerotelefonico,
    });
    await student.save();
    res.status(201).send(student); // 201 significa "Created"
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creando estudiante');
  }
});

// Obtener todos los estudiantes
router.get('/', async function (req, res) {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error obteniendo estudiantes');
  }
});

// Obtener un estudiante por ID
router.get('/:id', async function (req, res) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send('Estudiante no encontrado');
    }
    res.send(student);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error obteniendo estudiante');
  }
});

// Actualizar un estudiante
router.put('/', async function (req, res) {
  try {
    await Student.findOneAndUpdate({ _id: req.body._id }, {
      nombre: req.body.nombre,
      FechaIngreso: req.body.FechaIngreso,
      calificacion: req.body.calificacion,
      colonia: req.body.colonia,
      tutor: req.body.tutor,
      numerotelefonico: req.body.numerotelefonico,
    });
    res.send(true);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error actualizando estudiante');
  }
});

// Eliminar un estudiante por ID
router.delete('/:id', async function (req, res) {
  try {
    await Student.findOneAndDelete({ _id: req.params.id });
    res.send(true);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error eliminando estudiante');
  }
});

module.exports = router;
