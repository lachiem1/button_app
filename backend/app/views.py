from rest_framework import viewsets, filters
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .serializers import ClickSerializer
from .models import Click

class ClickView(viewsets.ModelViewSet):
    serializer_class = ClickSerializer
    queryset = Click.objects.all()

# @csrf_exempt
# def get_id(request):
#     if Click.objects.all().exists() and request.method == 'GET':
#         click_obj = Click

@csrf_exempt
def on_load(request):
    # if using GET and database is empty
    if request.method == 'GET' and not Click.objects.all().exists():
        return JsonResponse({'status': 'on-load - empty db', 
                                 'objNumClicks': -1})
    # if it is not empty, display what is currently in database but do not increase count yet
    elif request.method == 'GET' and  Click.objects.all().exists():
        click_obj = Click.objects.first()
        return JsonResponse({'objNumClicks': click_obj.num_clicks})
    else:
        return JsonResponse({'status': 'on_load() - invalid fetch method'})


@csrf_exempt
def update_clicks(request):
    # check if a click object already exists in my database
    if Click.objects.all().exists():
        click_obj = Click.objects.first()
        if request.method == 'GET':
            click_obj.num_clicks += 1
            click_obj.save()
            return JsonResponse({'objNumClicks': click_obj.num_clicks})
        elif request.method == 'DELETE':
            click_obj.delete()
            return JsonResponse({'status': 'DELETE - success', 
                                 'objNumClicks': -1})
        else:
            return JsonResponse({'status': 'fail - update_clicks()'})
    
    else:
        # don't want to delete if there is nothing to delete
        if request.method == 'DELETE':
            return JsonResponse({'status': 'cannot delete obj - db is empty'})
        # if database is empty -> create new Click() obj
        elif request.method == 'GET':
            new_click_obj = Click()
            new_click_obj.num_clicks = 1
            new_click_obj.save()
            return JsonResponse({'status': 'GET - success new obj created',
                                 'objNumClicks': new_click_obj.num_clicks})
        else:
            return JsonResponse({'status': 'invalid request'})
        
def reset_clicks(request):
    if Click.objects.all().exists():
        click_obj = Click.objects.first()
        if request.method == 'GET':
            click_obj.num_clicks = 0
            click_obj.save()
            return JsonResponse({'status': 'GET - reset success',
                                 'objNumClicks': click_obj.num_clicks})
        
    else:
        return JsonResponse({'status': 'invalid reset request'})


    
