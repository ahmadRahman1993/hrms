/**
 * Created by Muhammad Annis on 8/19/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    models.role.findAll().then(function (data) {
        res.json(data);
    });
});

router.post('/add', function (req, res) {
    models.role.create({
        role_type: req.body.role_type
    }).then(function (data) {
        //console.log('role added at index:' +models.role.id);
        res.json(data);
        console.log("response is:", data);
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.get('/:id', function (req, res) {
    models.role.find({
        where: {id: req.params.id}, include: [
            {model: models.user}
        ]
    }).then(function (data) {
        res.json(data);
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.post('/update/:id', function (req, res) {
    models.role.find({where: {id: req.params.id}}).then(function (data) {
        data.update({role_type: req.body.role_type}).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });

    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.get('/findPermforRole/:id', function (req, res) {
    models.role.find({where: {id: req.params.id}, include: [{all: true}]}).then(function (data) {
        data.getPermissions().then(function (data) {
            console.log('final data is :', data.length);
            var arr = [];
            data.forEach(function (mydata) {
                console.log('my data :', mydata.role_perm.perm_id);
                arr.push(mydata.role_perm.perm_id);
            });
            console.log('array elements :', arr);
            models.permission.findAll({where: {id: {$in: arr}}}).then(function (permData) {
                res.json(permData);
            }, function (err) {
                console.log('Following Error Occured', err);
                res.json(err);
            });
            //res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});


module.exports = router;