from django.contrib import admin

# Register your models here.
from .models import Role, Wallet, User
admin.site.register(Role)
admin.site.register(Wallet)
admin.site.register(User)