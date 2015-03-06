'use strict';
angular.module('myApp', [])
    
//    .controller('HomeCtrl', ['$log',"$sce","$scope", function ($log,$sce,$scope) {
//
//        var precedingText = "http://localhost:";
//
//        function _initScope(scope){
//
//            scope.config = {
////                sources: [
////                    {
////                        src: $sce.trustAsResourceUrl("http://video-js.zencoder.com/oceans-clip.mp4"),
////                        type: "video/mp4"
////                    }
////                ],
//                theme: "../../components/videogular-themes-default/videogular.css",
//                plugins: {
//                    poster: "http://www.videogular.com/assets/images/videogular.png"
//                }
//            };
//
//            scope.onPlayerReady = function(API){
//                $log.info('Player Initialized');
//                $log.info(API);
//
//                scope.player ={
//                   API: API
//                }
//            };
//
//            scope.linkForm = {
//                linkGenerated : 'none'
//            }
//
//        }
//
//
//        $scope.updateAndPlay = function(){
//
//            if(this.dynamicLinkForm.$valid){
//                $log.info("Update and Play called.");
//                $scope.linkForm.linkGenerated = precedingText.concat($scope.linkForm.port , "/" , $scope.linkForm.name,"/",$scope.linkForm.name);
//
////                $scope.player.API.stop();
////                $scope.player.API.clearMedia();
//
//                $scope.player.API.changeSource([
//                    {
//                        src: $sce.trustAsResourceUrl($scope.linkForm.linkGenerated),
//                        type: "video/mp4"
//                    }
//                ]);
//                $scope.player.API.play();
//
//            }
//
//            else{
//                $log.info("Form Not Valid");
//            }
//
//
//        };
//
//        $scope.onUpdateTime = function(currentTime, duration){
//            $log.info('onUpdateTime');
//            $log.info("Current Time: " + currentTime + " Duration " + duration);
//        };
//
//
//        _initScope($scope);
//
//
//    }])
    
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
