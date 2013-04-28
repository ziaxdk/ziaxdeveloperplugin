angular.module("ziax-app", ['ziax-app-mongo', 'ziax-app-browserStorage'])

    .service("Settings", ()=>{
        var apiKey="none", database="NONE";
        return {
            apiKey: () => apiKey,
            database: () => database,
            setApiKey: (key)=>apiKey=key

        }
    })

    .controller("home", ["$scope", "Storage", "Mongo", "Settings", ($scope, Storage, Mongo, Settings) => {
        console.log("Settings is", Settings);

        $scope.settings = {};
        Storage.get(function (res) {
            if (!res) {
                $("#showSettingsModel").modal();
                return;
            }
            $scope.$emit("ready:settings", res);
        });

        $scope.$on("ready:settings", (evt, settings) => {
            $scope.settings = settings;

            //Settings.apiKey = "123";
            //Settings.database = "321";
            Settings.setApiKey("123");

            console.log("Settings is", Settings);
            //Mongo.query();
        });

        $scope.del = () => {
            //Storage.clear();
            //$scope.settings = {};
            //toastr.info("deleted");

        }


    }])

    .controller("settings", ["$scope", "Storage", ($scope, Storage) => {
        $scope.form = {};
        $scope.submit = function () {
            var settings = { apiKey: $scope.form.apiKey, database: $scope.form.database };
            Storage.set(settings).then((res) => {
                $scope.$emit("ready:settings", settings);
            });
            $("#showSettingsModel").modal("hide");
        }
    }])

    .controller("test", ["$scope", "Storage", "Settings", "Mongo", ($scope, Storage, Settings, Mongo) => {
        $scope.click = () =>{
            console.log(Settings);
            Mongo.query();

        }
    }])


    /*.service("Settings", [()=> {
        var apiKey = "!", database;
        return {
            apiKey: apiKey,
            database: database
        }
    }])*/
    /*.factory("Settings", [()=> {
     return (function () {
     var apiKey = "!", database;
     return {
     apiKey: apiKey,
     database: database
     }

     }());
     }])*/

    .run(["$rootScope", ($rootScope) => {
        toastr.info("Started");
        $rootScope.$watch("chrome.runtime.lastError", (n) => {
            if (!n) return;
            console.log(n);
            toastr.info(n);
        });
    }])
;