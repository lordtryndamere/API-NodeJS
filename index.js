'use strict'



//CONEXION A BASE DE DATOS

 var moongose  = require('mongoose');

var app  = require('./app')
var port =3700
moongose.Promise = global.Promise

 moongose.connect('mongodb://localhost:27017/PORTAFOLIO',{useNewUrlParser:true,useUnifiedTopology:true})
 .then(()=>{
     console.log("base de datos conectada correctamente");

     // CREAR SERVER 
    app.listen(port,()=>{
        console.log("Servidor corriendo correctamente en el puerto 3700");
        
    })
    
     
 })
 .catch(err=>console.log("No se pudo conectar a mongo db")
 )












