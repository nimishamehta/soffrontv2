var myapp = angular.module('ngTableTutorial', ['ngTable', 'ngAnimate', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'ui.sortable']);
myapp.controller('ngtableCtrl', function ($scope, NgTableParams, $filter, $uibModal) {
    //$scope.sortType = 'name'; // set the default sort type
    $scope.sortType = '';
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';
    $scope.deleteAllMode = false;
    $scope.currentPage = 1;
    $scope.currentPage1 = 1;
    //code for dynamic table with dynamic column start

    $scope.dynamicTableCols = ["Column1", "Column2", "Column3"];
    $scope.dynamicTableRowData = [];
    var data1 = ["row1", "row2", "row3","row4","row5","row6"];
    var temp = {};
    var colname = '';
    var k = 0;
    while (k < data1.length) {
        for (i = 0; i < $scope.dynamicTableCols.length; i++) {
            colname = $scope.dynamicTableCols[i];
            temp[colname] = data1[k];
            k++;
        }
        $scope.dynamicTableRowData.push(temp);
        temp = {};
    }
    
    console.log($scope.dynamicTableRowData);
    //code for dynamic table with dynamic column end

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
            editmode: false,
            singleedit: [false, false, false, false, false, false]
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
            editmode: false,
            singleedit: [false, false, false, false, false, false]
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
            editmode: false,
            singleedit: [false, false, false, false, false, false]
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
            editmode: false,
            singleedit: [false, false, false, false, false, false]
        }],
        selected: {},
        selectAll: false,

    };

    $scope.sort = function (keyname) {
        alert('inside sort function'+keyname);
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    //function for select all checkbox

    $scope.selectAllcheck = function (value) {

        for (i = 0; i < $scope.model.contacts.length; i++) {
            for (k = 0; k < 5; k++) {
                $scope.model.contacts[i].singleedit[k] = false;
            }
        }

        if (value) {
            $scope.deleteAllMode = true;
        }
        else {
            $scope.deleteAllMode = false;
        }
        for (i = 0; i < $scope.model.contacts.length; i++) {
            $scope.model.contacts[i].isChecked = value;
            if ($scope.model.contacts[i].isChecked) {
                $scope.model.contacts[i].editmode = true;
            }
            else {
                $scope.model.contacts[i].editmode = false;
            }
            // $scope.getData();
        }
    };

    //function for single checkbox select

    $scope.selectEntity = function () {
        alert('inside selectEntity function');
        var count = 0;

        //for (var i = 0; i < $scope.model.contacts.length; i++) {
        //    if ($scope.model.contacts[i].isChecked) {
        //        count++;
        //        alert(count);

        //        if (count == 1) {
        //            $scope.model.contacts[i].editmode = true;
        //            $scope.deleteAllMode = false;
        //            alert($scope.deleteAllMode);
        //        }
        //        else {
        //            for (k = 0; k < $scope.model.contacts.length; k++) {
        //                $scope.model.contacts[k].editmode = false;
        //            }
        //            $scope.deleteAllMode = true;
        //        }
        //    }
        //    else {
        //        $scope.model.contacts[i].editmode = false;
        //        // $scope.deleteAllMode = true;
        //    }
        //}

        for (var j = 0; j < $scope.model.contacts.length; j++) {
            if ($scope.model.contacts[j].isChecked) {
                $scope.model.contacts[j].editmode = true;
            } else {
                $scope.model.contacts[j].editmode = false;
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

    $scope.open = function () {

        alert('111');
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
        // $scope.getData();
    }

    $scope.addNotePopUp = function () {
        alert('inside addNotePopUp function');
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addNote.html',
            controller: 'addNoteModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });

        modalInstance.result.then(function (addNote) {
            console.log(addNote);
        }, function () {
            alert('Modal dismissed at: ' + new Date());
        });
    }

    $scope.editSingleAppointmentPopUp = function () {
        alert('inside editSingleAppointmentPopUp function');
        var count = 0;
        var singleEditFlag = true;
        $scope.selectedSingleAppointment = {};
        for (var i = 0; i < $scope.model.contacts.length; i++) {
            if ($scope.model.contacts[i].isChecked) {
                count++;
                $scope.selectedSingleAppointment = $scope.model.contacts[i];
                console.log($scope.selectedSingleAppointment);
            }
            if (count > 1) {
                singleEditFlag = false;
                break;
            }
        }

        //single entity edit mode

        if (singleEditFlag) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'editSingleAppointmentPopUp.html',
                controller: 'editSingleAppointmentModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.selectedSingleAppointment;
                        //$scope.username;
                    }
                }
            });

            modalInstance.result.then(function (editAppointment) {
                console.log(editAppointment);
            }, function () {
                alert('Modal dismissed at: ' + new Date());
            });
        }

            //bulk entity edit mode  

        else {
            alert('For bulk entity edit mode');

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'editBulkEntityPopUp.html',
                controller: 'editBulkAppointmentModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    username: function () {
                        return 'kkk';
                        //$scope.username;
                    }
                }
            });

            modalInstance.result.then(function (editBulkAppointment) {
                console.log(editBulkAppointment);
            }, function () {
                alert('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.editSingle1 = function (idx) {
        alert('inside editSingle1 function' + idx);
        $scope.model.contacts[idx].singleedit[0] = true;
        $scope.model.contacts[idx].singleedit[1] = false;
        $scope.model.contacts[idx].singleedit[2] = false;
        $scope.model.contacts[idx].singleedit[3] = false;
    }

    $scope.editSingle2 = function (idx) {
        alert('inside editSingle2 function' + idx);
        $scope.model.contacts[idx].singleedit[0] = false;
        $scope.model.contacts[idx].singleedit[1] = true;
        $scope.model.contacts[idx].singleedit[2] = false;
        $scope.model.contacts[idx].singleedit[3] = false;
    }

    $scope.editSingle3 = function (idx) {
        alert('inside editSingle3 function' + idx);
        $scope.model.contacts[idx].singleedit[0] = false;
        $scope.model.contacts[idx].singleedit[1] = false;
        $scope.model.contacts[idx].singleedit[2] = true;
        $scope.model.contacts[idx].singleedit[3] = false;
    }

    $scope.editSingle4 = function (idx) {
        alert('inside editSingle4 function' + idx);
        $scope.model.contacts[idx].singleedit[0] = false;
        $scope.model.contacts[idx].singleedit[1] = false;
        $scope.model.contacts[idx].singleedit[2] = false;
        $scope.model.contacts[idx].singleedit[3] = true;
    }

    $scope.setup = function () {
        alert('inside setup function');

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'setUpPopUp.html',
            controller: 'setUpModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });

        modalInstance.result.then(function (setup) {
            console.log(setup);
        }, function () {
            alert('Modal dismissed at: ' + new Date());
        });
    }

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

myapp.controller('addNoteModalInstanceCtrl', function ($uibModalInstance, $scope) {
    $scope.noteType = ["Appointment", "Dialed", "Email", "LVM", "Note", "Spoke", "Task", "Transferred"];

    $scope.addNote = { noteType: '', text: '' };

    $scope.ok = function () {
        // $uibModalInstance.close($scope.user);
        $uibModalInstance.close($scope.addNote);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel', '');
    };

});


myapp.controller('editSingleAppointmentModalInstanceCtrl', function ($uibModalInstance, $scope, $uibModal, item) {
    $scope.status = ["Cancelled", "Completed", "Scheduled"];
    $scope.addNoteType = ["Appointment", "Dialed", "Email", "LVM", "Note", "Spoke", "Task", "Transferred"];
    $scope.assignto = ["Ravi Teja Villa"];
    $scope.remindertype = ["Email", "Pop-up"];
    $scope.remindertimein = ["minutes", "hours", "days", "weeks"];
    console.log('inside editSingleAppointmentModalInstanceCtrl controller');
    console.log(item);

    $scope.editAppointment = {
        subject: item.subject,
        startdate: item.startdate,
        enddate: item.enddate,
        status: item.status,
        assignto: item.assignto,
        reminder: [{ type: '', duration: '', timein: '' }, { type: '', duration: '', timein: '' }],
        company: item.company,
        fullname: '',
        text: '',
        repeat: false,
        outlooksync: '',
        googlesync: '',
        inviteguests: '',
        attendees: 'Ravi Teja Villa (Owner)',
        addNote: { type: '', note: '' }
    };

    $scope.deleteReminder = function (val) {
        alert('inside delete reminder function' + val);
        $scope.editAppointment.reminder.splice(val, 1);
    }

    $scope.addReminder = function () {
        $scope.editAppointment.reminder.push({ type: '', duration: '', timein: '' });
    }

    $scope.ok = function () {
        // $uibModalInstance.close($scope.user);
        $uibModalInstance.close($scope.editAppointment);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel', '');
    };

    $scope.openRepeatPopUp = function (val) {
        alert('inside editSingleAppointmentPopUp function');
        if (val) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'editSingleAppointmentRepeatPopUp.html',
                controller: 'editAppointmentRepeatModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    username: function () {
                        return 'kkk';
                        //$scope.username;
                    }
                }
            });

            modalInstance.result.then(function (editAppointmentRepeat) {
                console.log(editAppointmentRepeat);
            }, function () {
                alert('Modal dismissed at: ' + new Date());
            });
        }

    }

});


