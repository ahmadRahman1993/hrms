/**
 * Created by Ahmed on 10/27/2016.
 */
var model = require('../model');

//including code for sequelize<START>
var path = require("path");
var config = require(path.join(__dirname, '..', 'config', 'config.json'));//[env];
var Sequelize = require("sequelize");
var edge      = require('edge');

var sequelize = new Sequelize(config.db_name, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
    define: {
        timestamps: false
    }
});
//including code for sequelize<END


var obj = {};

function todoClass() {
    this.id;
    this.task;
}

function docClass() {
    this.id;
    this.name;
    this.location;
    this.type;
}

function basic_info() {
    this.id;
    this.first_name;
    this.last_name;
    this.login_id;
    this.login_password;
    this.salary;
    /*
     this.address;
     this.email;
     this.contact_cell;
     this.contact_office;*/
    this.contacts = new Array();
    this.image;
    this.gender;
    this.designation;
    this.joining_date;
    this.termination_date;
    this.manager;
    this.company_id;
    //this.department;
}

function roleClass() {
    this.id;
    this.name;
    this.privileges = new Array();
    this.company_id;
}

function privilegeClass() {
    this.id;
    this.name;
    this.role_id;
}

function contactClass() {
    this.id;
    this.type;
    this.value;
    this.user_id;
}

function userClass() {
    this.basic_information = new basic_info();
    this.documentCollection = new Array();
    this.todos = new Array();
    this.privileges = new Array();
}

function assetClass() {
    this.id;
    this.name;
    this.quantity;
    this.user_id;
}

function companyClass() {
    this.id;
    this.name;
    this.address;
    this.description;
    this.email;
    this.company;
    this.image;
    this.start_date;
    this.assets = new Array();
}

/*
 function adminClass(){
 this.id;
 this.login_id;
 this.login_password;
 this.company = new companyClass();
 }
 */


//defining event module's class below
function eventClass() {
    this.id;
    this.time;
    this.comment;
    this.user_id;
    this.event_id;
}

//defining attendance module's class below
function attendanceClass(){
    this.id;
    this.verifyMode;
    this.inOutMode;
    this.date_time;
    this.workcode;
    this.userId;
}

//defining emp monthly hours obj
function montlhyHoursClass() {
    this.daily_dates = new Array();
    this.daily_hours = new Array();
}


//defining leaves balance obj
function leavesBalanceClass(){
    this.leaves_type;
    this.total_leaves;
    this.availed_leaves;
    this.remaining_leaves;
}



