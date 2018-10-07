/**
 * Created by Muhammad Annis on 10/25/2016.
 */
/*
 (function () {

 var chartApp = angular.module("chartApp", ['ngRoute', 'ngResource']);

 chartApp.config(['$routeProvider', function ($routeProvider) {

 $routeProvider.when('/others', {
 templateUrl: 'views/other.html',
 controller: 'chartController'

 }).otherwise({
 redirectTo: '/'
 });

 }]);

 var chartController = function ($scope, $http) {

 var onSuccess = function (response) {
 $scope.weatherData = response.data;
 console.log($scope.weatherData);
 };

 var onError = function (reason) {
 $scope.error = "Could not fetch the user";
 };

 $scope.getChart = function (cityId) {

 $http.get('').then(onSuccess, onError);
 }

 };

 chartApp.controller("chartController", ["$scope", "$http", chartController]);

 }());*/

//'use strict';
(function () {
    //var myApp = angular.module('myApp', ['graphsApp']);

    var HOST = 'http://192.168.1.142:3000';

    myApp.controller('monthlyAvgHrsController', ['$scope', 'getDataSvc',
        function ($scope, getDataSvc) {

            var date = new Date();
            var date_str = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate();

            getDataSvc.getDataFromUrl(HOST + "/employee/getEmpHoursByMonth/" + $scope.$parent.globals.currentUser.data.id + "/"+ date_str)
                .then(function (response) {

                    $scope.graphData = response.data;
                    console.log('dates from service :',$scope.graphData.daily_dates,response);

                    $scope.chartOptions = {
                        chart: {
                            type: 'column'
                        },

                        title: {
                            text: ''
                        },
                        /*title: {
                         text: 'Monthly Average Working Hours'
                         },
                         subtitle: {
                         text: 'October: 2016'
                         },*/
                        xAxis: {
                            categories: $scope.graphData.daily_dates,
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Hours'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} hrs</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        credits: {
                            enabled: false
                        },

                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: 'Hours Per Day',
                            data: $scope.graphData.daily_hours

                        }/*,
                         {
                         name: 'Break-in/out Per Day',
                         data: $scope.graphData.breakData

                         }*/
                        ]

                    };

                    Highcharts.chart('monthlyAvgHrs', $scope.chartOptions);
                })
                // handle error
                .catch(function (err) {
                    console.log('following error occured:', err);
                });
        }]);

    myApp.controller('checkInOutController', ['$scope', 'getDataSvc',
        function ($scope, getDataSvc) {

            var date = new Date();
            var date_str = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate();

            getDataSvc.getDataFromUrl(HOST + "/employee/getEmpCheckinOutTime/" + $scope.$parent.globals.currentUser.data.id + "/" + date.getFullYear())
                .then(function (response) {

                    $scope.checkInOutData = response.data;
                    Highcharts.setOptions({
                        global: {
                            useUTC: false
                        }
                    });

                    $scope.chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        /*title: {
                         text: 'Monthly Average Working Hours'
                         },
                         subtitle: {
                         text: 'November: 2016'
                         },*/
                        tooltip: {
                            pointFormat: '{point.series.name} : ' + "{point.x:%H:%M:%S}"
                        },
                        xAxis: {
                            type: 'datetime',
                            axisLabel: 'Date',
                            labels: {
                                format: '{value:%Y/%m/%d}',

                            },
                            tickInterval: 5,
                            showMaxMin: false,
                        },
                        /*yAxis: {
                         type: 'datetime',
                         dateTimeLabelFormats: {
                         day: '%H:%M:%S'
                         },
                         labels: {
                         formatter: function () {
                         console.log(this.value);
                         return Highcharts.dateFormat('%H:%M:%S', this.value);
                         }}
                         },*/

                        yAxis: {
                            type: 'datetime',
                            labels: {
                                enabled: false
                            }
                        },

                        credits: {
                            enabled: false
                        },

                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [
                            {
                                name: 'Check In',
                                data: $scope.checkInOutData.checkIn

                            },
                            {
                                name: 'Check Out',
                                data: $scope.checkInOutData.checkOut
                            }]
                    };

                    Highcharts.stockChart('checkInOut', $scope.chartOptions);
                })
                // handle error
                .catch(function (err) {
                    console.log('following error occured:', err);
                });
        }]);

    myApp.controller('mainController', ['$scope', 'getDataSvc', '$route', '$window','AuthenticationService',
        function ($scope, getDataSvc, $route, $window,AuthenticationService) {
            console.log( 'login main',$scope.$parent.globals.currentUser);
            var companyid = $scope.$parent.globals.currentUser.data.company_id;
            $scope.comp_id=companyid;
            $scope.privArray = new Array();
            $scope.getdata = function () {
                getDataSvc.getDataFromUrl(HOST + "/employee/getUser/" + $scope.$parent.globals.currentUser.username + "/" + $scope.$parent.globals.currentUser.password).then(function (response) {
                    $scope.$parent.globals.currentUser.globaldata=response.data;
                    $scope.userBasicInfo = response.data;
                    console.log('main response',response);
                    response.data.privileges.forEach(function (item) {
                        $scope.privArray.push(item.name);
                    });
                    console.log('priv array :',$scope.privArray);

                    $scope.$parent.globals.currentUser.globaldata.privArray = $scope.privArray;
                    getDataSvc.getDataFromUrl(HOST + "/employee/getCompany/" + companyid)
                        .then(function (response) {
                            $scope.compInfo = response.data;
                        })
                    AuthenticationService.SetGlobaldata($scope.$parent.globals.currentUser.globaldata);
                   // console.log('privs ',$scope.$parent.globals.currentUser.globaldata);
                    $scope.userBasicInfo = response.data;
                    $scope.new_user = {};

                    getDataSvc.getDataFromUrl(HOST + "/employee/getCompany/" + $scope.userBasicInfo.basic_information.company_id)
                        .then(function (response) {
                            $scope.compInfo = response.data;
                        })

                });
            }
            $scope.getAssets = function () {
                getDataSvc.getDataFromUrl(HOST + "/employee/getAssets/" + $scope.$parent.globals.currentUser.data.id).then(function (response) {
                    $scope.empAssets = response.data;
                });
            }
            $scope.getEmpDir = function () {
                getDataSvc.getDataFromUrl(HOST + "/employee/getUserDirectory/" + companyid).then(function (response) {
                    $scope.empDir = response.data;
                });

            }
            $scope.getEmpLeavesStatus = function () {
                getDataSvc.getDataFromUrl(HOST + "/employee/getEmpLeavesStatus/" + $scope.$parent.globals.currentUser.data.id).then(function (response) {
                    //   console.log("get getEmpLeavesStatus")
                    $scope.empLeavesStatus = response.data;


                });
            }
            $scope.openModal = function (user_id) {
                //  console.log(user_id);
                angular.element('#userDelModal').modal('show');
                $scope.delUserId = user_id;
            };

            $scope.deleteUser = function () {
                getDataSvc.getDataFromUrl(HOST + "/employee/deleteUser/" + $scope.delUserId)
                    .then(function (response) {

                        angular.element('#userDelModal').modal('hide');
                        $window.location.reload();

                    })// handle error
                    .catch(function (err) {
                        console.log('following error occured:', err);
                    });
            };
        }

    ]);
    myApp.controller('empProfileDir', ['$scope', 'getDataSvc', '$route', '$routeParams',
        function ($scope, getDataSvc, $routeParams) {
            var companyid = $scope.$parent.globals.currentUser.data.company_id;
            console.log($scope.$parent.globals.currentUser);
            $scope.empProfileDir = function () {
                $scope.empdata = getDataSvc.getDataFromUrl(HOST + "/employee/getUserDirectory/" + companyid).then(function (response) {
                    //   console.log(response.data[($routeParams.current.params.id) - 1]);
                    $scope.empDir = response.data[($routeParams.current.params.id) - 1];
                })// handle error
                    .catch(function (err) {
                        console.log('following error occured:', err);
                    });
            }
        }
    ]);
    myApp.controller('leaves', ['$scope', 'getDataSvc', 'postDataSvc', function ($scope, getDataSvc,postDataSvc)
    {
        $scope.leave=[];
        $scope.leave.status=null;
        $scope.leave.yearly_leaves=null;
        $scope.leave.name=null;
        $scope.leave.company_id=null;
        var companyid = $scope.$parent.globals.currentUser.data.company_id;
        $scope.leave.company_id = companyid;
        $scope.AddLeave = function () {
            postDataSvc.postDataToUrl(HOST + "/employee/addLeavesTypes", {
                status: $scope.leave.status,
                yearly_leaves: $scope.leave.yearly_leaves,
                name: $scope.leave.name,
                company_id: $scope.leave.company_id
            })
                .then(function (response) {
                    angular.element('#myModalHorizontal').modal('hide');
                    $scope.GetLeaves();
                    $scope.leave = [];
                })
                .catch(function (err) {
                    console.log('error', err);
                });
        }
        $scope.openModal = function (Leavename) {
            angular.element('#userDelModal').modal('show');
            $scope.delLeavename = Leavename;
        };
        $scope.openModalUpdate = function (upLname, uplstatus, uptleaves) {
            $scope.oldLname = upLname;
            $scope.upLname = upLname;
            $scope.uplstatus = uplstatus;
            $scope.uptleaves = uptleaves;
            angular.element('#myModalHorizontalUpdate').modal('show');
        };
        $scope.deleteLeave = function () {
            getDataSvc.getDataFromUrl(HOST + "/employee/deleteLeavesTypes/" + companyid + "/" + $scope.delLeavename)
                .then(function (response) {
                    angular.element('#userDelModal').modal('hide');
                    $scope.GetLeaves();

                })// handle error
                .catch(function (err) {
                    console.log('following error occured:', err);
                });
        };
        $scope.GetLeaves = function () {
            getDataSvc.getDataFromUrl(HOST + "/employee/getLeavesTypes/" + companyid)
                .then(function (response) {
                    $scope.Leaves = response.data;
                    //      console.log(response);
                })
                .catch(function (err) {
                    console.log('error', err);
                });
        }
        $scope.UpdateLeave = function () {

            postDataSvc.postDataToUrl(HOST + "/employee/updateLeavesTypes/" + companyid + "/" + $scope.oldLname, {
                status: $scope.uplstatus,
                yearly_leaves: $scope.uptleaves,
                name: $scope.upLname,
                company_id: companyid
            })
                .then(function (response) {
                    angular.element('#myModalHorizontalUpdate').modal('hide');
                    $scope.GetLeaves();

                })
                .catch(function (err) {
                    console.log('error', err);
                });
        }
    }
    ]);

    myApp.controller('todo', ['$scope', 'getDataSvc', 'postDataSvc','AuthenticationService',
        function ($scope, getDataSvc, postDataSvc,AuthenticationService) {
            $scope.userData = [];
            $scope.loadTodo = function () {
                $scope.formData = {};
                getDataSvc.getDataFromUrl(HOST + "/employee/getUser/" + $scope.$parent.globals.currentUser.username + "/" + $scope.$parent.globals.currentUser.password).then(function (response) {
                    $scope.todos = response.data.todos;
                    console.log('asdasdas',$scope.$parent.globals.currentUser.globaldata);
                    $scope.userData = response.data;
                })// handle error
                    .catch(function (err) {
                        console.log('following error occured:', err);
                    });
            }
            $scope.createTodo = function () {
                // clear the form so our user is ready to enter another
                $scope.formData.user_id = $scope.userData.basic_information.id;
                //         console.log($scope.formData)
                postDataSvc.postDataToUrl(HOST + "/employee/addTodo", $scope.formData)
                    .then(function (response) {
                                  console.log('success',response);
                        $scope.loadTodo();
                    })
                    .catch(function (err) {
                        console.log('error', err);
                    });
            }


            $scope.deleteTodo = function (id) {
                //         console.log(id);
                getDataSvc.getDataFromUrl(HOST + "/employee/deleteTodo/" + id)
                    .then(function (response) {
                        //     $scope.formData = {};
                        $scope.loadTodo();
                    })// handle error
                    .catch(function (err) {
                        console.log('following error occured:', err);
                    });
            };
        }
    ]);
    myApp.controller('editprofile', ['$scope', 'getDataSvc', 'postDataSvc',
        function ($scope, getDataSvc, postDataSvc) {
            $scope.userBasicInfo = [];
            $scope.availableOptions = [
                {name: 'Female'}, {name: 'Male'}
            ];
            $scope.getEmployeeData = function () {
                getDataSvc.getDataFromUrl(HOST + "/employee/getUser/" + $scope.$parent.globals.currentUser.username + "/" + $scope.$parent.globals.currentUser.password).then(function (response) {
                    $scope.userBasicInfo = response.data.basic_information;
                })// handle error
                    .catch(function (err) {
                        console.log('following error occured:', err);
                    });
            }
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            $scope.updatePatientInfo = function () {
                postDataSvc.postDataToUrl(HOST + "/employee/updateUser/" + $scope.userBasicInfo.id, $scope.userBasicInfo)
                    .then(function (response) {
                        console.log(response);
                        $scope.getEmployeeData();
                    })
                    .catch(function () {
                        console.log('error');
                    });
            }
            $scope.clearEmployeeInfo = function () {
              $scope.getEmployeeData();

            }
        }
    ]);

    myApp.controller('main', ['$scope', 'getDataSvc',
        function ($scope, getDataSvc, getmenus) {
            $scope.menus = [];
            getDataSvc.getDataFromUrl("menus.json").then(function (response) {
                $scope.menus = response.data.menus;
            })// handle error
                .catch(function (err) {
                    console.log('following error occured:', err);
                });
            $scope.changeClass = function (event) {
                var myEl = angular.element(event.currentTarget);
                var mye2 = angular.element('a>div.menu-button-text').children('active-arrow');
//                console.log(angular.element('#'+angular.element(mye2.prevObject[2].offsetParent).children('div')[0].id+'-sub-menu'));
                for (var i = 0; i < mye2.prevObject.length; i++) {
                    if (angular.element(mye2.prevObject[i].offsetParent).children('div')[0].id != event.currentTarget.id) {
                        angular.element(angular.element(mye2.prevObject[i].offsetParent).children('div')[0]).children('a').children('div').removeClass('active-arrow');
                        angular.element(mye2.prevObject[i].offsetParent).removeClass('active-arrow');
                        angular.element('#' + angular.element(mye2.prevObject[i].offsetParent).children('div')[0].id + '-sub-menu').hide();
                    }
                }
                if (myEl.children('a').children('div').hasClass('active-arrow')) {
                    myEl.children('a').children('div').removeClass('active-arrow');
                    angular.element('#full-black-width-row-one').hide();
                    angular.element('#full-black-width-row-two').hide();
                    angular.element('#' + event.currentTarget.id + '-sub-menu').hide();
                }
                else {
                    angular.element('#' + event.currentTarget.id + '-sub-menu').show();

                    if (event.currentTarget.id == 'menu-btn-2' || event.currentTarget.id == 'menu-btn-3' || event.currentTarget.id == 'menu-btn-4' || event.currentTarget.id == 'menu-btn-5' || event.currentTarget.id == 'menu-btn-6') {
                        if (event.currentTarget.id == 'menu-btn-2' || event.currentTarget.id == 'menu-btn-3') {
                            angular.element('#full-black-width-row-one').show();
                            angular.element('#full-black-width-row-two').hide();

                        }
                        if (event.currentTarget.id == 'menu-btn-4' || event.currentTarget.id == 'menu-btn-5' || event.currentTarget.id == 'menu-btn-6') {
                            angular.element('#full-black-width-row-two').show();
                            angular.element('#full-black-width-row-one').hide();

                        }
                    }
                    myEl.children('a').children('div').addClass('active-arrow');
                }
            }
        }
    ]);

    myApp.controller('docsController', ['$scope', 'postDocDataSvc', 'getDataSvc', 'FileSaver', 'Blob', '$window',
        function ($scope, postDocDataSvc, getDataSvc, FileSaver, Blob, $window) {

            $scope.getDocList = function () {
                getDataSvc.getDataFromUrl(HOST + "/employee/getUser/" + $scope.$parent.globals.currentUser.username + "/" + $scope.$parent.globals.currentUser.password)
                    .then(function (response) {
                        $scope.documentList = response.data.documentCollection;
                    })
                        .catch(function(err){
                            console.log(err);
                        });
                }

            $scope.formSubmit = function () {
                //    console.log("files: ", $scope.files);

                postDocDataSvc.postDocDataToUrl(HOST + "/employee/uploadDoc", $scope.files[0], $scope.$parent.globals.currentUser.data.id)
                    .then(function (data) {
                        //   console.log("saved file, public path: ", data);
                        $window.location.reload();
                    })

                };

                $scope.downloadDoc = function (doc_loc, doc_name, doc_type) {

                    getDataSvc.getDataFromUrl(HOST + "/employee/downloadFile/" + doc_loc).then(function (response) {


                        //console.log('Resp File :',response.data);

                        var blob = new Blob([response.data], {type: doc_type + ';charset=utf-8'});
                        //var fileName = response.headers('content-disposition');
                        FileSaver.saveAs(blob, doc_name);

                    })// handle error
                        .catch(function (err) {
                            console.log('following error occured:', err);
                        });
                };

                $scope.deleteDoc = function (del_attr) {

                //   console.log('New String received:', del_attr);

                    getDataSvc.getDataFromUrl(HOST + "/employee/deleteDoc/" + del_attr)
                        .then(function (response) {

                        angular.element('.modal').modal('hide');
                        //     console.log('data received back');
                        $window.location.reload();

                        })// handle error
                        .catch(function (err) {
                            console.log('following error occured:', err);
                        });
                };

                $scope.openModal = function (del_str) {
                    angular.element('.modal').modal('show');
                    $scope.delAttr = del_str;
                };

            }
            ]);

    myApp.controller('companyCon', ['$scope', 'getDataSvc', 'postDataSvc', '$window',
        function ($scope, getDataSvc, postDataSvc, $window) {

            var companyid = $scope.$parent.globals.currentUser.data.company_id;
            $scope.companyInfo = [];
            //   console.log($scope);
            getDataSvc.getDataFromUrl(HOST + "/employee/getCompany/" + companyid)
                .then(function (response) {
                    //    console.log(response);
                    $scope.companyInfo = response.data;
                })
            $scope.companyInfo = [];
            getDataSvc.getDataFromUrl(HOST + "/employee/getCompany/1")
            $scope.getCompInfo = function () {

                getDataSvc.getDataFromUrl(HOST + "/employee/getCompany/1")
                    .then(function (response) {
                        $scope.compInfo = response.data;
                    });
            };

            $scope.getCompDir = getDataSvc.getDataFromUrl(HOST + "/employee/getCompDir").then(function (response) {

                $scope.compDir = response.data;

            });

            $scope.updateCompInfo = function (comp_id) {

                postDataSvc.postDataToUrl(HOST + "/employee/updateCompany/" + comp_id, $scope.compInfo)
                    .then(function () {
                        $window.location.reload();
                    })
                    .catch(function (err) {
                        console.log('following error occured:', err);
                    });
            }

        }

    ]);

    myApp.controller('addUserController', ['$scope', 'postDataSvc', '$window', function ($scope, postDataSvc, $window) {

        $scope.createUser = function (company_id) {
            $scope.new_user.company_id = company_id;

            postDataSvc.postDataToUrl(HOST + "/employee/addUser", $scope.new_user)
                .then(function () {
                    //      console.log('success');
                    $window.location.reload();
                })
                .catch(function (err) {
                    console.log('Following error occured :', err);
                });
        }

    }]);

    myApp.controller('roleController', ['$scope', 'getDataSvc', 'postDataSvc', '$window',
        function ($scope, getDataSvc, postDataSvc, $window) {

            $scope.role = {
                roles: [],
                role_id: 0,
                name: "",
                company_id: $scope.$parent.globals.currentUser.data.company_id
            };

            $scope.user = {
                role_ids: [],
                user_id: 0
            };

            $scope.setRole = function () {

                if($scope.role.roles == ''){
                    $window.alert('Please select atleast one privilige !');
                }
                else {

                postDataSvc.postDataToUrl(HOST + "/employee/addRole", $scope.role).then(function (resp) {

                    $scope.role.role_id = resp.data;

                    postDataSvc.postDataToUrl(HOST + "/employee/addMultiRolePrivilege", $scope.role).then(function (data) {
                        console.log('role and privs assigned successfully');
                        $window.location.reload();
                    }).catch(function () {

                    });

                }).catch(function () {

                });
            }
            };

            $scope.getPrivsByRoleId = function () {
                $scope.role.roles = [];
                getDataSvc.getDataFromUrl(HOST + "/employee/getPrivForRole/" + $scope.role.role_id)
                    .then(function (response) {

                        console.log('response from backend is :',response.data);
                        response.data.forEach(function (item) {
                            $scope.role.roles.push(item.id);
                        });

                        //$scope.privArray = response.data;

                    })// handle error
                    .catch(function (err) {
                        console.log('following error occured:', err);
                    });
            };

            $scope.updateRole = function () {
                if($scope.role.roles == ''){
                    $window.alert('Please select atleast one privilige !');
                }
                else {
                    postDataSvc.postDataToUrl(HOST + "/employee/updateRolePrivilege/"+$scope.role.role_id, $scope.role)
                        .then(function () {
                            $window.location.reload();
                        })
                        .catch(function (err) {
                            console.log('following error occured:', err);
                        });
                }
            };

            $scope.getAllPrivs = function () {
                getDataSvc.getDataFromUrl(HOST + "/employee/getPrivileges").then(function (privData) {
                    $scope.privArray = privData.data;

                }).catch(function (err) {
                    console.log(err)
                });

                this.getRoles();
            };

            $scope.getUsers = function () {
                getDataSvc.getDataFromUrl(HOST + "/employee/getUserDirectory/" + $scope.$parent.globals.currentUser.data.company_id)
                    .then(function (response) {
                        $scope.userslist = response.data;

                    })// handle error
                    .catch(function (err) {
                        console.log('following error occured:', err);
                    });

                this.getRoles();

            };

            $scope.setUserRoles = function () {

                if ($scope.user.role_ids == '')
                    $window.alert('please select role !');

                else {

                    postDataSvc.postDataToUrl(HOST + "/employee/addUserRoles", $scope.user).then(function (resp) {
                        console.log(resp.data);
                        $window.location.reload();
                    }).catch(function () {

                    });
                };
            };

            $scope.getUserRoles = function () {
                $scope.user.role_ids = [];

                getDataSvc.getDataFromUrl(HOST + "/employee/getRoleIdsByUser/" + $scope.user.user_id)
                    .then(function (response) {
                        response.data.forEach(function (item) {
                            $scope.user.role_ids.push(item.role_id);
                        });

                        //$scope.privArray = response.data;

                    })// handle error
                    .catch(function (err) {
                        console.log('following error occured:', err);
                    });

            };

            $scope.getRoles = function () {
                getDataSvc.getDataFromUrl(HOST + "/employee/getRoles/" + $scope.$parent.globals.currentUser.data.company_id)
                    .then(function (response) {
                        $scope.rolesList = response.data;

                    })// handle error
                    .catch(function (err) {
                        console.log('following error occured:', err);
                    });
            };

            $scope.checkAll = function () {
                $scope.role.roles = $scope.privArray.map(function (item) {
                    return item.id;
                });
            };
            $scope.uncheckAll = function () {
                $scope.role.roles = [];
            };

            $scope.checkAllRoles = function () {
                $scope.user.role_ids = $scope.rolesList.map(function (item) {
                    return item.id;
                });
            };
            $scope.uncheckAllRoles = function () {
                $scope.user.role_ids = [];
            };

        }

    ]);

    myApp.controller('loginCont', ['$scope', 'getDataSvc', '$location', 'AuthenticationService', 'FlashService',
        function ($scope, getDataSvc, $location, AuthenticationService, FlashService) {
            (function initController() {
                // reset login status
                AuthenticationService.ClearCredentials();
            })();
            $scope.usd = [];
            $scope.usd.username = '';
            $scope.usd.password = '';
            $scope.GlobalData={}
            $scope.login = function () {
                dataLoading = true;
                AuthenticationService.Login($scope.usd.username, $scope.usd.password, function (response) {
                    if (response.success) {
                        $scope.UserData = response.data
                        getDataSvc.getDataFromUrl(HOST + "/employee/getUser/" + $scope.usd.username + "/" +$scope.usd.password).then(function (responses) {
                            $scope.GlobalData=responses.data;
                        })
                                .catch(function(err){
                                    console.log('error',err);
                                });
                        AuthenticationService.SetCredentials($scope.usd.username, $scope.usd.password, response.data,$scope.GlobalData);
                        $location.path('/');
                    } else {
                        FlashService.Error(response.message);
                        dataLoading = false;
                    }
                });
            };

        }]);
    myApp.controller('manageEmpleaves', ['$scope', 'getDataSvc', 'postDataSvc', function ($scope, getDataSvc, postDataSvc) {
        $scope.empleavedir = [];
        $scope.leaveType = [];
        var companyid = $scope.$parent.globals.currentUser.data.company_id;
        $scope.getLeaveEmpDir = function () {
            getDataSvc.getDataFromUrl(HOST + "/employee/getUserDirectory/" + companyid)
                .then(function (response) {
                    $scope.empleavedir = response.data;
                })
                .catch(function (err) {
                    console.log('error', err);
                });
        }
        $scope.leaveType = []
        $scope.GetLeaves = function () {
            getDataSvc.getDataFromUrl(HOST + "/employee/getLeavesTypes/" + companyid)
                .then(function (response) {
                    $scope.leaveType = response.data;
                })
                .catch(function (err) {
                    console.log('error', err);
                });
        }
        $scope.GetLeaves();
        $scope.employee = [];

        $scope.employee.leavetype = [];
        $scope.openModalleaveUpdate = function (modUserid) {

            $scope.GetLeavestypes = function () {
                getDataSvc.getDataFromUrl(HOST + "/employee/getEmpLeavesStatus/" + modUserid)
                    .then(function (response) {
                        $scope.employee.leavetype = response.data;
                        // console.log(response);
                    })
                    .catch(function (err) {
                        console.log('error', err);
                    });
            };

            $scope.onLeaveChange = function (lname) {
                $scope.boolleave = false;
                $scope.employee.leavetype.sel = [];
                $scope.leaveType.forEach(function (item) {
                    if (item.id == lname) {
                        $scope.employee.leavetype.sel.id = item.id;
                        $scope.employee.leavetype.sel.name = item.name;
                    }
                })
                $scope.employee.leavetype.forEach(function (item) {
                    if (item.leaves_type == $scope.employee.leavetype.sel.name) {
                        $scope.employee.leavetype.sel.availed_leave = item.availed_leaves;
                        $scope.employee.leavetype.sel.leaves_type = item.leaves_type;
                        $scope.employee.leavetype.sel.available_leave = item.remaining_leaves;
                        $scope.employee.leavetype.sel.total_leave = item.total_leaves;
                        $scope.boolleave = true;
                    }
                });
            }
            $scope.updateLeaveChange = function (name) {
                if (!$scope.boolleave) {
                    //  console.log($scope.employee.leavetype.sel);
                    postDataSvc.postDataToUrl(HOST + "/employee/addUserLeavesBalance", {
                        total_leave: $scope.employee.leavetype.sel.total_leave,
                        available_leave: $scope.employee.leavetype.sel.available_leave,
                        availed_leave: $scope.employee.leavetype.sel.availed_leave,
                        comments: "",
                        user_id: modUserid,
                        leaves_type_id: $scope.employee.leavetype.sel.id
                    })
                        .then(function (response) {
                            angular.element('#myModalLeaveBalUpdate').modal('hide');
                            //  $scope.GetLeavestypes();
                        })
                        .catch(function (err) {
                            console.log('error', err);
                        });
                } else {
                    postDataSvc.postDataToUrl(HOST + "/employee/updateUserLeavesBalance/" + modUserid + "/" + $scope.employee.leavetype.sel.id, {
                        total_leave: $scope.employee.leavetype.sel.total_leave,
                        available_leave: $scope.employee.leavetype.sel.available_leave,
                        availed_leave: $scope.employee.leavetype.sel.availed_leave,
                        comments: "",
                        user_id: modUserid,
                        leaves_type_id: $scope.employee.leavetype.sel.id
                    })
                        .then(function (response) {
                            angular.element('#myModalLeaveBalUpdate').modal('hide');
                        })
                        .catch(function (err) {
                            console.log('error', err);
                        });
                }

            }
            $scope.GetLeavestypes();

            angular.element('#myModalLeaveBalUpdate').modal('show');
        }
        $scope.Empleavedata = [];
        $scope.GetEmpLeavesdata = function (empid) {
            getDataSvc.getDataFromUrl(HOST + "/employee/getUserLeaves/" + empid)
                .then(function (response) {
                    $scope.Empleavedata = response.data;

                })
                .catch(function (err) {
                    console.log('error', err);
                });
        };
        $scope.openModalleave = function (modUseridL) {
            $scope.UpdateEmployeeLeaveData = [];
            $scope.GetEmpLeavesdata(modUseridL);
            angular.element('#myModalLeave').modal('show');
            $scope.AdduserLeavemodal = function () {
                console.log(modUseridL, "addd meee 123");
                angular.element('#userLeaveAddModal').modal('show');
                $scope.AddEmployeeLeaveData = [];
                $scope.SaveAdduserLeavemodal = function () {
                    // var dnewUserLeave=new Date($scope.AddEmployeeLeaveData.leave_date);
                    // console.log(modUseridL, "SaveAdduserLeavemodal ", dnewUserLeave.getDate(),$scope.AddEmployeeLeaveData.leave_date.getDate());
                    postDataSvc.postDataToUrl(HOST + "/employee/addUserLeaves/", {
                        leaves_type_id: $scope.AddEmployeeLeaveData.Type,
                        comments: $scope.AddEmployeeLeaveData.comments,
                        user_id:modUseridL,
                        leave_date: ($scope.AddEmployeeLeaveData.leave_date.getFullYear() + "-" + ( $scope.AddEmployeeLeaveData.leave_date.getMonth() + 1) + "-" +  $scope.AddEmployeeLeaveData.leave_date.getDate()),
                        leave_deduction: $scope.AddEmployeeLeaveData.leave_deduction
                    })
                        .then(function (response) {
                            console.log(response);
                            $scope.GetEmpLeavesdata(modUseridL);
                            angular.element('#userLeaveAddModal').modal('hide');
                        })
                        .catch(function (err) {
                            console.log('error', err);
                        });
                }
            }
            $scope.AdduserLeavemodalClose = function () {
                console.log(modUseridL, "addd meee close");
                angular.element('#userLeaveAddModal').modal('hide');
            }
            $scope.ff = function (id) {
                $scope.Empleavedata.forEach(function (item) {
                    if (item.id == id) {
                        var dolds = new Date(item.leave_date);
                        $scope.UpdateEmployeeLeaveData.leave_date = dolds.getFullYear() + "-" + (dolds.getMonth() + 1) + "-" + dolds.getDate();
                        $scope.UpdateEmployeeLeaveData.leave_dateold = item.leave_date;
                        $scope.UpdateEmployeeLeaveData.leave_deduction = item.leave_deduction;
                        $scope.UpdateEmployeeLeaveData.comments = item.comments;
                        $scope.UpdateEmployeeLeaveData.user_id = modUseridL;
                        $scope.UpdateEmployeeLeaveData.leaves_type_id = item.leaves_type_id;
                        $scope.UpdateEmployeeLeaveData.name = item.leaves_type.name;
                    }
                });
                angular.element('#myModalLeaves').modal('show');
            }
            $scope.ffdel = function (date) {
                angular.element('#userDelModal').modal('show');

                var ddatesffdel = new Date(date);
                console.log(ddatesffdel.getFullYear() + "-" + (ddatesffdel.getMonth() + 1) + "-" + ddatesffdel.getDate());
                $scope.delUserLeave = function () {
                    getDataSvc.getDataFromUrl(HOST + "/employee/deleteUserLeaves/" + ddatesffdel.getFullYear() + "-" + (ddatesffdel.getMonth() + 1) + "-" + ddatesffdel.getDate() + "/" + modUseridL)
                        .then(function (response) {
                            console.log(response);
                            $scope.GetEmpLeavesdata(modUseridL);
                        })
                        .catch(function (err) {
                            console.log('error', err);
                        });

                    angular.element('#userDelModal').modal('hide');
                };
            }
            $scope.closedelUserLeave = function () {
                angular.element('#userDelModal').modal('hide');
            }
            $scope.FuncUpdateEmployeeLeaveData = function () {
                $scope.leaveType.forEach(function (item) {
                    if (item.name == $scope.UpdateEmployeeLeaveData.name) {
                        $scope.UpdateEmployeeLeaveData.leaves_type_id = item.id;
                    }
                })
                var dold = new Date($scope.UpdateEmployeeLeaveData.leave_dateold);
                postDataSvc.postDataToUrl(HOST + "/employee/updateUserLeaves/" + dold.getFullYear() + "-" + (dold.getMonth() + 1) + "-" + dold.getDate() + "/" + modUseridL, {
                    leave_date: $scope.UpdateEmployeeLeaveData.leave_date,
                    leave_deduction: $scope.UpdateEmployeeLeaveData.leave_deduction,
                    comments: $scope.UpdateEmployeeLeaveData.comments,
                    user_id: $scope.UpdateEmployeeLeaveData.user_id,
                    leaves_type_id: $scope.UpdateEmployeeLeaveData.leaves_type_id
                })
                    .then(function (response) {
                        console.log(response);
                        $scope.GetEmpLeavesdata(modUseridL);
                    })
                    .catch(function (err) {
                        console.log('error', err);
                    });
                angular.element('#myModalLeaves').modal('hide');
            }
            $scope.HidemyModalLeaves = function () {
                angular.element('#myModalLeaves').modal('hide');
            }
        }

    }
    ]);
}());