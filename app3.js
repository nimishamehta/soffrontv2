var myapp = angular.module('ngTableTutorial', ['ngTable', 'ngAnimate', 'ui.bootstrap']);
myapp.controller('ngtableCtrl', function ($scope, NgTableParams, $filter, $uibModal) {
    //$scope.sortType = 'name'; // set the default sort type
    $scope.sortType = '';
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';

    $scope.model = {
        contacts: [{
            id: 1,
            name: "Ben",
            age: 28,
            location: "abc"
        }, {
            id: 2,
            name: "Sally",
            age: 24,
            location: "abc"
        }, {
            id: 3,
            name: "John",
            age: 32,
            location: "abc"
        }, {
            id: 4,
            name: "Jane",
            age: 40,
            location: "abc"
        }],
        selected: {}
    };

    $scope.getData = function () {

        $scope.usersTable = new NgTableParams({
            page: 1,
            count: 2
        }, {
            total: $scope.model.contacts.length,
            getData: function (params) {
                $scope.data = params.sorting() ? $filter('orderBy')($scope.model.contacts, params.orderBy()) : $scope.model.contacts;
                $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                return $scope.data;
                //$scope.data = $scope.users.slice((params.page() - 1) * params.count(), params.page() * params.count());
                //$scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                //$scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                //return ($scope.data);
            }
        });
        console.log($scope.model.contacts);
    }

    $scope.getData();

    $scope.getTemplate = function (contact) {

        if (contact.id === $scope.model.selected.id) {
            console.log(contact.id + "" + $scope.model.selected.id);
            return 'edit';
        }
        else return 'display';
    };

    $scope.editContact = function (contact) {
        console.log(contact.id);
        $scope.model.selected = angular.copy(contact);
    };
    $scope.saveContact = function (idx) {
        console.log("Saving contact");
        $scope.model.contacts[idx] = angular.copy($scope.model.selected);
        $scope.getData();
        $scope.reset();
    };

    $scope.reset = function () {
        $scope.model.selected = {};
    };

    $scope.deleteContact = function (idx) {
        $scope.model.contacts.splice(idx, 1);
        $scope.getData();
    }

    var $ctrl = this;
   
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
        }, function () {
            alert('Modal dismissed at: ' + new Date());
        });
    };

});

myapp.controller('ModalInstanceCtrl', function ($uibModalInstance, $scope) {
    $scope.user = {
        name: 'A'
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.user.name);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel', '');
    };
});

