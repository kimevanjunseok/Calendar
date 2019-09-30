from django.shortcuts import render
import datetime

# Create your views here.

def index(request):
    # weeks = {   "Sun": 0,
    #             "Mon": 1,
    #             "Tus": 2,
    #             "Wed": 3,
    #             "Thu": 4,
    #             "Fri": 5,
    #             "Sat": 7
    #         }
    # info = datetime
    # today = info.date.today()
    # year, month, day = map(int, str(today).split('-'))
    # week = weeks[info.date(year, month, 1).strftime("%A")[:3]]

    # context = {
    #     "year": year,
    #     "month": month,
    #     "day" : day,
    #     "week": week,
    # }
    return render(request, 'index.html', {})