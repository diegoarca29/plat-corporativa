var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente_interesSchema = Schema({
    fecha: {type: String, required: true},
    nota: {type: String, required: true},
    tipo: {type: String, required: true},
    nivel: {type: String, required: true},
    ciclo: {type: String, required: true},
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    curso: {type: Schema.ObjectId, ref: 'curso', required: false},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('cliente_interes',Cliente_interesSchema)