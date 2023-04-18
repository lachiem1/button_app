from django.db import models

# Create your models here.
class Click(models.Model):
    num_clicks = models.IntegerField(default=0)