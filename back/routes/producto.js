var express = require('express');
var productoController = require('../controllers/productoController'); 
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/productos'});

var app = express.Router();

app.post('/crear_producto_admin',[auth.auth,path],productoController.crear_producto_admin);
app.get('/listar_productos_admin',auth.auth,productoController.listar_productos_admin);
app.get('/get_image_productos/:img',productoController.get_image_productos);

app.get('/obtener_datos_producto_admin/:id',auth.auth,productoController.obtener_datos_producto_admin);
app.put('/actualizar_producto_admin/:id',[auth.auth,path],productoController.actualizar_producto_admin);
app.post('/agregar_variedad_producto_admin',auth.auth,productoController.agregar_variedad_producto_admin);
app.get('/obtener_variedades_producto_admin/:id',auth.auth,productoController.obtener_variedades_producto_admin);

app.delete('/eliminar_variedad_producto_admin/:id',auth.auth,productoController.eliminar_variedad_producto_admin);
app.get('/listar_productos_titulo_admin',auth.auth,productoController.listar_productos_titulo_admin);
app.post('/registrar_inventario_admin',auth.auth,productoController.registrar_inventario_admin);
app.get('/listar_inventario_admin',auth.auth,productoController.listar_inventario_admin);

app.put('/cambiar_estado_producto_admin/:id',auth.auth,productoController.cambiar_estado_producto_admin);

app.get('/obtener_inventario_admin',auth.auth,productoController.obtener_inventario_admin);
app.get('/obtener_inventario_entrada_admin/:year/:month',auth.auth,productoController.obtener_inventario_entrada_admin);
app.get('/obtener_inventario_salida_admin/:year/:month',auth.auth,productoController.obtener_inventario_salida_admin);

module.exports = app;
