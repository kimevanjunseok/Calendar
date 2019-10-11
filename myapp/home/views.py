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

        start_day = request.POST.get('start_day')
        start_day = start_day.replace("/", "-")

        end_day = request.POST.get('end_day')
        end_day = end_day.replace("/", "-")

        start_time = request.POST.get('start_time')
        if not start_time:
            start_time = '하루종일'
        
        end_time = request.POST.get('end_time')
        if not end_time:
            end_time = '하루종일'
            

        calendars = Calendar(title=title, content=content, start_day=start_day, end_day=end_day, start_time=start_time, end_time=end_time)

        calendars.save()

      
    return redirect('home:index')

@api_view(['GET'])
def calendar_list(request):
    calendar = Calendar.objects.all()
    serializer = CalendarSerializer(calendar, many=True)
    return Response(serializer.data)