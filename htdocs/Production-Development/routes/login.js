/**
 * Created by Muhammad Annis on 8/26/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/config.json');
var fs = require('fs');
var path = require('path');
var session = require('express-session');

//authenticating a user and generating token for later requests.
// this route do not require token because it is the place where token is being generated for later usage
var roleData = "";
router.post('/', function (req, res) {
    console.log('---------------------- LOGIN FIRST -------------------------');
    models.user.find({where: {login_id: req.body.login_id}, include: [
        {model: models.company}
    ]}).then(function (userData) {

        if (userData) {
            if (userData.password != req.body.password) {
                //res.json({success: false, message: 'Authentication failed. Wrong password.'});
                res.render('index',{success: false, message: 'Authentication failed, Wrong password.', layout: false});
            }
            else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(userData.toJSON(), config.secret_key, {
                    expiresIn: 86400 // expires in 24 hours
                });

                rolebyId(userData.role_id).then(function (data) {
                    var file_name = '';
                    var redirectTo = '';

                    //checking user role and preparing data accordingly
                    if (data.role_type == 'ADMIN') {
                        file_name = 'adminData.json';
                        redirectTo = 'adminMain';
                    } else if (data.role_type == 'USER') {
                        file_name = 'userData.json';
                        redirectTo = '/userMain';
                    } else if (data.role_type == 'SUPER ADMIN'){
                        file_name = 'superAdminData.json';
                        redirectTo = '/superAdminMain';
                    }
                    /*
                    else if(data.role_type == 'HR-MANAGER') {
                        file_name = 'hrData.json';
                        redirectTo = ''
                    }
                    */

                    //userData["layout"] = "layout1";
                    var page_data = getPageData(file_name);
                    var sess = req.session ;

                    sess.layout = userData.layout;
                    sess.page_data = page_data ;
                    sess.userData = userData ;
                    sess.role_data = data;
                    sess.token =  token ;

                    /*
                    console.log('-----------------------REDIRECT TO ADMIN MAIN');
                    console.log(req.session);
                     */
                    console.log('-----------------------REDIRECT TO' , redirectTo);


                    sess.save(function (err) {
                        if (err) return next(err);
                        res.redirect(redirectTo);
                    });

                    //res.redirect('/login/adminMain');

/*
                    res.render('./partials/adminMainView', {
                        success: true,
                        userData: userData,
                        page_data: page_data,
                        role_data: data,
                        message: 'Token Generated!',
                        token : token
                    });
*/
                }, function (err) {
                    console.log('Following Error Occured', err);
                    res.json(err);
                });

                // return the information including token as JSON

                /*                res.json({
                 success: true,
                 userData: userData,
                 message: 'Token Generated!',
                 token: token
                 });
                 */
            }
            //res.json(userData);
        }
        else {
            console.log('No record found');
            /*res.status(404).json({
                success: false,
                message: 'user does not exist'
            });*/
            res.render('index',{success: false, message: 'Authentication failed, Wrong Username.', layout: false});
        }

    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);


    });

});

function rolebyId(roleId) {
    return models.role.find({where: {id: roleId}});
}

function getPageData(fileName) {

    var filepath = 'public/static_data/' + fileName;
    return readJsonFileSync(filepath);
}

function readJsonFileSync(filepath, encoding) {

    if (typeof (encoding) == 'undefined') {
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}




module.exports = router;