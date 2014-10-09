// main angularjs custom file
(function(){
    var app = angular.module('registration', []);

    app.controller('registrationCtrl', ['$http', function($http){

        this.screen = 'sign_in';
        this.signup_status = 'Not yet';

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
                            email: this.user_params.email,
                            password: this.user_params.password,
                            password_confirmation: this.user_params.password_confirmation
                    }
                })
            });

            request.success(
                function(  ) {
                    this.signup_status = 'successful';
                }
            );
//
//            Started POST "/users" for 127.0.0.1 at 2014-10-09 20:12:05 +0700
//            Processing by Devise::RegistrationsController#create as HTML
//            Parameters: {"utf8"=>"✓", "authenticity_token"=>"eeC8z29JA9iBnJoa02ManhUDlhZBei+/jv7SVKBMTgM=", "user"=>{"email"=>"spree@example.com", "password"=>"[FILTERED]", "password_confirmation"=>"[FILTERED]"}, "commit"=>"Sign up"}
        }

    }]);
})();