angular.module("ziax-app-chromeStorage", [])
    .service("Storage", ["$q", "$timeout", ($q, $timeout) => {


        var storage = chrome.storage.local;
        var safe = (cb) => {
            $timeout(cb);
        };


        return {
            get: (cb) => {
                storage.get("settings", (res) => { safe(() => { cb(res.settings?res.settings:null); }); });
            },
            set: (obj) => {
                var d = $q.defer();
                storage.set({ "settings": obj } );
                safe(() => { d.resolve(); });
                return d.promise;
            },
            clear: () => {
                storage.clear();
            }
        }

    }]);
