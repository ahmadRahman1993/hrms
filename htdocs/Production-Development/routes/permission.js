/**
 * Created by Muhammad Annis on 8/24/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    models.permission.findAll().then(function (data) {
        res.json(data);
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.post('/add', function (req, res) {
    models.permission.create({
        perm_type: req.body.perm_type
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
    models.permission.find({where: {id: req.params.id}}).then(function (data) {
        res.json(data);
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.post('/update/:id', function (req, res) {
    models.permission.find({where: {id: req.params.id}}).then(function (data) {
        data.update({perm_type: req.body.perm_type}).then(function (data) {
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

module.exports = router;