from django.urls import path
from .views import PurchaseCreate, PurchaseDetail, PurchaseDelete, PurchaseSQLListCreateAPIView, CartCreate, CartDelete, \
    CartSQLListCreateAPIView, UserCart, ClearCart

urlpatterns = [
    path('purchase/<int:pk>', PurchaseDetail.as_view(), name='purchase-detail'),
    path('purchase/create', PurchaseCreate.as_view(), name='purchase_create'),
    path('purchase/delete/<int:pk>', PurchaseDelete.as_view(), name='purchase_delete'),
    path('purchases/<int:user_id>', PurchaseSQLListCreateAPIView.as_view(), name='purchases-list-by-user'),
    path('cart/create', CartCreate.as_view(), name='cart-create'),
    path('cart/delete/<int:pk>', CartDelete.as_view(), name='cart-delete'),
    path('cart/<int:user_id>', CartSQLListCreateAPIView.as_view(),name='cart-list-by-user'),
    path('cart/clear/<int:user_id>',ClearCart.as_view(),name='cart-clear'),
    # path('cart/<int:user_id>', UserCart.as_view(),name='cart-list-by-user')
]