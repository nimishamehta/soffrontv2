angular.module('sample', ['ngAnimate', 'toaster'])
.directive('bindUnsafeHtml', [function () {
    return {
        template: "<span style='color:orange'>Orange directive text!</span>"
    };
}])
// The directive that will be dynamically rendered
.directive('bindName', [function () {
    return {
        template: "<span style='color:orange'>Hi {{directiveData.name}}!</span>"
    };
}])
.controller('HomeController', function ($scope, toaster, $window, $sce) {

    $scope.pop = function () {
        //toaster.toast.body='toast-top-center'
        toaster.pop('success', "title", 'Its address is https://google.com.', 5000, 'trustedHtml', function (toaster) {
            var match = toaster.body.match(/http[s]?:\/\/[^\s]+/);
            if (match) $window.open(match[0]);
            return true;
        });


    };
    $scope.simple = function () {
        //type, title, body, timeout, bodyOutputType, clickHandler, toasterId, showCloseButton, toastId, onHideCallback
        toaster.pop('note', "title", "text");
    };
    $scope.warning = function () {
        toaster.pop({
            type: 'warning',
            title: 'warning',
            body: 'Body text',
            showCloseButton: true,
            closeHtml: '<button><i class="icon-off"></i></button>'
        });
       // toaster.pop('warning', "warning", 'Hello codershood.info');
    };
    $scope.success = function () {
        //toaster.success({title: "title", body:"text1"});
        toaster.pop({
            type: 'success',
            title: 'Notificaton',
            body: 'Body text',
            clickHandler: 'trustedHtml',
            showCloseButton: true,
            closeHtml: '<button><i class="icon-off"></i></button>'
        });
      
      //  toaster.success('success', "Notificaton", "Hello codershood.info","","","", true);
    };
    $scope.error = function () {
        toaster.pop({
            type: 'error',
            title: 'You broke something',
            body: 'Body text',
            showCloseButton: true,
            closeHtml: '<button><i class="icon-off"></i></button>'
        });
       // toaster.error("Error", "You broke something");
    };
    $scope.wait = function () {
        //toaster.pop({type: 'wait', title: "title", body:"text"});
        toaster.pop({
            type: 'Wating',
            title: 'Wating',
            body: 'Body text',
            showCloseButton: true,
            closeHtml: '<button><i class="icon-off"></i></button>'
        });
        //toaster.wait("Wating", "Wating");
    };

    $scope.close = function () {
        toaster.pop({
            type: 'error',
            title: 'Title text',
            body: 'Body text',
            showCloseButton: true,
            closeHtml: '<button><i class="icon-off"></i></button>'
        });
    };
    $scope.timeout = function () {
        toaster.pop('note', "TimeOut", "text");
        toaster.toast.timeout = 1000;
    };


    $scope.position = function () {
        toaster.pop('note', "title", 'toast-bottom-left', 'toast-bottom-left', 'tost_id');
        console.log(toaster);
    }

    $scope.goToLink = function (toaster) {
        var match = toaster.body.match(/http[s]?:\/\/[^\s]+/);
        if (match) $window.open(match[0]);
        return true;
    };

    $scope.clear = function () {
        toaster.clear();
    };
});