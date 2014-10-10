'use strict';

// main angularjs custom file
(function(){
    var app = angular.module('registration', ['ngRoute']);

    app.controller('registrationCtrl', ['$http', '$location', function($http, $location){

        var regCtrl = this;

        this.screen = 'sign_in';

        this.returnData = '';

        this.user_params = {
            email: '',
            password: '',
            password_confirmation: ''
        };

        // screen: sign_in, sign_up, edit_profile
        this.selectScreen = function(screen){
          this.screen = screen;
        };

        this.screenSelected = function (screen){
          return this.screen === screen;
        };

        this.createUser = function() {
            var request = $http({
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                url: "/users.json",
                data: JSON.stringify({
                    user: {
                            email: regCtrl.user_params.email,
                            password: regCtrl.user_params.password,
                            password_confirmation: regCtrl.user_params.password_confirmation
                    }
                })
            });

            request.success(function(data, status) {
//               $location.path('/edit');
               regCtrl.screen = 'edit_profile';
               regCtrl.returnData = "Success -- " + "data -- " + angular.toJson(data) + "status --- " + status;
               console.log(regCtrl.returnData);
            });

            request.error(function(data, status) {
                regCtrl.returnData = "error -- " + "data -- " + angular.toJson(data) + "status --- " + status;
                console.log(regCtrl.returnData);
            });

        };

    }]);

//    app.config(['$routeProvider', function($routeProvider) {
//            $routeProvider.
//                when('/edit', {
//                    redirectTo: '/'
//                }).
//                when('/', {
//                    templateUrl: '/angular/index.html.erb',
//                    controller: 'registrationCtrl'
//                }).
//                otherwise({
//                    templateUrl: '/angular/index.html.erb',
//                    controller: 'registrationCtrl'
//                });
//    }]);

})();