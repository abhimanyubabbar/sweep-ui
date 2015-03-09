'use strict';

angular.module('app')

    .controller('BoardHeaderController', ['$log', '$scope','common', function ($log, $scope, common) {

        function _initScope(scope) {
            
            $log.info('Board Header Controller Initialized.');
            scope.routeTo = function(path){
                common.routeTo(path);
            }
        }
        
        _initScope($scope);
        
    }]);