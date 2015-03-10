/**
 * Created by babbarshaer on 2015-02-02.
 */


// === GVOD - WEBSERVICE === //
// Core Service Module.

angular.module("app")

    .service("gvodService",['$log','$http',function($log,$http){

        var _defaultHost = "http://localhost:";
        var _defaultPort = "8100";
        var _defaultContentType = "application/json";

        // Get a promise object.
        function _getPromiseObject (method,url,contentType,data){

            return $http({
                method: method,
                url: url,
                headers: {'Content-Type': contentType},
                data: data
            });
        }

        return {

            // Play the resource.
            play : function(json){

                var method = "PUT";
                var url = _defaultHost.concat(_defaultPort).concat("/play");

                return _getPromiseObject(method,url,_defaultContentType,json);
            },


            download : function(json){

                var method = "PUT";
                var url = _defaultHost.concat(_defaultPort).concat("/downloadvideo");

                return _getPromiseObject(method,url,_defaultContentType,json);
            },

            // Fetch the files in the library.
            fetchFiles : function(){

                var method = "GET";
                var url = _defaultHost.concat(_defaultPort).concat("/files");

                return _getPromiseObject(method,url,_defaultContentType);
            },


            pendingUpload : function(json){

                var method = 'PUT';
                var url = _defaultHost.concat(_defaultPort).concat("/pendinguploadvideo");

                return _getPromiseObject(method, url, _defaultContentType, json);

            },

            upload : function(json){

                var method = 'PUT';
                var url = _defaultHost.concat(_defaultPort).concat("/uploadvideo");

                return _getPromiseObject(method, url, _defaultContentType, json);
            },

            stop : function(json){

                var method = 'PUT';
                var url = _defaultHost.concat(_defaultPort).concat("/stop");

                return _getPromiseObject(method, url, _defaultContentType, json);
            },
            
            playPos : function(json, port){
                
                var method = 'PUT';
                var url = _defaultHost.concat(port || _defaultPort).concat("/playPos");
                
                return _getPromiseObject(method, url, _defaultContentType,json);
            }


        }

    }]);

