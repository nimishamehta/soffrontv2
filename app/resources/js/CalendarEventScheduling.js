var myapp = angular.module('ngTableTutorial', ['ngTable', 'ngAnimate', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'ui.sortable', 'ngSanitize', 'ui.select', 'ui.calendar','ui.bootstrap.datetimepicker']);
myapp.controller('ngtableCtrl', function ($scope, NgTableParams, $filter, $uibModal, uiCalendarConfig, $http,$compile) {
    $scope.SelectedEvent = null;
    var isFirstTime = true;
    $scope.events = [];
    $scope.eventSources =[$scope.events];

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that contains custom events on the scope */

    //date(year,month,day,hour,minute)

    $scope.events = [
      { id:1,title: 'All Day Event', start: new Date(y, m, 1) },
      { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
      { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: true },
      { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: true },
      { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: true },
      { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
    ];
    /* event source that calls a function on every view switch */

    $scope.eventRender = function (event, element, view) {
     //   alert('eventRender function');
        element.attr({
            'tooltip': event.title,
            'tooltip-append-to-body': true
        });
        $compile(element)($scope);
    };

    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: true,
            displayEventTime: true,
            selectable: true,
            selectHelper: true,
            select: function (start, end) {
                var fromDate = moment(start).format('YYYY/MM/DD LT');
                var endDate = moment(end).format('YYYY/MM/DD LT');
                $scope.NewEvent = {
                    EventID: 0,
                    StartAt: fromDate,
                    EndAt: endDate,
                    IsFullDay: false,
                    Title: '',
                    Description: ''
                }
                $scope.ShowModal();
            },
            eventClick: function (event) {
                $scope.SelectedEvent = event;
                var fromDate = moment(event.start).format('YYYY/MM/DD LT');
                var endDate = moment(event.end).format('YYYY/MM/DD LT');

                console.log('fromDate:' + fromDate);
                console.log('endDate:'+ endDate);

                $scope.NewEvent = {
                    EventID: event.id,
                    StartAt: fromDate,
                    EndAt: endDate,
                    IsFullDay: false,
                    Title: event.title,
                    Description: event.description
                }

                $scope.ShowModal();
            },
            header: {
                left: 'month,agendaWeek,agendaDay',
                center: 'title',
                right:'today prev,next'
            },
            timeFormat: {
                month: ' ', // for hide on month view
                agenda: 'h:mm t'
            },
            eventRender: $scope.eventRender
        }
    };
    /* event sources array */
    $scope.eventSources = [$scope.events];

    $scope.NewEvent = {};
    //this function for get datetime from json date
    function getDate(datetime) {
        alert('inside getDate function');
        if (datetime != null) {
            var mili = datetime.replace(/\/Date\((-?\d+)\)\//, '$1');
            return new Date(parseInt(mili));
        }
        else {
            return "";
        }
    }
    $scope.ShowModal = function () {
        $scope.option = {
            templateUrl: 'modalContent.html',
            controller: 'modalController',
            backdrop: 'static',
            resolve: {
                NewEvent: function () {
                    return $scope.NewEvent;
                }
            }
        };

        //CRUD operations on Calendar starts here
        var modal = $uibModal.open($scope.option);
        modal.result.then(function (data) {
            $scope.NewEvent = data.event;
            switch (data.operation) {
                case 'Save':            //save
                    console.log($scope.NewEvent);
                    //new event
                    if ($scope.NewEvent.EventID == 0) {
                        $scope.events.push({
                            title: 'Birthday Partyssssss',
                            start: moment(new Date(y, m, d + 1, 19, 20)).format('YYYY/MM/DD LT'),
                            end: new Date(y, m, d + 1, 22, 30),
                            allDay: false
                        });
                    }

                    //update event
                    else {

                    }
                    //$http({
                    //    method: 'POST',
                    //    url: '/home/SaveEvent',
                    //    data: $scope.NewEvent
                    //}).then(function (response) {
                    //    if (response.data.status) {
                    //        populate();
                    //    }
                    //})
                    
                 
                    console.log($scope.events);
                    break;
                case 'Delete':          //delete
                    //$http({
                    //    method: 'POST',
                    //    url: '/home/DeleteEvent',
                    //    data: { 'eventID': $scope.NewEvent.EventID }
                    //}).then(function (response) {
                    //    if (response.data.status) {
                    //        populate();
                    //    }
                    //})
                    for (var i = 0; i < $scope.events.length; i++) {
                        if ($scope.events[i].id == $scope.NewEvent.EventID) {
                            $scope.events.splice(i,1);
                        }
                    }
                    console.log($scope.events);
                    break;
                default:
                    break;
            }
        }, function () {
            console.log('Modal dialog closed');
        })
    }
});

// create a new controller for Bootstrap Angualr modal popup
myapp.controller('modalController', ['$scope', '$uibModalInstance', 'NewEvent', function ($scope, $uibModalInstance, NewEvent) {

    $scope.config = {
        datetimePicker: {
            startView: 'year',
            minuteStep: 20,
            dateFormat: 'yyyy-MM-dd HH:mm',
        }
    };

    $scope.NewEvent = NewEvent;
    $scope.Message = "";
    $scope.ok = function () {
        if ($scope.NewEvent.Title.trim() != "") {
            $uibModalInstance.close({ event: $scope.NewEvent, operation: 'Save' });
        }
        else {
            $scope.Message = "Event title required!";
        }
    }
    $scope.delete = function () {
        $uibModalInstance.close({ event: $scope.NewEvent, operation: 'Delete' });
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
