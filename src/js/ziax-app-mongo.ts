angular.module("ziax-app-mongo", ['ngResource'])
    .factory('$mongolabResource', ['$resource', 'API_KEY', 'DB_NAME', ($resource, API_KEY, DB_NAME) => {

        function MmongolabResourceFactory(collectionName) {

            var resource = $resource('https://api.mongolab.com/api/1/databases/' + DB_NAME + '/collections/' + collectionName + '/:id',
                { apiKey:API_KEY, id:'@_id.$oid'}, { update:{ method:'PUT' } }
            );

            resource.getById = (id, cb, errorcb) => {
                return resource.get({id:id}, cb, errorcb);
            };

            resource.prototype.update = (cb, errorcb) => {
                return resource.update({id:this._id.$oid}, angular.extend({}, this, {_id:undefined}), cb, errorcb);
            };

            resource.prototype.saveOrUpdate = (savecb, updatecb, errorSavecb, errorUpdatecb) => {
                if (this._id && this._id.$oid) {
                    return this.update(updatecb, errorUpdatecb);
                } else {
                    return this.$save(savecb, errorSavecb);
                }
            };

            resource.prototype.remove = (cb, errorcb) => {
                return resource.remove({id:this._id.$oid}, cb, errorcb);
            };

            resource.prototype['delete'] = (cb, errorcb) => {
                return this.remove(cb, errorcb);
            };

            return resource;
        }

        return MmongolabResourceFactory;
    }])

    .service("Mongo", [() => {
        return {
            get: () => { console.log("get"); }
        }



    }]);

//file:///D:/Ziax/Documents/BitBucket/ziaxdeveloperplugin/src/home.html#
//https://api.mongolab.com/api/1/databases/ziaxdeveloperplugin/collections?view=json&apiKey=50f5584ae4b09b3cd11ec093