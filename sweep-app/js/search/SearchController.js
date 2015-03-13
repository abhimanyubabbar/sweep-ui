/**
 * Created by babbarshaer on 2015-02-05.
 */



angular.module('app')

    .controller('SearchController',['$log','$scope','sweepService', function($log,$scope,sweepService){
        
        function initScope(scope){
            
            scope.searchText = null;
            scope.result = null;
            
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