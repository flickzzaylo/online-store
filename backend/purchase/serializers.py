from rest_framework import serializers
from goods.models import Brand, GoodsCategory, Goods
from .models import Purchase, Cart
from user.models import User
class GoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goods
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class GoodsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsCategory
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=Purchase.objects.all(),
        source='user',
        write_only=True
    )
    goods = GoodsSerializer()
    brand = BrandSerializer()
    goodsCategory = GoodsCategorySerializer(source='goods.category')
    class Meta:
        model = Purchase
        fields = ['id', 'user_id', 'goods', 'brand', 'goodsCategory']

class CartPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

# class CartPOSTSerializer(serializers.ModelSerializer):
#     user_id = serializers.PrimaryKeyRelatedField(
#         queryset=Purchase.objects.all(),
#         source='user',
#         write_only=True
#     )
#     class Meta:
#         model = Purchase
#         fields = ['id', 'user_id', 'goods', 'brand', 'goodsCategory']


class PurchasePOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=Cart.objects.all(),
        source='user',
        write_only=True
    )
    goods = GoodsSerializer()
    brands = BrandSerializer()
    goodsCategory = GoodsCategorySerializer(source='goods.category')
    class Meta:
        model = Cart
        fields = ['id', 'user_id','goods', 'brands', 'goodsCategory']