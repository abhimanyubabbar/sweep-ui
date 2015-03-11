'use strict';

angular.module('app', [
    'ngRoute',
    'nvd3'
    ])
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
            .when('/statistics',{
                templateUrl: 'partials/statistics/basicScatterPlot.html',
                controller: 'StatisticsController'
            })
            .when('/video',{
                templateUrl: 'partials/video/video-js.html',
                controller: 'VideoController'
            })
            .otherwise({redirectTo: '/'})
    }]);