'use strict';

angular.module('sweepMain')

    .controller('UploaderController', ['$log', '$scope', function ($log, $scope) {
        
        function _initScope(scope) {
            $log.debug('Uploader Controller Initialized.');
        }
        
        _initScope($scope);
        
    }]);