var express = require('express');
var configuracionController = require('../controllers/configuracionController');
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/config'});
var app = express.Router();

app.get('/obtener_configuracion_general',auth.auth,configuracionController.obtener_configuracion_general);
app.put('/actualizar_configuracion_general_admin',[auth.auth,path],configuracionController.actualizar_configuracion_general_admin);
app.get('/get_image_config/:img',configuracionController.get_image_config);

app.put('/actualizar_configuracion_finanzas_admin',auth.auth,configuracionController.actualizar_configuracion_finanzas_admin);
app.get('/obtener_configuracion_finanza',auth.auth,configuracionController.obtener_configuracion_finanza);

module.exports = app;
