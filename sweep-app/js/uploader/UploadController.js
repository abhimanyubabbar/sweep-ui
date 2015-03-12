'use strict';

angular.module('app')
    
    .filter('waitingUpload',['$log', function($log){
        
        return function(data){
            var filteredData = [];
            
            if(data != null){
                for( var i =0 ; i < data.length; i++ ){
                    
                    if(data[i]["status"] === "NONE"){
                        filteredData.push(data[i]);
                    }
                    
                }
            }
            return filteredData;
        }
        
    }])

    .filter('uploaded',['$log', function($log){

        return function(data){
            var filteredData = [];

            if(data != null){
                for( var i =0 ; i < data.length; i++ ){

                    if(data[i]["status"] !== "NONE"){
                        filteredData.push(data[i]);
                    }
                }
            }
            return filteredData;
        }

    }])

    .controller('UploadController', ['$log','$scope','common','gvodService', function($log,$scope, common, gvodService){

        function _initScope(scope){

            scope.routeTo = function(path){
                common.routeTo(path);
            };
            
        }

        _initScope($scope);
    }])
    
    .controller('EntryUploadController',['$log', '$scope','gvodService','sweepService',function($log,$scope,gvodService,sweepService){

        
        // UTILITY FUNCTION.
        function _reformatData(data){

            var list = [];
            var isCheckSet = false;

            for(var key in data){

                var obj = {};
                obj["name"] = key;
                obj["status"] = data[key];

                if(!isCheckSet && obj["status"] === "NONE"){
                    // Set the checked flag.
                    obj["isChecked"] = true;
                    isCheckSet = true;

                    // Update the initial entry in the table.
                    $scope.indexEntryData["fileName"] = obj["name"];
                }
                else{
                    obj["isChecked"] = false;
                }
                list.push(obj);
            }
            return list;
        }
        

        
        function _initScope(scope){

            // ==== INITIAL SETUP.
            
            scope.server = gvodService.getServer();
            scope.indexEntryData ={

                fileName: 'none',
                language:'English',
                fileSize: 1,
                category: 'Video'
            };

            gvodService.fetchFiles()
            
                .success(function(data){
                    $log.info(data);
                    scope.files = _reformatData(data);
                    $log.info(scope.files); 
                })
                .error(function(data){
                    $log.info("Unable to fetch files.");
                });
                
            
             // ==== EVENTS REGISTRATION.
            scope.$on('server:updated', function(event,data){

                $log.info('server updated');
                $log.info(data);

                scope.$apply(function(){
                    scope.server = gvodService.getServer();
                })

            });
        }
        
        
        
        $scope.submitIndexEntry = function(){
            
            var lastSubmitEntry = $scope.indexEntryData;
            sweepService.addIndexEntry($scope.indexEntryData)
                
                .success(function(data){
                    $log.info('Entry Successfully added in the system');
                })
                .error(function(data){
                    $log.info('Addition of Index Entry Failed.');
                })
        };
        
        
        _initScope($scope);
        
    }]);
