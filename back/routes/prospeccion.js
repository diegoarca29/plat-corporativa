var express = require('express');
var prospeccionController = require('../controllers/prospeccionController');
var auth = require('../middlewares/authenticate');
var app = express.Router();

app.post('/crear_llamada_prospeccion_admin',auth.auth,prospeccionController.crear_llamada_prospeccion_admin);
app.get('/listar_llamadas_prospeccion_admin/:id',auth.auth,prospeccionController.listar_llamadas_prospeccion_admin);

app.post('/crear_correo_prospeccion_admin',auth.auth,prospeccionController.crear_correo_prospeccion_admin);
app.get('/listar_correos_prospeccion_admin/:id',auth.auth,prospeccionController.listar_correos_prospeccion_admin);

app.post('/crear_tarea_prospeccion_admin',auth.auth,prospeccionController.crear_tarea_prospeccion_admin);
app.get('/listar_tarea_prospeccion_admin/:id',auth.auth,prospeccionController.listar_tarea_prospeccion_admin);
app.put('/marcar_tarea_prospeccion_admin/:id',auth.auth,prospeccionController.marcar_tarea_prospeccion_admin);

app.get('/listar_actividades_prospeccion_admin/:id',auth.auth,prospeccionController.listar_actividades_prospeccion_admin);
module.exports = app;
