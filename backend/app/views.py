from django.shortcuts import render
from rest_framework import viewsets, filters
from .serializers import ClickSerializer
from .models import Click

class ClickView(viewsets.ModelViewSet):
    serializer_class = ClickSerializer
    queryset = Click.objects.all()
    # filter_backends = (filters.SearchFilter,)
    # search_fields = ('click_id', 'num_clicks')
