'use strict';

angular.module('app')

    .controller('BoardHeaderController', ['$log', '$scope', 'common', function ($log, $scope, common) {

        function _initScope(scope) {

            $log.info('Board Header Controller Initialized.');
            scope.routeTo = function (path) {
                common.routeTo(path);
            }
        }

        _initScope($scope);

    }])

    .directive('fileUploader', ['$log', function ($log) {

        // Upload the file to the system.
        return{
            
            restrict: 'A',
            link: function (scope, element, attributes) {

                element.bind('change', function (changeEvent) {

                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {

                        var ymlJson = {
                            yml: loadEvent.target.result
                        };
                        $log.info(JSON.parse(loadEvent.target.result));
                        
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