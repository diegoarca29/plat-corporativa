var express = require('express');
var colaboradorController = require('../controllers/colaboradorController');
var auth = require('../middlewares/authenticate');

var app = express.Router();

app.post('/registro_colaborador_admin',auth.auth,colaboradorController.registro_colaborador_admin);
app.post('/login_admin',colaboradorController.login_admin);
app.get('/listar_colaboradores_admin',auth.auth,colaboradorController.listar_colaboradores_admin);
app.get('/listar_asesores_admin',auth.auth,colaboradorController.listar_asesores_admin);
app.get('/listar_docentes_admin',auth.auth,colaboradorController.listar_docentes_admin);



app.put('/cambiar_estado_colaborador_admin/:id',auth.auth,colaboradorController.cambiar_estado_colaborador_admin);
app.get('/obtener_datos_colaborador_admin/:id',auth.auth,colaboradorController.obtener_datos_colaborador_admin);
app.put('/editar_colaborador_admin/:id',auth.auth,colaboradorController.editar_colaborador_admin);


module.exports = app;
