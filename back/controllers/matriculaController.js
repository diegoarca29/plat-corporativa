var Matricula = require('../models/Matricula');
var Pago = require('../models/Pago');
var Matricula_detalle = require('../models/Matricula_detalle');
var Ciclo_salon = require('../models/Ciclo_salon');
var moment = require('moment');
var Comentario_matricula = require('../models/Comentario_matricula');

var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');

const generar_matricula_admin = async function(req,res){
    if(req.user){
        let today = new Date();
        let data = req.body;
        data.asesor = req.user.sub;
        data.dia = today.getDate();
        data.mes = today.getMonth()+1;
        data.year = today.getFullYear();
        data.estado = 'Procesando';

        let matricula = await Matricula.create(data);

        for(var item of data.detalles){
            item.asesor = req.user.sub;
            item.cliente = data.cliente;
            item.matricula = matricula._id;
            item.dia = today.getDate();
            item.mes = today.getMonth()+1;
            item.year = today.getFullYear();

            await Matricula_detalle.create(item);
            disminuir_aforo_admin(item.ciclo_salon);
        }

        generar_actividad_matricula(matricula._id,'Se hizo la matricula del cliente');
        enviar_orden_matricula(matricula._id);
        res.status(200).send({data:matricula});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const obtener_matriculas_hoy =async function(req,res){
    if(req.user){
        let today = new Date();
        let dia = today.getDate();
        let mes = today.getMonth()+1;
        let year = today.getFullYear();

        let matriculas = await Matricula.find({
            dia:dia,
            mes:mes,
            year:year
        }).populate('cliente').populate('asesor').sort({createdAt:1});

        res.status(200).send({data:matriculas});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const obtener_matriculas_fechas =async function(req,res){
    if(req.user){

        let inicio = req.params['inicio'];
        let hasta = req.params['hasta'];
        let asesor = req.params['asesor'];

        let matriculas = [];

        if(asesor == 'Todos'){
            matriculas = await Matricula.find({
                createdAt: {
                    $gte: new Date(inicio+'T00:00:00'),
                    $lt: new Date(hasta+'T23:59:59')
                }
            }).populate('cliente').populate('asesor').sort({createdAt:1});
        }else{
            matriculas = await Matricula.find({
                createdAt: {
                    $gte: new Date(inicio+'T00:00:00'),
                    $lt: new Date(hasta+'T23:59:59')
                },
                asesor: asesor
            }).populate('cliente').populate('asesor').sort({createdAt:1});
        }

        res.status(200).send({data:matriculas});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const obtener_matricula_admin =async function(req,res){
    if(req.user){

        let id = req.params['id'];

        try {
            let matricula = await Matricula.findById({_id:id}).populate('cliente').populate('asesor');
            let detalles = await Matricula_detalle.find({matricula:id}).populate('ciclo_curso').populate('ciclo_salon').populate('curso');

            res.status(200).send({data:matricula,detalles:detalles});
        } catch (error) {
            res.status(200).send({data:undefined});
        }
        
        
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const firmar_matricula_admin =async function(req,res){
    if(req.user){

        let id = req.params['id'];
        let data = req.body;

        await Matricula.findByIdAndUpdate({_id:id},{
            firma: data.firma,
            date_firma: Date.now()
        })
        generar_actividad_matricula(id,'El cliente firmo el contrato de la matricula.');
        res.status(200).send({data:true});
        
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const cancelar_matricula_admin =async function(req,res){
    if(req.user){

        if(req.user.rol == 'Administrador'){
            let id = req.params['id'];

            let matricula = await Matricula.findByIdAndUpdate({_id:id},{
                estado: 'Cancelado'
            })

            let detalles = await Matricula_detalle.find({matricula:id});

            for(var item of detalles){
                cancelar_aforo_admin(item.ciclo_salon);
            }

            await Matricula_detalle.updateMany({matricula:id},{
                estado: 'Cancelado'
            });

            await Pago.updateMany({matricula:id},{
                estado: 'Cancelado'
            });
            generar_actividad_matricula(id,'El cliente cancelo la matricula');
            res.status(200).send({data:matricula});
        }else{
            res.status(200).send({data:undefined, message: 'No tienes permisos para esto.'});
        }
        
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const obtener_comentarios_matricula_admin =async function(req,res){
    if(req.user){

        let id = req.params['id'];
      
        let comentarios = await Comentario_matricula.find({matricula:id}).sort({createdAt:-1});
       
        res.status(200).send({data:comentarios});
        
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

const disminuir_aforo_admin = async function(id){
    let salon = await Ciclo_salon.findById({_id:id});
    let nuevo_aforo_actual = salon.aforo_actual + 1;
    await Ciclo_salon.findByIdAndUpdate({_id:id},{
        aforo_actual: nuevo_aforo_actual
    });
}

const cancelar_aforo_admin = async function(id){
    let salon = await Ciclo_salon.findById({_id:id});
    let nuevo_aforo_actual = salon.aforo_actual - 1;
    await Ciclo_salon.findByIdAndUpdate({_id:id},{
        aforo_actual: nuevo_aforo_actual
    });
}

const send_invoice = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        enviar_orden_matricula(id);
        generar_actividad_matricula(id,'El reenvió la orden al cliente');
        res.status(200).send({data:true});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
  
}

const enviar_orden_matricula = async function(id){
    var readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
    
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'diegoarca02@gmail.com',
            pass: 'ogfvvlxksebtrkfj'
        }
    }));
    
    //OBTENER MATRICULA
    let matricula = await Matricula.findById({_id:id}).populate('cliente').populate('asesor');
    let detalles = await Matricula_detalle.find({matricula:id}).populate('ciclo_curso').populate('ciclo_salon').populate('curso');
    let createdAt = moment(matricula.createdAt).format('DD/MM/YYYY');
  
    readHTMLFile(process.cwd() + '/mails/invoice-matricula.html', (err, html)=>{
                            
        let rest_html = ejs.render(html, {matricula: matricula,detalles:detalles,createdAt:createdAt});
    
        var template = handlebars.compile(rest_html);
        var htmlToSend = template({op:true});
    
        var mailOptions = {
            from: 'diegoarca02@gmail.com',
            to: matricula.cliente.email,
            subject: 'Orden de matricula',
            html: htmlToSend
        };
      
        transporter.sendMail(mailOptions, function(error, info){
            if (!error) {
                console.log('Email sent: ' + info.response);
            }
        });
    
    });
}

const generar_actividad_matricula = async function(matricula,activadad){
    await Comentario_matricula.create({
        matricula:matricula,
        activadad: activadad
    })
}

module.exports={
    generar_matricula_admin,
    obtener_matriculas_hoy,
    obtener_matriculas_fechas,
    obtener_matricula_admin,
    firmar_matricula_admin,
    cancelar_matricula_admin,
    send_invoice,
    obtener_comentarios_matricula_admin
}