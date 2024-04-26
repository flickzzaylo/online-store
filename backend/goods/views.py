from rest_framework import generics
from .models import Brand, GoodsCategory, Goods
from .serializers import BrandSerializer, GoodsCategorySerializer, GoodsSerializer, GoodsFullSerializer
import base64
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import io
from PIL import Image

# работа с брендами
class BrandListCreateAPIView(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandCreateAPIView(generics.CreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandUpdateAPIView(generics.UpdateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandDeleteAPIView(generics.DestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

# работа с категориями
class GoodsCategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = GoodsCategory.objects.all()
    serializer_class = GoodsCategorySerializer

class GoodsCategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GoodsCategory.objects.all()
    serializer_class = GoodsCategorySerializer

class GoodsCategoryCreateAPIView(generics.CreateAPIView):
    queryset = GoodsCategory.objects.all()
    serializer_class = GoodsCategorySerializer

class GoodsCategoryUpdateAPIView(generics.UpdateAPIView):
    queryset = GoodsCategory.objects.all()
    serializer_class = GoodsCategorySerializer

class GoodsCategoryDeleteAPIView(generics.DestroyAPIView):
    queryset = GoodsCategory.objects.all()
    serializer_class = GoodsCategorySerializer

# работа с товарами
class GoodsListCreateAPIView(generics.ListCreateAPIView):
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer


class GoodsByCategoryView(generics.ListAPIView):
    serializer_class = GoodsSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Goods.objects.filter(category_id=category_id)

class GoodsByBrandView(generics.ListAPIView):
    serializer_class = GoodsSerializer

    def get_queryset(self):
        brand_id = self.kwargs['brand_id']
        return Goods.objects.filter(brand_id=brand_id)


class BrandCreateOrUpdateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        brand_id = kwargs.get('pk')  # получаем id (записан как pk в url, см. url.py) из параметров url
        print(self.kwargs)
        name = request.data.get('name')
        icon_base64 = request.data.get('icon')

        try:
            if icon_base64:
                # разделим строку, чтобы извлечь формат изображения и данные
                format, data = icon_base64.split(";base64,")
                # декодируем данные base64 в двоичные данные
                icon_data = base64.b64decode(data)
                # преобразуем двоичные данные в изображение
                image = Image.open(io.BytesIO(icon_data))
                # убедимся, что изображение открылось корректно и не повреждено (если повреждено, то данные бренда не добавятся в бд и будет сгенерировано исключение)
                image.verify()

            if brand_id:
                # если присутствует идентификатор бренда, это запрос на обновление
                brand = Brand.objects.get(id=brand_id)
                brand.name = name
                if icon_base64:
                    brand.icon_format = format
                    brand.icon_data = icon_data
                brand.save()
            else:
                # если идентификатор отсутствует, это запрос на добавление нового бренда
                brand = Brand.objects.create(
                    name=name,
                    icon_format=format,
                    icon_data=icon_data
                )

            serializer = BrandSerializer(brand)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.views import APIView
import os
class GoodsListCreateAPIView(APIView):
    def get(self, request):
        goods = Goods.objects.all()
        serializer = GoodsFullSerializer(goods, many=True)
        for item in serializer.data:
            # включаем путь к изображению
            item['image'] = request.build_absolute_uri(item['image'])
            item['brand_id'] = item['brand']['id']
            item['brand'] = item['brand']['name']
            item['category_id'] = item['category']['id']
            item['category'] = item['category']['name']
        return Response(serializer.data)

class GoodsCreateAPIView(generics.CreateAPIView):
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer

class GoodsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Goods.objects.all()
    serializer_class = GoodsFullSerializer

class GoodsUpdateAPIView(generics.UpdateAPIView):
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        # получаем путь к старому файлу
        old_image = instance.image.path

        new_image = request.FILES.get('image')
        if new_image:
            # удаляем старый файл из каталога
            if os.path.exists(old_image):
                os.remove(old_image)

        return self.update(request, *args, **kwargs)
class GoodsDeleteAPIView(generics.DestroyAPIView):
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer

class CategoryCreateOrUpdateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        category_id = kwargs.get('pk')  # получаем id (записан как pk в url, см. url.py) из параметров url
        name = request.data.get('name')
        icon_base64 = request.data.get('icon')

        try:
            if icon_base64:
                # разделим строку, чтобы извлечь формат изображения и данные
                format, data = icon_base64.split(";base64,")
                # декодируем данные base64 в двоичные данные
                icon_data = base64.b64decode(data)
                # преобразуем двоичные данные в изображение
                image = Image.open(io.BytesIO(icon_data))
                # убедимся, что изображение открылось корректно и не повреждено (если повреждено, то данные бренда не добавятся в бд и будет сгенерировано исключение)
                image.verify()

            if category_id:
                # если присутствует идентификатор бренда, это запрос на обновление
                category = GoodsCategory.objects.get(id=category_id)
                category.name = name
                if icon_base64:
                    category.icon_format = format
                    category.icon_data = icon_data
                category.save()
            else:
                # если идентификатор отсутствует, это запрос на добавление нового бренда
                category = GoodsCategory.objects.create(
                    name=name,
                    icon_format=format,
                    icon_data=icon_data
                )

            serializer = GoodsCategorySerializer(category)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)