angular.module("ziax-app-mongo", [
    'ngResource'
]).factory('$mongolabResource', [
    '$resource', 
    'Settings', 
    function ($resource, Settings) {
        function MmongolabResourceFactory(collectionName) {
            var _this = this;
            var resource = $resource('https://api.mongolab.com/api/1/databases/' + Settings.database() + '/collections/' + collectionName + '/:id', {
                apiKey: "api",
                id: '@_id.$oid'
            }, {
                update: {
                    method: 'PUT'
                }
            });
            resource.getById = function (id, cb, errorcb) {
                return resource.get({
                    id: id
                }, cb, errorcb);
            };
            resource.prototype.update = function (cb, errorcb) {
                return resource.update({
                    id: _this._id.$oid
                }, angular.extend({
                }, _this, {
                    _id: undefined
                }), cb, errorcb);
            };
            resource.prototype.saveOrUpdate = function (savecb, updatecb, errorSavecb, errorUpdatecb) {
                if(_this._id && _this._id.$oid) {
                    return _this.update(updatecb, errorUpdatecb);
                } else {
                    return _this.$save(savecb, errorSavecb);
                }
            };
            resource.prototype.remove = function (cb, errorcb) {
                return resource.remove({
                    id: _this._id.$oid
                }, cb, errorcb);
            };
            resource.prototype['delete'] = function (cb, errorcb) {
                return _this.remove(cb, errorcb);
            };
            console.log("func", collectionName, Settings);
            ; ;
            return resource;
        }
        return MmongolabResourceFactory;
    }]).factory("Mongo", [
    "$mongolabResource", 
    "Settings", 
    function (resource) {
        return new resource('projects');
    }]);
//@ sourceMappingURL=ziax-app-mongo.js.map
