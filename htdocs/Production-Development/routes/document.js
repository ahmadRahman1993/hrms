/**
 * Created by Muhammad Annis on 10/17/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();
var session = require('express-session');
var fs = require('fs');

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({uploadDir: './public/tmp'});

router.get('/documentsMain/:user_id', function (req, res) {
    var sess = req.session;

    models.document.findAll({where: {user_id: req.params.user_id}}).then(function (doc_list) {
        //res.json(doc_list);
        res.render('userDocumentsMain', {
            title: 'My Documnents',
            page_data: sess.page_data,
            userData: sess.userData,
            other_user_id: req.params.user_id,
            role_data: sess.role_data,
            doc_list: doc_list,
            token: sess.token,
            layout: sess.layout
        });
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });

});

router.post('/uploadDoc', multipartyMiddleware, function (req, res) {

    var sess = req.session;

    console.log(req.body, req.files);
    var file = req.files.document;
    console.log(file.name);
    console.log(file.type);
    console.log(file.path);

    //var doc_type = req.body.doc_type;
    var user_id = sess.userData.id;

    var fileName = file.name;
    var fileExt = file.name.substr(file.name.lastIndexOf("."), file.name.length);

    if (!fileName) {
        console.log("There was an error");
        res.redirect("/");
        res.end();
    } else {
        var newPath = "./public/documents/" + user_id + '_' + file.name;

        fs.writeFileSync(newPath, fs.readFileSync(file.path));
        fs.unlinkSync(file.path);
        console.log('file uploaded successfully');

        models.document.find({where: {doc_name: user_id + '_' + file.name}}).then(function (current_doc) {
            console.log('Document Exist or not', current_doc);

            if (!current_doc) {
                models.document.create({
                    doc_name: user_id + '_' + file.name,
                    user_id: user_id,
                    file_name: fileName
                }).then(function (doc_data) {
                    res.redirect('/document/documentsMain/'+user_id);
                }, function (err) {
                    console.log('Following Error Occured', err);
                    res.json(err);
                });
            }
            else {
                res.redirect('/document/documentsMain/'+user_id);
            }

        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });

    }
});


/* find document(s) by user id */
router.get('/find/:id', function (req, res) {

    models.user.find({where: {id: req.params.id}}).then(function (user_data) {
        user_data.getDocuments({where: {id: 2}}).then(function (doc_data) {
            res.json(doc_data);
        });
    });

});

router.get('/delete/:user_id/:fname', function (req, res) {
    var sess = req.session;
    var file_name = req.params.fname;
    var path = './public/documents/' + file_name;
    console.log('Deleting file...',path);
    console.log('jhsdfvjsdbfkbsdkjfksjd',req.params.user_id);
    models.document.destroy({where: {doc_name: file_name}}).then(function () {
        fs.unlinkSync(path);
        res.redirect('/document/documentsMain/'+req.params.user_id);
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.get('/downloadFile/:fname', function (req, res) {

    var file = req.params.fname;
    var path = './public/documents/' + file;

    res.download(path);

});

module.exports = router;