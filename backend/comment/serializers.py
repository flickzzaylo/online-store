from rest_framework import serializers
from .models import Comment, Goods, User
from goods.models import Brand, GoodsCategory

# class GoodsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Goods
#         fields = '__all__'
#
#
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class CommentPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class GoodsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsCategory
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects,
        source='user',
        write_only=True
    )
    goods_id = serializers.PrimaryKeyRelatedField(
        queryset=Goods.objects,
        source='goods',
        write_only=True
    )
    brand = BrandSerializer(source='goods.brand')
    goodsCategory = GoodsCategorySerializer(source='goods.category')
    class Meta:
        model = Comment
        fields = ['id','user_id','goods_id','message','goods','brand','goodsCategory']