function loader() {
    this.getUserByLogin = function (id, pass, res) {
        var user = new userClass();
        model.user.find({
            where: {
                login_id: id,
                login_password: pass
            }
        }).then(function (data) {

            user.id = data.id;
            user.basic_information.id = data.id;
            user.basic_information.first_name = data.first_name;
            user.basic_information.last_name = data.last_name;
            user.basic_information.login_id = data.login_id;
            user.basic_information.login_password = data.login_password;
            user.basic_information.salary = data.salary;
            /*user.basic_information.address=data.address;
             user.basic_information.email=data.email;
             user.basic_information.contact_cell=data.contact_cell;
             user.basic_information.contact_office=data.contact_office;*/
            user.basic_information.image = data.image;
            user.basic_information.gender = data.gender;
            user.basic_information.designation = data.designation;
            user.basic_information.joining_date = data.joining_date;
            user.basic_information.termination_date = data.termination_date;
            user.basic_information.manager = data.manager;
            user.basic_information.company_id = data.company_id;
            model.contact.findAll({
                where: {
                    user_id: user.basic_information.id
                }
            }).then(function (data1) {
                var contacts = new Array();
                data1.forEach(function (d) {
                    var contact = new contactClass();
                    contact.id = d.id;
                    contact.type = d.type;
                    contact.value = d.value;
                    contact.user_id = d.user_id;
                    contacts.push(contact);
                });
                user.basic_information.contacts = contacts;
                model.doc.findAll({
                    where: {
                        user_id: user.basic_information.id
                    }
                }).then(function (data2) {
                    var docs = new Array();
                    data2.forEach(function (d) {
                        var doc = new docClass();
                        doc.id = d.id;
                        doc.name = d.name;
                        doc.location = d.location;
                        doc.type = d.type;
                        docs.push(doc);
                    });
                    user.documentCollection = docs;
                    model.todo.findAll({
                        where: {
                            user_id: user.basic_information.id
                        }
                    }).then(function (data3) {
                        var todos = new Array();
                        data3.forEach(function (d) {
                            var todo = new todoClass();
                            todo.id = d.id;
                            todo.task = d.task;
                            todos.push(todo);
                        });
                        user.todos = todos;


                        data.getUser_roles().then(function (userRoleData) {

                            var roles = new Array();
                            var rolesArr = new Array();
                            var privArr = new Array();

                            userRoleData.forEach(function (userRoleItem) {

                                rolesArr.push(userRoleItem.role_id);
                                // console.log('User Roles :', rolesArr);

                            });

                            model.role_privilege.findAll({where: {role_id:{ $or: rolesArr }}}).then(function (rolePrivData) {

                                //console.log('User Roles  Priv:', rolePrivData);


                                var privileges = new Array();

                                rolePrivData.forEach(function (rolePrivItem) {

                                    privArr.push(rolePrivItem.privilege_id);

                                });
                              //  console.log('User Privs :', privArr);

                                model.privilege.findAll({where: {id:{ $or: privArr }} }).then(function (privData) {


                                    privData.forEach(function (privItem) {

                                        var privilege = new privilegeClass();

                                        privilege.id = privItem.id;
                                        privilege.name = privItem.name;
                                        privileges.push(privilege);

                                    });
                               //     console.log('User Roles  Priv:', privileges);

                                    user.privileges = privileges;

                                    res.json(user);

                                });

                                //res.json(privileges);

                            });


                        });

                        //res.json(user);

                    });
                });
            });
        });
    };

    this.getCheckInOutTime = function (user_id, year, res) {
        var checkInArr = new Array();
        var checkOutArr = new Array();
        model.event.findAll({
            //where: ["time LIKE ?", year + '%']   /*time LIKE ? and user_id = ?","2016%",user_id*/
            where: {user_id:user_id}
        }).then(function (data) {

            data.forEach(function (item) {

                //console.log('Date in DB is: ', item.time.getTime() / 1000);
                if (item.event_id == 0) {
                    checkInArr.push([item.time.getTime(), (item.time.getUTCHours() + (item.time.getUTCMinutes() / 60) + (item.time.getUTCSeconds() / 3600))]);
                }
                else if (item.event_id == 1) {
                    checkOutArr.push([item.time.getTime(), (item.time.getUTCHours() + (item.time.getUTCMinutes() / 60) + (item.time.getUTCSeconds() / 3600))]);
                }
            });

            res.json({checkIn: checkInArr, checkOut: checkOutArr});

        }, function (err) {
            console.log('Following Error Occured', err);
            res.json(err);
        });
    }


    //getting employee attendance hours for the given month by empId<START>
    this.getEmpHoursByMonth = function (empId, date, res) {
        var yearParam = getYearFromDateParam(date);
        var monthParam = getMonthFromDateParam(date);
        //defining "check-In/Out" array
        var checkInOutEvents = new Array();

        //monthly hours obj according to required format by bar-chart
        var empMonthlyHours = new montlhyHoursClass();

        //defining monthly dates and hours arrays below
        var monthly_dates = [];
        var monthly_hours = [];

        //find all checkIns and checkOuts by employee_id for any month
        model.event.findAll({
            where: {
                user_id: empId,
                event_id: {$in: [0, 1]},
                $and: [
                    sequelize.where(sequelize.fn('YEAR', sequelize.col('time')), yearParam),
                    sequelize.where(sequelize.fn('MONTH', sequelize.col('time')), monthParam)
                ]
            },
            order: 'time ASC'
        }).then(function (data) {
            //TODO
            data.forEach(function (d) {
                var event = new eventClass();
                event.id = d.id;
                event.time = d.time;
                event.comment = d.comment;
                event.user_id = d.user_id;
                event.event_id = d.event_id;
                checkInOutEvents.push(event);
            });

            //DOING THE WORK OF CALCULATIONS LIKE HOURS/DAY, VALID CHECK-IN, VALID-CHECKOUT PER DAY etc...
            for (var i = 0; i < checkInOutEvents.length; i++) {
                //checking for Valid and Invalid recs
                if (checkInOutEvents[i].event_id == 0 &&
                    (checkInOutEvents[i + 1] != null && checkInOutEvents[i + 1].event_id == 1)) {
                    //returning time difference(in hours) for VALID records.
                    /*monthly_dates.push(checkInOutEvents[i].time.getTime());*/
                    monthly_dates.push(calculateDateStr(checkInOutEvents[i]));
                    monthly_hours.push(calculateTimeDifferenceInHours(checkInOutEvents[i + 1], checkInOutEvents[i]));
                } else if (i == 0 && checkInOutEvents[i].event_id == 1) {
                    //IN-VALID FIRST CHECKOUT REC......
                    /*monthly_dates.push(checkInOutEvents[i].time.getTime());*/
                    monthly_dates.push(calculateDateStr(checkInOutEvents[i]));
                    monthly_hours.push(0);
                } else if (checkInOutEvents[i].event_id == 0 &&
                    ((checkInOutEvents[i - 1] != null && checkInOutEvents[i - 1].event_id == 0) ||
                    (checkInOutEvents[i].event_id == 0 && i == checkInOutEvents.length - 1)) ||
                    (checkInOutEvents[i].event_id == 0 && checkInOutEvents[i + 1] != null && checkInOutEvents[i + 1].event_id == 0)) {
                    //IN-VALID CHECKIN RECS - OR - INVALID LAST CHECKIN REC......
                    /*monthly_dates.push(checkInOutEvents[i].time.getTime());*/
                    monthly_dates.push(calculateDateStr(checkInOutEvents[i]));
                    monthly_hours.push(0);
                } else if ((checkInOutEvents[i].event_id == 1 &&
                    (checkInOutEvents[i - 1] != null && checkInOutEvents[i - 1].event_id == 1))) {
                    //IN-VALID CHECKOUT RECS - OR - INVALID LAST CHECKOUT REC......
                    /* monthly_dates.push(checkInOutEvents[i].time.getTime());*/
                    monthly_dates.push(calculateDateStr(checkInOutEvents[i]));
                    monthly_hours.push(0);
                } else {
                    continue;
                }
            }
            empMonthlyHours.daily_dates = monthly_dates;
            empMonthlyHours.daily_hours = monthly_hours;
            res.json(empMonthlyHours);
        });
    }//getting employee attendance hours for the given month by empId<END>


    //getting employee leaves status<START>
    this.getEmpLeavesStatus = function(empId, res){
        var employeeLeavesBalance = new Array();

        model.user_leaves_balance.findAll({
            where: {
                user_id: empId,
            },
            include: [{
                model: model.leaves_types
            }]
        }).then(function(data){
            data.forEach(function (d){
                var employeeLeaves = new leavesBalanceClass();
                employeeLeaves.leaves_type = d.leaves_type.name;
                employeeLeaves.total_leaves = d.total_leave;
                employeeLeaves.availed_leaves = d.availed_leave;
                employeeLeaves.remaining_leaves = d.available_leave;
                employeeLeavesBalance.push(employeeLeaves);
            });
            res.json(employeeLeavesBalance);
        });
    }
    //getting employee leaves status<END>


    //getting leaves types<START>
    this.getLeavesTypes = function(companyId, res){
        model.leaves_types.findAll({
            where: {
                company_id: companyId,
            }
        }).then(function(data){
            res.json(data);
        });
    }
    //getting leaves types<END>

    //getting user_leaves<START>
    this.getUserLeaves = function(userId, res){
        model.user_leaves.findAll({
            where: {
                user_id: userId
            },
            include: [{
                model: model.leaves_types
            }]
        }).then(function(data){
            res.json(data);
        });
    }
    //getting user_leaves<END>

}


