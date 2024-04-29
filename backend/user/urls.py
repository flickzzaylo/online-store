from django.urls import path
from .views import RoleList, register_user, authenticate_user, WalletList, AddAmountToWallet, WalletCreate, \
    WalletDelete, WalletDetail, WalletUpdate, WalletByUserId, RemoveAmountFromWallet

urlpatterns = [
    path('roles', RoleList.as_view(), name='role-list'),
    path('register', register_user, name='register-user'),
    path('authenticate', authenticate_user, name='authenticate-user'),
    path('wallets', WalletList.as_view(), name='wallet-list'),
    path('wallet/addamount/<int:pk>',AddAmountToWallet.as_view(), name='add-amount'),
    path('wallet/removeamount/<int:pk>',RemoveAmountFromWallet.as_view(), name='add-amount'),
    path('wallet/create',WalletCreate.as_view(), name='add-wallet'),
    path('wallet/update/<int:pk>',WalletUpdate.as_view(),name='update-wallet'),
    path('wallet/<int:pk>',WalletDetail.as_view(), name='wallet'),
    path('wallet/delete/<int:pk>',WalletDelete.as_view(),name='delete-wallet'),
    path('wallet/userId=<int:user_id>', WalletByUserId.as_view(), name='wallet-by-user')
]