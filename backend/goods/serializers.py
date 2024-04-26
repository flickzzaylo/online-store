from rest_framework import serializers
from .models import Brand, GoodsCategory, Goods

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class GoodsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsCategory
        fields = '__all__'

class GoodsSerializer(serializers.ModelSerializer):
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        source='brand',
        write_only=True
    )

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=GoodsCategory.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model = Goods
        fields = ['id', 'name', 'brand_id', 'category_id', 'price', 'rating', 'description', 'image']


class GoodsFullSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    category = GoodsCategorySerializer()
    class Meta:
        model = Goods
        fields = ['id', 'name', 'image', 'price', 'description', 'rating', 'brand', 'category']