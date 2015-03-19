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

    .controller('EntryUploadController', ['$log', '$scope','$q', 'gvodService', 'sweepService', 'AlertService', function ($log, $scope,$q, gvodService, sweepService, AlertService) {


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


        function _initializeLibrary() {

            gvodService.fetchFiles()

                .success(function (data) {
                    $log.info(data);
                    $scope.files = _reformatData(data);
                    $log.info($scope.files);
                    AlertService.addAlert({type: 'success', msg: 'Library Refreshed.'});
                })
                .error(function () {
                    $log.info("Unable to fetch files.");
                    AlertService.addAlert({type: 'warning', msg: 'Unable to Fetch the files.'});
                });
        }

        function _houseKeeping(data) {

            data.fileName = null;
            data.url = undefined;
            data.description = undefined;
            _resetFormStatus();
        }

        function _resetFormStatus() {
            $scope.entryAdditionForm.$setPristine();
        }

        function _initScope(scope) {

            // ==== INITIAL SETUP.

            scope.server = gvodService.getServer();
            scope.indexEntryData = {

                fileName:  null,
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

        
        
        $scope.submitIndexEntry = function() {

            if (this.entryAdditionForm.$valid) {

                var lastSubmitEntry = $scope.indexEntryData;
                var uploadObj = { name: lastSubmitEntry.fileName, overlayId: parseInt(lastSubmitEntry.url) };

                sweepService.addIndexEntry($scope.indexEntryData)

                    // Add Index entry successful.
                    .then(function (data) {

                        $log.info("Entry Addition successful in the system: " + data);
                        return gvodService.pendingUpload(uploadObj);
                    },
                    function (error) {
                        return $q.reject(error);
                    })

                    // Pending Upload Result Handling.
                    .then(function (success) {

                        $log.info("Got the pending upload success");
                        return gvodService.upload(uploadObj);

                    },
                    function (error) {
                        $log.info("Error pending upload: " + error);
                        return $q.reject(error);
                    })

                    // Gvod Upload Result Handling.
                    .then(function (success) {

                        $log.info("Index Upload Successful");

                        _houseKeeping($scope.indexEntryData);
                        _initializeLibrary();

                        AlertService.addAlert({type: 'success', msg: 'Upload Successful.'});
                    },
                    function (error) {
                        $log.info("Upload Result: " + error);
                        return $q.reject(error);
                    })

                    // Exception Handling.
                    .then(null, function (error) {
                        AlertService.addAlert({type: 'warning', msg: error});
                    })
            }
        };
        

        /**
         * Remove Entry from the Library.
         * @param entry
         */
        $scope.removeVideo = function(entry){

            AlertService.addAlert({type: 'info', msg: 'Functionality under development.'});
            if(entry != null && entry.fileName != null){
                //gvodService.removeVideo({name: entry.fileName, overlayId: -1});
            }
        };


        _initScope($scope);

    }]);
