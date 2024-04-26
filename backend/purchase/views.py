from rest_framework import generics, viewsets
from .models import Purchase, Cart
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import PurchaseSerializer, CartSerializer, CartPOSTSerializer, PurchasePOSTSerializer
from django.db import connection

class UserCart(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
class CartCreate(generics.CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartPOSTSerializer


class CartDelete(generics.DestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer # Тут всё работает и с POST, но может есть подвох :) Так что я оставлю так


class PurchaseByUser(generics.ListAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

class PurchaseCreate(generics.CreateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchasePOSTSerializer


class PurchaseDelete(generics.DestroyAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer


class PurchaseDetail(generics.RetrieveAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer


def get_purchases_by_user(user_id):
    with connection.cursor() as cursor:
        cursor.execute("""
                SELECT pp.id, pp.user_id, gg.*
                FROM purchase_purchase pp
                INNER JOIN goods_goods gg ON gg.id = pp.goods_id
                WHERE pp.user_id = %s
            """, [user_id])
        rows = cursor.fetchall()

    purchases = []
    for row in rows:
        purchase = {
            'id': row[0],
            'user_id': row[1],
            'goods': {
                'id': row[2],
                'name': row[3],
                'price': row[4]
            }
        }
        purchases.append(purchase)

    return purchases

class PurchaseSQLListCreateAPIView(APIView):
    def get(self, request, user_id):
        purchases = get_purchases_by_user(user_id)
        return Response(purchases, status=status.HTTP_200_OK)


def get_cart_by_user(user_id):
    with connection.cursor() as cursor:
        cursor.execute("""
                SELECT pc.id, pc.user_id, gg.*
                FROM purchase_cart pc
                INNER JOIN goods_goods gg ON gg.id = pc.goods_id
                WHERE pc.user_id = %s
            """, [user_id])
        rows = cursor.fetchall()

    carts = []
    for row in rows:
        cart = {
            'id': row[0],
            'user_id': row[1],
            'goods': {
                'id': row[2],
                'name': row[3],
                'price': row[4]
            }
        }
        carts.append(cart)

    return carts

class CartSQLListCreateAPIView(APIView):
    def get(self, request, user_id):
        carts = get_cart_by_user(user_id)
        return Response(carts, status=status.HTTP_200_OK)