myapp.controller('editAppointmentRepeatModalInstanceCtrl', function ($uibModalInstance, $scope) {

    $scope.repeatType = ["Daily", "Weekly", "Monthly", "Yearly"];

    $scope.editSingleAppointmentRepeat = {
        startdate: '',
        enddate: '',
        repeattype: '',
        repeatevery: ''
    };

    $scope.ok = function () {
        // $uibModalInstance.close($scope.user);
        $uibModalInstance.close($scope.editSingleAppointmentRepeat);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel', '');
    };

});

myapp.controller('editBulkAppointmentModalInstanceCtrl', function ($uibModalInstance, $scope) {
    $scope.editBulkAppointment = { modifiedField: '', withValue: '' };

    $scope.editBulkAppointmentModifiedField = ["Assign to", "Visible to", "Company", "Start date"];
    $scope.editBulkAppointmentWithValue = ["Everyone", "Just me"];

    $scope.ok = function () {
        // $uibModalInstance.close($scope.user);
        $uibModalInstance.close($scope.editBulkAppointment);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel', '');
    };

});


myapp.controller('setUpModalInstanceCtrl', function ($uibModalInstance, $scope) {

    $scope.fields = ["Subject", "Company", "Start date", "End date", "Assign to"];

    $scope.sortby = { type: '', checkDescending: false }

    $scope.ok = function () {
        // $uibModalInstance.close($scope.user);
        $scope.setUp.push({
            setupFields: $scope.fields,
            setupSortby: $scope.sortby
        });

        $uibModalInstance.close($scope.setUp);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel', '');
    };

    $scope.deleteFields = function (idx) {
        alert('inside deleteFields function' + idx);
        $scope.fields.splice(idx, 1);
    }

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
