var app = angular.module('app', []);

app.controller('MainCtrl', function ($scope) {
    $('#summernote').summernote();
    $scope.count = 0;
    $scope.text1 = "Hello World";
    $scope.call1 = function () {
        alert('inside call1');
        console.log('1111');
        console.log($('.note-editable').html());
        var val1 = $('.note-editable').html();
        console.log();
    }
    });