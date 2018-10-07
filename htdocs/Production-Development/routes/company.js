/**
 * Created by Muhammad Annis on 8/23/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();
var session = require('express-session');

var app = express();
var fs = require('fs');

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({ uploadDir: './public/tmp' });

router.get('/', function (req, res) {
    models.company.findAll().then(function (data) {
        res.json(data);
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.post('/add', function (req, res) {
    console.log("--------------------------adding New Company-----------------------------------");
    var sess = req.session;
    models.company.create({
        comp_name: req.body.comp_name,
        reg_date: models.sequelize.fn('NOW'),
        web_url: req.body.web_url,
        logo: req.body.logo,
        contact_no: req.body.contact_no,
        address: req.body.address,
        is_active: req.body.is_active,
        contact_email: req.body.contact_email
    }).then(function (data) {
        //console.log('company added at index:' +models.company.id);
        //res.json(data)
        console.log("response is:", data);
        res.render('addCompany', {
            success: true,
            title: 'Add New Company',
            page_data: sess.page_data,
            userData: sess.userData,
            role_data: sess.role_data,
            token : sess.token,
            resMessg : "New Company Added",
            layout : sess.layout
        });
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });

});

router.get('/find/:id', function (req, res) {
    models.company.find({
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

router.get('/delete/:id', function (req, res) {
    models.company.destroy({where: {id: req.params.id}}).then(function () {
        res.json('record deleted');
        //console.log(data);
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.post('/update/:id', function (req, res) {
    var sess = req.session;
    models.company.find({where: {id: req.params.id}}).then(function (data) {
        data.update({
            comp_name: req.body.comp_name,
            web_url: req.body.web_url,
            logo: req.body.logo,
            contact_no: req.body.contact_no,
            address: req.body.address,
            contact_email: req.body.contact_email
        }).then(function (data) {
            /*console.log('record updated successfully!');
            res.json(data);*/
            res.render('viewCompanyProfile', {
                success: true,
                title: 'User Profile',
                page_data: sess.page_data,
                userData: sess.userData,
                role_data: sess.role_data,
                token: sess.token,
                comp_data: data,
                layout : sess.layout
            });
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });

    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

// only for super admin
router.post('/activate_deactivate/:name', function (req, res) {
    models.company.find({where: {comp_name: req.params.name}}).then(function (data) {
        data.update({
            is_active: req.body.is_active
        }).then(function (data) {
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

router.get('/companyListPage', function (req, res) {
    console.log("--------------------------companyListPage-----------------------------------");
    var sess = req.session;
    models.company.findAll().then(function (comp_data) {
        res.render('companyListPageView', {
            success: true,
            title: 'Add New Company',
            page_data: sess.page_data,
            userData: sess.userData,
            role_data: sess.role_data,
            token: sess.token,
            complist: comp_data,
            layout : sess.layout
        });
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });



});

router.get('/addNewCompanyView', function (req, res) {
    console.log("--------------------------addNewCompanyView-----------------------------------");
    var sess = req.session;
    res.render('addCompany', {
        success: false,
        title: 'Add New Company',
        page_data: sess.page_data,
        userData: sess.userData,
        role_data: sess.role_data,
        token : sess.token,
        layout : sess.layout
    });
});


router.get('/companyProfile', function (req, res) {
    console.log("--------------------------companyProfile-----------------------------------");
    var sess = req.session;
    models.company.find({where: {id: sess.userData.comp_id}}).then(function (comp_data) {
        res.render('companyProfile', {
            success: true,
            title: 'Company Profile',
            page_data: sess.page_data,
            userData: sess.userData,
            role_data: sess.role_data,
            token: sess.token,
            comp_data: comp_data,
            layout : sess.layout
        });
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});


router.get('/viewCompanyProfile', function (req, res) {
    console.log("--------------------------companyProfile-----------------------------------");
    var sess = req.session;
    models.company.find({where: {id: sess.userData.comp_id}}).then(function (comp_data) {
        res.render('viewCompanyProfile', {
            success: false,
            title: 'Company Profile',
            page_data: sess.page_data,
            userData: sess.userData,
            role_data: sess.role_data,
            token: sess.token,
            comp_data: comp_data
        });
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});


router.post('/uploadLogo/:id', multipartyMiddleware, function (req, res) {

    var sess = req.session;

    var queryString = req.body.comp_name;

    console.log(req.body, req.files);
    var file = req.files.image;
    /*console.log(file.name);
     console.log(file.type);
     console.log(file.path);*/

    var imageName = file.name;
    var fileExt = file.name.substr(file.name.lastIndexOf("."),file.name.length);

    if(!imageName){
        console.log("There was an error");
        res.redirect("/");
        res.end();
    } else {
        var newPath = "./public/images/company/" + req.body.comp_name +fileExt;

        models.company.find({where: {id: req.params.id }}).then(function (data) {

            if(data.logo!='company_default.png')
            {
                fs.unlinkSync("./public/images/company/" + data.logo);
            }

            fs.writeFileSync(newPath, fs.readFileSync(file.path));
            fs.unlinkSync(file.path);
            console.log('file uploaded successfully');

            data.update({
                logo: req.body.comp_name+fileExt
            }).then(function (data) {
                res.redirect('/company/companyProfile');
            }, function (err) {
                console.log('Following Error Occured', err);
                res.json(err);
            });

        });


    }

});


module.exports = router;