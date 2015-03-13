'use strict';

angular.module('app')

    .filter('waitingUpload', ['$log', function ($log) {

        return function (data) {
            var filteredData = [];

            if (data != null) {
                for (var i = 0; i < data.length; i++) {

                    if (data[i]["status"] === "NONE") {
                        filteredData.push(data[i]);
                    }

                }
            }
            return filteredData;
        }

    }])

    .filter('uploaded', ['$log', function ($log) {

        return function (data) {
            var filteredData = [];

            if (data != null) {
                for (var i = 0; i < data.length; i++) {

                    if (data[i]["status"] !== "NONE") {
                        filteredData.push(data[i]);
                    }
                }
            }
            return filteredData;
        }

    }])

    .controller('UploadController', ['$log', '$scope', 'common', 'gvodService', function ($log, $scope, common, gvodService) {

        function _initScope(scope) {

            scope.routeTo = function (path) {
                common.routeTo(path);
            };

        }

        _initScope($scope);
    }])

    .controller('EntryUploadController', ['$log', '$scope', 'gvodService', 'sweepService','AlertService', function ($log, $scope, gvodService, sweepService, AlertService) {


        // UTILITY FUNCTION.
        function _reformatData(data) {

            var list = [];
            var isCheckSet = false;

            for (var key in data) {

                var obj = {};
                obj["name"] = key;
                obj["status"] = data[key];

                if (!isCheckSet && obj["status"] === "NONE") {
                    // Set the checked flag.
                    obj["isChecked"] = true;
                    isCheckSet = true;

                    // Update the initial entry in the table.
                    $scope.indexEntryData["fileName"] = obj["name"];
                }
                else {
                    obj["isChecked"] = false;
                }
                list.push(obj);
            }
            return list;
        }


        function _initializeLibrary(){

            gvodService.fetchFiles()

                .success(function (data) {
                    $log.info(data);
                    $scope.files = _reformatData(data);
                    $log.info($scope.files);
                    AlertService.addAlert({type:'success', msg: 'Library Refreshed.'});
                })
                .error(function () {
                    $log.info("Unable to fetch files.");
                    AlertService.addAlert({type: 'warning', msg: 'Unable to Fetch the files.'});
                });
        }

        function _houseKeeping(data){

            data.fileName = 'none';
            data.url = undefined;
            data.description = undefined;
            _resetFormStatus();
        }

        function _resetFormStatus(){
            $scope.entryAdditionForm.$setPristine();
        }

        function _initScope(scope) {

            // ==== INITIAL SETUP.

            scope.server = gvodService.getServer();
            scope.indexEntryData = {

                fileName: 'none',
                language: 'English',
                fileSize: 1,
                category: 'Video'
            };

            _initializeLibrary();


            // ==== EVENTS REGISTRATION.
            scope.$on('server:updated', function (event, data) {

                $log.info('server updated');
                $log.info(data);

                scope.$apply(function () {
                    
                    scope.server = gvodService.getServer();
                    AlertService.addAlert({type: 'success', msg: 'Server Details Updated.'});
                    
                    _initializeLibrary();
                })

            });
        }


        $scope.submitIndexEntry = function () {

            if(this.entryAdditionForm.$valid){

                var lastSubmitEntry = $scope.indexEntryData;
                //sweepService.addIndexEntry($scope.indexEntryData)
                //
                //    .success(function(data){
                //        $log.info('Entry Successfully added in the system');
                //    })
                //    .error(function(data){
                //        $log.info('Addition of Index Entry Failed.');
                //    })

                var uploadObj = {
                    name: lastSubmitEntry.fileName,
                    overlayId: parseInt(lastSubmitEntry.url)
                };

                gvodService.upload(uploadObj)

                    .success(function (data) {

                        $log.info("Entry successfully loaded");
                        $log.info(data);
                        
                        AlertService.addAlert({type: 'success', msg: 'Upload Successful'});
                        
                        _houseKeeping($scope.indexEntryData);
                        _initializeLibrary();

                    })

                    .error(function (data) {
                        $log.info("Entry Upload Aborted.");
                    })
            }
        };


    _initScope($scope);

}]);
