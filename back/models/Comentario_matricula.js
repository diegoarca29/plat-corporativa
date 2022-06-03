var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comentario_matriculaSchema = Schema({
    matricula: {type: Schema.ObjectId, ref: 'matricula', required: true},
    activadad: {type: String, required: true},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('comentario_matricula',Comentario_matriculaSchema)