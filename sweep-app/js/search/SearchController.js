/**
 * Created by babbarshaer on 2015-02-05.
 */



angular.module('app')

    .controller('SearchController', ['$log', '$scope', '$routeParams', 'sweepService', function ($log, $scope, $routeParams, sweepService) {


        function _getDummyResults() {

            return [
                {
                    fileName: 'Avengers: Age of Ultron',
                    uploaded: new Date(),
                    description: 'When Tony Stark tries to jumpstart a dormant peacekeeping program, things go awry and it is up to the Avengers to stop the villainous Ultron from enacting his terrible plans.'
                },
                {
                    fileName: 'Iris',
                    uploaded: new Date(),
                    description: 'A documentary about fashion icon Iris Apfel from legendary documentary filmmaker Albert Maysles.'
                },
                {
                    fileName: 'Cloud Atlas',
                    uploaded: new Date(),
                    description: 'An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution.'
                },
                {
                    fileName: 'Fight Club',
                    uploaded: new Date(),
                    description: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...'
                },
                {
                    fileName: 'The Dark Knight',
                    uploaded: new Date(),
                    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.'
                }

            ]
        }

        // Constructor method for the video player.
        function _initializePlayer(obj, playerName){

            obj = videojs (playerName,{}, function(){});
            obj.dimensions ("100%", "100%");
            obj.controls (true);

        }


        function initScope(scope) {

            scope.search = {};
            scope.search.searchText = $routeParams.searchText;
            scope.playerName = 'main_player';

            // Initialize Resources.
            _search(scope.search.searchText);

            scope.search.result = _getDummyResults();

            // Initialize Player.
            scope.player = videojs('main_player',{}, function(){});
            scope.player.dimensions("100%", "100%");
            scope.player.controls(true);

            // Destroy Player.
            scope.$on('$destroy', function () {
                $log.info('Destroy the video player instance.');
                if(scope.player != null){
                    scope.player.dispose();
                }
            })
        }

        function _search(data) {

            $log.info("Going to perform search for : " + data);
            //sweepService.performSearch(text)
            //
            //    .success(function (data) {
            //        $log.info('Sweep Service -> Successful');
            //        $scope.result = data;
            //    })
            //
            //    .error(function (data) {
            //        $log.info('Sweep Service -> Error');
            //    })
        }

        initScope($scope);

    }])

    .directive('searchResult', ['$log', function ($log) {
        return {
            restrict: 'AE',
            templateUrl: '/partials/search/search-result.html'
        }
    }]);