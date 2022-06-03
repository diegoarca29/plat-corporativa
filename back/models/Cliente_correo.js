var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente_correoSchema = Schema({
    asunto: {type: String, required: true},
    contenido: {type: String, required: true},
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('cliente_correo',Cliente_correoSchema)