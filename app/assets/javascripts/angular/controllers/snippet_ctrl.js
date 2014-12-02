angular.module('app.snippetsController', []).controller('snippetsController', ['$http', function($http){
    var snippetsCtrl = this;

    snippetsCtrl.tags = [];
    snippetsCtrl.newTag = '';
    snippetsCtrl.name = '';
    snippetsCtrl.content = '';
    snippetsCtrl.error_message = '';

    snippetsCtrl.addTag = function () {
        if ($.inArray(snippetsCtrl.tags, snippetsCtrl.newTag) && snippetsCtrl.newTag != ''){
            snippetsCtrl.tags.push(snippetsCtrl.newTag);
            snippetsCtrl.newTag = '';
        }
    };

    snippetsCtrl.removeTag = function (tag) {
        if ($.inArray(snippetsCtrl.tags, tag)){
            snippetsCtrl.tags.splice(snippetsCtrl.tags.indexOf(tag), 1);
        }
    };

    snippetsCtrl.createSnippet = function () {
        var request = $http({
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            url: "/snippets.json",
            data: JSON.stringify({
                snippet: {
                    name: snippetsCtrl.name,
                    tags: snippetsCtrl.tags,
                    content: snippetsCtrl.content
                }
            })
        });

        request.success(function(data, status) {
            window.location.href = '/dashboard';
        });

        request.error(function(data, status) {
            var messages = data.message;
            for (var property in messages) {
                snippetsCtrl.error_message += property + ': ' + messages[property] + '; ';
            }
        });
    }
}]);