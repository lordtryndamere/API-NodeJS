'use strict'
var Project = require('../models/project')
var fs = require('fs')
var controller = {
home: function(req,res){
return res.status(200).send({
    message :"Soy la Home"
})
},
test:function(req,res){
    return res.status(200).send({
        message :"Soy test del controller project"
    })
    },

    saveProject: function(req,res){
        var project = new Project();
        var params = req.body;
        project.name = params.name;
        project.description  = params.description;
        project.category = params.category;
        project.year = params.year;
        project.language = params.language;
        project.image = null;

        project.save((err,projectStored)=>{
            if(err) return res.status(500).send({message:"Error al guardar"})
            if(!projectStored) return res.status(404).send({message:"No se ha podido guardar el proyecto."})
            return res.status(200).send({project:projectStored});
        })


        },

    GetProject(req,res){
        var projectid = req.params.id;
        if (projectid  == null) return res.status(404).send({message:'El proyecto no existe'});
        Project.findById(projectid,(err, project)=>{
            if(err) return res.status(500).send({message :"Error al devolver los datos"});
            
            if(!project) return res.status(404).send({message:"Error el documento no existe"})

            return res.status(200).send({project})
        })
        },

    GetProjects(req,res){
        Project.find({}).sort('name').exec((err,projects)=>{
            if(err) return res.status(500).send({message:"Error al devolver los datos"});
            
            if(!projects) return res.status(404).send({message :" No hay nada para mostrar"});

            return res.status(200).send({projects})
        })
    },

    updateProject(req,res){
        var projectid = req.params.id;
        var update = req.body;
        Project.findByIdAndUpdate(projectid,update,{new:true},(err,projecupdated)=>{
           if(err) return res.status(500).send({
               message:"Error al actualizar el documento"
           });
           
           if(!projecupdated) return res.status(404).send({
               message : "No exite el projecto para actualizar"
           });

           return res.status(200).send({
               project: projecupdated
           });
        })


    },

    deleteProject(req,res){
        var projectid = req.params.id
        Project.findByIdAndDelete(projectid,(err,deleted)=>{
            if(err) return res.status(500).send({
                message :"No se pudo eliminar el projecto"
            });

            if(!deleted) return res.status(404).send({
                message : "No existe el projecto ha eliminar"
            });

            return res.status(200).send({
                project :deleted
            });
        })
    },

    Uploadimage(req,res){
        var projectId = req.params.id;
        var file_name = 'Imagen no subida ...';

        if(req.files){
            var filePath = req.files.image.path;
            var filesplit = filePath.split('\\')
            var file_name= filesplit[1];
            var exSplit = file_name.split('\.');
            var fileExt = exSplit[1];

            if (fileExt=='png'||fileExt=='jpg' || fileExt== 'jpeg' || fileExt=='gif' ) {

                Project.findByIdAndUpdate(projectId,{image:file_name},{new:true},(err,Projecupdated)=>{

                    if (err) return res.status(500).send({
                        message:"La imagen no se ha subido"
                    });
                    
                    if (!Projecupdated) res.status(404).send({
                        message:"el proyecto no existe"
                    });
    
                    return res.status(200).send({
                        project:Projecupdated
                    });
    
                }) 
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({
                        message:"La Extension no es valida"
                    });
                })
            }


            
        }
        else{
                return res.status(200).send({
                    message:file_name
                })
        }
    }

    
    
    }



    


module.exports= controller;