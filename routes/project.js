'use strict'


var express = require('express');

var ProjectController = require('../controllers/projects');


var router = express.Router();

//MIDLEWARE

var multipart = require('connect-multiparty');
var multipartmiddleware = multipart({uploadDir:'./uploads'});


router.get('/home',ProjectController.home);
router.post('/test',ProjectController.test);
router.post('/saveproject',ProjectController.saveProject);
router.get('/project/:id?',ProjectController.GetProject);
router.get('/projects',ProjectController.GetProjects);
router.put('/updated/:id',ProjectController.updateProject);
router.delete('/deleted/:id',ProjectController.deleteProject);
router.post('/upload/:id',multipartmiddleware, ProjectController.Uploadimage);


module.exports= router;