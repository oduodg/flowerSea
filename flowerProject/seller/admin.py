from ast import Del
from django.contrib import admin
from .models import FlowerShop, MainFlower, SubFlower, Bouquet, Deliver
# Register your models here.

admin.site.register(FlowerShop)
admin.site.register(MainFlower)
admin.site.register(SubFlower)
admin.site.register(Bouquet)
admin.site.register(Deliver)