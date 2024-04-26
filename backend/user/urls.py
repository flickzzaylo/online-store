from django.urls import path
from .views import RoleList, register_user, authenticate_user

urlpatterns = [
    path('roles', RoleList.as_view(), name='role-list'),
    path('register', register_user, name='register-user'),
    path('authenticate', authenticate_user, name='authenticate-user'),
]