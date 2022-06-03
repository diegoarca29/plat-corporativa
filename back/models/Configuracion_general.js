var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Configuracion_generalSchema = Schema({
    logo: {type: String, required: true},
    razon_social: {type: String, required: true},
    slogan: {type: String, required: true},
    background: {type: String, required: true},
    canales: {type: String, required: true},
    categorias: {type: String, required: true},

    updatedAt : {type: Date, required : true}, 
});

module.exports = mongoose.model('configuracion_general',Configuracion_generalSchema); 