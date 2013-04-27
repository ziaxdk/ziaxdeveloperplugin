angular.module("ziax-app-browserStorage", [])
    .service("Storage", ["$q", "$timeout", ($q, $timeout) => {

        var safe = (cb) => {
            $timeout(cb);
        };
        return {
            get: (cb) => {
                safe(() => { cb(angular.fromJson(localStorage.getItem("settings"))); })
            },
            set: (obj) => {
                var d = $q.defer();
                localStorage.setItem("settings", angular.toJson(obj));
                safe(() => { d.resolve(); });
                return d.promise;

            },
            del: () => { localStorage.clear(); }
        }

    }]);
