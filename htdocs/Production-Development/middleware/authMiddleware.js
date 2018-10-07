/**
 * Created by Ahmad Rahman on 8/26/2016.
 */
// route middleware to verify a token
// var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config/config.json');
var session = require('express-session');


var authRoute = function ensureAuthorized(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.session.token ;

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret_key, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        /*
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
        */
        res.redirect('/');
    }
}

module.exports = authRoute;
