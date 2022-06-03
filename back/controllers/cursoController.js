var Curso = require('../models/Curso');
var Ciclo_curso = require('../models/Ciclo_curso');
var Ciclo_salon = require('../models/Ciclo_salon');
var Ciclo_docente = require('../models/Ciclo_docente');
var fs = require('fs');
var path = require('path');

const registro_cursobase_admin = async function(req,res){
    if(req.user){

        let data = req.body;

        try {
            let cursos = await Curso.find({titulo:data.titulo});

            if(cursos.length >= 1){
                res.status(200).send({data:undefined,message:'Ya existe un curso con ese titulo.'});
            }else{
                //
                var img_path = req.files.banner.path;
                var str_path = img_path.split('\\');
                var name = str_path[2];
                
                data.slug = data.titulo.trim().toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
                data.banner = name;
                let reg = await Curso.create(data);
                res.status(200).send({data:reg});
            }

        } catch (error) {
            res.status(200).send({data:undefined,message:'Ocurrio un problema al regitrar el curso.'});
        }


    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const listar_cursos_admin = async function(req,res){
    if(req.user){
        let cursos = await Curso.find().sort({titulo:-1});
        res.status(200).send({data:cursos});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const get_image_curso = async function(req,res){
    var img = req.params['img'];

    fs.stat('./uploads/cursos/'+img, function(err){
        if(!err){
            let path_img = './uploads/cursos/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}

const obtener_datos_curso_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
 
        try {
            let curso = await Curso.findById({_id:id});
            res.status(200).send({data:curso});
        } catch (error) {
            res.status(200).send({data:undefined});
        }

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const obtener_datos_curso_ciclo_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let idciclo = req.params['idciclo'];
 
        try {
            let curso = await Curso.findById({_id:id});
            try {
                let ciclo = await Ciclo_curso.findById({_id:idciclo});
                let salones = await Ciclo_salon.find({ciclo_curso:idciclo});
                res.status(200).send({data:curso,ciclo:ciclo,salones:salones});
            } catch (error) {
                res.status(200).send({data:undefined});
            }
            
        } catch (error) {
            res.status(200).send({data:undefined});
        }

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const actualizar_cursobase_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        console.log(req.body);
        let data = req.body;

        try {
            let cursos = await Curso.find({titulo:data.titulo});

            if(cursos.length >= 1){
          
                if(cursos[0]._id == id){
                    if(req.files){
                        //SI HAY IMAGEN
                        var img_path = req.files.banner.path;
                        var str_path = img_path.split('\\');
                        var name = str_path[2];
                        
                        data.slug = data.titulo.trim().toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
                        data.banner = name;
                        let reg = await Curso.findByIdAndUpdate({_id:id},{
                            titulo: data.titulo,
                            slug: data.slug,
                            descripcion: data.descripcion,
                            banner: data.banner
                        });
                        res.status(200).send({data:reg});
                    }else{
                        data.slug = data.titulo.trim().toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
                        let reg = await Curso.findByIdAndUpdate({_id:id},{
                            titulo: data.titulo,
                            slug: data.slug,
                            descripcion: data.descripcion,
                        });
                        res.status(200).send({data:reg});
                    }
                }else{
                    res.status(200).send({data:undefined,message:'Ya existe un curso con ese titulo.'});
                }
                
            }else{
                //
                if(req.files){
                    //SI HAY IMAGEN
                    var img_path = req.files.banner.path;
                    var str_path = img_path.split('\\');
                    var name = str_path[2];
                    
                    data.slug = data.titulo.trim().toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
                    data.banner = name;
                    let reg = await Curso.findByIdAndUpdate({_id:id},{
                        titulo: data.titulo,
                        slug: data.slug,
                        descripcion: data.descripcion,
                        banner: data.banner
                    });
                    res.status(200).send({data:reg});
                }else{
                    data.slug = data.titulo.trim().toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
                    let reg = await Curso.findByIdAndUpdate({_id:id},{
                        titulo: data.titulo,
                        slug: data.slug,
                        descripcion: data.descripcion,
                    });
                    res.status(200).send({data:reg});
                }

            }

        } catch (error) {
           
            res.status(200).send({data:undefined,message:'Ocurrio un problema al regitrar el curso.'});
        }


    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const cambiar_estado_curso_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let data = req.body;

        let nuevo_estado;

        if(data.estado){
            nuevo_estado = false;
        }else if(!data.estado){
            nuevo_estado = true;
        }

        let curso = await Curso.findByIdAndUpdate({_id:id},{
            estado: nuevo_estado
        });

        res.status(200).send({data:curso});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const crear_ciclo_admin = async function(req,res){
    if(req.user){
        
        let data = req.body;
        let arr_meses = [];
        data.colaborador = req.user.sub;

        let format_inicio = new Date(data.f_inicio+'T00:00:00');
        let format_fin =new Date(data.f_fin+'T23:59:59');

        let mes_inicio = format_inicio.getMonth()+1;
        let mes_fin =format_fin.getMonth()+1;

        //CALCULAR PREVENTA V_INICIO

        let data_inicio = format_inicio;
        data_inicio.setDate(data_inicio.getDate()-14);
        let month_v;
        let day_v;

        if(data_inicio.getMonth()+1 <= 9){
            month_v = '0'+(data_inicio.getMonth()+1);
        }else{
            month_v = data_inicio.getMonth()+1;
        }
 
        if(data_inicio.getDate()<= 9){
            day_v = '0'+(data_inicio.getDate());
        }else{
            day_v = data_inicio.getDate();
        }

        data.v_inicio = data_inicio.getFullYear()+'-'+month_v+'-'+day_v;

        //OBTENER MESES ENTRE RANGO DE FECHA DE CLASES
        if(mes_inicio != mes_fin){
            if(mes_inicio >= mes_fin){
                for(let i = mes_inicio; i<= 12; i++){
                    arr_meses.push(i);
                }

                for(let i = 1; i<= mes_fin; i++){
                    arr_meses.push(i);
                }
            }else{
                for(let i = mes_inicio; i<= mes_fin; i++){
                    arr_meses.push(i);
                }
            }
        }else{
            arr_meses.push(mes_inicio);
        }

        data.meses = arr_meses;
        data.year = format_inicio.getFullYear();

        let ciclo = await Ciclo_curso.create(data);

        let salones = data.salones;

        for(var item of salones){
            await Ciclo_salon.create({
                f_dias : item.f_dias,
                curso: data.curso,
                ciclo_curso: ciclo._id,
                salon: item.salon,
                aforo_total: item.aforo_total,
                h_inicio: item.h_inicio,
                h_fin: item.h_fin,
                colaborador: data.colaborador
            });
        }
        
        res.status(200).send({data:ciclo});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const listar_ciclos_admin = async function(req,res){
    if(req.user){

        let id = req.params['id'];//CODIGO CURSO BASE
        let _date = new Date();
        let year = _date.getFullYear();
        let format_today = Date.parse(new Date())/1000;

        var ciclos = await Ciclo_curso.find({curso:id,year:year}).populate('curso');
        var arr = [];

        for(var item of ciclos){
            let format_inicio = Date.parse(new Date(item.v_inicio+'T00:00:00'))/1000;
            let format_fin = Date.parse(new Date(item.f_fin+'T00:00:00'))/1000;

            if(format_today >= format_inicio && format_today <= format_fin){
                let salones = await Ciclo_salon.find({ciclo_curso:item._id});
                arr.push({
                    ciclo:item,
                    salones: salones
                });
            }
        }

        res.status(200).send({data:arr});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const listar_ciclos_vencidos_admin = async function(req,res){
    if(req.user){

        let _date = new Date();
        let year = _date.getFullYear();
        let format_today = Date.parse(new Date())/1000;

        var ciclos = await Ciclo_curso.find({year:year}).populate('curso');
        var arr = [];

        for(var item of ciclos){
            let format_inicio = Date.parse(new Date(item.f_inicio+'T00:00:00'))/1000;
            let format_fin = Date.parse(new Date(item.f_fin+'T00:00:00'))/1000;

            if(format_today >= format_fin){
                let salones = await Ciclo_salon.find({ciclo_curso:item._id});
                arr.push({
                    ciclo:item,
                    salones: salones
                });
            }
        }

        res.status(200).send({data:arr});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const editar_ciclo_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let data = req.body;

        //CALCULAR PREVENTA V_INICIO
        let format_inicio = new Date(data.f_inicio+'T00:00:00');
        
        let data_inicio = format_inicio;
        data_inicio.setDate(data_inicio.getDate()-14);
        let month_v;
        let day_v;

        if(data_inicio.getMonth()+1 <= 9){
            month_v = '0'+(data_inicio.getMonth()+1);
        }else{
            month_v = data_inicio.getMonth()+1;
        }
 
        if(data_inicio.getDate()<= 9){
            day_v = '0'+(data_inicio.getDate());
        }else{
            day_v = data_inicio.getDate();
        }

        data.v_inicio = data_inicio.getFullYear()+'-'+month_v+'-'+day_v;
        
        let ciclo = await Ciclo_curso.findByIdAndUpdate({_id:id},{
            nivel:data.nivel,
            sede:data.sede,
            f_inicio: data.f_inicio,
            f_fin: data.f_fin,
            descripcion: data.descripcion,
            precio: data.precio,
            v_inicio: data.v_inicio,
        });

        res.status(200).send({data:ciclo});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const agregar_salon_ciclo_admin = async function(req,res){
    if(req.user){

        let data = req.body;

        let salon = await Ciclo_salon.create(data);
        res.status(200).send({data:salon});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const obtener_salones_ciclo_admin = async function(req,res){
    if(req.user){

        let id = req.params['id'];

        let salones = await Ciclo_salon.find({ciclo_curso:id});
        res.status(200).send({data:salones});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const eliminar_salon_ciclo_admin = async function(req,res){
    if(req.user){

        let id = req.params['id'];

        await Ciclo_salon.findByIdAndRemove({_id:id});
        res.status(200).send({data:true});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const cambiar_estado_ciclo_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let data = req.body;

        let nuevo_estado;

        if(data.estado){
            nuevo_estado = false;
        }else if(!data.estado){
            nuevo_estado = true;
        }

        let ciclo = await Ciclo_curso.findByIdAndUpdate({_id:id},{
            estado: nuevo_estado
        });

        res.status(200).send({data:ciclo});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const listar_docentes_salon_admin = async function(req,res){
    if(req.user){

        let id = req.params['id'];

        let docentes = await Ciclo_docente.find({ciclo_curso:id}).populate('colaborador').populate('ciclo_salon') ;
        res.status(200).send({data:docentes});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const agregar_docente_salon_admin = async function(req,res){
    if(req.user){

        let data = req.body;

        let docente = await Ciclo_docente.create(data);
        res.status(200).send({data:docente});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const eliminar_docente_salon_admin = async function(req,res){
    if(req.user){

        let id = req.params['id'];

        await Ciclo_docente.findByIdAndRemove({_id:id});
        res.status(200).send({data:true});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const listar_cursosbase_modal_admin = async function(req,res){
    if(req.user){
        let cursos = await Curso.find({estado:true}).sort({titulo:1}).select('_id titulo');
        res.status(200).send({data:cursos});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

module.exports = {
    registro_cursobase_admin,
    listar_cursos_admin,
    get_image_curso,
    obtener_datos_curso_admin,
    actualizar_cursobase_admin,
    cambiar_estado_curso_admin,
    crear_ciclo_admin,
    listar_ciclos_admin,
    listar_ciclos_vencidos_admin,
    obtener_datos_curso_ciclo_admin,
    editar_ciclo_admin,
    agregar_salon_ciclo_admin,
    obtener_salones_ciclo_admin,
    eliminar_salon_ciclo_admin,
    cambiar_estado_ciclo_admin,
    listar_docentes_salon_admin,
    agregar_docente_salon_admin,
    eliminar_docente_salon_admin,
    listar_cursosbase_modal_admin
}