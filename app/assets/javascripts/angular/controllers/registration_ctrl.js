'use strict';

// main angularjs custom file
(function(){
    var app = angular.module('registration', ['ngRoute']);

    app.controller('registrationCtrl', ['$http', '$location', function($http, $location){

        var regCtrl = this;

        this.screen = 'sign_in';

        this.returnData = '';

        this.user_params = {};

        // screen: sign_in, sign_up, edit_profile, welcome
        this.selectScreen = function(screen){
          this.screen = screen;
        };

        this.screenSelected = function (screen){
          return this.screen === screen;
        };

        this.signin = function(){
            var request = $http({
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                url: "/users/sign_in.json",
                data: JSON.stringify({
                    user: {
                        email: regCtrl.user_params.email,
                        password: regCtrl.user_params.password
                    }
                })
            });

            request.success(function(data, status) {
//               $location.path('/edit');
                regCtrl.screen = 'welcome';
//                console.log(data);

                // data --> {user: {id: 1, authentication_token: '', email: '', name: '', age: '' ...}}
                regCtrl.user_params =  data.user;
                console.log (regCtrl.user_params);
            });

            request.error(function(data, status) {
                regCtrl.returnData = "error -- " + "data -- " + angular.toJson(data) + "status --- " + status;
                console.log(regCtrl.returnData);
            });
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
//                console.log(data);

                // data --> {user: {id: 1, authentication_token: '', email: '', name: '', age: '' ...}}
               regCtrl.user_params =  data.user;
            });

            request.error(function(data, status) {
                regCtrl.returnData = "error -- " + "data -- " + angular.toJson(data) + "status --- " + status;
                console.log(regCtrl.returnData);
            });
        };

        this.updateUser = function() {
            var request = $http({
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                url: "/users.json",
                data: JSON.stringify({
                    user: {
                        name: regCtrl.user_params.name,
                        age: regCtrl.user_params.age,
                        authentication_token: regCtrl.user_params.authentication_token
                    }
                })
            });

            request.success(function(data, status) {
//               $location.path('/edit');
                regCtrl.screen = 'welcome';
                regCtrl.user_params =  data.user;
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