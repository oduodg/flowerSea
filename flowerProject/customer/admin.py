from ast import Or
from django.contrib import admin
from .models import UserInfo, OrderTable, PickUpLocation, Cart
from django.contrib.auth.admin import UserAdmin
# Register your models here.
admin.site.register(UserInfo, UserAdmin)
admin.site.register(OrderTable)
admin.site.register(PickUpLocation)
admin.site.register(Cart)