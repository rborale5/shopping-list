var express = require('express');
var router = express.Router();
const ShoppingList = require('../models/shoppinglist.model');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

module.exports = router;
