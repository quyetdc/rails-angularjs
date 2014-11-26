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
        console.log('init app');
        if (localStorage.getItem('screen')){
            appCtrl.screen = localStorage.getItem('screen');
        } else {
            appCtrl.screen = 'home';
        }

    };
});