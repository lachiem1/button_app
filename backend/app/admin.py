from django.contrib import admin
from .models import Click

class ClickAdmin(admin.ModelAdmin):
    list_display = ["num_clicks"]

# register model
admin.site.register(Click, ClickAdmin)
