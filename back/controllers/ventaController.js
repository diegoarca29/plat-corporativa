var Producto = require('../models/Producto');
var Variedad = require('../models/Variedad');
const Venta = require('../models/Venta');
const Pago = require('../models/Pago');
const Venta_detalle = require('../models/Venta_detalle');
var moment = require('moment');

const obtener_variedades_admin = async function(req,res){
    if(req.user){
 
        let variedades = await Variedad.find().populate('producto').sort({titulo:1});

        res.status(200).send({data:variedades});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const generar_venta_admin = async function(req,res){
    if(req.user){
        let today = new Date();
        let data = req.body;

        let venta = {
            cliente: data.cliente,
            asesor: req.user.sub,
            origen: data.origen,
            canal: data.canal,
            estado: data.estado,
            monto: data.monto,
            dia : today.getDate(),
            mes : today.getMonth()+1,
            year : today.getFullYear(),
        }

        let reg_venta = await Venta.create(venta);

        for(var item of data.detalles){
            let detalle = {
                cliente: reg_venta.cliente,
                asesor: reg_venta.asesor,
                venta: reg_venta._id,
                producto: item.producto,
                precio: item.precio,
                cantidad: item.cantidad,
                variedad: item.variedad,
                dia : today.getDate(),
                mes : today.getMonth()+1,
                year : today.getFullYear(),
                estado: data.estado,
            }

            let reg_detalle = await Venta_detalle.create(detalle);

            let pago = {
                cliente: reg_venta.cliente,
                asesor: reg_venta.asesor,
                venta: reg_venta._id,
                venta_detalle: reg_detalle._id,
                tipo: 'Venta',
                monto: item.precio*item.cantidad,
                origen: 'Interno',
                banco: data.banco,
                metodo: data.metodo,
                estado : 'Aprobado',
                fecha: moment(new Date).format('YYYY-MM-DD')
            }

            let pagos = await Pago.find().sort({createdAt:-1});

            if(pagos.length == 0){
                pago.correlativo = 1;
                await Pago.create(pago);
            }else{
                //
                let last_correlativo = pagos[0].correlativo;
                pago.correlativo = last_correlativo + 1;
                await Pago.create(pago);
            }

            disminuir_stock_admin(reg_detalle.variedad,reg_detalle.cantidad);
            
        }

        res.status(200).send({data:venta});
        
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const obtener_ventas_hoy =async function(req,res){
    if(req.user){
        let today = new Date();
        let dia = today.getDate();
        let mes = today.getMonth()+1;
        let year = today.getFullYear();

        let ventas = await Venta.find({
            dia:dia,
            mes:mes,
            year:year
        }).populate('cliente').populate('asesor').sort({createdAt:1});

        res.status(200).send({data:ventas});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const obtener_ventas_fechas =async function(req,res){
    if(req.user){

        let inicio = req.params['inicio'];
        let hasta = req.params['hasta'];
        let asesor = req.params['asesor'];

        let ventas = [];

        if(asesor == 'Todos'){
            ventas = await Venta.find({
                createdAt: {
                    $gte: new Date(inicio+'T00:00:00'),
                    $lt: new Date(hasta+'T23:59:59')
                }
            }).populate('cliente').populate('asesor').sort({createdAt:1});
        }else{
            ventas = await Venta.find({
                createdAt: {
                    $gte: new Date(inicio+'T00:00:00'),
                    $lt: new Date(hasta+'T23:59:59')
                },
                asesor: asesor
            }).populate('cliente').populate('asesor').sort({createdAt:1});
        }

        res.status(200).send({data:ventas});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const disminuir_stock_admin = async function(id,cantidad){
    //VARIEDAD
    let variedad = await Variedad.findById({_id:id});
    let nuevo_stock_actual = variedad.stock - parseInt(cantidad);
    await Variedad.findByIdAndUpdate({_id:id},{
        stock: nuevo_stock_actual
    });

    //PRODUCTO
    let producto = await Producto.findById({_id:id});
    let nuevo_stock_general = producto.stock - parseInt(cantidad);
    await Producto.findByIdAndUpdate({_id:id},{
        stock: nuevo_stock_general
    });
}


module.exports = {
    obtener_variedades_admin,
    generar_venta_admin,
    obtener_ventas_hoy,
    obtener_ventas_fechas
}