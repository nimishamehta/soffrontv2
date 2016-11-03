var myApp = angular.module("myApp", ['ngAnimate', 'ui.bootstrap', 'ui.sortable']);
myApp.controller("DynamicTableCtrl", function ($scope, $uibModal) {
    var $ctrl = this;
    $scope.list = [];

    $scope.open = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return $scope.username;
                }
            }
        });

        modalInstance.result.then(function (userName) {
            $scope.username = userName;
            console.log($scope.username);
            $scope.list.push({
                text: 'Item ' + i,
                value: i,
                enabled: $scope.username.id
            });
            console.log($scope.list);
        }, function () {
            alert('Modal dismissed at: ' + new Date());
        });
    };

    var tmpList = [];

    for (var i = 1; i <= 6; i++) {
        tmpList.push({
            text: 'Item ' + i,
            value: i,
            enabled: 1
        });
    }

    $scope.list = tmpList;

    $scope.sortableOptions = {
        update: function (e, ui) {
            console.log($scope.list);
        },
        stop: function (e, ui) { },
    };
    $scope.save = function () {
        // console.log($scope.list);
    }

    $scope.delete = function (idx) {
        alert('delete id::' + idx);
        $scope.list.splice(idx, 1);
    }

});

myApp.controller('ModalInstanceCtrl', function ($uibModalInstance, $scope) {
    $scope.user = {
        name: 'A'
    };
    $scope.userProfiles = [
    { id: 1, name: 'TextBox' },
    { id: 2, name: 'DropDown' }
    ];

    $scope.ok = function () {
        $uibModalInstance.close($scope.user.name);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel', '');
    };
});
