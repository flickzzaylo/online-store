from django.db import models

class Role(models.Model):
    name = models.TextField()

class Wallet(models.Model):
    amount = models.IntegerField()

class User(models.Model):
    wallet = models.OneToOneField(Wallet, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    name = models.TextField()
    login = models.TextField()
    password = models.TextField()