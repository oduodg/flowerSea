from ast import Del
from django.contrib import admin
from .models import Shop, MainFlower, SubFlower, BunchOfFlowers
# Register your models here.

admin.site.register(Shop)
admin.site.register(MainFlower)
admin.site.register(SubFlower)
admin.site.register(BunchOfFlowers)