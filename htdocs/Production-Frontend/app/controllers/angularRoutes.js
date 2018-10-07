/**
 * Created by Muhammad Annis on 11/21/2016.
 */
//var myApp = angular.module('myApp', ['ngRoute']);

// configure our routes
myApp.config(function($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'views/main.html',
            controller  : 'main'
        })
        .when('/login', {
            templateUrl : 'views/login.html',
            controller  : 'loginCont'
        })

        // route for the employee dashboard
        .when('/dashboard', {
            templateUrl : 'views/dashboard.html',
            controller  : 'mainController'
        })
        .when('/todo', {
            templateUrl : 'views/todo.html',
            controller  : 'todo'
        })
        .when('/editprofile', {
        templateUrl : 'views/editProfile.html',
        controller  : 'editprofile'
    })
        .when('/leavestatus', {
            templateUrl : 'views/leavesDictionary.html',
            controller  : 'leaves'
        })

        // route for the employee directory page
        .when('/empdir', {
            templateUrl : 'views/empdirectory.html',
            controller  : 'mainController'
        })

        // route for the user profile page
        .when('/profile', {
            templateUrl : 'views/userProfile.html',
            controller  : 'mainController'
        })
        // route for the user profile page from directory
        .when('/userProfileDir/:id', {
            templateUrl : 'views/userProfileDir.html',
            controller  : 'empProfileDir'
        })

        // route for the company profile page
        .when('/company', {
            templateUrl : 'views/companyProfile.html',
            controller  : 'companyCon'
        })
        // route for the company profile page
        .when('/documents', {
            templateUrl : 'views/documents.html',
            controller  : 'docsController'
        })
        // route for the companies directory
        .when('/compdir', {
            templateUrl : 'views/compDirectory.html',
            controller  : 'companyCon'
        })
        // route for the edit company info
        .when('/editCompInfo', {
            templateUrl : 'views/editCompanyProfile.html',
            controller  : 'companyCon'
        })
        // add new user
        .when('/addNewUser', {
            templateUrl : 'views/addNewUser.html',
            controller  : 'addUserController'
        })
        .when('/empleaves', {
            templateUrl : 'views/empleaves.html',
            controller  : 'manageEmpleaves'
        })
        // add new role
        .when('/addRole', {
            templateUrl : 'views/addRole.html',
            controller  : 'roleController'
        })
        // assign roles to user
        .when('/assignRole', {
            templateUrl : 'views/assignRoles.html',
            controller  : 'roleController'
        })
        // default Route
        .otherwise({
            redirectTo: '/dashboard'
        })

    //$locationProvider.html5Mode(true);

})
 myApp.run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
myApp.run(function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    })
})