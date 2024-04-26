from django.db import models
from user.models import User
from goods.models import Goods

class Cart(models.Model):
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, related_name='carts')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='carts')

class Purchase(models.Model):
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, related_name='purchases')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchases')