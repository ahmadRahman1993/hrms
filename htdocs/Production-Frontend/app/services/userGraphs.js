/**
 * Created by Muhammad Annis on 11/1/2016.
 */

var myApp = angular.module('graphsApp', []);

myApp
    .service('getDataSvc', ['$http',
        function ($http) {
            this.getDataFromUrl = function (url) {
                return $http.get(url);
            }
        }])

    .service('postDataSvc', ['$http',
        function ($http) {
        this.postDataToUrl = function (url, data) {
            return $http.post(url, data);
        }
    }])

    .service('postDocDataSvc', ['$http', 'Upload',
        function ($http, Upload) {

            this.postDocDataToUrl = function (url, file, id) {

                console.log("My files: ", file.type);

                return Upload.upload({
                    // POST REST URL
                    url: url,
                    // send filename to save
                    fileName: file.name,
                    data: id,
                    // and the file data
                    file: file
                });
            }
        }]);


