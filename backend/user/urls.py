from django.urls import path
from .views import RoleList, register_user, authenticate_user, WalletList, AddAmountToWallet

urlpatterns = [
    path('roles', RoleList.as_view(), name='role-list'),
    path('register', register_user, name='register-user'),
    path('authenticate', authenticate_user, name='authenticate-user'),
    path('wallets', WalletList.as_view(), name='wallet-list'),
    path('addAmount/<int:pk>',AddAmountToWallet.as_view(), name='add-amount')
]