function device() {
    this.getAttendanceFromDevice = function(ip, port, res) {

        console.log("----------------------- DEVICE START -----------------------");
        console.log("ip : "+ ip);
        console.log("port: "+ port);
        var device_conf = {
            IPAdd: ip,
            Portl: port
        };

        var timeRec = "_";
        var Connect_Net = edge.func({
            source: function() {/*

             using System;
             using System.Collections;
             using System.Collections.Generic;
             using System.Linq;
             using System.Text;
             using System.Threading.Tasks;

             public class Startup{

             public zkemkeeper.CZKEMClass axCZKEM1 = new zkemkeeper.CZKEMClass();
             public async Task<object> Invoke(dynamic input){

             Console.WriteLine("Device Info =>" + input.IPAdd+":"+input.Portl);

             bool conn = axCZKEM1.Connect_Net(input.IPAdd, input.Portl);
             Console.WriteLine("connected ???" + conn);

             //bool regEvent = axCZKEM1.RegEvent(1, 65535);
             //Console.WriteLine("Register the realtime events ???" + regEvent);

             bool read_data = axCZKEM1.ReadGeneralLogData(1);
             Console.WriteLine("read all the attendance records to the memory ???" + read_data);

             Queue<DTRecord> list = new Queue<DTRecord>();

             if (read_data) {
             int pk = 0;
             string user_id = "";
             int idwVerifyMode=0;
             int idwInOutMode=0;
             int idwYear=0;
             int idwMonth=0;
             int idwDay=0;
             int idwHour=0;
             int idwMinute=0;
             int idwSecond = 0;
             string time_stamp = "" ;
             int idwWorkcode = 0;

             while (axCZKEM1.SSR_GetGeneralLogData(1, out user_id, out idwVerifyMode, out idwInOutMode, out idwYear, out idwMonth, out idwDay, out idwHour, out idwMinute, out idwSecond, ref idwWorkcode)) {

             pk++;
             time_stamp = idwYear.ToString() + "-" + idwMonth.ToString() + "-" + idwDay.ToString() + " " + idwHour.ToString() + ":" + idwMinute.ToString() + ":" + idwSecond.ToString() ;
             //Console.WriteLine( pk.ToString() +" | "+ user_id +" | "+ idwVerifyMode.ToString() +" | "+ idwInOutMode.ToString() +" | "+ time_stamp +" | "+ idwWorkcode.ToString() );
             //if(pk > 11800){
             //Console.WriteLine(pk + " = " + user_id + " = "  + time_stamp);
             list.Enqueue(new DTRecord(pk, Convert.ToInt32(user_id), idwVerifyMode, idwInOutMode, time_stamp, idwWorkcode));
             //}
             }
             }
             axCZKEM1.Disconnect();

             //DTRecord one = (DTRecord)list.Dequeue();
             //Console.WriteLine(" testing : " + one.date_time);

             Object[] array = list.ToArray();

             Console.WriteLine(" Number of record : " + list.Count);
             return(array);
             }
             }

             public class DTRecord{

             public int id ;
             public int user_id ;
             public int verifyMode ;
             public int event_id ;
             public string time ;
             public int workcode ;

             public DTRecord(int id, int user_id, int verifyMode, int event_id, string time, int workcode){
             this.id = id ;
             this.user_id = user_id;
             this.verifyMode = verifyMode;
             this.event_id = event_id ;
             this.time = time;
             this.workcode = workcode;
             }
             }
             */
            },
            references: [ 'Interop.zkemkeeper.dll' ]
        });


        console.log("----------------------- DEVICE conf -----------------------");

        Connect_Net(device_conf, function (error, result) {
            //console.log(result[0]);
            timeRec = result ;
            //console.log(timeRec[0]);
            //model.event.truncate();
            model.event.bulkCreate(timeRec);
        });

    }

    this.getAttendanceFromDeviceAtStartup = function(ip, port) {

        console.log("----------------------- DEVICE START -----------------------");
        console.log("ip : "+ ip);
        console.log("port: "+ port);
        var device_conf = {
            IPAdd: ip,
            Portl: port
        };

        var timeRec = "_";
        var Connect_Net = edge.func({
            source: function() {/*

             using System;
             using System.Collections;
             using System.Collections.Generic;
             using System.Linq;
             using System.Text;
             using System.Threading.Tasks;

             public class Startup{

             public zkemkeeper.CZKEMClass axCZKEM1 = new zkemkeeper.CZKEMClass();
             public async Task<object> Invoke(dynamic input){

             Console.WriteLine("Device Info =>" + input.IPAdd+":"+input.Portl);

             bool conn = axCZKEM1.Connect_Net(input.IPAdd, input.Portl);
             Console.WriteLine("connected ???" + conn);

             //bool regEvent = axCZKEM1.RegEvent(1, 65535);
             //Console.WriteLine("Register the realtime events ???" + regEvent);

             bool read_data = axCZKEM1.ReadGeneralLogData(1);
             Console.WriteLine("read all the attendance records to the memory ???" + read_data);

             Queue<DTRecord> list = new Queue<DTRecord>();

             if (read_data) {
             int pk = 0;
             string user_id = "";
             int idwVerifyMode=0;
             int idwInOutMode=0;
             int idwYear=0;
             int idwMonth=0;
             int idwDay=0;
             int idwHour=0;
             int idwMinute=0;
             int idwSecond = 0;
             string time_stamp = "" ;
             int idwWorkcode = 0;

             while (axCZKEM1.SSR_GetGeneralLogData(1, out user_id, out idwVerifyMode, out idwInOutMode, out idwYear, out idwMonth, out idwDay, out idwHour, out idwMinute, out idwSecond, ref idwWorkcode)) {

             pk++;
             time_stamp = idwYear.ToString() + "-" + idwMonth.ToString() + "-" + idwDay.ToString() + " " + idwHour.ToString() + ":" + idwMinute.ToString() + ":" + idwSecond.ToString() ;
             //Console.WriteLine( pk.ToString() +" | "+ user_id +" | "+ idwVerifyMode.ToString() +" | "+ idwInOutMode.ToString() +" | "+ time_stamp +" | "+ idwWorkcode.ToString() );
             //if(pk > 11800){
             //Console.WriteLine(pk + " = " + user_id + " = "  + time_stamp);
             list.Enqueue(new DTRecord(pk, Convert.ToInt32(user_id), idwVerifyMode, idwInOutMode, time_stamp, idwWorkcode));
             //}
             }
             }
             axCZKEM1.Disconnect();

             //DTRecord one = (DTRecord)list.Dequeue();
             //Console.WriteLine(" testing : " + one.date_time);

             Object[] array = list.ToArray();

             Console.WriteLine(" Number of record : " + list.Count);
             return(array);
             }
             }

             public class DTRecord{

             public int id ;
             public int user_id ;
             public int verifyMode ;
             public int event_id ;
             public string time ;
             public int workcode ;

             public DTRecord(int id, int user_id, int verifyMode, int event_id, string time, int workcode){
             this.id = id ;
             this.user_id = user_id;
             this.verifyMode = verifyMode;
             this.event_id = event_id ;
             this.time = time;
             this.workcode = workcode;
             }
             }
             */
            },
            references: [ 'Interop.zkemkeeper.dll' ]
        });
        console.log("----------------------- DEVICE conf -----------------------");
        Connect_Net(device_conf, function (error, result) {
            timeRec = result ;
            model.event.bulkCreate(timeRec);
        });

    }

}


