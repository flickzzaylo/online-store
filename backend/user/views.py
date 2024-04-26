from .models import Role, User, Wallet
from .serializers import RoleSerializer, UserSerializer, WalletSerializer

from django.contrib.auth.hashers import check_password, make_password
from rest_framework import generics, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.exceptions import ValidationError

class RoleList(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        # Извлекаем данные из запроса
        name = serializer.validated_data.get('name')
        login = serializer.validated_data.get('login')
        password = serializer.validated_data.get('password')
        role_id = request.data.get('role_id')
        print(request.data)

        # Проверяем, существует ли пользователь с таким логином
        if User.objects.filter(login=login).exists():
            raise ValidationError({'error': 'Пользователь с таким логином уже существует.'})

        try:
            role = Role.objects.get(pk=role_id)
        except Role.DoesNotExist:
            return Response({'error': 'Не найдена роль'}, status=status.HTTP_400_BAD_REQUEST)

        # Хешируем пароль
        hashed_password = make_password(password)

        # Создаем нового пользователя
        wallet = Wallet.objects.create(amount=0)
        user = User.objects.create(wallet=wallet, role=role, name=name, login=login, password=hashed_password)

        return Response({'success': 'Пользователь зарегистрирован в системе'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def authenticate_user(request):
    login = request.data.get('login')
    password = request.data.get('password')

    try:
        user = User.objects.get(login=login)
    except User.DoesNotExist:
        return Response({'error': 'Неправильный логин и/или пароль'}, status=status.HTTP_400_BAD_REQUEST)

    # Проверяем пароль
    if not check_password(password, user.password):
        return Response({'error': 'Неправильный логин и/или пароль'}, status=status.HTTP_400_BAD_REQUEST)


    token = AccessToken.for_user(user)

    userData = {
        'user_id': user.id,
        'login': user.login,
        'name': user.name,
        'token': str(token)
    }
    return Response(userData, status=status.HTTP_200_OK)


class WalletList(generics.ListCreateAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer


class WalletDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer


class WalletCreate(generics.CreateAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer


class WalletUpdate(generics.UpdateAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer


class WalletDelete(generics.DestroyAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer


class AddAmountToWallet(generics.RetrieveUpdateAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        amount_to_add = request.data.get('amount_to_add')
        if amount_to_add:
            instance.amount += int(amount_to_add)
            instance.save()