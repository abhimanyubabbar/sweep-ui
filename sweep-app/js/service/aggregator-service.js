/**
 * Created by babbar on 2015-03-18.
 */


angular.module('app')

    .service('aggregatorService',['$log','$http', function($log, $http){

        // Default Objects.
        var _defaultMethod = 'PUT';
        var _defaultHeader = {'Content-Type': 'application/json'};
        var _defaultIp = "http://localhost:9100";


        function _getPromiseObject(method, url, headers, data){
            return $http({
                method: method,
                url: url,
                headers: headers,
                data: data
            })
        }

        return {

            getSystemsView : function(){
                var url = _defaultIp.concat("/systemstate");
                return _getPromiseObject('GET', url, _defaultHeader);
            },

            handshake : function(){
                var url = _defaultIp.concat("/handshake");
                return _getPromiseObject('GET', url, _defaultHeader);
            }

        }
    }]);
