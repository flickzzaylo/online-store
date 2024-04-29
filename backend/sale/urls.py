from django.urls import path
from .views import SaleDetail, SaleList, SaleCreate, SaleDelete, SaleUpdate, SaleOnDateList, ActiveSales

urlpatterns = [
    path('sales', SaleList.as_view(), name='sale-list-create'),
    path('sale/<int:pk>', SaleDetail.as_view(), name='sale-detail'),
    path('sale/create', SaleCreate.as_view(), name='sale-create'),
    path('sale/update/<int:pk>', SaleUpdate.as_view(), name='sale-update'),
    path('sale/delete/<int:pk>', SaleDelete.as_view(), name='sale-delete'),
    path('sales/on-date/<str:date>', SaleOnDateList.as_view(), name='sale-on-date'),
    path('sales/active', ActiveSales.as_view(), name='active-sales')
]