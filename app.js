'use strict'

var express = require('express');

var bodyparser = require('body-parser');

var app = express();

// CARGAR ARCHIVO DE RUTAS
var project_routes = require('./routes/project');





// MIDLEWEARES
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



//CORS 
// Cors --> evitan problemas de las conexiones Ajax o fetch que nos hagan.

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Acess-Control-Allow-Headers','Authorization, X-API_KEY,Origin,X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();
})



//RUTAS DEFINIDAS
// app.get('/',(req,res)=>{
//     res.status(200).send("<h1> Hola mundo en NodeJs api </h1>")

// })

// app.post('/test',(req,res)=>{
//     console.log(req.body.nombre);
//     res.status(200).send({message:"Hola mundo en NodeJs api"})
  
    
// })

app.use('/API',project_routes)



//exportart

module.exports = app;







