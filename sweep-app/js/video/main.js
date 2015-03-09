'use strict';
angular.module('myApp', [])
    
    .controller('VideoJsController', ['$scope', '$log', function($scope,$log){
        
        var precedingText = "http://localhost:";
        
        function _initScope(scope){
            
            // Initialize Player.
            scope.player = videojs('main_player',{}, function(){});
            scope.player.dimensions("100%", "100%");
            scope.player.controls(true);
            
            // Register Callbacks.
            scope.player.on('timeupdate', function(data){
//                $log.info("Time Update Received.");
//                $log.info(scope.player.bufferedPercent()+ " end: " + angular.toJson(scope.player.buffered().end(0))) ;
            });
            
            scope.player.on('seeking', function(data){
               $log.info("Seeking Player...");
                $log.info(data);
            });
            
            scope.linkForm = {
                linkGenerated: 'none'
            }
            
        }
        
        
        $scope.updateAndPlay = function(){

            if(this.dynamicLinkForm.$valid) {
                
                $log.info("Update and Play called.");
                $scope.linkForm.linkGenerated = precedingText.concat($scope.linkForm.port, "/", $scope.linkForm.name, "/", $scope.linkForm.name);

                if($scope.player != null){
                    
                    $scope.player.pause();
                    $scope.player.src($scope.linkForm.linkGenerated);
                    $scope.player.load();
                    $scope.player.play();
                    
                }
                
            }
            
        };
        
        
        
        _initScope($scope);

    }]);
