var Colaborador = require('../models/Colaborador');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_colaborador_admin = async function(req,res){
    if(req.user){
        let data = req.body;
        try {

            var colaboradores = await Colaborador.find({email:data.email});

            bcrypt.hash('123456789',null,null, async function(err,hash){
                if(err){
                    res.status(200).send({data:undefined,message:'No se pudo generar la contraseña.'});
                }else{
                    if(colaboradores.length >= 1){
                        res.status(200).send({data:undefined,message:'El correo electrónico ya existe.'});
                    }else{
                        data.fullnames = data.nombres + ' ' + data.apellidos;
                        data.password = hash;
                        let colaborador = await Colaborador.create(data);
                        res.status(200).send({data:colaborador});
                    }
                }
            });
            
        } catch (error) {
            res.status(200).send({data:undefined,message:'Verifique los campos del formulario.'});
        }
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const login_admin = async function(req,res){

    let data = req.body;
    
    var colaboradores = await Colaborador.find({email:data.email});

    if(colaboradores.length >= 1){
        //si hay cuenta
        if(colaboradores[0].estado){
            bcrypt.compare(data.password,colaboradores[0].password, async function(err,check){
                if(check){
                    res.status(200).send({
                        data: colaboradores[0],
                        token: jwt.createToken(colaboradores[0])
                    });
                }else{
                    res.status(200).send({data:undefined,message:'La contraseña es incorrecta.'});
                }
            });
        }else{
            res.status(200).send({data:undefined,message:'Ya no tienes acceso al panel.'});
        }
    }else{
        res.status(200).send({data:undefined,message:'El correo electrónico no existe.'});
    }

}

const listar_colaboradores_admin = async function(req,res){
    if(req.user){
        let colaboradores = await Colaborador.find();
        res.status(200).send({data:colaboradores});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const listar_asesores_admin = async function(req,res){
    if(req.user){
        let colaboradores = await Colaborador.find({rol:'Asesor',estado: true}).select('_id fullnames nombres apellidos');
        res.status(200).send({data:colaboradores});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const listar_docentes_admin = async function(req,res){
    if(req.user){
        let colaboradores = await Colaborador.find({rol:'Docente',estado: true}).select('_id fullnames nombres apellidos email');
        res.status(200).send({data:colaboradores});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const cambiar_estado_colaborador_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let data = req.body;

        let nuevo_estado;

        if(data.estado){
            nuevo_estado = false;
        }else if(!data.estado){
            nuevo_estado = true;
        }

        let colaborador = await Colaborador.findByIdAndUpdate({_id:id},{
            estado: nuevo_estado
        });

        res.status(200).send({data:colaborador});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const obtener_datos_colaborador_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
 
        try {
            let colaborador = await Colaborador.findById({_id:id});
            res.status(200).send({data:colaborador});
        } catch (error) {
            res.status(200).send({data:undefined});
        }

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const editar_colaborador_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let data = req.body;
        
        let colaborador = await Colaborador.findByIdAndUpdate({_id:id},{
            nombres: data.nombres,
            apellidos: data.apellidos,
            fullnames: data.nombres + '' +data.apellidos,
            genero: data.genero,
            email: data.email,
            telefono: data.telefono,
            n_doc: data.n_doc,
            pais: data.pais,
            rol: data.rol,
        });

        res.status(200).send({data:colaborador});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}


module.exports = {
    registro_colaborador_admin,
    login_admin,
    listar_colaboradores_admin,
    cambiar_estado_colaborador_admin,
    obtener_datos_colaborador_admin,
    editar_colaborador_admin,
    listar_asesores_admin,
    listar_docentes_admin
}