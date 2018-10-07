/**
 * Created by Ahmed on 10/27/2016.
 */
var express = require('express');
var router = express.Router();
var model = require('../model');
var objects = require('../objects');
var fs = require('fs');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({uploadDir: './public/tmp'});


router.post('/login', function (req, res) {
    console.log('---------------------- LOGIN FIRST -------------------------');
    model.user.find({where: {login_id: req.body.login_id}}).then(function (userData) {

        if (userData) {
            if (userData.login_password != req.body.login_password) {

                res.json({success: false, message: 'Authentication failed. Wrong password.'});
                //res.json({"success":"false"});
            }
            else {
                res.json({success: true,userData: userData});
            }

        }
        else {
            //console.log('No record found');
            res.json({success: false, message: 'No Record Found.'});
        }

    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});


router.get('/getUser/:id/:pass', function (req, res, next) {
    objects.loader.getUserByLogin(req.params.id, req.params.pass, res);
});

router.get('/getCompany/:id', function (req, res, next) {
    model.company.find({
        where: {id: req.params.id}
    }).then(function (data) {
        res.json(data);
    });
});

router.get('/getCompDir', function (req, res, next) {
    model.company.findAll().then(function (data) {
        res.json(data);
    });
});

router.get('/getPrivileges', function (req, res, next) {
    model.privilege.findAll().then(function (data) {
        res.json(data);
    });
});


//CUD of Company table
router.post('/addCompany', function (req, res) {
    console.log(req.body.name);
    model.company.create({
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        email: req.body.email,
        contact_office: req.body.contact_office,
        image: req.body.image,
        start_date: req.body.start_date,
        admin_id: req.body.admin_id
    }).then(function () {
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});
router.post('/updateCompany/:id', function (req, res) {
    console.log(req.body);
    model.company.find({where: {id: req.params.id}}).then(function (data) {
        data.update({
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            email: req.body.email,
            contact_office: req.body.contact_office,
            /*image:req.body.image,
             start_date:req.body.start_date,*/
            admin_id: req.body.admin_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});
router.get('/deleteCompany/:id', function (req, res) {
    model.company.destroy({where: {id: req.params.id}}).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

//CUD of User table
router.post('/addUser', function (req, res) {
    console.log(req.body);
    model.user.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        login_id: req.body.login_id,
        login_password: req.body.login_password,
        gender: req.body.gender,
        designation: req.body.designation,
        company_id: req.body.company_id
    }).then(function () {
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});
router.post('/updateUser/:id', function (req, res) {
    console.log(req.body);
    model.user.find({where: {id: req.params.id}}).then(function (data) {
        data.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            login_id: req.body.login_id,
            login_password: req.body.login_password,
            salary: req.body.salary,
            /*address:req.body.address,
             email:req.body.email,
             contact_cell:req.body.contact_cell,
             contact_office:req.body.contact_office,*/
            image: req.body.image, gender: req.body.gender,
            designation: req.body.designation,
            start_date: req.body.start_date,
            manager: req.body.manager,
            company_id: req.body.company_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});
router.get('/deleteUser/:id', function (req, res) {
    model.user.destroy({where: {id: req.params.id}}).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

//CUD of Contact table
router.post('/addContact', function (req, res) {
    console.log(req.body);
    model.contact.create({
        type: req.body.type,
        value: req.body.value,
        user_id: req.body.user_id
    }).then(function () {
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});
router.post('/updateContact/:id', function (req, res) {
    console.log(req.body);
    model.contact.find({where: {id: req.params.id}}).then(function (data) {
        data.update({
            type: req.body.type,
            value: req.body.value,
            user_id: req.body.user_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});
router.get('/deleteContact/:id', function (req, res) {
    model.contact.destroy({where: {id: req.params.id}}).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

//CUD of Role table
router.post('/addRole', function (req, res) {
    console.log(req.body);
    model.role.create({
        name: req.body.name,
        company_id: req.body.company_id
    }).then(function (data) {
        res.json(data.id);
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.post('/updateRole/:id', function (req, res) {
    console.log(req.body);
    model.role.find({where: {id: req.params.id}}).then(function (data) {
        data.update({
            name: req.body.name,
            company_id: req.body.company_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});
router.get('/deleteRole/:id', function (req, res) {
    model.role.destroy({where: {id: req.params.id}}).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});
router.get('/getRoles/:company_id', function (req, res) {
    console.log(req.body);
    model.role.findAll({
        where: {
            company_id: req.params.company_id
        }
    }).then(function (data) {
        res.json(data);
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

//CUD of Privilege table
router.post('/addPrivilege', function (req, res) {
    console.log(req.body);
    model.privilege.create({
        name: req.body.name,
        role_id: req.body.role_id
    }).then(function () {
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});
router.post('/updatePrivilege/:id', function (req, res) {
    console.log(req.body);
    model.privilege.find({where: {id: req.params.id}}).then(function (data) {
        data.update({
            name: req.body.name,
            role_id: req.body.role_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});
router.get('/deletePrivilege/:id', function (req, res) {
    model.privilege.destroy({where: {id: req.params.id}}).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

//CUD of Document table
router.post('/addDocument', function (req, res) {
    console.log(req.body);
    model.doc.create({
        name: req.body.name,
        location: req.body.location,
        user_id: req.body.user_id
    }).then(function () {
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});
router.post('/updateDocument/:id', function (req, res) {
    console.log(req.body);
    model.doc.find({where: {id: req.params.id}}).then(function (data) {
        data.update({
            name: req.body.name,
            location: req.body.location,
            user_id: req.body.user_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});
router.get('/deleteDocument/:id', function (req, res) {
    model.doc.destroy({where: {id: req.params.id}}).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

//CUD of Todo table
router.post('/addTodo', function (req, res) {
    console.log(req.body);
    model.todo.create({
        task: req.body.task,
        user_id: req.body.user_id
    }).then(function () {
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});
router.post('/updateTodo/:id', function (req, res) {
    console.log(req.body);
    model.todo.find({where: {id: req.params.id}}).then(function (data) {
        data.update({
            task: req.body.task,
            user_id: req.body.user_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});
router.get('/deleteTodo/:id', function (req, res) {
    model.todo.destroy({where: {id: req.params.id}}).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

//CUD of Asset table
router.post('/addAsset', function (req, res) {
    console.log(req.body);
    model.asset.create({
        name: req.body.name,
        quantity: req.body.quantity,
        user_id: req.body.user_id,
        company_id: req.body.company_id
    }).then(function () {
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);

    });
});
router.post('/updateAsset/:id', function (req, res) {
    console.log(req.body);
    model.asset.find({where: {id: req.params.id}}).then(function (data) {
        data.update({
            name: req.body.name,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            company_id: req.body.company_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});
router.get('/deleteAsset/:id', function (req, res) {
    model.asset.destroy({where: {id: req.params.id}}).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

//CUD of Event table
router.post('/addEvent', function (req, res) {
    console.log(req.body);
    model.event.create({
        time: req.body.time,
        comment: req.body.comment,
        user_id: req.body.user_id,
        event_id: req.body.event_id
    }).then(function () {
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});
router.post('/updateEvent/:id', function (req, res) {
    console.log(req.body);
    model.event.find({where: {id: req.params.id}}).then(function (data) {
        data.update({
            time: req.body.time,
            comment: req.body.comment,
            user_id: req.body.user_id,
            event_id: req.body.event_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});
router.get('/deleteEvent/:id', function (req, res) {
    model.event.destroy({where: {id: req.params.id}}).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

//CUD of Event Code table
router.post('/addEventCode', function (req, res) {
    console.log(req.body);
    model.event_code.create({name: req.body.name}).then(function () {
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});
router.post('/updateEventCode/:id', function (req, res) {
    console.log(req.body);
    model.event_code.find({where: {id: req.params.id}}).then(function (data) {
        data.update({
            name: req.body.name,
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});
router.get('/deleteEventCode/:id', function (req, res) {
    model.event_code.destroy({where: {id: req.params.id}}).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});


router.post('/addRolePrivilege', function (req, res) {
    console.log(req.body);
    model.role_privilege.create({role_id: req.body.role_id, privilege_id: req.body.privilege_id}).then(function () {
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.post('/addUserRoles', function (req, res) {

    model.user_role.destroy(
        {
            where: {user_id: req.body.user_id}
        }
    ).then(function () {
        var user_role_arr = req.body.role_ids;
        user_role_arr.forEach(function (item) {
            model.user_role.findOrCreate({

                where: {
                    user_id: req.body.user_id,
                    role_id: item
                }
            })
                .then(function () {
                    res.json("success");
                }, function (err) {
                    console.log('Following Error Occured', err);
                    res.json(err);
                });
        });

    });
});

router.post('/addMultiRolePrivilege', function (req, res) {
    var priv_arr = req.body.roles;
    priv_arr.forEach(function (item) {
        model.role_privilege.create({
            role_id: req.body.role_id,
            privilege_id: item
        })
            .then(function () {
                res.json("success");
            }, function (err) {
                console.log('Following Error Occured', err);
                res.json(err);
            });
    });
});

router.post('/updateRolePrivilege/:id', function (req, res) {

    model.role_privilege.destroy({
        where: {role_id: req.params.id}
    }).then(function () {
        var priv_arr = req.body.roles;
        priv_arr.forEach(function (item) {
            model.role_privilege.create({
                role_id: req.params.id,
                privilege_id: item
            })
                .then(function () {
                    res.json("success");
                }, function (err) {
                    console.log('Following Error Occured', err);
                    res.json(err);
                });
        });
    });

});

router.get('/getPrivForRole/:id', function (req, res) {
    var privsArr = new Array();
    model.role_privilege.findAll(
        {where: {role_id: req.params.id}}
    ).then(function (priv_roles) {

        priv_roles.forEach(function (item) {

            model.privilege.find({
                where: {
                    id: item.privilege_id
                }
            })
                .then(function (privData) {
                    privsArr.push(privData);

                    if (priv_roles.length == privsArr.length) {
                        res.json(privsArr);
                    }

                }, function (err) {
                    console.log('Following Error Occured', err);
                    res.json(err);
                });
        });


    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.get('/getRoleIdsByUser/:user_id', function (req, res, next) {
    model.user_role.findAll(
        {
            where: {user_id: req.params.user_id}
        })
        .then(function (userRolesIds) {
            res.json(userRolesIds);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
});

// Service for getting all the employees in a company
router.get('/getUserDirectory/:c_id', function (req, res, next) {

    var param;
    if (req.params.c_id === 1) {
        console.log("It is an Integer");
        param = req.params.c_id;
    }
    else {
        param = parseInt(req.params.c_id, 10);
    }
    console.log(param);
    model.user.findAll({
        where: {
            company_id: param
        },
        include: [{
            model: model.contact
        }]
    }).then(function (data) {
        console.log("this is " + data);
        res.json(data);
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

// Service for getting CheckIn-Out time of employee
router.get('/getEmpCheckinOutTime/:user_id/:year', function (req, res, next) {
    objects.loader.getCheckInOutTime(req.params.user_id, req.params.year, res);
});


router.post('/uploadDoc', multipartyMiddleware, function (req, res, next) {
    /*objects.loader.getCheckInOutTime(req.params.user_id,req.params.year,res);*/

    var user_id = parseInt(req.body.data, 10);
    var file = req.files.file;

    //var fileExt = file.name.substr(file.name.lastIndexOf("."), file.name.length);

    if (!file.name) {
        console.log("There was an error");
        res.end();
    } else {
        var newPath = "./public/documents/" + user_id + '_' + file.name;

        fs.writeFileSync(newPath, fs.readFileSync(file.path));
        fs.unlinkSync(file.path);
        console.log('file uploaded successfully');

        model.doc.find({where: {name: file.name}}).then(function (current_doc) {
            console.log('Document Exist or not', current_doc);

            if (!current_doc) {
                model.doc.create({
                    name: file.name,
                    location: user_id + '_' + file.name,
                    user_id: user_id,
                    type: file.type
                }).then(function (doc_data) {
                    res.json({"success": true})
                }, function (err) {
                    console.log('Following Error Occured', err);
                    res.json(err);
                });
            }
            else {
                res.json('Document Already Exist')
            }

        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });

    }

});

router.get('/downloadFile/:f_loc', function (req, res) {

    var file = req.params.f_loc;
    var path = './public/documents/' + file;
    res.sendfile(path);
    //res.download(path);

});

router.get('/deleteDoc/:id/:loc', function (req, res) {

    var path = './public/documents/' + req.params.loc;
    console.log('Deleting file...', path);
    model.doc.destroy({where: {id: req.params.id}}).then(function () {
        fs.unlinkSync(path);
        res.json({"success": true})
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.get('/getAssets/:user_id', function (req, res) {

    model.asset.findAll({where: {user_id: req.params.user_id}}).then(function (assets) {
        res.json(assets)
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

//getting employee attendance hours for the given month by empId
router.get('/getEmpHoursByMonth/:empId/:date', function (req, res, next) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  EmpId:   " + req.params.empId);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  Date:   " + req.params.date);
    objects.loader.getEmpHoursByMonth(req.params.empId, req.params.date, res);
});


//getting employee leaves status
router.get('/getEmpLeavesStatus/:empId', function (req, res, next) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  EmpId:   " + req.params.empId);
    objects.loader.getEmpLeavesStatus(req.params.empId, res);
});


//CUD for 'leaves_types'
router.post('/addLeavesTypes',function(req,res){
    console.log("Following is the req body ------------------ ");
    console.log(req.body);
    model.leaves_types.create({
        name:req.body.name,
        yearly_leaves:req.body.yearly_leaves,
        status:req.body.status,
        company_id:req.body.company_id
    }).then(function(){
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.post('/updateLeavesTypes/:company_id/:name',function(req,res){
    console.log(req.body);
    model.leaves_types.find({
        where:{
            company_id:req.params.company_id,
            name:req.params.name
        }
    }).then(function(data){
        data.update({
            name:req.body.name,
            yearly_leaves:req.body.yearly_leaves,
            status:req.body.status,
            company_id:req.body.company_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});

router.get('/deleteLeavesTypes/:company_id/:name', function (req, res) {
    model.leaves_types.destroy({
        where: {
            company_id:req.params.company_id,
            name:req.params.name
        }
    }).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});


//CUD for 'user_leaves'
router.post('/addUserLeaves',function(req,res){
    console.log(req.body);
    model.user_leaves.create({
        leave_date:req.body.leave_date,
        leave_deduction:req.body.leave_deduction,
        comments:req.body.comments,
        user_id:req.body.user_id,
        leaves_type_id:req.body.leaves_type_id
    }).then(function(){
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.post('/updateUserLeaves/:leave_date/:user_id',function(req,res){
    console.log(req.body);
    model.user_leaves.find({
        where:{
            leave_date:req.params.leave_date,
            user_id:req.params.user_id
        }
    }).then(function(data){
        data.update({
            leave_date:req.body.leave_date,
            leave_deduction:req.body.leave_deduction,
            comments:req.body.comments,
            user_id:req.body.user_id,
            leaves_type_id:req.body.leaves_type_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});

router.get('/deleteUserLeaves/:leave_date/:user_id', function (req, res) {
    model.user_leaves.destroy({
        where: {
            leave_date:req.params.leave_date,
            user_id:req.params.user_id
        }
    }).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});


//CUD for 'user_leaves_balance'
router.post('/addUserLeavesBalance',function(req,res){
    console.log(req.body);
    model.user_leaves_balance.create({
        total_leave:req.body.total_leave,
        available_leave:req.body.available_leave,
        availed_leave:req.body.availed_leave,
        comments:req.body.comments,
        user_id:req.body.user_id,
        leaves_type_id:req.body.leaves_type_id
    }).then(function(){
        res.json("success");
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});

router.post('/updateUserLeavesBalance/:user_id/:leaves_type_id',function(req,res){
    console.log(req.body);
    model.user_leaves_balance.find({
        where:{
            user_id:req.params.user_id,
            leaves_type_id:req.params.leaves_type_id
        }
    }).then(function(data){
        data.update({
            total_leave:req.body.total_leave,
            available_leave:req.body.available_leave,
            availed_leave:req.body.availed_leave,
            comments:req.body.comments,
            user_id:req.body.user_id,
            leaves_type_id:req.body.leaves_type_id
        }).then(function (data) {
            console.log('record updated successfully!');
            res.json(data);
        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    });
});

router.get('/deleteUserLeavesBalance/:user_id/:leaves_type_id', function (req, res) {
    model.user_leaves_balance.destroy({
        where: {
            user_id:req.params.user_id,
            leaves_type_id:req.params.leaves_type_id
        }
    }).then(function () {
        res.json('record deleted');
    }, function (err) {
        console.log('Following Error Occured', err);
        res.json(err);
    });
});



//getting leaves types
router.get('/getLeavesTypes/:companyId',function(req,res,next){
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  CompanyId:   "+req.params.companyId);
    objects.loader.getLeavesTypes(req.params.companyId,res);
});


//getting user_leaves
router.get('/getUserLeaves/:userId',function(req,res,next){
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  userId:   "+req.params.userId);
    objects.loader.getUserLeaves(req.params.userId,res);
});


module.exports = router;