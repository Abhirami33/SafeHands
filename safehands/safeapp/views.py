from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def campaigns(request):
    return render(request, 'campaigns.html')

def donate(request):
    return render(request, 'donate.html')

def emergency(request):
    return render(request, 'emergency.html')

def report(request):
    return render(request, 'report.html')

def verify(request):
    return render(request, 'verify.html')

def volunteer(request):
    return render(request, 'volunteer.html')

