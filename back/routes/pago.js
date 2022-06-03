var express = require('express');
var pagoController = require('../controllers/pagoController');
var auth = require('../middlewares/authenticate');
var app = express.Router();

app.get('/obtener_matricula_pagos_admin/:id',auth.auth,pagoController.obtener_matricula_pagos_admin);
app.post('/crear_pago_admin',auth.auth,pagoController.crear_pago_admin);

module.exports = app;
