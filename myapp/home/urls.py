from django.urls import path
from . import views

app_name = 'home'

urlpatterns = [
    path('create/', views.create, name='create'),
    path(r'', views.index, name='index'),
]