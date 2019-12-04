'use strict'
var  moongose = require('mongoose');

var Schema = moongose.Schema;
// CON ESTE METODO CREO DOCUMENTOS EN MIS COLECCIONES
var ProjectSchema = Schema({
    name:String,
    description:String,
    category:String,
    language:String,
    year:Number,
    image:String

})
// creo el modelo y lo exporto le paso como primer parametro el nombre del documento que guardare, en este caso projects
module.exports = moongose.model('Project',ProjectSchema)
// projects --> guarda los documentos en esa coleccion