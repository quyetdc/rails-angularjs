'use strict';

// main angularjs custom file
(function(){
    var app = angular.module('app.registration', ['ngRoute', 'app.globalService']);

    app.controller('registrationCtrl', ['$http', 'globalService', function($http, globalService){
        var regCtrl = this;
        regCtrl.screen = 'sign_in';

        regCtrl.error_message = '';

        regCtrl.user_params = {};

        // screen: sign_in, sign_up, edit_profile, welcome
        regCtrl.selectScreen = function(screen){
            regCtrl.error_message = '';
            regCtrl.screen = screen;
        };

        regCtrl.screenSelected = function (screen){
          return regCtrl.screen === screen;
        };

        regCtrl.requestApiSuccess = function (data) {
            regCtrl.screen = 'edit_profile';
            regCtrl.error_message = '';
            globalService.setUser(data.user);
        };

        regCtrl.signin = function(isDataValid){
            if (!isDataValid){
                return;
            }
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
                regCtrl.requestApiSuccess(data);
                regCtrl.user_params =  {};
            });

            request.error(function(data, status) {
                regCtrl.error_message = data.message;
            });

        };

        regCtrl.createUser = function(isDataValid) {
            if (!isDataValid){
                return;
            }

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
                regCtrl.requestApiSuccess(data);
                regCtrl.user_params =  {};
            });

            request.error(function(data, status) {
                var messages = data.message;
                for (var property in messages) {
                    regCtrl.error_message += property + ': ' + messages[property] + '; ';
                }
            });
        };

        regCtrl.updateUser = function() {
            if (!regCtrl.user_params.length == 0){
                var update_user_params = {
                    name: regCtrl.user_params.name,
                    age: regCtrl.user_params.age,
                    avatar: regCtrl.user_params.avatar,
                    authentication_token: globalService.getUser().authentication_token
                };

                var fd = new FormData();
                fd.append('user[name]', update_user_params.name);
                fd.append('user[age]', update_user_params.age);
                fd.append('user[avatar]', update_user_params.avatar);
                fd.append('user[authentication_token]', update_user_params.authentication_token);

                var request = $http({
                    method: "PUT",
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined},
                    url: "/users.json",

                    data: fd
                });

                request.success(function(data, status) {
                    globalService.setUser(data.user);
                    regCtrl.user_params =  {};

                    window.location.href = '/dashboard';
                });

                request.error(function(data, status) {
                    regCtrl.error_message = data.message;
                });
            }
        };

        regCtrl.skipUpdate = function() {
            window.location.href = '/dashboard';
        };
    }]);
})();