from django.urls import path
from . import views

app_name = 'home'

urlpatterns = [
    path('api/v1/calendar_list/', views.calendar_list, name='calendar_list'),
    path('create/', views.create, name='create'),
    path('', views.index, name='index'),
]