//Util functions to be removed and placed in proper files later<START>
function getYearFromDateParam(date) {
    var dateVals = date.split("-");
    var year = dateVals[0];
    return year;
}


function getMonthFromDateParam(date) {
    var dateVals = date.split("-");
    var month = (dateVals[1]);
    return month;
}


function calculateTimeDifferenceInHours(outData, inData) {
    var millis = Math.abs(outData.time - inData.time);
    var hours = millisToTime(millis);
    return hours;
}

function calculateDateStr(dateObj) {
    return dateObj.time.getFullYear() + '-' + (dateObj.time.getMonth()+1) + '-' + dateObj.time.getDate()
}


function millisToTime(millis) {
    var milliseconds = parseInt((millis % 1000) / 100);
    var seconds = parseInt((millis / 1000) % 60);
    var minutes = parseInt((millis / (1000 * 60)) % 60);
    var hours = parseInt((millis / (1000 * 60 * 60)) % 24);
    var dailyHours;

    minutes = (minutes * 100 / 60);//converting minutes to decimals(0.0-1.0)
    dailyHours = hours + "." + minutes;
    dailyHours = parseFloat(dailyHours);

    return dailyHours;
}
//Util functions to be removed and placed in proper files later<END>


var loader = new loader();
var device = new device();
//var todo = new todoClass();
//var user = new userClass();

//obj['todo']=todo;
//obj['user']=user;
obj['loader'] = loader;
obj['device'] = device;

module.exports = obj;