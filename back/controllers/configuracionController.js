var Configuracion_general = require('../models/Configuracion_general');
var Configuracion_finanza = require('../models/Configuracion_finanza');
var fs = require('fs');
var path = require('path');

const obtener_configuracion_general = async function(req,res){
    if(req.user){
        let config = await Configuracion_general.findById({_id:'6244644b5123b49163649921'});
        res.status(200).send({data:config})
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const actualizar_configuracion_general_admin = async function(req,res){
    if(req.user){
        let id = '6244644b5123b49163649921';
        let data = req.body;
   
        try {
          
            if(req.files){
                //SI HAY IMAGEN
                var img_path = req.files.logo.path;
                var str_path = img_path.split('\\');
                var name = str_path[2];
                
                data.logo = name;
                let reg = await Configuracion_general.findByIdAndUpdate({_id:id},{
                    logo: data.logo,
                    razon_social: data.razon_social,
                    slogan: data.slogan,
                    background: data.background,
                    categoria: data.categoria,
                    canales: data.canales,
                    updatedAt: Date.now(),
                });
                console.log(2);
                res.status(200).send({data:reg});
            }else{
                let reg = await Configuracion_general.findByIdAndUpdate({_id:id},{
                    razon_social: data.razon_social,
                    slogan: data.slogan,
                    background: data.background,
                    categoria: data.categoria,
                    canales: data.canales,
                    updatedAt: Date.now(),
                });
                console.log(2);
                res.status(200).send({data:reg});
            }

        } catch (error) {
            console.log(error);
            res.status(200).send({data:undefined,message:'Ocurrio un problema al regitrar el curso.'});
        }


    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const get_image_config = async function(req,res){
    var img = req.params['img'];

    fs.stat('./uploads/config/'+img, function(err){
        if(!err){
            let path_img = './uploads/config/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}

const actualizar_configuracion_finanzas_admin = async function(req,res){
    if(req.user){
        let id = '6245b451986144af49f99c81';
        let data = req.body;
   
        try {
          
            let reg = await Configuracion_finanza.findByIdAndUpdate({_id:id},{
                ganancia_producto: data.ganancia_producto,
                updatedAt: Date.now(),
            });
            console.log(2);
            res.status(200).send({data:reg});

        } catch (error) {
            console.log(error);
            res.status(200).send({data:undefined,message:'Ocurrio un problema al regitrar el curso.'});
        }


    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const obtener_configuracion_finanza = async function(req,res){
    if(req.user){
        let config = await Configuracion_finanza.findById({_id:'6245b451986144af49f99c81'});
        res.status(200).send({data:config})
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

module.exports = {
    obtener_configuracion_general,
    actualizar_configuracion_general_admin,
    get_image_config,
    actualizar_configuracion_finanzas_admin,
    obtener_configuracion_finanza
}