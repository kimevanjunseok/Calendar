$(document).ready(function() {
    var currentDate = new Date();
    function generateCalendar(d) {
        function monthDays(month, year) {
            var result = [];
            var days = new Date(year, month, 0).getDate();
            for (var i = 1; i <= days; i++) {
                result.push(i);
            }       
            return result;
        }   
        Date.prototype.monthDays = function() {
            var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
            return d.getDate();
        };
        var details = {
            // totalDays: monthDays(d.getMonth(), d.getFullYear()),
            totalDays: d.monthDays(),
            weekDays: ['일', '월', '화', '수', '목', '금', '토'],
            months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        };
        var start = new Date(d.getFullYear(), d.getMonth()).getDay();

        var copycurrent1 = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        var copycurrent2 = new Date(currentDate.getFullYear(), currentDate.getMonth()+1);
        var restday = copycurrent1.getDate() - copycurrent1.getDay()

        var cal = [];
        var day = 1;

        var cnt = 1;

        for (var i = 0; i <= 6; i++) {
            if (i == 0) {
                cal.push(['<div class="week-day">']);
            } else {
                cal.push(['<div class="week">']);
            }
            for (var j = 0; j < 7; j++) {
                if (i === 0) {
                    cal[i].push('<div class="day-name">' + details.weekDays[j] + '</div>');
                } else if (day > details.totalDays) {
                    cal[i].push(`<div class="day"><h3 id="${copycurrent2.getMonth()+1 + '/' + cnt + '/' + copycurrent2.getFullYear()}" class="day-label">` + cnt++ + '</h3></div>');
                } else {
                    if (i === 1 && j < start) {
                        cal[i].push(`<div class="day"><h3 id="${copycurrent1.getMonth()+1 + '/' + restday + '/' + copycurrent1.getFullYear()}" class="day-label">` + restday++ + '</h3></div>');
                    } else {
                        cal[i].push(`<div class="day"><h3 id="${d.getMonth()+1 + '/' + day + '/' + d.getFullYear()}" class="day-label">` + day++ + '</h3></div>');
                    }
                }
            }
            cal[i].push('</div>');

            if (day > details.totalDays) {
                break;
            }
        }
        cal = cal.reduce(function(a, b) {
            return a.concat(b);
        }, []).join('');
        
        $('#div-list').append(cal);
        $('#months').text(details.months[d.getMonth()]);
        $('#year').text(d.getFullYear());
        $('td.day').mouseover(function() {
            $(this).addClass('hover');
        }).mouseout(function() {
            $(this).removeClass('hover');
        });
    }

    $('#todaymove').click(function() {
        $('#div-list').text('');
        var newcurrentDate = new Date()
        generateCalendar(newcurrentDate);
    });

    $('#left').click(function() {
        $('#div-list').text('');
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        generateCalendar(currentDate);
    });
    $('#right').click(function() {
        $('#div-list').text('');
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        generateCalendar(currentDate);
    });
    generateCalendar(currentDate);
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(function () {
    $('#view li:first-child a').tab('show')
});

$(function () {
    $('[data-toggle="popover"]').popover().on('inserted.bs.popover')
});

$('#div-list, .daily-calendar').click(function() {
    $('#registerSchedule').modal('show');
});

$(".event-consecutive, .event, .event-repeated").click(function(event) {
    event.stopPropagation();
});

$(function () {
    $('#datetimepicker1').datetimepicker({
        format: 'L'
    });
    $('#datetimepicker3').datetimepicker({
        format: 'L'
    });
});

$(function () {
    $('#datetimepicker2').datetimepicker({
        format: 'LT'
    });
    $('#datetimepicker4').datetimepicker({
        format: 'LT'
    });
});
