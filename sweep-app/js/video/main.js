'use strict';
angular.module('myApp', [
    "ngSanitize",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster"
])
    .controller('HomeCtrl', ['$log',"$sce","$scope", function ($log,$sce,$scope) {
        $scope.config = {
            sources: [
                {
                    src: $sce.trustAsResourceUrl("http://video-js.zencoder.com/oceans-clip.mp4"),
                    type: "video/mp4"
                }
            ],
            theme: "../../components/videogular-themes-default/videogular.css",
            plugins: {
                poster: "http://www.videogular.com/assets/images/videogular.png"
            }
        };
        
        
        
        $scope.onPlayerReady = function(API){
            $log.info('Player Initialized ... ');
            $log.info(API);
        };
        
        $scope.onUpdateTime = function(currentTime, duration){
            $log.info('onUpdateTime');
            $log.info("Current Time: " + currentTime + " Duration " + duration);
        }
        
    }]);