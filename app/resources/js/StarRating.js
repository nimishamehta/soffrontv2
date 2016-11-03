var myApp = angular.module("myApp", ['ngAnimate', 'ui.bootstrap']);
myApp.controller("starRatingCtrl", function ($scope) {
    $scope.ratingStates = [
    { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
    { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
    { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
    { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
    { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' }
    ];
    $scope.y = 0;
    $scope.oldY = 0;
    $scope.changeRate = function (r) {
        alert(r);
    };

    $scope.clear = function () {
        alert('clear');
        $scope.y = 0;
    }

});