'use strict';

angular.module('app', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){

        $routeProvider

            .when('/',
            {
                templateUrl: 'partials/main/landing-page.html',
                controller: 'LandingController'
            })
            .when('/search',
            {
                templateUrl: 'partials/search/result.html',
                controller: 'SearchResultController'
            })
            .when('/upload-landing',
            {
                templateUrl: 'partials/uploader/upload-landing.html',
                controller: 'UploadController'
                
            })
            .when('/upload-main',
            {
                templateUrl: 'partials/uploader/upload-main.html',
                controller: 'UploadController'
            })
    }]);