from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CalendarSerializer
from .models import Calendar

# Create your views here.

def index(request):
    return render(request, 'index.html')

def create(request):
    if request.method == "POST":
        title = request.POST.get('title')
        content = request.POST.get('content')
        
        start_day = __convert_day_format(request.POST.get('start_day'))
        end_day = __convert_day_format(request.POST.get('end_day'))
        start_time = __convert_time_display(request.POST.get('start_time'))
        end_time = __convert_time_display(request.POST.get('end_time'))
        
        calendars = Calendar(title=title, content=content, start_day=start_day, end_day=end_day, start_time=start_time, end_time=end_time)

        calendars.save()

      
    return redirect('home:index')

@api_view(['GET'])
def calendar_list(request):
    calendar = Calendar.objects.all()
    serializer = CalendarSerializer(calendar, many=True)
    return Response(serializer.data)

def __convert_day_format(day):
    return day.replace("/", "-")

def __convert_time_display(time):
    return '하루종일' if not time else time