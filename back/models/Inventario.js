var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventarioSchema = Schema({
    producto: {type: Schema.ObjectId,ref:'producto', required: true},
    variedad: {type: Schema.ObjectId,ref:'variedad', required: true},
    costo_unidad: {type: Number, required: true},
    cantidad: {type: Number, required: true},
    proveedor: {type: String, required: false},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('inventario',InventarioSchema);