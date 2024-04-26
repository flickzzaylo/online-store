from django.db import models
from user.models import User
from goods.models import Goods

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE)
    message = models.TextField()