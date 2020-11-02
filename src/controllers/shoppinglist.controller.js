const ShoppingList = require('../models/shoppinglist.model');
var mongoose = require('mongoose')
const logger = require('../config/loggerConfig');
const { use } = require('../routes');

/*
This api is used for creating a category.

*/
module.exports.createCategory = function (req, res) {
    
    let shoppingListName = req.headers.user.shoppingListName
    let user = req.headers.user.userId
    let category = req.params.category
    let categoryName = 'list.' + category
    ShoppingList.aggregate(
        [
            {$match: {name: shoppingListName, userId: user}},
            {
                $addFields: {
                    [categoryName]: { "items": [] }
                }
            },
            { $out: "shoppinglists" }
        ], (err, doc) => {
            if (err) {
                logger.error('Error in createCategory %j', err);
                res.status(500).json({
                    'message': 'internal server error'
                })
            }
            else {
                logger.info('New category successfully added %j',category)
                res.status(200).json({
                    'message': 'category created.'
                })

            }
        }
    )

}

/*
This api is used for creating a item in the category.
If category doesn't exist then first category is created then item will be added.
*/
module.exports.createItem = function (req, res) {
    var category = req.params.category
    var shoppingListName = req.headers.user.shoppingListName
    let user = req.headers.user.userId
    var item = req.params.item
    var categoryPath = 'list.' + category + '.items'
    var itemPath = 'allItems.' + item
    ShoppingList.update(
        { name: shoppingListName,userId:user },
        { "$addToSet": { [categoryPath]: { name: item } } },
        (err, doc) => {
            if (err) {
                logger.error('%j', err);
                res.status(500).json({
                    'message': 'internal server error'
                })
            }
            else {
                ShoppingList.findOneAndUpdate({ name: shoppingListName }, { $inc: { [itemPath]: 1 } }, { new: true }, (err, out) => {
                    if (err) {
                        logger.error('Error in incrementing item count %j', err);
                        res.status(500).json({
                            'message': 'internal server error'
                        })
                    }
                    else {
                        if (out.allItems[item] == 1) {
                            logger.info('Incremented the item count %j ', item)
                            ShoppingList.findOneAndUpdate({ name: shoppingListName }, { $inc: { listCount: 1 } }, (err, out) => {
                                if (err) {
                                    logger.error('Error in incrementing unique item count %j', err);
                                    res.status(500).json({
                                        'message': 'internal server error'
                                    })
                                }
                                else {
                                    logger.info('Incrementing the unique item count.')
                                    res.status(200).send({
                                        'message': 'Item added.'
                                    })
                                }
                            })
                        }
                        else {
                            res.status(200).send({
                                'message': 'Item added.'
                            })
                        }
                    }


                })



            }
        }
    )



}

/*
This api is use to create shoppinglist as there could be multiple shopping lists of user.
To adhere to the requirement of apis format, even though new shopping list is created all other operations will
    be performed in hard coded shopping list only.
*/
module.exports.createShoppingList = function (req, res) {
    var shoppingListName = req.params.shoppingListName;
    var user = req.headers.user.userId
    ShoppingList.insertMany(
        {
            name: shoppingListName,
            userId: user,
            listCount: 0,
            list: {},
            allItems: {}
        },
        (err, doc) => {
            if (err) {
                logger.error('Error in creating shopping list %j', err);
                        res.status(500).json({
                            'message': 'internal server error'
                        })
            }
            else {
                res.status(200).send({
                    message: "shopping list created."
                });
            
            }
        }
    )

}

/*
This api is used to get the count of unique unique items in the shopping list.

*/
module.exports.getUniqueItemCount = function (req, res) {
    var shoppingListName = req.headers.user.shoppingListName
    var user = req.headers.user.userId
    ShoppingList.find({ name: shoppingListName, userId:user }, (err, out) => {
        if (err) {
            logger.error('Error in getting unique item count %j',err)
            res.status(500).json({
                'message': 'internal server error'
            })
        }
        else {
            var uniqueCounts = out[0].listCount
            logger.info('Unique item counts %j', uniqueCounts)
            res.status(200).send({
                unique_item_count: uniqueCounts
            })
        }

    })

}