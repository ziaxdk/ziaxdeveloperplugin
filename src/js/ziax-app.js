angular.module("ziax-app", [
    'ziax-app-mongo', 
    'ziax-app-browserStorage'
]).service("Settings", function () {
    var apiKey = "none", database = "NONE";
    return {
        apiKey: function () {
            return apiKey;
        },
        database: function () {
            return database;
        },
        setApiKey: function (key) {
            return apiKey = key;
        }
    };
}).controller("home", [
    "$scope", 
    "Storage", 
    "Mongo", 
    "Settings", 
    function ($scope, Storage, Mongo, Settings) {
        console.log("Settings is", Settings);
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
            Settings.setApiKey("123");
            console.log("Settings is", Settings);
        });
        $scope.del = function () {
        };
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
    "Settings", 
    "Mongo", 
    function ($scope, Storage, Settings, Mongo) {
        $scope.click = function () {
            console.log(Settings);
            Mongo.query();
        };
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
