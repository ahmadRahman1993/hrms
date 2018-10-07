/**
 * Created by Yaser Barlas on 10/20/2016.
 */
var express = require('express');
var router = express.Router();
var model = require('../model');
var objects = require('../objects');

router.get('/getAttendanceFromDevice/:ip/:port',function(req,res,next){

    console.log("------------------------getAttendanceFromDevice route--------------------------------------");

    console.log("IP : "+ req.params.ip);
    console.log("PORT : "+ req.params.port);

    objects.device.getAttendanceFromDevice(req.params.ip, req.params.port,res);

    res.render('device_conn.ejs',{success: false, message: 'Authentication failed, Wrong Username.', layout: false});



});

module.exports = router;
