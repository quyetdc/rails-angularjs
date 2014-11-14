angular.module('app.globalService',[]).service('globalService', function () {
//    store user information
    var user = {};
    var setUser = function (userData) {
        user = userData;
    };
    var getUser = function () {
        return user;
    };

    return {
        setUser: setUser,
        getUser: getUser
    }
});