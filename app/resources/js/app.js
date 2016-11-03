
var myapp=angular.module('ngTableTutorial', ['ngTable']);
myapp.controller('tableController', function ($scope, $filter, NgTableParams) {
            $scope.users = [];
            $scope.users = [{ "id": 1, "first_name": "Philip", "last_name": "Kim", "email": "pkim0@mediafire.com", "country": "Indonesia", "ip_address": "29.107.35.8" },
                     { "id": 2, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                     { "id": 3, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" },
                     { "id": 4, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                     { "id": 5, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" },
                     { "id": 6, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                     { "id": 7, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" },
                     { "id": 8, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                     { "id": 9, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" },
                     { "id": 10, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                     { "id": 11, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" },
                     { "id": 12, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                     { "id": 13, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" }];

            $scope.get = function () {
                $scope.usersTable = new NgTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.users.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    }
                });
            }
            $scope.get();
            $scope.deleteItem = function (idx) {
                console.log($scope.users);
                $scope.users.splice(idx, 1);
                $scope.get();
            }
        });




myapp.controller("Ctrl", function ($scope) {
    $scope.model = {
        contacts: [{
            id: 1,
            name: "Ben",
            age: 28
        }, {
            id: 2,
            name: "Sally",
            age: 24
        }, {
            id: 3,
            name: "John",
            age: 32
        }, {
            id: 4,
            name: "Jane",
            age: 40
        }],
        selected: {}
    };
    $scope.users = [{ "id": 1, "first_name": "Philip", "last_name": "Kim", "email": "pkim0@mediafire.com", "country": "Indonesia", "ip_address": "29.107.35.8" },
                    { "id": 2, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                    { "id": 3, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" },
                    { "id": 4, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                    { "id": 5, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" },
                    { "id": 6, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                    { "id": 7, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" },
                    { "id": 8, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                    { "id": 9, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" },
                    { "id": 10, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                    { "id": 11, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" },
                    { "id": 12, "first_name": "Judith", "last_name": "Austin", "email": "jaustin1@mapquest.com", "country": "China", "ip_address": "173.65.94.30" },
                    { "id": 13, "first_name": "Julie", "last_name": "Wells", "email": "jwells2@illinois.edu", "country": "Finland", "ip_address": "9.100.80.145" }];

    $scope.get = function () {
        $scope.usersTable = new NgTableParams({
            page: 1,
            count: 10
        }, {
            total: $scope.users.length,
            getData: function (params) {
                $scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
                $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                return $scope.data;
            }
        });
    }
    $scope.get();
    // gets the template to ng-include for a table row / item
    $scope.getTemplate = function (contact) {
        if (contact.id === $scope.model.selected.id) return 'edit';
        else return 'display';
    };

    $scope.editContact = function (contact) {
        $scope.model.selected = angular.copy(contact);
    };

    $scope.saveContact = function (idx) {
        console.log("Saving contact");
        $scope.model.contacts[idx] = angular.copy($scope.model.selected);
        $scope.reset();
    };

    $scope.reset = function () {
        $scope.model.selected = {};
    };
});
