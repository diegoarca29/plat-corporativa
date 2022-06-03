var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ciclo_cursoSchema = Schema({
    meses: [{type: Object, required: true}],
    curso: {type: Schema.ObjectId, ref: 'curso', required: false},//ESTATICO
    nivel: {type: String, required: true},//FORMULARIO
    sede: {type: String, required: true},//FORMULARIO
    descripcion: {type: String, required: false},//FORMULARIO
    v_inicio: {type: String, required: true},
    f_inicio: {type: String, required: true},//FORMULARIO
    f_fin: {type: String, required: true},//FORMULARIO
    year: {type: Number, required: true},
    precio: {type: Number, required: true},//FORMULARIO
    colaborador: {type: Schema.ObjectId, ref: 'colaborador', required: false},//ESTATICO
    estado: {type: Boolean,default: false ,required: true},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('ciclo_curso',Ciclo_cursoSchema)