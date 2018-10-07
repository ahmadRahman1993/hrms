/**
 * Created by Muhammad Annis on 11/21/2016.
 */

$(window).on('load', function() {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var started;
    var categoryClass;

    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function (start, end, allDay) {
            $('#fc_create').click();

            started = start;
            ended = end

            $(".antosubmit").on("click", function () {
                var title = $("#title").val();
                if (end) {
                    ended = end
                }
                categoryClass = $("#event_type").val();

                if (title) {
                    calendar.fullCalendar('renderEvent', {
                            title: title,
                            start: started,
                            end: end,
                            allDay: allDay
                        },
                        true // make the event "stick"
                    );
                }
                $('#title').val('');
                calendar.fullCalendar('unselect');

                $('.antoclose').click();

                return false;
            });
        },
        eventClick: function (calEvent, jsEvent, view) {
            //alert(calEvent.title, jsEvent, view);

            $('#fc_edit').click();
            $('#title2').val(calEvent.title);
            categoryClass = $("#event_type").val();

            $(".antosubmit2").on("click", function () {
                calEvent.title = $("#title2").val();

                calendar.fullCalendar('updateEvent', calEvent);
                $('.antoclose2').click();
            });
            calendar.fullCalendar('unselect');
        },
        events: [{
            title: 'Meeting',
            start: new Date(y, m, d),
            allDay: false,
            resourceEditable: false
        },/*, {
         title: 'Click for Google',
         start: new Date(y, m, 28),
         end: new Date(y, m, 29),
         url: 'http://google.com/'
         }*/
            {
                title: 'Project Demo',
                start: new Date(y, m, d + 4),
                end: new Date(y, m, d + 6),
                resourceEditable: false
            }
        ]
    });
});