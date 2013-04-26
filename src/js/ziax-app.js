angular.module("ziax-app", [])


.run(function() {

})

.controller("home", ["$scope", "Storage", function($scope, Storage){
    var settings;

    settings = Storage.get();
    if (!settings) $("#showSettingsModel").modal();

}])

.controller("settings", ["$scope", "Storage", function($scope, Storage){
    $scope.form = {};
    $scope.submit = function() {
        Storage.set({apiKey: $scope.form.apiKey, database: $scope.form.database});
        $("#showSettingsModel").modal("hide");
    }
}])



.controller("test", ["$scope", "Storage", function($scope, Storage){

    $scope.get = function() {
         console.log(Storage.get());
    }

    $scope.set = function() {
            Storage.set({foo: "bar"});
    }
    $scope.del = function() {
            Storage.clear();
    }


}])


.service("Storage", [function(){
    var storage = chrome.storage.local;
    
    return {
        get: function(){ storage.get(function(items){ return items;  }); },
        set: function(obj){ storage.set(obj); },
        clear: function() { storage.clear(); }
    }
}])
;