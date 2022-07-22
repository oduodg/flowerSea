from django.db import models
from seller.models import Shop, BunchOfFlowers, MainFlower, SubFlower
from django.contrib.auth.models import AbstractUser

# Create your models here.
class UserInfo(AbstractUser):
    idx = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False)
    phoneNum = models.CharField(max_length=15, null=False)
    address = models.CharField(max_length=300, null=False)
    # ID = models.CharField(max_length=30, null=False)
    # PW = models.CharField(max_length=30, null=False)
    
    def __str__(self):
        return self.name
    
class OrderTable(models.Model):
    idx = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    orderDate = models.DateTimeField(auto_now=True, null=False)
    address = models.CharField(max_length=300, null=True)
    requirement = models.TextField(null=True)
    totalPrice = models.IntegerField(null=True)
    CATEGORY_CHOICES = [
        ('0', '결제 안됨'),
        ('1', '주문 수락'),
        ('2', '배송중'),
        ('3', '배송 완료')
    ]
    status = models.CharField(#개화정도
        max_length=10,
        choices=CATEGORY_CHOICES,
        default='0'
    ) 
    
class PickUpLocation(models.Model):
    idx = models.AutoField(primary_key=True)
    depart = models.CharField(max_length=150, null=False)
    dest = models.CharField(max_length=150, null=False)
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    
class Cart(models.Model):
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    Shop = models.ForeignKey(Shop, null=True, on_delete=models.PROTECT)
    mainFlower = models.ForeignKey(MainFlower, null=True, on_delete=models.PROTECT)
    subFlower = models.ForeignKey(SubFlower, null=True, on_delete=models.PROTECT)
    bunchOfFLowers = models.ForeignKey(BunchOfFlowers, null=True, on_delete=models.PROTECT)
    orderTable = models.ForeignKey(OrderTable, null=True, on_delete=models.PROTECT)
    amount = models.IntegerField(null=False)