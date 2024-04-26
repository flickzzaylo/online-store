from rest_framework import generics, viewsets
from .models import Comment
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import CommentSerializer, CommentPOSTSerializer
from django.db import connection

class CommentCreate(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentPOSTSerializer


class CommentDelete(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentUpdate(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentPOSTSerializer


class CommentById(generics.RetrieveAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

def get_comment_by_user(user_id):
    with connection.cursor() as cursor:
        cursor.execute("""SELECT cmnt.id, cmnt.message, cmnt.user_id, cmnt.goods_id
                FROM comment_comment cmnt
                INNER JOIN goods_goods gg ON gg.id = cmnt.goods_id
                WHERE cmnt.user_id=%s""",[user_id])
        rows= cursor.fetchall()

    comments = []
    for row in rows:
        comment = {
            'id': row[0],
            'message': row[1],
            'user_id': row[2],
            'goods_id': row[3]
        }
        comments.append(comment)
    return comments


class CommentByUserIdSQL(APIView):
    def get(self,request,user_id):
        comments = get_comment_by_user(user_id)
        return Response(comments,status=status.HTTP_200_OK)


def get_comment_by_goods(goods_id):
    with connection.cursor() as cursor:
        cursor.execute("""SELECT cmnt.id, cmnt.message, cmnt.user_id, cmnt.goods_id
                FROM comment_comment cmnt
                INNER JOIN goods_goods gg ON gg.id = cmnt.goods_id
                WHERE cmnt.goods_id=%s""",[goods_id])
        rows= cursor.fetchall()

    comments = []
    for row in rows:
        comment = {
            'id': row[0],
            'message': row[1],
            'user_id': row[2],
            'goods_id': row[3]
        }
        comments.append(comment)
    return comments


class CommentByGoodsIdSQL(APIView):
    def get(self,request,goods_id):
        comments = get_comment_by_goods(goods_id)
        return Response(comments,status=status.HTTP_200_OK)