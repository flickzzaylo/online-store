from django.db import models

class Brand(models.Model):
    name = models.TextField()
    icon_format = models.CharField(max_length=10, null=True)
    icon_data = models.BinaryField(null=True)

class GoodsCategory(models.Model):
    name = models.TextField()
    icon_format = models.CharField(max_length=10, null=True)
    icon_data = models.BinaryField(null=True)

class Goods(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    category = models.ForeignKey(GoodsCategory, on_delete=models.CASCADE)
    name = models.TextField()
    price = models.FloatField()
    rating = models.IntegerField(null=True)
    description = models.TextField()
    image = models.ImageField(upload_to='goods_images', null=True)