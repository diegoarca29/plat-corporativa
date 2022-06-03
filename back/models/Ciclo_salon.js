var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ciclo_salonSchema = Schema({
    f_dias: [{type: Object, required: true}],//FORMULARIO
    curso: {type: Schema.ObjectId, ref: 'curso', required: false},//ESTATICO
    ciclo_curso: {type: Schema.ObjectId, ref: 'ciclo_curso', required: false},//ESTATICO
    salon: {type: String, required: true},//FORMULARIO
    aforo_total: {type: Number, required: true},//FORMULARIO
    aforo_actual: {type: Number, default:0, required: true},
    h_inicio: {type: String, required: true},//FORMULARIO
    h_fin: {type: String, required: true},//FORMULARIO
    colaborador: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('ciclo_salon',Ciclo_salonSchema)