var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Configuracion_finanzaSchema = Schema({
    ganancia_producto: {type: Number, required: true},
    updatedAt : {type: Date, required : true}, 
});

module.exports = mongoose.model('configuracion_finanza',Configuracion_finanzaSchema); 