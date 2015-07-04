var express = require('express');
var router = express.Router();
var bikerRevengeJS = require('../public/javascripts/bikerRevenge.js');

router.get('/bikerRevenge', function(req, res, next){
  res.render('bikerRevenge/');
});  
