/**
 * Created by babbarshaer on 2015-02-05.
 */



angular.module('app')

    .controller('SearchController',['$log','$scope', '$routeParams', 'sweepService', function($log, $scope, $routeParams, sweepService){
        
        function initScope(scope){

            scope.search={};
            scope.search.searchText = $routeParams.searchText;

            // Initialize Resources.
            // Initialize Video Resource.
            _search(scope.search.searchText);


            scope.$on('$destroy', function(){
                $log.info('Destroy the video player instance.');
            })

        }

        function _search(data){
            $log.info("Going to perform search for : " + data);
        }

        /**
         * Based on the text perform search. The value should be 
         * injected in the method, as it would help in testing.
         */
        
        $scope.performSearch = function(text){
            
            $log.info('Perform Search Invoked');
            
            sweepService.performSearch(text)
                
                .success(function(data){
                    $log.info('Sweep Service -> Successful');
                    $scope.result = data;
                })

                .error(function(data){
                    $log.info('Sweep Service -> Error');
                })
            
        };
        
        
        initScope($scope);
    }]);