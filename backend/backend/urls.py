"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'clicked', views.ClickView, 'click_count')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('on-load/', views.on_load, name='on-load'),
    path('update-clicks/', views.update_clicks, name='update-clicks'),
    path('reset-clicks/', views.reset_clicks, name='reset-clicks'),
]


# delete obj from database using button instead of reset
# frontend: sass -> style using sass