from django.urls import path
from .views import CommentCreate, CommentById, CommentDelete, CommentUpdate, CommentByUserIdSQL, CommentByGoodsIdSQL

urlpatterns = [
    path('comment/<int:pk>', CommentById.as_view(),name='comment-details'),
    path('comment/create', CommentCreate.as_view(), name='comment-create'),
    path('comment/delete/<int:pk>', CommentDelete.as_view(), name='comment-delete'),
    path('comment/update/<int:pk>', CommentUpdate.as_view(), name='comment-update'),
    path('comments/user/<int:user_id>', CommentByUserIdSQL.as_view(), name='comment-list-by-user'),
    path('comments/goods/<int:goods_id>', CommentByGoodsIdSQL.as_view(), name='comment-list-by-goods')
]