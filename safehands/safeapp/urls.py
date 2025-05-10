from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('campaigns/', views.campaigns, name='campaigns'),
    path('donate/', views.donate, name='donate'),
    path('emergency/', views.emergency, name='emergency'),
    path('report/', views.report, name='report'),
    path('verify/', views.verify, name='verify'),
    path('volunteer/', views.volunteer, name='volunteer'),
]