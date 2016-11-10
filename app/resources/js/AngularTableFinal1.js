var myapp = angular.module('ngTableTutorial', ['ngTable', 'ngAnimate', 'ui.bootstrap']);
myapp.controller('ngtableCtrl', function ($scope, NgTableParams, $filter, $uibModal) {
    //$scope.sortType = 'name'; // set the default sort type
    $scope.sortType = '';
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';
    $scope.deleteAllMode = false;

    $scope.model = {
        contacts: [{
            id: 1,
            subject: "subject1",
            company: "company1",
            startdate: "11-12-12",
            enddate: "11-12-12",
            status: "Scheduled",
            assignto: "ravi teja villa",
            name: "Ben",
            age: 28,
            location: "abc",
            editmode: false
        }, {
            id: 2,
            subject: "subject2",
            company: "company2",
            startdate: "11-12-12",
            enddate: "11-12-12",
            status: "Scheduled",
            assignto: "ravi teja villa",
            name: "Sally",
            age: 24,
            location: "abc",
            editmode: false
        }, {
            id: 3,
            subject: "subject3",
            company: "company3",
            startdate: "11-12-12",
            enddate: "11-12-12",
            status: "Scheduled",
            assignto: "ravi teja villa",
            name: "John",
            age: 32,
            location: "abc",
            editmode: false
        }, {
            id: 4,
            subject: "subject4",
            company: "company4",
            startdate: "11-12-12",
            enddate: "11-12-12",
            status: "Scheduled",
            assignto: "ravi teja villa",
            name: "Jane",
            age: 40,
            location: "abc",
            editmode: false
        }],
        selected: {},
        selectAll: false,

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

    //function for select all checkbox

    $scope.selectAllcheck = function (value) {
        if (value) {
            $scope.deleteAllMode = true;
        }
        else {
            $scope.deleteAllMode = false;
        }
        for (i = 0; i < $scope.model.contacts.length; i++) {
            $scope.model.contacts[i].isChecked = value;
            $scope.getData();
        }
    };

    //function for single checkbox select

    $scope.selectEntity = function () {
        alert('inside selectEntity function');
        var count = 0;

        for (var i = 0; i < $scope.model.contacts.length; i++) {
            if ($scope.model.contacts[i].isChecked) {
                count++;
                alert(count);

                if (count == 1) {
                    $scope.model.contacts[i].editmode = true;
                    $scope.deleteAllMode = false;
                    alert($scope.deleteAllMode);
                }
                else {
                    for (k = 0; k < $scope.model.contacts.length; k++) {
                        $scope.model.contacts[k].editmode = false;
                    }
                    $scope.deleteAllMode = true;
                }
            }
            else {
                $scope.model.contacts[i].editmode = false;
                // $scope.deleteAllMode = true;
            }
        }

        for (var i = 0; i < $scope.model.contacts.length; i++) {

            if (!$scope.model.contacts[i].isChecked) {
                $scope.model.selectAll = false;
                return;
            }
        }

        $scope.model.selectAll = true;
        console.log($scope.model.contacts);
    }

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

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.deleteSelectedCheckContact = function () {
        console.log('inside deleteSelectedCheckContact function');
        console.log($scope.model.contacts);

        if ($scope.model.selectAll) {
            var j = $scope.model.contacts.length;
            while ($scope.model.contacts.length > 0) {
                j--;
                if ($scope.model.contacts[j].isChecked) {
                    if ($scope.model.contacts[j].isChecked) {
                        $scope.model.contacts.splice(j, 1);
                    }
                }
            }
            $scope.model.selectAll = false;
        }
        else {
            var count = 0;
            for (k = $scope.model.contacts.length - 1; k >= 0; k--) {
                if (angular.isDefined($scope.model.contacts[k].isChecked)) {
                    if ($scope.model.contacts[k].isChecked) {
                        if ($scope.model.contacts[k].isChecked) {
                            count++;
                        }
                    }
                }
            }
            for (j = 0; j < count; j++) {
                for (s = 0; s < $scope.model.contacts.length; s++) {
                    if ($scope.model.contacts[s].isChecked) {
                        if ($scope.model.contacts[s].isChecked) {
                            $scope.model.contacts.splice(s, 1);
                        }
                    }
                }
            }
            //$scope.model.selectAll = false;
        }

        console.log($scope.model.contacts);
        // $scope.model.selectAll = false;
        $scope.getData();
    }

    var $ctrl = this;

    //resolve is use to pass parameter from controller to modalInstance controller

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
                    return 'kkk';
                    //$scope.username;
                }
            }
        });

        modalInstance.result.then(function (userName) {
            $scope.username = userName;
            $scope.model.contacts.push({
                id: $scope.model.contacts.length + 1,
                name: userName.name,
                age: userName.age,
                location: userName.location,
                editmode: false
            });
            console.log($scope.model.contacts);
            $scope.getData();
        }, function () {
            alert('Modal dismissed at: ' + new Date());
        });
    };

});

myapp.controller('ModalInstanceCtrl', function ($uibModalInstance, $scope, username, $uibModal) {
    alert(username);
    $scope.status = ["Cancelled", "Completed", "Scheduled"];
    $scope.assignto = ["Ravi Teja Villa"];
    $scope.remindertype = ["Email", "Pop-up"];
    $scope.remindertimein = ["minutes", "hours", "days", "weeks"];
    $scope.user = {
        subject: "",
        startdate: "",
        enddate: "",
        status: "",
        assignto: "",
        reminder: [{ type: '', duration: '', timein: '' }, { type: '', duration: '', timein: '' }],
        //reminder: "",
        company: "",
        fullname: "",
        text: "",
        repeat: "",
        outlooksync: "",
        googlesync: "",
        inviteguests: "",
        attendees: "Ravi Teja Villa (Owner)",
        addnotetype: "",
        addnotedesc: "",
        name: 'A',
        age: '10',
        location: 'location'
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.user);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel', '');
    };

    $scope.checkRepeat = function () {
        alert('clicked');
        alert($scope.user.repeat);
        //checkbox is clicked open modal
        if ($scope.user.repeat) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalReminder.html',
                controller: 'remonderModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    // username: function () {
                    //  return 'kkk';
                    //$scope.username;
                    // }
                }
            });

            modalInstance.result.then(function (userName) {
                //$scope.username = userName;
                //$scope.model.contacts.push({
                //    id: $scope.model.contacts.length + 1,
                //    name: userName.name,
                //    age: userName.age,
                //    location: userName.location,
                //    editmode: false
                //});
                console.log(userName);
                //  $scope.getData();
            }, function () {
                alert('Modal dismissed at: ' + new Date());
            });
        }
        else {

        }
    }

    $scope.deleteReminder = function (val) {
        alert('inside delete reminder function' + val);
        $scope.user.reminder.splice(val, 1);
    }

    $scope.addReminder = function () {
        $scope.user.reminder.push({ type: '', duration: '', timein: '' });
    }
});

myapp.controller('remonderModalInstanceCtrl', function ($uibModalInstance, $scope) {
    $scope.repeattype = ["Daily", "Weekly", "Monthly", "Yearly"];
    $scope.reminderRepeat = { startdate: "", enddate: "", repeattype: "", repeatevery: "" };

    $scope.ok = function () {
        //$uibModalInstance.close($scope.user);
        $uibModalInstance.close($scope.reminderRepeat);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel', '');
    };

});

//range filter for creating 1 to 30 for example numbers in selectbox
myapp.filter('range', function () {
    return function (input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i <= max; i++)
            input.push(i);
        return input;
    };
});

