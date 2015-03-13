'use strict';

angular.module('app')

    .controller('BoardHeaderController', ['$log', '$scope', 'common', function ($log, $scope, common) {

        function _initScope(scope) {

            $log.info('Board Header Controller Initialized.');
            scope.routeTo = function (path) {
                common.routeTo(path);
            };
            
            scope.searchObj ={
                searchTerm:  null
            };
        }
        
        
        $scope.search = function(searchTerm){
          
            if(this.searchForm.$valid){
                
                $log.info('search form valid');
                common.routeTo('/search/'+ Math.random());
                
            }
        };
        

        _initScope($scope);

    }])

    .directive('fileUploader', ['$log','gvodService', function ($log,gvodService) {

        // Upload the file to the system.
        return{
            
            restrict: 'A',
            link: function (scope, element, attributes) {

                element.bind('change', function (changeEvent) {

                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {

                        var serverData = {
                            info: loadEvent.target.result
                        };
                        
                        $log.info(JSON.parse(serverData.info));
                        gvodService.setServer(JSON.parse(serverData.info));
                        
                        element.val("");

                    };
                    //Assuming only single file read is allowed.
                    reader.readAsText(changeEvent.target.files[0]);
                });
            }
        }
    }])
    .directive('clickDirective', ['$log', function ($log) {

        return {
            restrict: 'A',
            link: function (scope, element, attributes) {

                element.bind('click', function (clickEvent) {
                    var uploaderElement = angular.element(document.querySelector("#fileUploader"));
                    uploaderElement.trigger('click');
                });

            }
        }

    }]);