angular.module("ziax-app", ['mongolabResource', 'ngResource', 'ziax-app-chromeStorage'])

.controller("home", ["$scope", "Storage", function($scope, Storage){
    $scope.settings = {};
    Storage.get(function(res){
        if (!res)   {
            $("#showSettingsModel").modal();
            return;
        }
        $scope.$emit("ready:settings", res);
    });

    $scope.$on("ready:settings", function(evt, settings){
        $scope.settings = settings;
    });

    $scope.del = function() {
        Storage.clear();
        $scope.settings = {};
        toastr.info("deleted");
    }

}])

.controller("settings", ["$scope", "Storage", function($scope, Storage){
    $scope.form = {};
    $scope.submit = function() {
        var settings = { apiKey: $scope.form.apiKey, database: $scope.form.database };
        Storage.set(settings).then(function(res) {
            $scope.$emit("ready:settings", settings);
        });
        $("#showSettingsModel").modal("hide");
    }
}])

.controller("test", ["$scope", "Storage", function($scope, Storage){
}])


.run(["$rootScope", function($rootScope) {
    toastr.info("Started");
    console.log(chrome);
    $rootScope.$watch("chrome.runtime.lastError", function(n){
        if (!n) return;
        console.log(n);
        toastr.info(n);
    });
}])

/*.config(["StorageProvider", function(StorageProvider) {
    StorageProvider.setBrowserMode();
}])*/


/*.service("Storage", ["$q", function(q) {
    var storage = null;
    if (chrome && chrome.storage && chrome.storage.local) {
        storage = chrome.storage.local;
    }
    else {
        storage = {
            get: function(cb) { cb({apiKey:"Dummy", database:"Dummy"}) },
            set: function(){},
            clear: function(){}

        };
    }
    
    return {
        get: function(cb){  
            storage.get("settings", function(res){ cb(res.settings?res.settings:null)  }); 
        },
        set: function(obj){ 
            storage.set({ "settings": obj } ); 
        },
        clear: function() { 
            storage.clear(); 
        }
    }
}])*/
;