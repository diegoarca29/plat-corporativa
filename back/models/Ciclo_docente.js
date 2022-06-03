var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ciclo_docenteSchema = Schema({
    ciclo_curso: {type: Schema.ObjectId, ref: 'ciclo_curso', required: false},
    ciclo_salon: {type: Schema.ObjectId, ref: 'ciclo_salon', required: false},
    colaborador: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('ciclo_docente',Ciclo_docenteSchema)