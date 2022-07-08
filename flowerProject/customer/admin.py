from ast import Or
from django.contrib import admin
from .models import UserInfo, OrderTable, OrderedFlower
# Register your models here.
admin.site.register(UserInfo)
admin.site.register(OrderTable)
admin.site.register(OrderedFlower)