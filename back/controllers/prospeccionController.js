var Cliente_llamada = require('../models/Cliente_llamada');
var Cliente_correo = require('../models/Cliente_correo');
var Cliente_tarea = require('../models/Cliente_tarea');
var Cliente = require('../models/Cliente');
var Cliente_actividad = require('../models/Cliente_actividad');

var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');

const crear_llamada_prospeccion_admin = async function(req,res){
    if(req.user){
        let data = req.body;
        let llamada = await Cliente_llamada.create(data);
        crear_actividad_prospeccion_admin(
            'Llamada',
            llamada.asesor,
            'Se registor una llamada con resultado '+llamada.resultado,
            llamada.cliente
        );
        res.status(200).send({data:llamada});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const listar_llamadas_prospeccion_admin = async function(req,res){
    if(req.user){
       let id = req.params['id'];
       let llamadas = await Cliente_llamada.find({cliente:id}).populate('asesor').sort({createdAt:-1});
       res.status(200).send({data:llamadas});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////

const crear_correo_prospeccion_admin = async function(req,res){
    if(req.user){
        let data = req.body;
        console.log();
        let cliente = await Cliente.findById({_id:data.cliente});
         enviar_correo_prospeccion(cliente.fullnames,data.asunto,cliente.email,data.contenido);
        let correo = await Cliente_correo.create(data);
        crear_actividad_prospeccion_admin(
            'Correo',
            correo.asesor,
            'Se envió un correo con el asunto '+correo.asunto,
            correo.cliente
        );
        res.status(200).send({data:correo});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const listar_correos_prospeccion_admin = async function(req,res){
    if(req.user){
       let id = req.params['id'];
       let correos = await Cliente_correo.find({cliente:id}).populate('asesor').sort({createdAt:-1});
       res.status(200).send({data:correos});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

/////////////////////////////////////////////////////////////////////////////////////////

const crear_tarea_prospeccion_admin = async function(req,res){
    if(req.user){
        let data = req.body;
        let tarea = await Cliente_tarea.create(data);
        crear_actividad_prospeccion_admin(
            'Tarea',
            tarea.asesor,
            'Se registro una tarea como '+tarea.tarea,
            tarea.cliente
        );
        res.status(200).send({data:tarea});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const listar_tarea_prospeccion_admin = async function(req,res){
    if(req.user){
       let id = req.params['id'];
       let tareas = await Cliente_tarea.find({cliente:id}).populate('asesor').populate('marca_asesor').sort({createdAt:-1});
       res.status(200).send({data:tareas});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const marcar_tarea_prospeccion_admin = async function(req,res){
    if(req.user){
       let id = req.params['id'];
       let tarea = await Cliente_tarea.findByIdAndUpdate({_id:id},{
           estado: true,
           marca_asesor: req.user.sub
       });
       res.status(200).send({data:tarea});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}
///////////////////////////////////////////////////////////////////////////////////////////

const crear_actividad_prospeccion_admin = async function(tipo,asesor,actividad,cliente){
    let data = {
        tipo: tipo,
        asesor: asesor,
        actividad: actividad,
        cliente: cliente,
    }
    await Cliente_actividad.create(data);
}

const listar_actividades_prospeccion_admin = async function(req,res){
    if(req.user){
       let id = req.params['id'];
       let actividades = await Cliente_actividad.find({cliente:id}).populate('asesor').sort({createdAt:-1});
       res.status(200).send({data:actividades});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

////////////////////////////////////////////////////////////////////////////////////////////

const enviar_correo_prospeccion = async function(cliente,asunto,email,contenido){
    try {
  
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

        
        
        readHTMLFile(process.cwd() + '/mails/mail_message.html', (err, html)=>{
                                
            let rest_html = ejs.render(html, {
                cliente:cliente,
                asunto:asunto,
                email:email,
                contenido: contenido,
            });
        
            var template = handlebars.compile(rest_html);
            var htmlToSend = template({op:true});
        
            var mailOptions = {
                from: 'diegoarca02@gmail.com',
                to: email,
                subject: asunto,
                html: htmlToSend
            };
        
          
            transporter.sendMail(mailOptions, function(error, info){
                if (!error) {
                    console.log('Email sent: ' + info.response);
                }else{
                    error
                }
            });
        
        });
    } catch (error) {
        console.log(error);
    }

}



module.exports = {
    crear_llamada_prospeccion_admin,
    listar_llamadas_prospeccion_admin,
    crear_correo_prospeccion_admin,
    listar_correos_prospeccion_admin,
    crear_tarea_prospeccion_admin,
    listar_tarea_prospeccion_admin,
    marcar_tarea_prospeccion_admin,
    listar_actividades_prospeccion_admin
}