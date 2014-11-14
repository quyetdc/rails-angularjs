'use strict';

// main angularjs custom file
(function(){
    var app = angular.module('app.registration', ['ngRoute']);

    app.controller('registrationCtrl', ['$http', '$location', function($http, $location){
        this.screen = 'sign_in';

        this.error_message = '';

        this.user_params = {};

        var regCtrl = this;

        // screen: sign_in, sign_up, edit_profile, welcome
        this.selectScreen = function(screen){
            regCtrl.error_message = '';
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
                regCtrl.screen = 'edit_profile';
                regCtrl.error_message = '';
                regCtrl.user_params =  data.user;
                console.log (regCtrl.user_params);
            });

            request.error(function(data, status) {
                regCtrl.error_message = data.message;
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
               regCtrl.error_message = '';
                // data --> {user: {id: 1, authentication_token: '', email: '', name: '', age: '' ...}}
               regCtrl.user_params =  data.user;
            });

            request.error(function(data, status) {
                console.log(angular.toJson(data));

                var messages = data.message;
                for (var property in messages) {
                    regCtrl.error_message += property + ': ' + messages[property] + '; ';
                };
            });
        };

        this.updateUser = function() {
            var update_user_params = {
                name: regCtrl.user_params.name,
                age: regCtrl.user_params.age,
                avatar: regCtrl.user_params.avatar,
                authentication_token: regCtrl.user_params.authentication_token
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
//               $location.path('/edit');
                regCtrl.screen = 'welcome';
                regCtrl.error_message = '';
                regCtrl.user_params =  data.user;
                console.log(angular.toJson(regCtrl));
            });

            request.error(function(data, status) {
                console.log(angular.toJson(data));

                regCtrl.error_message = data.message;
                console.log(regCtrl.error_message);
            });

        };
    }]);

    app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

//    app.service('fileUpload', ['$http', function ($http) {
//        this.uploadFileToUrl = function(file, uploadUrl){
//            var fd = new FormData();
//            fd.append('file', file);
//            $http.post(uploadUrl, fd, {
//                transformRequest: angular.identity,
//                headers: {'Content-Type': undefined}
//            })
//                .success(function(){
//                })
//                .error(function(){
//                });
//        }
//    }]);

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