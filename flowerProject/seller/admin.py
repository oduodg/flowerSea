from ast import Del
from django.contrib import admin
from .models import Shop, MainFlower, SubFlower, BunchOfFlowers, Deliver
# Register your models here.

admin.site.register(Shop)
admin.site.register(MainFlower)
admin.site.register(SubFlower)
admin.site.register(BunchOfFlowers)
admin.site.register(Deliver)