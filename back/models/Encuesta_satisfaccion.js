var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Encuesta_satisfaccionSchema = Schema({
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    matricula: {type: Schema.ObjectId, ref: 'matricula', required: false},
    answer_one: {type: String, required: true},
    answer_two: {type: String, required: true},
    answer_three: {type: String, required: true},
    answer_four: {type: String, required: true},
    answer_five: {type: String, required: true},
    answer_six: {type: String, required: true},
    createdAt : {type: Date, default: Date.now, required : false}, 
});

module.exports = mongoose.model('encuesta_satisfaccion',Encuesta_satisfaccionSchema)