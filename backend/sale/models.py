from django.db import models

class Sale(models.Model):
    amount = models.IntegerField()
    begin_date = models.DateField()
    end_date = models.DateField()