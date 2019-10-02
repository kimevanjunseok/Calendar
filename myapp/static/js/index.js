$(document).ready(function() {
    var currentDate = new Date();
    async function generateCalendar(d) {
        var d_startdate = {}
        await axios.get('api/v1/calendar_list/')
        .then(res => {
            res.data.forEach(data => {
                
                const start_d = data.start_day.split('-')
                const end_d = data.end_day.split('-')
                
                const diff_date1 = new Date(start_d[2], start_d[0]-1, start_d[1])
                const diff_date2 = new Date(end_d[2], end_d[0]-1, end_d[1])
                const diff = Math.floor((diff_date2.getTime() - diff_date1.getTime()) / 1000 / 60 / 60 / 24)

                if (data.start_day in d_startdate) {
                    d_startdate[data.start_day].push([diff+1, data.title, diff_date1.getDay()])
                } else [
                    d_startdate[data.start_day] = [[diff+1, data.title, diff_date1.getDay()]]
                ]
    
            })
        })
        // function monthDays(month, year) {
        //     var result = [];
        //     var days = new Date(year, month, 0).getDate();
        //     for (var i = 1; i <= days; i++) {
        //         result.push(i);
        //     }       
        //     return result;
        // }   
        Date.prototype.monthDays = function() {
            var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
            return d.getDate();
        };
        var details = {
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
        var date_list = []
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
                    date_list.push(copycurrent2.getMonth()+1 + '-' + '0' + cnt + '-' + copycurrent2.getFullYear())
                    cal[i].push(`<div class="day"><h3 id="${copycurrent2.getMonth()+1 + '-' + '0' + cnt + '-' + copycurrent2.getFullYear()}" class="day-label">` + cnt++ + '</h3></div>');
                } else {
                    if (i === 1 && j < start) {
                        if (copycurrent1.getMonth()+1 < 10) {
                            date_list.push('0' + '' + (copycurrent1.getMonth()+1) + '-' + restday + '-' + copycurrent1.getFullYear())
                            cal[i].push(`<div class="day"><h3 id="${'0' + '' + (copycurrent1.getMonth()+1) + '-' + restday + '-' + copycurrent1.getFullYear()}" class="day-label">` + restday++ + '</h3></div>');
                        } else {
                            date_list.push(copycurrent1.getMonth()+1 + '-' + restday + '-' + copycurrent1.getFullYear())
                            cal[i].push(`<div class="day"><h3 id="${copycurrent1.getMonth()+1 + '-' + restday + '-' + copycurrent1.getFullYear()}" class="day-label">` + restday++ + '</h3></div>');
                        }
                    } else {
                        if (d.getMonth()+1 < 10) {
                            if (day < 10) {
                                date_list.push('0' + '' + (d.getMonth()+1) + '-' + '0' + day + '-' + d.getFullYear())
                                cal[i].push(`<div class="day"><h3 id="${'0' + '' + (d.getMonth()+1) + '-' + '0' + day + '-' + d.getFullYear()}" class="day-label">` + day++ + '</h3></div>');
                            } else {
                                date_list.push('0' + '' + (d.getMonth()+1) + '-' + day + '-' + d.getFullYear())
                                cal[i].push(`<div class="day"><h3 id="${'0' + '' + (d.getMonth()+1) + '-' + day + '-' + d.getFullYear()}" class="day-label">` + day++ + '</h3></div>');
                            }
                        } else {
                            if (day < 10) {
                                date_list.push(d.getMonth()+1 + '-' + '0' + day + '-' + d.getFullYear())
                                cal[i].push(`<div class="day"><h3 id="${d.getMonth()+1 + '-' + '0' + day + '-' + d.getFullYear()}" class="day-label">` + day++ + '</h3></div>');
                            } else {
                                date_list.push(d.getMonth()+1 + '-' + day + '-' + d.getFullYear())
                                cal[i].push(`<div class="day"><h3 id="${d.getMonth()+1 + '-' + day + '-' + d.getFullYear()}" class="day-label">` + day++ + '</h3></div>');
                            }
                        }
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
        var day_cal = ['7', '6', '5', '4', '3', '2', '1']
        for (var i in date_list) {
            if (date_list[i] in d_startdate) {
                d_startdate[date_list[i]].forEach(res => {
                    if (Number(res[0]) > Number(day_cal[res[2]])) {
                        $(`#${date_list[i]}`).after(`<div class="event event-start event-end" data-span="${day_cal[res[2]]}" data-toggle="popover" data-html="true">${res[1]}</div>`);
                        var share = date_list[i].split('-')
                        var new_date = new Date(share[2], share[0]-1, Number(share[1]) + Number(day_cal[res[2]]))
                        if (new_date.getMonth() + 1 < 10) {
                            if (new_date.getDate() < 10) {
                                var s_new_date = '0' + '' + (new_date.getMonth() + 1) + '-' + '0' + new_date.getDate() + '-' + new_date.getFullYear()
                            } else {
                                var s_new_date = '0' + '' + (new_date.getMonth() + 1) + '-' + new_date.getDate() + '-' + new_date.getFullYear()
                            }
                        } else {
                            if (new_date.getDate() < 10) {
                                var s_new_date = (new_date.getMonth() + 1) + '-' + '0' + new_date.getDate() + '-' + new_date.getFullYear()
                            } else {
                                var s_new_date = (new_date.getMonth() + 1) + '-' + new_date.getDate() + '-' + new_date.getFullYear()
                            }
    
                        }

                        if (s_new_date in d_startdate) {
                            d_startdate[s_new_date].push([Number(res[0]) - Number(day_cal[res[2]]), res[1], 0])
                        } else {
                            d_startdate[s_new_date] = [[Number(res[0]) - Number(day_cal[res[2]]), res[1], 0]]
                        }

                    } else {
                        $(`#${date_list[i]}`).after(`<div class="event event-start event-end" data-span="${res[0]}" data-toggle="popover" data-html="true">${res[1]}</div>`);
                    }
                })

            }

        }
        console.log(d_startdate)

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
