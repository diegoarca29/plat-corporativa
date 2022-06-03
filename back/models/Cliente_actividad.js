var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente_actividadSchema = Schema({
    tipo: {type: String, required: true},
    actividad: {type: String, required: true},
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: false},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: false},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('cliente_actividad',Cliente_actividadSchema)