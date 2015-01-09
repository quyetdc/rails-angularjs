angular.module('app.usersController', []).controller('usersController', ['$http', function($http){
    var usersCtrl = this;
    usersCtrl.addFriend = function (user_id) {
        console.log("Add Friend with user_id = "  + user_id + " Button Clicked");
        var button = document.getElementById("btn-add-friend-user-id-"+user_id);
        button.innerHTML="Pending";
        button.style.backgroundColor = "#5bc0de";
        button.style.paddingLeft = "25px";
        button.style.paddingRight = "25px";
    };
}]);