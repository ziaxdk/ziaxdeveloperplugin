angular.module("ziax-app", [
    'ziax-app-mongo', 
    'ziax-app-browserStorage'
]).controller("home", [
    "$scope", 
    "Storage", 
    "Mongo", 
    function ($scope, Storage, Mongo) {
        $scope.settings = {
        };
        Storage.get(function (res) {
            if(!res) {
                $("#showSettingsModel").modal();
                return;
            }
            $scope.$emit("ready:settings", res);
        });
        $scope.$on("ready:settings", function (evt, settings) {
            $scope.settings = settings;
        });
        $scope.del = function () {
            Storage.clear();
            $scope.settings = {
            };
            toastr.info("deleted");
        };
        Mongo.get();
    }]).controller("settings", [
    "$scope", 
    "Storage", 
    function ($scope, Storage) {
        $scope.form = {
        };
        $scope.submit = function () {
            var settings = {
                apiKey: $scope.form.apiKey,
                database: $scope.form.database
            };
            Storage.set(settings).then(function (res) {
                $scope.$emit("ready:settings", settings);
            });
            $("#showSettingsModel").modal("hide");
        };
    }]).controller("test", [
    "$scope", 
    "Storage", 
    function ($scope, Storage) {
    }]).run([
    "$rootScope", 
    function ($rootScope) {
        toastr.info("Started");
        $rootScope.$watch("chrome.runtime.lastError", function (n) {
            if(!n) {
                return;
            }
            console.log(n);
            toastr.info(n);
        });
    }]);
//@ sourceMappingURL=ziax-app.js.map
