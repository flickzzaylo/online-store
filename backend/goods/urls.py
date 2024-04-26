from django.urls import path
from .views import *

urlpatterns = [
    # бренды
    path('brands', BrandListCreateAPIView.as_view(), name='brand-list'),
    path('brand/create', BrandCreateOrUpdateAPIView.as_view(), name='brand-create'),
    path('brand/<int:pk>', BrandDetailAPIView.as_view(), name='brand-detail'),
    path('brand/update/<int:pk>', BrandCreateOrUpdateAPIView.as_view(),name='brand-update'),
    path('brand/delete/<int:pk>', BrandDeleteAPIView.as_view(), name='brand-delete'),

         # категории товаров
    path('categories', GoodsCategoryListCreateAPIView.as_view(), name='category-list'),
    path('category/create', CategoryCreateOrUpdateAPIView.as_view(), name='category-create'),
    path('category/<int:pk>', GoodsCategoryDetailAPIView.as_view(), name='category-detail'),
    path('category/update/<int:pk>', CategoryCreateOrUpdateAPIView.as_view(), name='category-update'),
    path('category/delete/<int:pk>', GoodsCategoryDeleteAPIView.as_view(), name='category-delete'),

    # товары
    path('goods', GoodsListCreateAPIView.as_view(), name='goods-list'),
    path('good/create', GoodsCreateAPIView.as_view(), name='goods-create'),
    path('good/<int:pk>', GoodsDetailAPIView.as_view(), name='goods-detail'),
    path('good/update/<int:pk>', GoodsUpdateAPIView.as_view(), name='goods-update'),
    path('good/delete/<int:pk>', GoodsDeleteAPIView.as_view(), name='goods-delete'),


    # дополнительные маршруты для получения товаров по категории и по бренду
    path('goods/by-category/<int:category_id>/', GoodsByCategoryView.as_view(), name='goods-by-category'),
    path('goods/by-brand/<int:brand_id>/', GoodsByBrandView.as_view(), name='goods-by-brand'),
]