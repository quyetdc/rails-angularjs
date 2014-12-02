angular.module('app.mainCtrl', []).controller('appCtrl', function(){
    var appCtrl = this;

//    home, user, post, profile
    appCtrl.setScreen = function (navItem) {
        localStorage.setItem('screen', navItem);
    };

    appCtrl.setActiveClass = function (navItem) {
        if(appCtrl.screen == navItem){
            return 'active'
        }
    };

    appCtrl.init = function(){
        if (localStorage.getItem('screen')){
            appCtrl.screen = localStorage.getItem('screen');
        } else {
            appCtrl.screen = 'home';
        }

    };

    appCtrl.isSignin = function () {
        if (localStorage.getItem('user')){
            return true;
        } else {
            return false;
        }
    };

    appCtrl.signout = function(){
        appCtrl.screen = 'home';
        localStorage.removeItem('user');
    };
});