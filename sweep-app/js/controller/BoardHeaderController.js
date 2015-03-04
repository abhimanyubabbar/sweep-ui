'use strict';

angular.module('sweepMain')

    .controller('BoardHeaderController', ['$log', '$scope', function ($log, $scope) {
        
        function _initScope(scope) {
            $log.debug('Board Header Controller Initialized.');
        }
        
        _initScope($scope);
        
    }]);