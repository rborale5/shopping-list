var mongoose = require('mongoose')
var logger = require('../config/loggerConfig')
// var dbUrl = 'mongodb+srv://dbaccess:dbaccess@cluster0.ob67p.mongodb.net/shopping-list?retryWrites=true&w=majority'

var dbUrl =  process.env.dbURL;
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}

module.exports = function() {
    mongoose.connect(dbUrl,options);
    mongoose.set('useFindAndModify',false);
    mongoose.connection.on('connected', function(){
        logger.info('Mongoose default connection is open to: '+ dbUrl)
    } )
    mongoose.connection.on('error', function(err){
        logger.error('Mongoose default connection has occurred '+err+ 'error.' )
    })
    mongoose.connection.on('disconnected', function(){
        logger.error('Mongoose default connection has disconnected.' )

    })



}