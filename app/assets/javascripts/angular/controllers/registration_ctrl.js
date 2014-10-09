// main angularjs custom file
(function(){
    var app = angular.module('registration', []);

    app.controller('registrationCtrl', ['$http', function($http){

        this.screen = 'sign_in';

//        TODO: research this token
        this.authenticity_token = "";

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
                    }//,
//                    authenticity_token: this.authenticity_token
                })
            });

            request.success(
                function(  ) {
                    this.signup_status = 'successful';
                }
            );
        }

    }]);
})();