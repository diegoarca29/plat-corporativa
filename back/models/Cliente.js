var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true},
    fullnames: {type: String, required: true},
    telefono: {type: String, required: true},
    genero: {type: String, required: true},
    verify: {type: Boolean,default: false ,required: true},
    estado: {type: Boolean,default: true ,required: true},
    tipo: {type: String, default: 'Prospecto',required: true},
    password: {type: String, required: true},

    nacimiento: {type: String, required: false},
    n_doc: {type: String, required: false},
    pais: {type: String, required: false},
    ciudad: {type: String, required: false},
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('cliente',ClienteSchema);