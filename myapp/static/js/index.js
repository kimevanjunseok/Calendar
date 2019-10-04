$(document).ready(function() {
    var currentDate = new Date();
    async function generateCalendar(d) {
        var d_startdate = {}
        var all_DB
        await axios.get('api/v1/calendar_list/')
        .then(res => {
            all_DB = res.data
            res.data.forEach(data => {
                
                const start_d = data.start_day.split('-')
                const end_d = data.end_day.split('-')
                var judge
                if (start_d === end_d) {
                    judge = true
                } else {
                    judge = false
                }
                
                const diff_date1 = new Date(start_d[2], start_d[0]-1, start_d[1])
                const diff_date2 = new Date(end_d[2], end_d[0]-1, end_d[1])
                const diff = Math.floor((diff_date2.getTime() - diff_date1.getTime()) / 1000 / 60 / 60 / 24)

                if (data.start_day in d_startdate) {
                    d_startdate[data.start_day].push([diff+1, data.title, diff_date1.getDay(), false, `${diff_date1.getFullYear() + '년' + ' ' + diff_date1.getMonth() + '월' + ' ' + diff_date1.getDate() + '일'}`, `${diff_date2.getFullYear() + '년' + ' ' + diff_date2.getMonth() + '월' + ' ' + diff_date2.getDate() + '일'}`, data.start_time, data.end_time, data.content, judge])
                } else [
                    d_startdate[data.start_day] = [[diff+1, data.title, diff_date1.getDay(), false, `${diff_date1.getFullYear() + '년' + ' ' + diff_date1.getMonth() + '월' + ' ' + diff_date1.getDate() + '일'}`, `${diff_date2.getFullYear() + '년' + ' ' + diff_date2.getMonth() + '월' + ' ' + diff_date2.getDate() + '일'}`, data.start_time, data.end_time, data.content, judge]]
                ]
    
            })
        })

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

        all_DB.forEach(res => {
            const s_day_0 = res.start_day.split('-')
            const s_day = date_list[0].split('-')
            const e_day = res.end_day.split('-')
            
            const diff_d0 = new Date(s_day_0[2], s_day_0[0]-1, s_day_0[1])
            const diff_d1 = new Date(s_day[2], s_day[0]-1, s_day[1])
            const diff_d2 = new Date(e_day[2], e_day[0]-1, e_day[1])
            const diff_v = Math.floor((diff_d2.getTime() - diff_d1.getTime()) / 1000 / 60 / 60 / 24)

            if (!date_list.includes(res.start_day) && date_list.includes(res.end_day)) {
                if (date_list[0] in d_startdate) {
                    d_startdate[date_list[0]].push([diff_v+1, res.title, diff_d1.getDay(), true, `${diff_d0.getFullYear() + '년' + ' ' + diff_d0.getMonth() + '월' + ' ' + diff_d0.getDate() + '일'}`, `${diff_d2.getFullYear() + '년' + ' ' + diff_d2.getMonth() + '월' + ' ' + diff_d2.getDate() + '일'}`, res.start_time, res.end_time, res.content, false])
                } else {
                    d_startdate[date_list[0]] = [[diff_v+1, res.title, diff_d1.getDay(), true, `${diff_d0.getFullYear() + '년' + ' ' + diff_d0.getMonth() + '월' + ' ' + diff_d0.getDate() + '일'}`, `${diff_d2.getFullYear() + '년' + ' ' + diff_d2.getMonth() + '월' + ' ' + diff_d2.getDate() + '일'}`, res.start_time, res.end_time, res.content, false]]
                }
            }
        })

        var day_cal = ['7', '6', '5', '4', '3', '2', '1']
        for (var i in date_list) {
            if (date_list[i] in d_startdate) {
                d_startdate[date_list[i]].forEach(res => {
                    var data_content = `'<div class="content-line">
                                            <div class="event-marking">
                                            </div>
                                            <div class="title">
                                                <h5>${res[1]}</h5>
                                                <h6 class="reservation">
                                                    ${res[4] + " " + "~" + " " + res[5]}
                                                </h6>
                                                <span class="reservation-time">
                                                    ⋅오후 2:00~ 3:00
                                                </span>
                                            </div>
                                        </div>
                                        <div class="content-line">
                                            <i class="material-icons">
                                                notes
                                            </i>
                                            <div class="title">
                                                <h6 class="reservation">
                                                    ${res[8]}
                                                </h6>
                                            </div>
                                        </div>'`
                    if (Number(res[0]) > Number(day_cal[res[2]])) {
                        if (res[3]) {
                            $(`#${date_list[i]}`).after(`<div class="event" data-span="${day_cal[res[2]]}" data-toggle="popover" data-html="true" data-content=${data_content}>${res[1]}</div>`);
                        } else {
                            $(`#${date_list[i]}`).after(`<div class="event event-start" data-span="${day_cal[res[2]]}" data-toggle="popover" data-html="true" data-content=${data_content}>${res[1]}</div>`);
                        }

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
                            d_startdate[s_new_date].unshift([Number(res[0]) - Number(day_cal[res[2]]), res[1], 0, true, res[4], res[5]])
                        } else {
                            d_startdate[s_new_date] = [[Number(res[0]) - Number(day_cal[res[2]]), res[1], 0, true, res[4], res[5]]]
                        }

                    } else {
                        if (res[3]) {
                            $(`#${date_list[i]}`).after(`<div class="event event-end" data-span="${res[0]}" data-toggle="popover" data-html="true" data-content=${data_content}>${res[1]}</div>`);
                        } else {
                            $(`#${date_list[i]}`).after(`<div class="event event-start event-end" data-span="${res[0]}" data-toggle="popover" data-html="true" data-content=${data_content}>${res[1]}</div>`);
                        }
                    }
                })
            }
        }

        $(function () {
            $('[data-toggle="popover"]').popover().on('inserted.bs.popover')
        });

        // $('.week, .daily-calendar').click(function() {
        //     $('#registerSchedule').modal('show');
        // });
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
