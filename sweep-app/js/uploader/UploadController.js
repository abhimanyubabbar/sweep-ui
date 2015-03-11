'use strict';

angular.module('app')

    .controller('UploadController', ['$log','$scope','common','gvodService', function($log,$scope, common, gvodService){

        function _initScope(scope){

            scope.routeTo = function(path){
                common.routeTo(path);
            };

            scope.server = gvodService.getServer();

            // Register a simple watcher on the returned value.
            scope.$on('server:updated', function(event,data){
                
                $log.info('server updated');
                $log.info(data);
                
                scope.$apply(function(){
                    scope.server = gvodService.getServer();
                })
                
            });
            
        }

        _initScope($scope);
    }]);
