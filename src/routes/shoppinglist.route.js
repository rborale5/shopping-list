var express = require('express');
var router = express.Router();
var shoppinglistController = require('../controllers/shoppinglist.controller');
var authController = require('../controllers/auth/auth');

router.get('/createShoppingList/:shoppingListName', authController.authenticate,shoppinglistController.createShoppingList);
router.post('/createCategory', authController.authenticate,shoppinglistController.createCategory);
router.get('/categories/:category/items/:item', authController.authenticate, shoppinglistController.createItem);
router.get('/categories/:category',authController.authenticate, shoppinglistController.createCategory);
router.get('/', authController.authenticate,shoppinglistController.getUniqueItemCount);

module.exports = router;
