var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente_llamdaSchema = Schema({
    fecha: {type: String, required: true},
    hora: {type: String, required: true},
    resultado: {type: String, required: true},
    nota: {type: String, required: false},
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('cliente_llamada',Cliente_llamdaSchema)