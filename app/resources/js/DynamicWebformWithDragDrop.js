var myapp = angular.module('myapp',[]);
myapp.controller('DynamicWebFormCtrl', function ($scope) {
    var element_pos = 0;    // POSITION OF THE NEWLY CREATED ELEMENTS.
    var iCnt = 0;
    $(document).ready(function(){

         $('#divContainer').draggable();
        //$(function () { $("#divResize").draggable().resizable(); });

        // CREATE MORE DIV, WITH 'ABSOLUTE' POSITIONING.
        $('#btClickMe').click(function () {

            var dynamic_div = $(document.createElement('div')).css({
                border: '1px dashed', position: 'absolute', left: element_pos,
                top: $('#divContainer').height() + 20,
                width: '120', height: '120', padding: '3', margin: '0'
            });

            element_pos = element_pos + $('#divContainer').width() + 20;

            $(dynamic_div).append('You can drag me too');

            // APPEND THE NEWLY CREATED DIV TO "divContainer".
            $(dynamic_div).appendTo('#divContainer').draggable();

            iCnt = iCnt + 1;
        });
    });
});