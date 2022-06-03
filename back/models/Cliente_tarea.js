var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente_tareaSchema = Schema({
    tarea: {type: String, required: true},
    prioridad: {type: String, required: true},
    fecha: {type: String, required: true},
    hora: {type: String, required: true},
    nota: {type: String, required: false},
    tipo: {type: String, required: true},
    estado: {type: Boolean, default: false, required: true},
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    marca_asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('cliente_tarea',Cliente_tareaSchema)