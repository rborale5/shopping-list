var mongoose = require('mongoose')

var shoppingListSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    userId:{
        type: String
    },
    listCount:{
        type: mongoose.Schema.Types.Number
    },
    allItems:{
        type: mongoose.Schema.Types.Mixed
    },
    list:{
        type: mongoose.Schema.Types.Mixed
    }


})
// shoppingListSchema.pre('findOneAndUpdate', function(next) {
//     this.options.runValidators = true
//     next()
// })

module.exports = mongoose.model('ShoppingList', shoppingListSchema);