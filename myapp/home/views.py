from django.shortcuts import render, redirect
from .models import Calendar

# Create your views here.

def index(request):
    calendars = Calendar.objects.all()
    context = {
        'calendars': calendars,
    } 
    return render(request, 'index.html', context)

def create(request):
    if request.method == "POST":
        title = request.POST.get('title')
        content = request.POST.get('content')
        start_day = request.POST.get('start_day')
        end_day = request.POST.get('end_day')
        start_time = request.POST.get('start_time')
        end_time = request.POST.get('end_time')

        calendars = Calendar(title=title, content=content, start_day=start_day, end_day=end_day, start_time=start_time, end_time=end_time)

        calendars.save()

      
    return redirect('home:index')