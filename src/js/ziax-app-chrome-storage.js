angular.module("ziax-app-chromeStorage", []).service("Storage", [
    "$q", 
    "$timeout", 
    function ($q, $timeout) {
        var storage = chrome.storage.local;
        var safe = function (cb) {
            $timeout(cb);
        };
        return {
            get: function (cb) {
                storage.get("settings", function (res) {
                    safe(function () {
                        cb(res.settings ? res.settings : null);
                    });
                });
            },
            set: function (obj) {
                var d = $q.defer();
                storage.set({
                    "settings": obj
                });
                safe(function () {
                    d.resolve();
                });
                return d.promise;
            },
            clear: function () {
                storage.clear();
            }
        };
    }]);
//@ sourceMappingURL=ziax-app-chrome-storage.js.map
