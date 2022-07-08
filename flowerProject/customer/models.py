from django.db import models
from seller.models import FlowerShop

# Create your models here.
class UserInfo(models.Model):
    idx = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True)
    phoneNum = models.CharField(max_length=15, null=True)
    address = models.CharField(max_length=300)
    
    def __str__(self):
        return self.name
    
class OrderTable(models.Model):
    idx = models.AutoField(primary_key=True)
    shop = models.ForeignKey(FlowerShop, on_delete=models.CASCADE)
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    orderDate = models.DateTimeField()
    address = models.CharField(max_length=300)
    requirements = models.TextField()
    
class OrderedFlower(models.Model):
    idx = models.AutoField(primary_key=True)
    flowerName = models.CharField(max_length=50)
    flowerNum = models.IntegerField()
    orderTable = models.ForeignKey(OrderTable, on_delete=models.CASCADE)