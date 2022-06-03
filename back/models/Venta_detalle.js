var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Venta_detalleSchema = Schema({
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: true},
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: true},
    venta: {type: Schema.ObjectId, ref: 'venta', required: true},
    producto: {type: Schema.ObjectId, ref: 'producto', required: true},//
    variedad: {type: Schema.ObjectId, ref: 'variedad', required: true},//
    precio: {type: Number, required: true},//
    cantidad: {type: Number, required: true},//
    dia: {type: String, required: true},
    mes: {type: String, required: true},
    year: {type: String, required: true},
    estado: {type: String, required: true},

    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('venta_detalle',Venta_detalleSchema)