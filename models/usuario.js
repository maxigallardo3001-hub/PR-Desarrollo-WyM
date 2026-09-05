const mongoose = require('mongoose');
const usuarioSchema = mongoose.Schema({
    nombre: String,
    pass: String,
    fecha_nacimiento : String,
    RUN: String
});

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuarios'); 

