angular.module("ziax-app-browserStorage", []).service("Storage", [
    "$q", 
    "$timeout", 
    function ($q, $timeout) {
        var safe = function (cb) {
            $timeout(cb);
        };
        return {
            get: function (cb) {
                safe(function () {
                    cb(angular.fromJson(localStorage.getItem("settings")));
                });
            },
            set: function (obj) {
                var d = $q.defer();
                localStorage.setItem("settings", angular.toJson(obj));
                safe(function () {
                    d.resolve();
                });
                return d.promise;
            },
            del: function () {
                localStorage.clear();
            }
        };
    }]);
//@ sourceMappingURL=ziax-app-browser-storage.js.map
