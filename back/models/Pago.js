var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PagoSchema = Schema({
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: true},
    asesor: {type: Schema.ObjectId, ref: 'colaborador', required: true},

    matricula: {type: Schema.ObjectId, ref: 'matricula', required: false},
    matricula_detalle: {type: Schema.ObjectId, ref: 'matricula_detalle', required: false},

    venta: {type: Schema.ObjectId, ref: 'venta', required: false},
    venta_detalle: {type: Schema.ObjectId, ref: 'venta_detalle', required: false},

    tipo: {type: String, required: true},
    
    monto: {type: Number, required: true},
    origen: {type: String, required: true},
    metodo: {type: String, required: true},
    banco: {type: String, required: false},

    transaccion: {type: String, required: false},
    estado: {type: String, required: true},
    correlativo: {type: Number,required: true},

    fecha: {type: String ,required: true},

    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('pago',PagoSchema);