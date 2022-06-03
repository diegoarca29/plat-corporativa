var express = require('express');
var emailController = require('../controllers/emailController');
var auth = require('../middlewares/authenticate');
var app = express.Router();

app.get('/obtener_listas_contactos',auth.auth,emailController.obtener_listas_contactos);

app.post('/regitrar_lista_contacto',auth.auth,emailController.regitrar_lista_contacto);
app.post('/importar_contactos',auth.auth,emailController.importar_contactos);
app.get('/obtener_contactos_lista/:id',auth.auth,emailController.obtener_contactos_lista);

app.delete('/eliminar_lista_contacto/:id',auth.auth,emailController.eliminar_lista_contacto);
app.get('/obtener_campaigns',auth.auth,emailController.obtener_campaigns);
app.post('/crear_campaign',auth.auth,emailController.crear_campaign);
app.post('/send_email_campaign',auth.auth,emailController.send_email_campaign);

module.exports = app;
