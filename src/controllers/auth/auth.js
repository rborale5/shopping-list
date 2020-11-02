var logger = require('../../config/loggerConfig');
// var jwt = require('jsonwebtoken');
// var jwkToPem = require('jwk-to-pem');
// var path = require('path');
// const jwkPath = process.env.CONFIG_DIR + '/jwk.json';
// const jwk = require(jwkPath);
// var pem = jwkToPem(jwk.keys[0]);




/**
 * middleware - used to authenticate APIs;
 * checks - jwt signature, token expiry time;
 */
module.exports.authenticate = function(req, res, next) {
    var userDetails = {
        userId : "roshan",
        shoppingListName: 'my-shopping-list'
    }
    req.headers.user = userDetails;
    next();
    /*
    if (!req.headers.authorization || req.headers.authorization.split(' ')[0] != 'Bearer') {
        res.status(401).send({
            message: "Unauthorized."
        });
    } else {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, pem, {
            algorithms: ['RS256']
        }, function(err, decodedToken) {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized."
                });
            } else {
                if (new Date(decodedToken.exp * 1000) < new Date()) {
                    res.status(401).send({
                        message: "Session expired."
                    });
                } else {
                    req.headers.user = decodedToken;
                    next();
                }
            }

        });
    }
    */



}
