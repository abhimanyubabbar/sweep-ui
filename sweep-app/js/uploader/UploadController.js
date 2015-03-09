'use strict';

angular.module('app')
    
    .controller('UploadController', ['$log','$scope','common', function($log,$scope, common){
        
        function _initScope(scope){
            
            scope.routeTo = function(path){
                common.routeTo(path);
            }
        }
        
        _initScope($scope);
    }]);
