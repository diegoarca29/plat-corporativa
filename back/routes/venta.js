var express = require('express');
var ventaController = require('../controllers/ventaController');
var auth = require('../middlewares/authenticate');
var app = express.Router();


app.get('/obtener_variedades_admin',auth.auth,ventaController.obtener_variedades_admin);
app.post('/generar_venta_admin',auth.auth,ventaController.generar_venta_admin);
app.get('/obtener_ventas_hoy',auth.auth,ventaController.obtener_ventas_hoy);
app.get('/obtener_ventas_fechas/:inicio/:hasta/:asesor',auth.auth,ventaController.obtener_ventas_fechas);

module.exports = app;
