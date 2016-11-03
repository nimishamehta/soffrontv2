var app = angular.module("ngtableApp", ["ngTable"]);
app.controller("ngtableCtrl", function ($scope, NgTableParams,$filter) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';

    $scope.users = [
    { name: "Madhav Sai", age: 10, location: 'Nagpur' },
    { name: "Suresh Dasari", age: 30, location: 'Chennai' },
    { name: "Rohini Alavala", age: 29, location: 'Chennai' },
    { name: "Praveen Kumar", age: 25, location: 'Bangalore' },
    { name: "Sateesh Chandra", age: 27, location: 'Vizag' },
    { name: "Siva Prasad", age: 38, location: 'Nagpur' },
    { name: "Sudheer Rayana", age: 25, location: 'Kakinada' },
    { name: "Honey Yemineni", age: 7, location: 'Nagpur' },
    { name: "Mahendra Dasari", age: 22, location: 'Vijayawada' },
    { name: "Mahesh Dasari", age: 23, location: 'California' },
    { name: "Nagaraju Dasari", age: 34, location: 'Atlanta' },
    { name: "Gopi Krishna", age: 29, location: 'Repalle' },
    { name: "Sudheer Uppala", age: 19, location: 'Guntur' },
    { name: "Sushmita", age: 27, location: 'Vizag' }
    ];
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
            //$scope.data = $scope.users.slice((params.page() - 1) * params.count(), params.page() * params.count());
            //$scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
            //$scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
            //return ($scope.data);
        }
    });
});