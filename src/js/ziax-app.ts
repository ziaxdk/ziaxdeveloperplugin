angular.module("ziax-app", ['ziax-app-mongo', 'ziax-app-browserStorage'])

    .controller("home", ["$scope", "Storage", "Mongo", ($scope, Storage, Mongo) => {
        $scope.settings = {};
        Storage.get(function(res){
            if (!res)   {
                $("#showSettingsModel").modal();
                return;
            }
            $scope.$emit("ready:settings", res);
        });

        $scope.$on("ready:settings", (evt, settings) => {
            $scope.settings = settings;
        });

        $scope.del = () => {
            Storage.clear();
            $scope.settings = {};
            toastr.info("deleted");
        }

        Mongo.get();

    }])

    .controller("settings", ["$scope", "Storage", ($scope, Storage) => {
        $scope.form = {};
        $scope.submit = function() {
            var settings = { apiKey: $scope.form.apiKey, database: $scope.form.database };
            Storage.set(settings).then((res) => {
                $scope.$emit("ready:settings", settings);
            });
            $("#showSettingsModel").modal("hide");
        }
    }])

    .controller("test", ["$scope", "Storage", ($scope, Storage) => {
    }])


    .run(["$rootScope", ($rootScope) => {
        toastr.info("Started");
        $rootScope.$watch("chrome.runtime.lastError", (n) => {
            if (!n) return;
            console.log(n);
            toastr.info(n);
        });
    }])
;